---
prev:
    text: 'Framework'
    link: 'framework/index'
next:
    text: 'performTraversal'
    link: 'framework/performTraversal'
---

# Activity 启动流程
## 1. Launcher 发送启动信息
桌面作为 Launcher 进程，在接收到点击应用图标的命令时会调用 Activity 中的 `startActivity()`.

**Activity.java**  
``` java
@Override
public void startActivity(Intent intent, @Nullable Bundle options) {
    ...
    if (options != null) {
        startActivityForResult(intent, -1, options);
    } else {
        startActivityForResult(intent, -1);
    }
}
 
public void startActivityForResult(@RequiresPermission Intent intent, int requestCode,
            @Nullable Bundle options) {
    ...
    Instrumentation.ActivityResult ar =
                mInstrumentation.execStartActivity(
                    this, mMainThread.getApplicationThread(), mToken, this,
                    intent, requestCode, options);
    ...
}
```
它利用 Activity 类中的 Instrumentation 对象 `mInstrumentatio`n 的 `execStartActivity()` 来完成后续流程。其中传入的第二个参数是一个 Binder 对象，ASM 后面利用它来与 APP 通信。  

`execStartActivity()` 最核心的语句是：  
``` java
int result = ActivityTaskManager.getService().startActivity(whoThread,
        who.getOpPackageName(), who.getAttributionTag(), intent,
        intent.resolveTypeIfNeeded(who.getContentResolver()), token,
        target != null ? target.mEmbeddedID : null, requestCode, 0, null, options);
```
通过 `ActivityTaskManager.getService()` 来获取到 IActivityTaskManager 这样的 AMS 代理对象，再利用它继续向 AMS请求启动 Activity.

## 2. AMS 启动 Activity
在 IActivityTaskManager 对应的服务端实现类 ActivityTaskManager 类中，上一步调用的 `startActivity()` 执行了 `startActivityAsUser()`，而这个方法中利用 ActivityStartController 对象调用了 `obtainStater()`. 它设置了一个启动器，在进行了一些配置后使用 `execute()` 执行。  

``` java
return getActivityStartController().obtainStarter(intent, "startActivityAsUser")
                .setCaller(caller)
                .setCallingPackage(callingPackage)
                .setCallingFeatureId(callingFeatureId)
                .setResolvedType(resolvedType)
                .setResultTo(resultTo)
                .setResultWho(resultWho)
                .setRequestCode(requestCode)
                .setStartFlags(startFlags)
                .setProfilerInfo(profilerInfo)
                .setActivityOptions(bOptions)
                .setUserId(userId)
                .execute();
```

在 `execute()` 中，最重要的语句是：  
``` java
res = executeRequest(mRequest);
```
它把请求参数传给了 ActivityStarter 类中进行参数检查。之后继续进入启动 Activity 流程：  
``` java
mLastStartActivityResult = startActivityUnchecked(r, sourceRecord, voiceSession,
                request.voiceInteractor, startFlags, true /* doResume */, checkedOptions,
                inTask, inTaskFragment, restrictedBgActivity, intentGrants);
```
在 `startActivityUnchecked()` 中，它将启动交给了 `startActivityInner()` 进行处理。而在 `starterActivityInner()` 当中对启动准备堆栈，并将参数交给 RootWindowContainer 类的 `resumeFocusedStacksTopActivities()`. 在这个函数中调用了 Task 类中的 `resumeTopActivityUncheckedLocked()` 函数。（此处未 Android 12 版本，之前版本会调用 ActivityStack 中的这个方法）Task 类是一个 Activity 界面集合，遵循栈的结构进行组织。  

在该函数中对 Task 进行判断。若是非叶子结点则递归调用直到找到叶子结点并继续流程。之后进行一些列判断，例如查找当前栈帧中最接近栈顶且可显示和可聚焦的 Activity (next)，判断其暂停状态以及所属用户的权限等。之后进入 `resumeTopActivityInnerLocked()`.  

在该函数中调用 TaskFragment 类中的 `retumeTopActivity()` 来恢复最顶层的 Activity. 其中：  
``` java
if (mResumedActivity != null) {
            ProtoLog.d(WM_DEBUG_STATES, "resumeTopActivity: Pausing %s", mResumedActivity);
            pausing |= startPausing(mTaskSupervisor.mUserLeaving, false /* uiSleeping */,
                    next, "resumeTopActivity");
        }
...
if (next.attachedToProcess()) {
            // Activity 已经附加到进程，恢复页面并更新栈
        } else {
            // Whoops, need to restart this activity!
            mTaskSupervisor.startSpecificActivity(next, true, true);
        }
```
先对上一个 Activity 进行 Pause 操作，再继续当前 Activity.  

``` java
void startSpecificActivity(ActivityRecord r, boolean andResume, boolean checkConfig) {
    // 获取要启动的Activity进程信息
    final WindowProcessController wpc =
            mService.getProcessController(r.processName, r.info.applicationInfo.uid);
    boolean knownToBeDead = false;
    //如果进程存在且有进程中有线程存在 就是启动一个同应用的Activity（普通Activity就在此执行）
    if (wpc != null && wpc.hasThread()) {
        try {
            realStartActivityLocked(r, wpc, andResume, checkConfig);
            return;
        } catch (RemoteException e) {
            Slog.w(TAG, "Exception when starting activity "
                + r.intent.getComponent().flattenToShortString(), e);
    }
  
    // If a dead object exception was thrown -- fall through to
    // restart the application.
    knownToBeDead = true;
    }
     
    //否则通过AMS向Zygote进程请求创建新的进程
    r.notifyUnknownVisibilityLaunchedForKeyguardTransition();
    final boolean isTop = andResume && r.isTopRunningActivity();
    mService.startProcessAsync(r, knownToBeDead, isTop, isTop ? "top-activity" : "activity");
}
```

## 3. 启动新进程
Zygote 创建新进程后通过反射机制调用进入 ActivityThread 类。在创建好 Looper 和 ActivityThread 类后，当前应用会被注册到 AMS 中。其逻辑是：在 AMS 绑定 ApplicationThread 时，发送了一个 `H.BIND_APPLICATION` 的 Message，在 Handler 中处理该消息时调用了 Application 的 `onCreate()`；在 `mAtmInternal` 的 `attachApplication` 层层调用到 `ActivityStackSupervisor.realStartActivityLocked()`.  

### 3.1 启动已存在的 Activity 进程
当前面创建并绑定好新进程，或当进程本来就存在时，走 `startSpecificActivity()` 中的 `realStartActivityLocked()`. 这个方法负责创建事务并分发给生命周期管理器进行处理。  

``` java
boolean realStartActivityLocked(ActivityRecord r, WindowProcessController proc,
    boolean andResume, boolean checkConfig) throws RemoteException {
    ...
 
    // Create activity launch transaction.
    final ClientTransaction clientTransaction = ClientTransaction.obtain(
            proc.getThread(), r.appToken);
 
    ...
 
    // Set desired final state.
    final ActivityLifecycleItem lifecycleItem;
    if (andResume) {
        lifecycleItem = ResumeActivityItem.obtain(isTransitionForward);
    } else {
        lifecycleItem = PauseActivityItem.obtain();
    }
    clientTransaction.setLifecycleStateRequest(lifecycleItem);
 
    // Schedule transaction.
    mService.getLifecycleManager().scheduleTransaction(clientTransaction);
 
    ...
}
```
其中第一步创建需要的事务。第二步设置事务完成后客户端应该处于的最终状态，使用 `setLifecycleStateRequest()` 来设置，需要传入一个 ActivityLifecycleItem 对象。第三步开始调度事务。具体执行：客户端调用 `preExecute()`，触发所有需要在真正调度事务前执行完毕的工作；发送事务的 message 信息到客户端；客户端调用 `TransactionExecutor.execute()`，执行所有回调以及必要的生命周期事务。  

**ClientLifecycleManager.java**  
``` java
void scheduleTransaction(ClientTransaction transaction) throws RemoteException {
    final IApplicationThread client = transaction.getClient();
    transaction.schedule();
    if (!(client instanceof Binder)) {
        transaction.recycle();
    }
}
```

**ClientTransaction.java**  
``` java
public void schedule() throws RemoteException {
    mClient.scheduleTransaction(this);
}
```
`mClient` 是 IApplicationThread 类型。是 ActivityThread 的代理对象。在其中通过异步的 Handler 分发和调度事件，最终在执行线程(主线程)的 `handleMessage()` 回调中执行服务端传过来的 Transaction.  

最终 TransactionExecutor 来调用 ActivityThread 中的 `performLaunchActivity()` 来启动 Activity.   
其具体执行：  
- 创建应用上下文(Context)，获取 ClassLoader；
- 创建 Activity 对象，实质上是 classLoader.loadClass(name).newInstance()，这里会对 Activity 类进行初始化，调用对象的 `<cinit>` 方法，从而执行目标类里 static block 中的代码（通过 Instrumentation 的 newActivity() 方法，以反射形式创建 Activity 实例）;
- 根据应用的 AndroidManifest.xml 创建 Application 对象，并调用其 onCreate() 回调；
- 初始化 Activity，创建 Window 对象（PhoneWindow）并实现 Activity 和 Window 相关联；
- 通过 Instrumentation 调用对应 Activity 的 onCreate() 回调。


后面即开始 APP 本身的代码。  

## 参考文献或资料
1. [Activity的启动流程详解](https://blog.csdn.net/m0_37698652/article/details/121593197#t5)
2. [Android12 应用启动流程分析](https://evilpan.com/2021/12/05/apk-startup/#launch-activity)
3. [framework之Activity启动流程（基于Android11源码）](https://weiwangqiang.github.io/2021/06/08/start-activity-flow/)
4. [Activity的启动流程这一篇够了](https://www.jianshu.com/p/d7364591f1d1)
5. [Activity的启动过程详解（基于Android10.0）](https://juejin.cn/post/6847902222294990862)
6. [【安卓 R 源码】Activity 启动流程及其生命周期源码分析](https://blog.csdn.net/qq_40587575/article/details/121354976)
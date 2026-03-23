---
prev:
    text: 'Activity 与窗口可见性更新机制'
    link: '/framework/visibility-management'
next:
    text: 'ShellTransition'
    link: '/framework/ShellTransition'
---

# Configuration 管理

Configuration 是 Android 系统中至关重要的一环，应用的运行以及界面的展示都依赖于 Configuration。本文将从 Configuration 的基本概念出发，介绍 Configuration 的生成、更新和应用等多个角度，帮助开发者构建完善的 Configuration 管理体系认知。

Configuration 变化多发生在内外屏切换、横竖屏切换、多窗口切换等场景，这些都是大屏设备上常见的用户场景。随着近年来大屏设备（折叠屏和平板）越来越多，无论是系统开发者还是应用开发者经常会遇到 Configuration 更新带来的问题，因此很有必要了解 Configuration 的更新机制。

## 1. Configuration 字段详解

### 1.1 Configuration

Configuration 用于描述可能影响应用程序的所有设备配置信息，包括用户定义的配置项（地区设置等），也包括系统的动态配置（屏幕分辨率、屏幕尺寸、方向等）。

- APP 侧可以通过 `Resources.getConfiguration()` 获取 Configuration；
- 系统侧所有的窗口容器都有多个方法获取 Configuration，因为它们都继承自 `ConfigurationContainer` 配置容器类。

在 dump 和 log 中常见的 Configuration 输出格式如下（来自 `Configuration#toString`）：

```
Configuration={1.0 ?mcc0mnc [zh_CN_#Hans,en_US] ldltr sw411dp w411dp h797dp
  420dpi nrml long hdr widecg port finger -keyb/v/h -nav/h
  winConfig={ mBounds=Rect(0, 0 - 1080, 2092) mAppBounds=Rect(0, 0 - 1080, 2092)
    mMaxBounds=Rect(0, 0 - 1080, 2092) mDisplayRotation=ROTATION_0
    mWindowingMode=fullscreen mActivityType=home mAlwaysOnTop=undefined
    mRotation=ROTATION_0}
  s.3 fontWeightAdjustment=0}
```

主要字段说明：

| 字段 | 含义 |
|------|------|
| `fontScale` | 字体缩放比例，默认 1.0 |
| `mcc` / `mnc` | 移动国家码 / 移动网络码 |
| `locale` | 地区设置，如 `zh_CN_#Hans,en_US` |
| `screenLayout` | 屏幕布局方向，如 `ldltr`（layout direction left-to-right） |
| `smallestScreenWidthDp` | 最小屏幕宽度（dp），如 `sw411dp` |
| `screenWidthDp` / `screenHeightDp` | 当前屏幕可用宽高（dp） |
| `densityDpi` | 屏幕像素密度，如 `420dpi` |
| `screenLayout (size)` | 屏幕尺寸类别：`small` / `nrml` / `large` / `xlarge` |
| `screenLayout (long)` | 屏幕是否为长屏：`long` / `notlong` |
| `orientation` | 屏幕方向：`port`（竖屏）/ `land`（横屏） |
| `touchscreen` | 触摸屏类型，如 `finger` |
| `keyboard` / `navigation` | 键盘和导航输入方式 |
| `fontWeightAdjustment` | 字体粗细调整值 |

### 1.2 WindowConfiguration

Configuration 中有一个重要的变量 `windowConfiguration`，用于描述窗口状态相关的配置（来自 `WindowConfiguration#toString`）：

```
winConfig={ mBounds=Rect(0, 0 - 1080, 2092)
  mAppBounds=Rect(0, 0 - 1080, 2092)
  mMaxBounds=Rect(0, 0 - 1080, 2092)
  mDisplayRotation=ROTATION_0 mWindowingMode=fullscreen
  mActivityType=home mAlwaysOnTop=undefined mRotation=ROTATION_0}
```

各字段含义：

- **mBounds**：当前窗口容器（如 Task、ActivityRecord）的 bounds，包含 insets，表示窗口相对于整个屏幕的可用区域。
- **mAppBounds**：App 可用的 bounds，保存 mBounds 中不包含系统装饰 insets 的区域；同时也用于计算 `screenWidthDp`、`screenHeightDp` 和 `DisplayMetrics`。
- **mMaxBounds**：容器能获得的最大 bounds。分屏下 ActivityRecord 为半屏大小，其他场景为屏幕大小。
- **mRotation**：当前容器的旋转角度，一般只与当前 Container 和所在的 Display 有关。
- **mWindowingMode**：窗口模式，取值如下：
  ```
  0: UNDEFINED
  1: FULLSCREEN
  2: PINNED
  5: FREEFORM
  6: MULTI_WINDOW
  ```
- **mActivityType**：Activity 类型，包括标准（standard）、桌面（home）、最近任务（recents）、助手（assistant）、息屏（dream）。
- **mAlwaysOnTop**：是否一直处于顶部的标志位。

## 2. Context 与 Resources 体系

在介绍 Configuration 的更新流程之前，需要先了解 Context、Resources、Configuration 之间的关系，因为 APP 进程中 Configuration 的获取和更新都依赖于这套体系。

### 2.1 什么是 Context

Context 在 Android 中可以理解为"场景"——一个 APP 可以是一个场景（Application），一个页面也可以是一个场景（Activity），不同场景之间可以相互切换和包含。Application、Activity、Service 都是 Context。

一个应用程序的 Context 总数 = Activity 数量 + Service 数量 + 1（ApplicationContext）。

### 2.2 Context 的类结构

![Context 类继承关系](/img/android/configuration/03_context_class_hierarchy.svg)

- **Context** 是一个抽象类，定义了获取上下文信息的接口。
- **ContextWrapper** 是 Context 的包装类，其 `mBase` 属性指向真正的 Context 实现（即 ContextImpl）。可通过构造方法或 `ContextWrapper#attachBaseContext` 方法传入。
- **ContextThemeWrapper** 内部包含与主题相关的接口（即 AndroidManifest.xml 中通过 `android:theme` 指定的主题）。因为只有 Activity 需要主题，Service 不需要，所以 Activity 继承自 ContextThemeWrapper，Service 继承自 ContextWrapper。
- **ContextImpl** 真正实现了 Context 中所有的方法。当我们调用 `mContext.getResources()` 时，实际获取的是 `ContextImpl#mResources`；当进一步调用 `Resources#getConfiguration()` 时，实际返回的是 `ResourcesImpl#mConfiguration`。

### 2.3 Resources 相关类

![Resources 相关类关系](/img/android/configuration/04_resource_class_diagram.svg)

#### ResourcesManager

ResourcesManager 是 Resources 的管理类，是一个**单例类**：

```java
public class ResourcesManager {
    private static ResourcesManager sResourcesManager;

    // APP 中一个全局的 Configuration
    private final Configuration mResConfiguration = new Configuration();

    // 保存 ResourcesKey 和对应的 ResourcesImpl
    private final ArrayMap<ResourcesKey, WeakReference<ResourcesImpl>> mResourceImpls =
            new ArrayMap<>();
    private final ArrayList<WeakReference<Resources>> mResourceReferences = new ArrayList<>();

    // Key 是 Activity 的 token，保存一个 Activity 对应的 ActivityResources
    private final WeakHashMap<IBinder, ActivityResources> mActivityResourceReferences =
        new WeakHashMap<>();
}
```

#### ResourcesImpl

ResourcesImpl 是 Resources 具体加载资源的类，也是**真正持有 Configuration 的对象**：

```java
public class Resources {
    private ResourcesImpl mResourcesImpl;
    final ClassLoader mClassLoader;
}

public class ResourcesImpl {
    final AssetManager mAssets;
    private final DisplayMetrics mMetrics = new DisplayMetrics();
    private final Configuration mConfiguration = new Configuration();
}
```

#### ActivityResources 与 ActivityResource

一个 Activity 会有多个 Resources，用 `ActivityResources` 来管理：

```java
private static class ActivityResources {
    // 当前 Activity token 对应的 override configuration
    public final Configuration overrideConfig = new Configuration();
    // 当前 Activity 关联的 display id
    public int overrideDisplayId;
    // 该 Activity 关联的所有 ActivityResource
    public final ArrayList<ActivityResource> activityResources = new ArrayList<>();
}
```

ActivityResource 是对 Resources 的进一步封装，以**弱引用**形式保存 Resources 对象，并增加 `overrideConfig` 和 `overrideDisplayId` 属性。`overrideConfig` 是创建之初就有的 Configuration，后续不会被更新：

```java
private static class ActivityResource {
    // 叠加在 Activity token 的 override config 之上的额外 override
    public final Configuration overrideConfig = new Configuration();
    @Nullable
    public Integer overrideDisplayId;
    @Nullable
    public WeakReference<Resources> resources;
}
```

#### 小结

Context、Resources、Configuration 的关系较为复杂：

- 应用中有多个 Context，而 Context 真正的实现类是 ContextImpl；
- ContextImpl 持有 Resources，但真正的实现类是 ResourcesImpl，Resources 和 ResourcesImpl **并不是一对一的关系**；
- 应用进程只能获取到 Context 和 Resources 这些包装类，而 ContextImpl 和 ResourcesImpl 在框架层有多个实例，往往无法直接确定出问题的是哪个。

### 2.4 Context 的创建

#### 2.4.1 AppContext 创建流程

![AppContext 创建时序](/img/android/configuration/05_app_context_creation.svg)

##### LoadedApk#makeApplicationInner

```java
private Application makeApplicationInner(boolean forceDefaultAppClass,
        Instrumentation instrumentation, boolean allowDuplicateInstances) {
    if (mApplication != null) {
        return mApplication;
    }
    try {
        Application app = null;
        final String myProcessName = Process.myProcessName();
        String appClass = mApplicationInfo.getCustomApplicationClassNameForProcess(
                myProcessName);
        try {
            // 创建 AppContext
            ContextImpl appContext = ContextImpl.createAppContext(mActivityThread, this);
            NetworkSecurityConfigProvider.handleNewApplication(appContext);
            // 创建 Application 对象
            app = mActivityThread.mInstrumentation.newApplication(cl, appClass, appContext);
            appContext.setOuterContext(app);
        } catch (Exception e) {
            ...
        }
        mActivityThread.mAllApplications.add(app);
        mApplication = app;

        if (instrumentation != null) {
            try {
                instrumentation.callApplicationOnCreate(app);
            }
        }
        return app;
    } finally {
        Trace.traceEnd(Trace.TRACE_TAG_ACTIVITY_MANAGER);
    }
}
```

##### ContextImpl#createAppContext

通过 `createAppContext` 创建的 ContextImpl 使用的是 LoadedApk 的 Resources：

```java
static ContextImpl createAppContext(ActivityThread mainThread, LoadedApk packageInfo,
        String opPackageName) {
    if (packageInfo == null) throw new IllegalArgumentException("packageInfo");
    // 创建 ContextImpl
    ContextImpl context = new ContextImpl(null, mainThread, packageInfo,
            ContextParams.EMPTY, null, null, null, null, null, 0, null, opPackageName,
            DEVICE_ID_DEFAULT, false);
    // 设置 Resources，来自 LoadedApk
    context.setResources(packageInfo.getResources());
    // 设置 Context 类型
    context.mContextType = isSystemOrSystemUI(context) ? CONTEXT_TYPE_SYSTEM_OR_SYSTEM_UI
            : CONTEXT_TYPE_NON_UI;
    return context;
}
```

Context 类型包括：`CONTEXT_TYPE_NON_UI`、`CONTEXT_TYPE_DISPLAY_CONTEXT`、`CONTEXT_TYPE_ACTIVITY`、`CONTEXT_TYPE_WINDOW_CONTEXT`、`CONTEXT_TYPE_SYSTEM_OR_SYSTEM_UI`。

##### LoadedApk#getResources

如果 `mResources == null`，则调用 ResourcesManager 创建：

```java
public Resources getResources() {
    if (mResources == null) {
        final String[] splitPaths;
        try {
            splitPaths = getSplitPaths(null);
        } catch (NameNotFoundException e) {
            throw new AssertionError("null split not found");
        }

        if (Process.myUid() == mApplicationInfo.uid) {
            ResourcesManager.getInstance().initializeApplicationPaths(mResDir, splitPaths);
        }

        mResources = ResourcesManager.getInstance().getResources(null, mResDir,
                splitPaths, mLegacyOverlayDirs, mOverlayPaths,
                mApplicationInfo.sharedLibraryFiles, null, null, getCompatibilityInfo(),
                getClassLoader(), null);
    }
    return mResources;
}
```

##### ResourcesManager#getResources

```java
public Resources getResources(
        @Nullable IBinder activityToken, ...) {
    final ResourcesKey key = new ResourcesKey(resDir, splitResDirs,
            combinedOverlayPaths(legacyOverlayDirs, overlayPaths), libDirs,
            overrideDisplayId != null ? overrideDisplayId : INVALID_DISPLAY,
            overrideConfig, compatInfo,
            loaders == null ? null : loaders.toArray(new ResourcesLoader[0]));
    classLoader = classLoader != null ? classLoader : ClassLoader.getSystemClassLoader();
    ......
    Resources resources;
    if (activityToken != null) {
        // Activity 路径
        Configuration initialOverrideConfig = new Configuration(key.mOverrideConfiguration);
        rebaseKeyForActivity(activityToken, key, overrideDisplayId != null);
        resources = createResourcesForActivity(activityToken, key, initialOverrideConfig,
                overrideDisplayId, classLoader, assetsSupplier);
    } else {
        // 非 Activity 路径（Application、Service 等）
        resources = createResources(key, classLoader, assetsSupplier);
    }
    return resources;
}
```

##### ResourcesManager#createResources → createResourcesImpl

```java
private Resources createResources(@NonNull ResourcesKey key, @NonNull ClassLoader classLoader,
        @Nullable ApkAssetsSupplier apkSupplier) {
    synchronized (mLock) {
        ResourcesImpl resourcesImpl = findOrCreateResourcesImplForKeyLocked(key, apkSupplier);
        if (resourcesImpl == null) return null;
        return createResourcesLocked(classLoader, resourcesImpl, key.mCompatInfo);
    }
}

private @Nullable ResourcesImpl findOrCreateResourcesImplForKeyLocked(
        @NonNull ResourcesKey key, @Nullable ApkAssetsSupplier apkSupplier) {
    ResourcesImpl impl = findResourcesImplForKeyLocked(key);
    if (impl == null || impl.getAppliedSharedLibsHash() != mSharedLibAssetsMap.size()) {
        impl = createResourcesImpl(key, apkSupplier);
        if (impl != null) {
            mResourceImpls.put(key, new WeakReference<>(impl));
        }
    }
    return impl;
}

private @Nullable ResourcesImpl createResourcesImpl(@NonNull ResourcesKey key,
        @Nullable ApkAssetsSupplier apkSupplier) {
    final AssetManager assets = createAssetManager(key, apkSupplier);
    if (assets == null) return null;

    final DisplayAdjustments daj = new DisplayAdjustments(key.mOverrideConfiguration);
    daj.setCompatibilityInfo(key.mCompatInfo);

    final Configuration config = generateConfig(key);
    final DisplayMetrics displayMetrics = getDisplayMetrics(generateDisplayId(key), daj);
    final ResourcesImpl impl = new ResourcesImpl(assets, displayMetrics, config, daj);
    return impl;
}
```

#### 2.4.2 ActivityContext 创建流程

![ActivityContext 创建时序](/img/android/configuration/06_activity_context_creation.svg)

##### ContextImpl#createActivityContext

主要步骤：创建 ContextImpl → 通过 ResourcesManager 创建 Resources → 设置给 ContextImpl → 设置 Display。

```java
static ContextImpl createActivityContext(ActivityThread mainThread,
        LoadedApk packageInfo, ActivityInfo activityInfo, IBinder activityToken,
        int displayId, Configuration overrideConfiguration) {
    if (packageInfo == null) throw new IllegalArgumentException("packageInfo");

    String[] splitDirs = packageInfo.getSplitResDirs();
    ClassLoader classLoader = packageInfo.getClassLoader();

    // 处理 isolated split loading
    if (packageInfo.getApplicationInfo().requestsIsolatedSplitLoading()) {
        try {
            classLoader = packageInfo.getSplitClassLoader(activityInfo.splitName);
            splitDirs = packageInfo.getSplitPaths(activityInfo.splitName);
        } catch (NameNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    // 创建 ContextImpl
    ContextImpl context = new ContextImpl(null, mainThread, packageInfo, ContextParams.EMPTY,
            attributionTag, null, activityInfo.splitName, activityToken, null, 0, classLoader,
            null, DEVICE_ID_DEFAULT, false);
    context.mContextType = CONTEXT_TYPE_ACTIVITY;
    context.mIsConfigurationBasedContext = true;

    displayId = (displayId != Display.INVALID_DISPLAY) ? displayId : Display.DEFAULT_DISPLAY;
    final CompatibilityInfo compatInfo = (displayId == Display.DEFAULT_DISPLAY)
            ? packageInfo.getCompatibilityInfo()
            : CompatibilityInfo.DEFAULT_COMPATIBILITY_INFO;

    final ResourcesManager resourcesManager = ResourcesManager.getInstance();

    // 为 Activity 创建 Resources
    context.setResources(resourcesManager.createBaseTokenResources(activityToken,
            packageInfo.getResDir(), splitDirs,
            packageInfo.getOverlayDirs(), packageInfo.getOverlayPaths(),
            packageInfo.getApplicationInfo().sharedLibraryFiles,
            displayId, overrideConfiguration, compatInfo, classLoader,
            packageInfo.getApplication() == null ? null
                    : packageInfo.getApplication().getResources().getLoaders()));
    // 设置 Display
    context.setDisplay(resourcesManager.getAdjustedDisplay(displayId, context.getResources()));
    return context;
}
```

##### ResourcesManager#createBaseTokenResources

```java
public @Nullable Resources createBaseTokenResources(@NonNull IBinder token, ...) {
    final ResourcesKey key = new ResourcesKey(resDir, splitResDirs,
            combinedOverlayPaths(legacyOverlayDirs, overlayPaths),
            libDirs, displayId, overrideConfig, compatInfo,
            loaders == null ? null : loaders.toArray(new ResourcesLoader[0]));
    classLoader = classLoader != null ? classLoader : ClassLoader.getSystemClassLoader();

    synchronized (mLock) {
        // 为 activityToken 创建 ActivityResources 结构
        getOrCreateActivityResourcesStructLocked(token);
    }

    // 使用 overrideConfig 更新 ActivityResources
    updateResourcesForActivity(token, overrideConfig, displayId);

    // 如果已有匹配的 Resources 则直接返回
    synchronized (mLock) {
        Resources resources = findResourcesForActivityLocked(token, key, classLoader);
        if (resources != null) return resources;
    }

    // 为 Activity 创建新的 Resources 和 ResourcesImpl
    return createResourcesForActivity(token, key,
            Configuration.EMPTY, null, classLoader, null);
}
```

##### ResourcesManager#createResourcesForActivity

```java
private Resources createResourcesForActivity(@NonNull IBinder activityToken,
        @NonNull ResourcesKey key, @NonNull Configuration initialOverrideConfig,
        @Nullable Integer overrideDisplayId, @NonNull ClassLoader classLoader,
        @Nullable ApkAssetsSupplier apkSupplier) {
    synchronized (mLock) {
        // 创建 ResourcesImpl
        ResourcesImpl resourcesImpl = findOrCreateResourcesImplForKeyLocked(key, apkSupplier);
        if (resourcesImpl == null) return null;

        return createResourcesForActivityLocked(activityToken, initialOverrideConfig,
                overrideDisplayId, classLoader, resourcesImpl, key.mCompatInfo);
    }
}

private Resources createResourcesForActivityLocked(@NonNull IBinder activityToken,
        @NonNull Configuration initialOverrideConfig, @Nullable Integer overrideDisplayId,
        @NonNull ClassLoader classLoader, @NonNull ResourcesImpl impl,
        @NonNull CompatibilityInfo compatInfo) {
    final ActivityResources activityResources =
            getOrCreateActivityResourcesStructLocked(activityToken);

    Resources resources = compatInfo.needsCompatResources()
            ? new CompatResources(classLoader) : new Resources(classLoader);
    // 为 Resources 设置 ResourcesImpl
    resources.setImpl(impl);
    resources.setCallbacks(mUpdateCallbacks);

    // 创建 ActivityResource 并记录
    ActivityResource activityResource = new ActivityResource();
    activityResource.resources = new WeakReference<>(resources,
            activityResources.activityResourcesQueue);
    activityResource.overrideConfig.setTo(initialOverrideConfig);
    activityResource.overrideDisplayId = overrideDisplayId;
    activityResources.activityResources.add(activityResource);
    return resources;
}
```

## 3. Configuration 更新触发时机

### 3.1 常见触发时机

- **Sensor 触发转屏**：`WMS#updateActivityOrientationForSensor`，例如平板的横竖屏切换。
- **Display 变化**：`RootWindowContainer.onDisplayChanged`，例如折叠屏的内外屏切换。
- **手动更改屏幕配置**：通过设置切换深色模式、切换屏幕分辨率等。
- **调用 ConfigurationContainer 的 setXXX 方法**：如 `setBounds`、`setWindowMode` 等，例如多窗口切换。

这些操作在大屏设备上是常用的用户场景。

### 3.2 Configuration 更新概述

![Configuration 更新总览](/img/android/configuration/01_overview_flow.svg)

当 Configuration 发生变化时，一般会调用 `DisplayContent#sendNewConfiguration` 方法，主要包含以下流程：

1. **新建 Configuration**：根据 DisplayInfo 信息和 Policy 计算 Configuration 的初始值，同时也会计算 WindowConfiguration 部分属性的初始值（如 AppBounds、Rotation、Bounds 等）。
2. **更新全局的 Configuration**：
   - 首先遍历所有的 WindowProcessController（与 APP 进程一一对应），通过 `ConfigurationChangeItem` 向所有 APP 进程下发最新的 Configuration 信息。
   - 然后从系统侧窗口容器的根节点 RootWindowContainer 开始，深度遍历窗口树，更新每个节点的 Configuration。
3. **ActivityRecord 处理**：当前 Resumed 的 ActivityRecord 根据最新的 Configuration 判断是否需要 relaunch，如果不需要则通过 `ActivityConfigurationChangeItem` 下发最新的 Configuration。

**多窗口切换**时不会触发全局的 Configuration 更新，而是从要变化的节点（例如 Task）开始：

1. 调用 Task 的 `setWindowMode` 或 `setBounds` 方法时，触发 Task 的 `onConfigurationChanged`。
2. 以 Task 为根节点下发 Configuration，判断 ActivityRecord 是否需要 Relaunch 和下发 `ActivityConfigurationChangeItem`。
3. 同时通知对应进程的 WindowProcessController，下发 `ConfigurationChangeItem`。

## 4. Configuration 的初始化与全局更新

### 4.1 Configuration 的初始化

在更新 Configuration 之前，会创建一个新的 Configuration，并设置默认值，然后根据 DisplayInfo 和策略计算初始值：

```java
// DisplayContent
boolean updateDisplayOverrideConfigurationLocked() {
    ......
    // 创建一个新的 Configuration
    Configuration values = new Configuration();
    // 根据 display properties 和 policy settings 计算 configuration
    computeScreenConfiguration(values);
    ......
    // 更新当前屏幕的 Configuration
    updateDisplayOverrideConfigurationLocked(values, null /* starting */,
            false /* deferResume */);
    return mAtmService.mTmpUpdateConfigurationResult.changes != 0;
}
```

#### DisplayContent#computeScreenConfiguration

根据 Display 的属性和策略设置，计算 display 的 Configuration：

```java
void computeScreenConfiguration(Configuration config) {
    // 当 rotation 或 config 变化时，更新 mDisplayInfo
    final DisplayInfo displayInfo = updateDisplayAndOrientation(config);
    final int dw = displayInfo.logicalWidth;
    final int dh = displayInfo.logicalHeight;
    mTmpRect.set(0, 0, dw, dh);
    config.windowConfiguration.setBounds(mTmpRect);
    config.windowConfiguration.setMaxBounds(mTmpRect);
    config.windowConfiguration.setWindowingMode(getWindowingMode());

    // 计算应用相关的 Configuration
    computeScreenAppConfiguration(config, dw, dh, displayInfo.rotation);

    config.densityDpi = displayInfo.logicalDensityDpi;
    .......
}
```

#### DisplayContent#computeScreenAppConfiguration

```java
private void computeScreenAppConfiguration(Configuration outConfig, int dw, int dh,
        int rotation) {
    final DisplayPolicy.DecorInsets.Info info =
            mDisplayPolicy.getDecorInsetsInfo(rotation, dw, dh);
    // AppBounds 在根级别应该镜像 app screen size
    outConfig.windowConfiguration.setAppBounds(info.mNonDecorFrame);
    outConfig.windowConfiguration.setRotation(rotation);

    final float density = mDisplayMetrics.density;
    outConfig.screenWidthDp = (int) (info.mConfigFrame.width() / density + 0.5f);
    outConfig.screenHeightDp = (int) (info.mConfigFrame.height() / density + 0.5f);
    outConfig.compatScreenWidthDp = (int) (outConfig.screenWidthDp / mCompatibleScreenScale);
    outConfig.compatScreenHeightDp = (int) (outConfig.screenHeightDp / mCompatibleScreenScale);
    outConfig.orientation = (outConfig.screenWidthDp <= outConfig.screenHeightDp)
            ? ORIENTATION_PORTRAIT : ORIENTATION_LANDSCAPE;
    outConfig.screenLayout = computeScreenLayout(
            Configuration.resetScreenLayout(outConfig.screenLayout),
            outConfig.screenWidthDp, outConfig.screenHeightDp);
    ......
    final boolean rotated = (rotation == ROTATION_90 || rotation == ROTATION_270);
    outConfig.compatSmallestScreenWidthDp = computeCompatSmallestWidth(rotated, dw, dh);
    outConfig.windowConfiguration.setDisplayRotation(rotation);
}
```

### 4.2 更新全局的 Configuration

```java
// ActivityTaskManagerService#updateGlobalConfigurationLocked
int updateGlobalConfigurationLocked(@NonNull Configuration values, boolean initLocale,
        boolean persistent, int userId) {
    ......................

    // 通知所有 APP 进程更新 Config
    SparseArray<WindowProcessController> pidMap = mProcessMap.getPidMap();
    for (int i = pidMap.size() - 1; i >= 0; i--) {
        final int pid = pidMap.keyAt(i);
        final WindowProcessController app = pidMap.get(pid);
        app.onConfigurationChanged(mTempConfig);
    }

    // 更新系统侧所有容器的 Config
    mRootWindowContainer.onConfigurationChanged(mTempConfig);
    return changes;
}
```

## 5. 系统侧窗口容器 Configuration 更新

### 5.1 窗口容器与层级结构

#### ConfigurationContainer

**ConfigurationContainer** 是 WMS 设计的配置容器抽象类，一个配置容器可以容纳其他的配置容器（类似 View 的层级关系）。其重要属性如下：

- **mRequestedOverrideConfiguration**：当前 Container 请求的配置，通过 `setXXX` 方法设置（如 `setBounds`、`setWindowMode`），不会被父容器的 mFullConfiguration 覆盖。
- **mResolvedOverrideConfiguration**：根据父容器的 Configuration 和请求重写的 Configuration（mRequestedOverrideConfiguration）以及自身的策略（`resolveOverrideConfiguration()`），得到的最终 override 配置。
  > `mResolvedOverrideConfiguration = mRequestedOverrideConfiguration + resolveOverrideConfiguration()`
- **mFullConfiguration**：当前容器的**完整 Configuration 最终状态**，基于 parent 的 mFullConfiguration 和当前容器的 mResolvedOverrideConfiguration 合并而来。
  > `mFullConfiguration = parent.mFullConfiguration + mResolvedOverrideConfiguration`
- **mMergedOverrideConfiguration**：记录了从顶级 RootWindowContainer 到当前容器上所有节点的 mResolvedOverrideConfiguration 的合并，用于后续更新到 APP 进程。
  > `mMergedOverrideConfiguration = parent.mMergedOverrideConfiguration + mResolvedOverrideConfiguration`

> 这里的"+"是指执行 `Configuration#updateFrom` 和 `WindowConfiguration#updateFrom`。

```java
public abstract class ConfigurationContainer<E extends ConfigurationContainer> {
    private Configuration mRequestedOverrideConfiguration = new Configuration();
    private Configuration mResolvedOverrideConfiguration = new Configuration();
    private Configuration mFullConfiguration = new Configuration();

    public Configuration getConfiguration() { return mFullConfiguration; }
    public void onConfigurationChanged(Configuration newParentConfig) { ... }
}
```

#### WindowContainer

WindowContainer 是 WMS 里设计的窗口容器顶级类，继承自 ConfigurationContainer。它将子容器保存在一个列表中，并实现了添加、删除子容器以及遍历不同类型子容器的方法。

#### RootWindowContainer

RootWindowContainer 是所有窗口容器的根容器，系统中只存在一个。它管理 DisplayContent（每一个 DisplayContent 对应一个 Display 屏幕）。当调用 `mRootWindowContainer.onConfigurationChanged(mTempConfig)` 时，便会根据整个 Window 树形结构，从右到左依次遍历更新所有的窗口容器。

#### Window 层级结构图（简化版）

![Window 层级结构](/img/android/configuration/02_window_hierarchy.svg)

### 5.2 窗口容器 Configuration 更新流程

当查看 ActivityRecord 中的 Configuration 更新堆栈时，可以看到大量不同类的 `onConfigurationChanged` 方法调用：

```
onConfigurationChanged, ActivityRecord
dispatchConfigurationToChild, ConfigurationContainer  ← 分发给 ActivityRecord，此时容器是 Task
onConfigurationChanged, ConfigurationContainer
onConfigurationChanged, WindowContainer
onConfigurationChanged, TaskFragment
onConfigurationChangedInner, Task
onConfigurationChanged, Task
dispatchConfigurationToChild, ConfigurationContainer  ← 分发给 Task，此时容器是 DefaultTaskDisplayArea
onConfigurationChanged, ConfigurationContainer
onConfigurationChanged, WindowContainer
onConfigurationChanged, DisplayArea
dispatchConfigurationToChild, ConfigurationContainer  ← 分发给 DisplayArea (FullscreenMagnification)
...（逐层向上直到 RootWindowContainer）
onConfigurationChanged, RootWindowContainer           ← 系统侧窗口容器更新的起点
updateGlobalConfigurationLocked, ActivityTaskManagerService
updateDisplayOverrideConfigurationLocked, DisplayContent
sendNewConfiguration, DisplayContent
```

> **系统侧 Configuration 更新的基本原理**：根据**层级结构树下发给孩子节点**，同时根据**配置容器类图调用父类方法**的过程。

下面以 `Task#onConfigurationChanged` 为例看 Configuration 如何下发给其孩子节点 ActivityRecord：

```java
// Task#onConfigurationChanged
public void onConfigurationChanged(Configuration newParentConfig) {
    ......
    onConfigurationChangedInner(newParentConfig);
    ......
}

// Task#onConfigurationChangedInner
private void onConfigurationChangedInner(Configuration newParentConfig) {
    ......
    super.onConfigurationChanged(newParentConfig);  // → TaskFragment
    ......
}

// TaskFragment#onConfigurationChanged
public void onConfigurationChanged(Configuration newParentConfig) {
    super.onConfigurationChanged(newParentConfig);  // → WindowContainer
    updateOrganizedTaskFragmentSurface();
    sendTaskFragmentInfoChanged();
}

// WindowContainer#onConfigurationChanged
public void onConfigurationChanged(Configuration newParentConfig) {
    super.onConfigurationChanged(newParentConfig);  // → ConfigurationContainer
    updateSurfacePositionNonOrganized();
    scheduleAnimation();
}
```

#### ConfigurationContainer#onConfigurationChanged

这是 Configuration 更新的核心方法：

```java
// ConfigurationContainer#onConfigurationChanged
public void onConfigurationChanged(Configuration newParentConfig) {
    // 1. 解析 mRequestedOverrideConfiguration，得到 mResolvedOverrideConfiguration
    mResolvedTmpConfig.setTo(mResolvedOverrideConfiguration);
    resolveOverrideConfiguration(newParentConfig);
    // 2. 将父容器的 Config 赋值给 mFullConfiguration
    mFullConfiguration.setTo(newParentConfig);
    // 3. 不继承父容器的 always-on-top 属性，避免传播给所有子容器
    mFullConfiguration.windowConfiguration.unsetAlwaysOnTop();
    // 4. 利用 mResolvedOverrideConfiguration 更新 mFullConfiguration
    mFullConfiguration.updateFrom(mResolvedOverrideConfiguration);
    // 5. 合并修改，保存到 mMergedOverrideConfiguration
    onMergedOverrideConfigurationChanged();
    // 6. 如果 resolvedOverrideConfiguration 发生了变化，通知监听者
    if (!mResolvedTmpConfig.equals(mResolvedOverrideConfiguration)) {
        for (int i = mChangeListeners.size() - 1; i >= 0; --i) {
            mChangeListeners.get(i).onRequestedOverrideConfigurationChanged(
                    mResolvedOverrideConfiguration);
        }
    }
    // 7. 触发所有监听 merged config 的回调（例如 WindowProcessController）
    for (int i = mChangeListeners.size() - 1; i >= 0; --i) {
        mChangeListeners.get(i).onMergedOverrideConfigurationChanged(
                mMergedOverrideConfiguration);
    }
    // 8. 分发 configuration 最终状态到所有子容器
    for (int i = getChildCount() - 1; i >= 0; --i) {
        dispatchConfigurationToChild(getChildAt(i), mFullConfiguration);
    }
}

void dispatchConfigurationToChild(E child, Configuration config) {
    child.onConfigurationChanged(config);
}
```

#### ConfigurationContainer#onRequestedOverrideConfigurationChanged

当调用 `setWindowMode`、`setBounds`、`setActivityType` 等方法时，会调用此方法更新 override configuration 并重新计算 full config：

```java
public void setWindowingMode(int windowingMode) {
    mRequestsTmpConfig.setTo(getRequestedOverrideConfiguration());
    mRequestsTmpConfig.windowConfiguration.setWindowingMode(windowingMode);
    onRequestedOverrideConfigurationChanged(mRequestsTmpConfig);
}

public void onRequestedOverrideConfigurationChanged(Configuration overrideConfiguration) {
    updateRequestedOverrideConfiguration(overrideConfiguration);
    // 以当前容器为根，触发 ConfigurationChanged 更新流程
    final ConfigurationContainer parent = getParent();
    onConfigurationChanged(parent != null ? parent.getConfiguration() : Configuration.EMPTY);
}

void updateRequestedOverrideConfiguration(Configuration overrideConfiguration) {
    mRequestedOverrideConfiguration.setTo(overrideConfiguration);
}
```

#### ConfigurationContainer#resolveOverrideConfiguration

解析当前请求重写的 Configuration，保存到 mResolvedOverrideConfiguration。子类可重写此方法增加特殊配置（如 ActivityRecord 重写该方法来完成 AspectRatio 和 FixedOrientation 流程中 Bounds 和 Position 的计算）：

```java
// ConfigurationContainer —— 默认实现
void resolveOverrideConfiguration(Configuration newParentConfig) {
    mResolvedOverrideConfiguration.setTo(mRequestedOverrideConfiguration);
}

// TaskFragment —— 额外计算资源配置
void resolveOverrideConfiguration(Configuration newParentConfig) {
    super.resolveOverrideConfiguration(newParentConfig);
    final Configuration resolvedConfig = getResolvedOverrideConfiguration();
    ......
    computeConfigResourceOverrides(resolvedConfig, newParentConfig);
}
```

##### TaskFragment#computeConfigResourceOverrides

此方法根据 bounds 和 parent 信息计算未设置的配置字段（如 screenWidthDp、orientation、screenLayout 等）：

```java
void computeConfigResourceOverrides(@NonNull Configuration inOutConfig,
        @NonNull Configuration parentConfig, @Nullable ConfigOverrideHint overrideHint) {
    int windowingMode = inOutConfig.windowConfiguration.getWindowingMode();
    if (windowingMode == WINDOWING_MODE_UNDEFINED) {
        windowingMode = parentConfig.windowConfiguration.getWindowingMode();
    }

    final Rect parentBounds = parentConfig.windowConfiguration.getBounds();
    final Rect resolvedBounds = inOutConfig.windowConfiguration.getBounds();
    if (resolvedBounds.isEmpty()) {
        mTmpFullBounds.set(parentBounds);
    } else {
        mTmpFullBounds.set(resolvedBounds);
    }

    // 计算 AppBounds
    Rect outAppBounds = inOutConfig.windowConfiguration.getAppBounds();
    if (outAppBounds == null || outAppBounds.isEmpty()) {
        inOutConfig.windowConfiguration.setAppBounds(mTmpFullBounds);
        outAppBounds = inOutConfig.windowConfiguration.getAppBounds();
    }

    // 计算 screenWidthDp / screenHeightDp
    if (inOutConfig.screenWidthDp == Configuration.SCREEN_WIDTH_DP_UNDEFINED) {
        final int overrideScreenWidthDp = (int) (mTmpStableBounds.width() / density + 0.5f);
        inOutConfig.screenWidthDp = insideParentBounds
                ? Math.min(overrideScreenWidthDp, parentConfig.screenWidthDp)
                : overrideScreenWidthDp;
    }

    // 计算 orientation
    if (inOutConfig.orientation == ORIENTATION_UNDEFINED) {
        inOutConfig.orientation = (inOutConfig.screenWidthDp <= inOutConfig.screenHeightDp)
                ? ORIENTATION_PORTRAIT : ORIENTATION_LANDSCAPE;
    }

    // 计算 screenLayout
    if (inOutConfig.screenLayout == Configuration.SCREENLAYOUT_UNDEFINED) {
        inOutConfig.screenLayout = computeScreenLayout(parentConfig.screenLayout,
                compatScreenWidthDp, compatScreenHeightDp);
    }
}
```

#### 小结

更新流程伪代码：

```java
void onConfigurationChanged(Configuration newParentConfig) {
    // 1. 解析 mRequestedOverrideConfiguration，基于重写方法进行特定配置
    resolveOverrideConfiguration(newParentConfig);
    // 2. 将父容器的 Config 赋值给 mFullConfiguration
    mFullConfiguration.setTo(newParentConfig);
    // 3. 利用 mResolvedOverrideConfiguration 更新 mFullConfiguration
    mFullConfiguration.updateFrom(mResolvedOverrideConfiguration);
    // 4. 分发给孩子节点，重复上述步骤
    for (E child : children) {
        child.onConfigurationChanged(mFullConfiguration);
    }
}
```

## 6. ActivityRecord 处理 Configuration

Configuration 发生变化后，会调用 ActivityRecord 的 `ensureActivityConfiguration` 确保当前 Resumed 的 Activity 能否处理新的 Configuration。如果能处理则通过 `ActivityConfigurationChangeItem` 下发，如果不能则系统主动 relaunch Activity。

同时，ActivityRecord 的 `onConfigurationChanged` 方法会通过 listener 回调对应进程的 WindowProcessController，检查全局 Configuration 是否发生了变化，然后下发 `ConfigurationChangeItem`。

- **ConfigurationChangeItem**：用于更新 Application 相关的 Configuration（Application、Service 中的 Configuration）。
- **ActivityConfigurationChangeItem**：用于更新 Activity 相关的 Configuration（Activity 和 ViewRootImpl）。

### 6.1 下发 ActivityConfigurationChangeItem

![下发 ActivityConfigurationChangeItem 时序](/img/android/configuration/08_dispatch_activity_config_change_item.svg)

#### ActivityRecord#updateReportedConfigurationAndSend

根据 mLastReportedConfiguration 和最新的 Configuration 计算本次更新带来的变化，判断是否需要 relaunch：

```java
boolean updateReportedConfigurationAndSend() {
    ......
    // 根据 mLastReportedConfiguration 和最新 Configuration 计算变化
    mTmpConfig.setTo(mLastReportedConfiguration.getMergedConfiguration());
    final int changes = getConfigurationChanges(mTmpConfig);

    // 更新 LastReportedConfiguration
    final Configuration newMergedOverrideConfig = getMergedOverrideConfiguration();
    setLastReportedConfiguration(getProcessGlobalConfiguration(), newMergedOverrideConfig);

    // changes 为 0 时，仍然下发新的 Configuration（不需要 relaunch）
    if (changes == 0) {
        if (displayChanged) {
            scheduleActivityMovedToDisplay(newDisplayId, newMergedOverrideConfig,
                    newActivityWindowInfo);
        } else {
            scheduleConfigurationChanged(newMergedOverrideConfig, newActivityWindowInfo);
        }
        return true;
    }

    // 如果 Activity 未与进程关联，无需处理
    if (!attachedToProcess()) {
        return true;
    }

    // 判断是否需要 relaunch
    if (shouldRelaunchLocked(changes, mTmpConfig)) {
        relaunchActivityLocked(preserveWindow, changes);
        return false;
    }

    // 不需要 relaunch，下发 newMergedOverrideConfig
    if (displayChanged) {
        scheduleActivityMovedToDisplay(newDisplayId, newMergedOverrideConfig,
                newActivityWindowInfo);
    } else {
        scheduleConfigurationChanged(newMergedOverrideConfig, newActivityWindowInfo);
    }
    return true;
}
```

#### ActivityRecord#shouldRelaunchLocked

判断是否需要 relaunch，主要看应用有没有在 AndroidManifest.xml 中为该 Activity 配置对应的 `configChanges`。如果应用不希望发生 Activity relaunch，可以通过设置 `android:configChanges="orientation|screenSize|density|screenLayout"` 来避免：

```java
private boolean shouldRelaunchLocked(int changes, Configuration changesConfig) {
    int configChanged = info.getRealConfigChanged();
    ......
    return (changes & (~configChanged)) != 0;
}

// ActivityInfo#getRealConfigChanged
public int getRealConfigChanged() {
    return applicationInfo.targetSdkVersion < Build.VERSION_CODES.HONEYCOMB_MR2
            ? (configChanges | ActivityInfo.CONFIG_SCREEN_SIZE
                    | ActivityInfo.CONFIG_SMALLEST_SCREEN_SIZE)
            : configChanges;
}
```

#### ActivityRecord#scheduleConfigurationChanged

需要注意：这里下发的是 `newMergedOverrideConfig`，**不是** `mFullConfiguration`。

```java
private void scheduleConfigurationChanged(@NonNull Configuration config,
        @NonNull ActivityWindowInfo activityWindowInfo) {
    try {
        ProtoLog.v(WM_DEBUG_CONFIGURATION, "Sending new config to %s, config: %s",
                this, config);
        final ActivityConfigurationChangeItem item =
                ActivityConfigurationChangeItem.obtain(token, config, activityWindowInfo);
        mAtmService.getLifecycleManager().scheduleTransactionItem(app.getThread(), item);
    } catch (RemoteException e) {
        // If process died, whatever.
    }
}
```

> 这里有一行关键 Log `Sending new config to`，可以用来区分下发给 Activity 的 Configuration 是否有问题。如果此处的值有问题则说明是系统侧计算的 Configuration 有问题，如果此处是正确的则说明是 App 进程中更新有问题。

### 6.2 下发 ConfigurationChangeItem

![下发 ConfigurationChangeItem 时序](/img/android/configuration/07_dispatch_config_change_item.svg)

#### WindowProcessController#onConfigurationChanged

```java
public void onConfigurationChanged(Configuration newGlobalConfig) {
    super.onConfigurationChanged(newGlobalConfig);
    final Configuration config = getConfiguration();
    if (mLastReportedConfiguration.equals(config) & !topActivityDeviceChanged) {
        return;
    }
    dispatchConfiguration(config);
}
```

#### WindowProcessController#dispatchConfiguration

```java
void dispatchConfiguration(@NonNull Configuration config) {
    ......
    mHasPendingConfigurationChange = false;
    final IApplicationThread thread = mThread;
    onConfigurationChangePreScheduled(config);
    scheduleClientTransactionItem(
            thread, ConfigurationChangeItem.obtain(config, mLastTopActivityDeviceId));
}

private void onConfigurationChangePreScheduled(@NonNull Configuration config) {
    ProtoLog.v(WM_DEBUG_CONFIGURATION, "Sending to proc %s new config %s", mName, config);
    mHasCachedConfiguration = false;
}
```

#### 小结

ActivityRecord 处理 Configuration 主要是判断是否需要 relaunch，然后下发给 APP 对应的 Configuration。后续 APP 进程的 Configuration 更新也以 `ConfigurationChangeItem` 和 `ActivityConfigurationChangeItem` 为切入点。

Configuration 下发都有关键的 Log，打开 Log 开关 **WM_DEBUG_CONFIGURATION** 可以方便快速定位问题。

> 注意：此处的 ActivityRecord 处理 Configuration 不包含 `ActivityRecord#onConfigurationChanged` 如何更新 Configuration 本身。

## 7. APP 进程 Configuration 更新

APP 进程中 Configuration 的使用场景很多（Application、Activity、View 等），常见的获取方式有三种：

```java
public class MainActivity extends AppCompatActivity {
    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        // 方式 1: onConfigurationChanged 回调中的 Configuration
        Log.d("TAG", "onConfigurationChanged " + newConfig);
        // 方式 2: Activity.getResources().getConfiguration()
        Configuration activityConfig = this.getResources().getConfiguration();
        // 方式 3: Application.getResources().getConfiguration()
        Configuration applicationConfig = getApplication().getResources().getConfiguration();
    }
}
```

这三种方式获取的 Configuration **可能不同**，下面分析它们是如何更新的。

### 7.1 ConfigurationChangeItem 处理流程

![ConfigurationChangeItem APP 侧处理流程](/img/android/configuration/09_config_change_item_app_flow.svg)

#### ConfigurationController#handleConfigurationChanged

ConfigurationController 是应用进程中处理应用级别 Configuration 更新的控制类，与 ActivityThread 一一绑定：

```java
void handleConfigurationChanged(@Nullable Configuration config,
        @Nullable CompatibilityInfo compat) {
    final ClientTransactionListenerController controller =
            ClientTransactionListenerController.getInstance();
    final Context contextToUpdate = ActivityThread.currentApplication();
    controller.onContextConfigurationPreChanged(contextToUpdate);
    try {
        handleConfigurationChangedInner(config, compat);
    } finally {
        controller.onContextConfigurationPostChanged(contextToUpdate);
    }
}
```

#### ConfigurationController#handleConfigurationChangedInner

```java
private void handleConfigurationChangedInner(@Nullable Configuration config,
        @Nullable CompatibilityInfo compat) {
    int configDiff;
    boolean equivalent;

    synchronized (mResourcesManager) {
        // 对比本次下发的 Configuration 是否有变化
        equivalent = mConfiguration != null && (0 == mConfiguration.diffPublicOnly(config));

        // 调用 ResourcesManager 更新 Resources 中的 Configuration
        mResourcesManager.applyConfigurationToResources(config, compat);

        // 更新 ConfigurationController 中的全局 Configuration
        configDiff = mConfiguration.updateFrom(config);
        // 更新基于兼容模式的全局 Configuration
        config = applyCompatConfiguration();
    }

    // 收集所有 ComponentCallbacks2（Application、Service 等，不包含 Activity）
    final ArrayList<ComponentCallbacks2> callbacks =
            mActivityThread.collectComponentCallbacks(false /* includeUiContexts */);

    if (callbacks != null) {
        final int size = callbacks.size();
        for (int i = 0; i < size; i++) {
            ComponentCallbacks2 cb = callbacks.get(i);
            if (!equivalent) {
                // 调用 Application 的 onConfigurationChanged
                performConfigurationChanged(cb, config);
            }
        }
    }
}
```

#### ResourcesManager#applyConfigurationToResources

```java
public final boolean applyConfigurationToResources(@NonNull Configuration config,
        @Nullable CompatibilityInfo compat) {
    synchronized (mLock) {
        // 基于序列号判断，旧的 Configuration 不会更新掉新的
        if (!mResConfiguration.isOtherSeqNewer(config) && compat == null) {
            return false;
        }

        // 更新 ResourcesManager 中的全局 Configuration
        int changes = mResConfiguration.updateFrom(config);

        // 遍历所有的 ResourcesImpl，更新其 Configuration
        Configuration tmpConfig = new Configuration();
        for (int i = mResourceImpls.size() - 1; i >= 0; i--) {
            ResourcesKey key = mResourceImpls.keyAt(i);
            WeakReference<ResourcesImpl> weakImplRef = mResourceImpls.valueAt(i);
            ResourcesImpl r = weakImplRef != null ? weakImplRef.get() : null;
            if (r != null) {
                applyConfigurationToResourcesLocked(config, compat, tmpConfig, key, r);
            } else {
                mResourceImpls.removeAt(i);
            }
        }
        return changes != 0;
    }
}
```

#### ResourcesManager#applyConfigurationToResourcesLocked

所有 Resources 的更新都在这个方法中。此处有一个关键区分：**Application 对应的 ResourcesKey 的 mOverrideConfiguration 始终为空**，而 Activity 对应的 Configuration 变化保存在 ResourcesKey 的 mOverrideConfiguration 中。

因此 Activity 对应的 ResourcesImpl 在此处虽然也被更新，但会被对应 ResourcesKey 中的 mOverrideConfiguration 重写。

```java
private void applyConfigurationToResourcesLocked(@NonNull Configuration config,
        @Nullable CompatibilityInfo compat, Configuration tmpConfig,
        ResourcesKey key, ResourcesImpl resourcesImpl) {
    // 用 tmpConfig 保存新的 Configuration
    tmpConfig.setTo(config);
    // 如果 ResourcesKey 有 overrideConfiguration，则用它重写新的 Configuration
    if (key.hasOverrideConfiguration()) {
        tmpConfig.updateFrom(key.mOverrideConfiguration);
    }

    DisplayAdjustments daj = resourcesImpl.getDisplayAdjustments();
    if (compat != null) {
        daj = new DisplayAdjustments(daj);
        daj.setCompatibilityInfo(compat);
    }
    daj.setConfiguration(tmpConfig);
    DisplayMetrics dm = getDisplayMetrics(generateDisplayId(key), daj);

    // 更新 ResourcesImpl 的 mConfiguration
    resourcesImpl.updateConfiguration(tmpConfig, dm, compat);
}
```

#### ResourcesImpl#updateConfiguration

直接更新 ResourcesImpl 中的 Configuration：

```java
private void updateConfigurationImpl(Configuration config, DisplayMetrics metrics,
        CompatibilityInfo compat, boolean forceAssetsRefresh) {
    synchronized (mAccessLock) {
        if (DEBUG_CONFIG) {
            Slog.i(TAG, "**** Updating config of " + this + ": old config is "
                    + mConfiguration + " old compat is "
                    + mDisplayAdjustments.getCompatibilityInfo());
            Slog.i(TAG, "**** Updating config of " + this + ": new config is "
                    + config + " new compat is " + compat);
        }
        // 更新到 mConfiguration
        final @Config int configChanges = calcConfigChanges(config);
    }
}

public @Config int calcConfigChanges(@Nullable Configuration config) {
    mTmpConfig.setTo(config);
    ......
    // 更新到 mConfiguration
    return mConfiguration.updateFrom(mTmpConfig);
}
```

#### 小结

由 ConfigurationChangeItem 触发的 Configuration 更新：首先将新的 Configuration 更新到所有的 ResourcesImpl 中，然后更新 ConfigurationController 中全局的 Configuration，最后调用 Application 的 `onConfigurationChanged` 方法下发新的 Configuration。

### 7.2 ActivityConfigurationChangeItem 处理流程

![ActivityConfigurationChangeItem APP 侧处理流程](/img/android/configuration/10_activity_config_change_item_app_flow.svg)

需要注意的是，系统侧下发的是 **MergedOverrideConfig**（从 RootWindowContainer 到 ActivityRecord 路径上所有节点 OverrideConfiguration 的合集），而不是 FullConfiguration。App 侧将其称为 overrideConfig。

#### ActivityThread#handleActivityConfigurationChanged

```java
private void handleActivityConfigurationChangedInner(@NonNull ActivityClientRecord r,
        @NonNull Configuration overrideConfig, int displayId,
        @NonNull ActivityWindowInfo activityWindowInfo, boolean alwaysReportChange) {
    ......
    // 判断是否切换了 Display
    final boolean movedToDifferentDisplay = isDifferentDisplay(
            r.activity.getDisplayId(), displayId);
    // 根据序列号判断 Configuration 是否是新的
    if (r.overrideConfig != null && !r.overrideConfig.isOtherSeqNewer(overrideConfig)
            && !movedToDifferentDisplay) {
        return;
    }

    // 设置到 ActivityClientRecord 中
    r.overrideConfig = overrideConfig;

    // 更新 Activity 对应的 Resources 的 Configuration
    final Configuration reportedConfig = performConfigurationChangedForActivity(r,
            mConfigurationController.getCompatConfiguration(),
            movedToDifferentDisplay ? displayId : r.activity.getDisplayId(),
            alwaysReportChange);

    // 更新 ViewRootImpl 中的 Configuration
    if (viewRoot != null) {
        if (movedToDifferentDisplay) {
            viewRoot.onMovedToDisplay(displayId, reportedConfig);
        }
        viewRoot.updateConfiguration(displayId);
    }
}
```

#### ActivityThread#performConfigurationChangedForActivity

`getCompatConfiguration()` 获取的是全局 Configuration，作为 Activity 更新的基础。然后基于系统侧下发的 `r.overrideConfig` 叠加更新：

```java
private Configuration performConfigurationChangedForActivity(ActivityClientRecord r,
        Configuration newBaseConfig, int displayId, boolean alwaysReportChange) {
    r.tmpConfig.setTo(newBaseConfig);
    if (r.overrideConfig != null) {
        // 全局 Configuration + overrideConfig = Activity 的完整 Configuration
        r.tmpConfig.updateFrom(r.overrideConfig);
    }
    final Configuration reportedConfig = performActivityConfigurationChanged(r,
            r.tmpConfig, r.overrideConfig, displayId, alwaysReportChange);
    return reportedConfig;
}
```

> 这与系统侧下发 MergedOverrideConfiguration 的设计对应：MergedOverrideConfig + 全局 Configuration = 对应节点的 FullConfiguration。

#### ActivityThread#performActivityConfigurationChanged

先更新 Resources 中的 Configuration，然后回调 Activity 的 `onConfigurationChanged`：

```java
private Configuration performActivityConfigurationChanged(ActivityClientRecord r,
        Configuration newConfig, Configuration amOverrideConfig, int displayId,
        boolean alwaysReportChange) {
    final Activity activity = r.activity;
    final IBinder activityToken = activity.getActivityToken();

    // 基于主题做特殊处理，得到最终的 overrideConfig
    Configuration contextThemeWrapperOverrideConfig = activity.getOverrideConfiguration();
    final Configuration finalOverrideConfig = createNewConfigAndUpdateIfNotNull(
            amOverrideConfig, contextThemeWrapperOverrideConfig);
    // 更新 Activity 对应的 Resources 中的 Configuration（用 overrideConfig）
    mResourcesManager.updateResourcesForActivity(activityToken, finalOverrideConfig, displayId);

    // 基于 newConfig 得到要下发的 configToReport
    final Configuration configToReport = createNewConfigAndUpdateIfNotNull(newConfig,
            contextThemeWrapperOverrideConfig);
    if (shouldReportChange) {
        activity.mCurrentConfig = new Configuration(newConfig);
        activity.onConfigurationChanged(configToReport);
    }
    return configToReport;
}
```

#### ResourcesManager#updateResourcesForActivity

遍历所有的 ActivityResource，根据 overrideConfig 生成新的 ResourcesKey，然后查找或新建 ResourcesImpl。**ResourcesKey 每次都会新建，但 ResourcesImpl 并不一定会新建。**

```java
public void updateResourcesForActivity(@NonNull IBinder activityToken,
        @Nullable Configuration overrideConfig, int displayId) {
    synchronized (mLock) {
        final ActivityResources activityResources =
                getOrCreateActivityResourcesStructLocked(activityToken);
        ......
        // 更新 Activity 的 base override
        if (overrideConfig != null) {
            activityResources.overrideConfig.setTo(overrideConfig);
        } else {
            activityResources.overrideConfig.unset();
        }
        activityResources.overrideDisplayId = displayId;
        ......
        // 遍历所有 ActivityResource，更新其 ResourcesImpl
        final int refCount = activityResources.activityResources.size();
        for (int i = 0; i < refCount; i++) {
            final ActivityResource activityResource =
                    activityResources.activityResources.get(i);
            final Resources resources = activityResource.resources.get();
            if (resources == null) continue;

            final ResourcesKey newKey = rebaseActivityOverrideConfig(activityResource,
                    overrideConfig, displayId);
            if (newKey == null) continue;

            final ResourcesImpl resourcesImpl =
                    findOrCreateResourcesImplForKeyLocked(newKey);
            if (resourcesImpl != null && resourcesImpl != resources.getImpl()) {
                // 为 Resources 设置新的 ResourcesImpl
                resources.setImpl(resourcesImpl);
            }
        }
    }
}
```

#### ResourcesManager#rebaseActivityOverrideConfig

生成新的 ResourcesKey，这也是一个 Activity 对应多个 Resource 的原因：

```java
@Nullable
private ResourcesKey rebaseActivityOverrideConfig(@NonNull ActivityResource activityResource,
        @Nullable Configuration newOverrideConfig, int displayId) {
    final Resources resources = activityResource.resources.get();
    if (resources == null) return null;

    // 获取上次用于创建该 Resources 的 ResourcesKey
    final ResourcesKey oldKey = findKeyForResourceImplLocked(resources.getImpl());
    if (oldKey == null) return null;

    // 构建新的 override configuration
    final Configuration rebasedOverrideConfig = new Configuration();
    if (newOverrideConfig != null) {
        rebasedOverrideConfig.setTo(newOverrideConfig);
    }

    final boolean hasOverrideConfig =
            !activityResource.overrideConfig.equals(Configuration.EMPTY);
    if (hasOverrideConfig) {
        rebasedOverrideConfig.updateFrom(activityResource.overrideConfig);
    }

    // 创建新 ResourcesKey（只更改了 OverrideConfig）
    final ResourcesKey newKey = new ResourcesKey(oldKey.mResDir,
            oldKey.mSplitResDirs, oldKey.mOverlayPaths, oldKey.mLibDirs,
            displayId, rebasedOverrideConfig, oldKey.mCompatInfo, oldKey.mLoaders);
    return newKey;
}
```

#### ResourcesManager#findOrCreateResourcesImplForKeyLocked

根据 ResourcesKey 查找匹配的 ResourcesImpl（ResourcesKey 重写了 `hashCode` 和 `equals` 方法）。**只有两个 ResourcesKey 的 overrideConfig 相同，才会匹配到同一个 ResourcesImpl。**

因此同一个 Activity 在横屏和竖屏下会对应不同的 ResourcesImpl：

```java
private @Nullable ResourcesImpl findOrCreateResourcesImplForKeyLocked(
        @NonNull ResourcesKey key, @Nullable ApkAssetsSupplier apkSupplier) {
    ResourcesImpl impl = findResourcesImplForKeyLocked(key);
    if (impl == null || impl.getAppliedSharedLibsHash() != mSharedLibAssetsMap.size()) {
        impl = createResourcesImpl(key, apkSupplier);
        if (impl != null) {
            mResourceImpls.put(key, new WeakReference<>(impl));
        }
    }
    return impl;
}
```

#### ResourcesManager#createResourcesImpl

新建 ResourcesImpl 并根据 key.mOverrideConfiguration 和全局 Configuration 生成当前 Activity 的完整 Configuration：

```java
private @Nullable ResourcesImpl createResourcesImpl(@NonNull ResourcesKey key,
        @Nullable ApkAssetsSupplier apkSupplier) {
    .......
    final Configuration config = generateConfig(key);
    final DisplayMetrics displayMetrics = getDisplayMetrics(generateDisplayId(key), daj);
    final ResourcesImpl impl = new ResourcesImpl(assets, displayMetrics, config, daj);
    return impl;
}

// ResourcesManager#generateConfig
private Configuration generateConfig(@NonNull ResourcesKey key) {
    Configuration config;
    final boolean hasOverrideConfig = key.hasOverrideConfiguration();
    if (hasOverrideConfig) {
        config = new Configuration(getConfiguration());
        config.updateFrom(key.mOverrideConfiguration);
    } else {
        config = getConfiguration();
    }
    return config;
}
```

#### 小结

- ActivityConfigurationChangeItem 触发的 Configuration 更新，也是先进行 Resources 中 Configuration 的更新，然后回调 Activity 中的 `onConfigurationChanged` 方法，同时也会通知对应 ViewRootImpl 更新 Configuration。
- Activity 对应的 Configuration 以 **overrideConfig** 进行区分，不同的 overrideConfig 对应不同的 ResourcesImpl。

## 8. 调试技巧

### 8.1 系统侧

1. **断点技巧**：ConfigurationContainer 和 WindowContainer 中的方法在遍历树时会被多次调用，不利于调查问题。可以在断点条件中添加 `this instanceof XxxClass` 来断点到你希望调试的真实子类。
2. **打开 ProtoLog**：`adb shell wm logging enable-text WM_DEBUG_CONFIGURATION`，可以输出 Configuration 下发过程中的关键 Log。

### 8.2 应用侧

对于应用获取到的 Configuration 异常问题，调查步骤如下：

1. 首先确定使用的 Context 是 Activity 还是 Application，以及这个 Context 从哪里获取。
2. 基于 Context 获取的 Resources 的对象类型（直接打印对象即可）。
3. 打开 ActivityThread 和 ResourcesManager 中的 Configuration 相关 log 开关，追踪 Resources 的更新路径——Resources 中的 ResourcesImpl 是如何更新的，有没有被某些流程替换或错误更新。
4. 简言之：**找到 Context → Resources → ResourcesImpl 对象一一对应关系**，然后追踪具体 ResourcesImpl 中的 Configuration 是如何更新的。

## 9. 总结

1. **什么是 Configuration？**
   Configuration 主要分为两部分：一部分是设备的配置信息（Display 相关的屏幕尺寸、像素密度、屏幕方向、输入方式等），这些配置的变化一般影响全局，需要一次全局配置更新。第二部分是窗口相关的配置（单个窗口的大小、方向、显示模式等），与窗口的实际显示效果绑定。

2. **什么时机会触发 Configuration 更新？**
   当上述配置发生变化时就会更新——常见场景包括旋转屏幕（导致方向和屏幕布局变化）、屏幕切换（折叠屏和虚拟屏流转）等。

3. **Configuration 是如何更新的？**
   主要包含三个大流程：Configuration 初始化（基于 Display 属性计算）、全局 Configuration 更新（通知所有进程 + 遍历窗口树）、ActivityRecord 处理（判断 relaunch + 下发 ActivityConfigurationChangeItem）。

4. **APP 进程如何更新 Configuration？**
   App 进程的 Configuration 类型和更新都比较复杂。出现问题时，首先要确定 Configuration 的来源（通过什么路径下发或通过什么 Context 获取），确定好 Context → Resources → Configuration 之间的对应关系。

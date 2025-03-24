---
prev:
    text: 'performTraversal'
    link: '/framework/performTraversal'
next: false
---

# Android 12 容器层级
## 结构
在 Android 12 中，窗口按树形层级进行排布。其决定由 Feature 和 36 个层级共同影响。  
Android 12 原生定义 6 个 Feature：  
-  WindowedMagnification
-  HideDisplayCutout
- OneHandedBackgroundPanel
- OneHanded
- FullscreenMagnification
- ImePlaceholder

36 个层级：  
1. Wallpaper
2. [DefaultTaskDisplayArea][APPLICATION_LAYER]
3. Presentation, Dock Driver, QS Dialog, Phone
4. Search Bar, Voice Interaction Starting
5. Voice Interaction
6. Input Consumer
7. System Dialog
8. Toast
9. Priority Phone
10. System Alert, System Error (Cannot add internal system window)
11. System Overlay (Cannot add internal system window)
12. Application Overlay
13. System Alert (Can add internal system window)
14. 
15. Input Method
16. Input Method Dialog
17. Status Bar
18. Status Bar Additional
19. Notification Shade
20. Status Bar Sub Panel
21. Keyguard Dialog
22. Volume Overlay
23. System Overlay (Can add internal system window)
24. Navigation Bar
25. Navigation Bar Panel
26. Screenshot
27. System Error (Cannot add internal system window)
28. Magnification Overlay
29. Display Overlay
30. Drag
31. Accessibility Overlay
32. Accessibility Magnification Overlay
33. Secure System Overlay
34. Boot Progress
35. Pointer

应用集中于第 2 层。层数越高位置越靠上。  
系统按照算法利用原生 Feature 和它们能覆盖的层数生成基础树状结构。在此基础上再安排具体 APP 等的窗口位置。  

树状结构生成算法类似 2048 执行向上推的操作后，依据按断层左右分开节点，上下进行连接。  

![Feature](/img/android/feature.png)

> DisplayAreaPolicyBuilder.build() 里根据各个 Feature 添加的顺序、应用的层级，以及依次递补的原则，构建DisplayArea 层级，并添加到屏幕根容器DisplayContent里。
例如：
> - 第一个 Feature WindowedMagnification 只能应用到 0~31层级，那么就先创建一个名为 WindowedMagnification:0:31 的DisplayArea，后面的32~35层级只能递补应用第二个 Feature HideDisplayCutout，因此会创建平级的名为 HideDisplayCutout:32:35 的 DisplayArea；
> - 第二个 Feature HideDisplayCutout 只能应用 0~31层级的 0~16 层级，因此创建 HideDisplayCutout:0:16 挂到 WindowedMagnification:0:31 下；
> - 第17层级往下找只能递补应用第四个 Feature OneHanded，因此创建 OneHanded:17:17 挂到 WindowedMagnification:0:31 下，同理第18层级可以应用 Feature HideDisplayCutout，创建 HideDisplayCutout:18:18 同样挂到 WindowedMagnification:0:31 下。
> - 注意第24~25层，WindowedMagnification 往下没有可以应用的 Feature，这时会增补一个 Leaf:24:25

系统默认树状结构：  
![Default Container](/img/android/defualt_container.png)

打开了屏幕录制悬浮窗的树状结构：  
![Recorder Container](/img/android/recorder_container.png)

在这棵树中，上下结构控制了 Feature 可以对应的窗口，左右体现了 Z 轴位置上下。越靠右位置越高。  

## 参考文献或资料
1. 窗口容器管理
2. [Android12 窗口组织方式（对比Android10）](https://blog.csdn.net/qq_34211365/article/details/122349862)
3. [安卓12窗口层次: DisplayArea树](https://blog.csdn.net/jieliaoyuan8279/article/details/123157937)
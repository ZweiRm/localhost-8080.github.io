---
prev: false
next: 
    text: 'Activity 启动流程'
    link: '/framework/activity-launching-process'
---

# Android Frameworks
Android Framework是什么？
Android Framework（即Android应用程序框架层）是 Android 操作系统的软件框架，位于 Android 系统架构的中间层。它由一系列 Java API 组成，
向上为应用层提供开发接口，向下通过 JNI 和 HAL 与 Native 库和 Linux 内核交互。换言之，Android Framework 构建了应用与系统之间的桥梁，
封装了各种核心功能和服务，使开发者无需关心底层实现就能调用各种系统能力。它解决了应用开发中的组件复用和系统服务访问问题，
让开发者专注于应用逻辑而无需直接操作底层硬件。

在 Android 的分层架构中，Framework 层处于承上启下的位置。上层的应用（包括系统自带应用和第三方应用）都是通过 Framework 提供的 API 来运行和与系统交互的；
而 Framework 层本身则依赖下层的 C/C++ 本地库和内核来完成实际功能。例如，当应用请求播放一段音频或访问相机时，Framework 会调用媒体框架或相机的库模块
（通过HAL）实现实际操作。因此，Android Framework 既是应用开发的基础，也是 Android 系统功能的主体部分。它提供了应用程序运行的环境和系统服务的管理，
保证了各组件协同工作、资源有效管理和安全可靠运行。

# Android Framework 架构概述
Android Framework 是 Android 软件栈（Software Stack）的重要层级。它处于 Android 架构的中间，在上有应用程序层，在下有系统运行库和 Linux 内核层。
Framework 层主要由系统服务（System Services）组成，这些服务大多以 “Manager” 或 “Service” 命名，负责不同的系统功能模块，
并通过 Binder 机制向应用提供接口调用能力。这一层由 Java 实现，同时在系统启动时由 System Server 进程统一启动各个服务。Framework 层的架构
设计确保了高内聚低耦合：各服务各司其职，通过清晰的接口通信，从而使应用开发者能够以一致的方式调用系统功能，而底层实现细节对应用透明。

Java API 框架层（应用框架层）包含了丰富的系统组件，包括各种管理器（Managers）和提供者（Providers）等。常见的框架组件有
Activity 管理、窗口管理、内容提供、资源管理、通知管理、位置服务、电话服务等，它们共同构成了 Android 应用运行时赖以运作的支柱。
Framework 层下连接的是 Native C/C++库（例如媒体框架、OpenGL ES、WebKit等）和 Android Runtime（ART虚拟机及核心库），
它们为框架层提供底层支撑；在更下方是 HAL 层和 Linux 内核，提供硬件抽象和驱动支持。
通过这种层次结构，Android 系统实现了从硬件到应用的功能贯通，而 Framework 层正是其中承上启下的关键环节。

总的来说，Android Framework 作为系统的核心部分，主要提供应用开发所需的 API、管理应用的生命周期和 UI、协调设备硬件访问以及维护系统资源和安全。
下面我们将从整体出发，逐步深入介绍 Android Framework 中的各主要模块及其职责，并阐述它们之间的关系。

# Android Framework 核心模块概览
Android Framework 由多个模块化的系统服务组成，每个模块负责一组相关的功能。下表概括了 Android 框架层主要模块及其职责：
|模块名称|主要职责|
|--|--|
|Activity Manager|管理应用程序的生命周期，维护统一的导航返回栈，调度应用组件。负责应用的启动、切换和停止，以及进程管理和内存回收策略等。|
|Window Manager|管理设备上所有窗口的布局和显示。负责窗口的添加、删除、尺寸和层级管理，协调窗口焦点与界面刷新，为应用提供统一的绘制和显示机制。|
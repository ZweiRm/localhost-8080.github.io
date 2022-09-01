# ViewRootImpl 中 performTraversal() 梳理
## 源码

``` java
// 描述 Activity 窗口属性的成员变量
final View.AttachInfo mAttachInfo;

// 描述 Activity 窗口当前大小，由上一次请求 WMS 计算得到
int mWidth;
int mHeight;

private void performTraversals() {
    // cache mView since it is used so much below...
    // 顶层窗口 host，引用 ViewRootImpl 类成员变量 mView
    final View host = mView;

    if (DBG) {
        System.out.println("======================================");
        System.out.println("performTraversals");
        host.debug();
    }

    if (host == null || !mAdded) {
        return;
    }

    // This is to ensure we don't end up queueing new frames while waiting on a previous frame
    // to get latched. This can happen when there's been a sync request for this window. The
    // frame could be in a transaction that's passed to different processes to ensure
    // synchronization. It continues to block until ViewRootImpl receives a callback that the
    // transaction containing the buffer has been sent to SurfaceFlinger. Once we receive, that
    // signal, we know it's safe to start queuing new buffers.
    //
    // When the callback is invoked, it will trigger a traversal request if
    // mRequestedTraverseWhilePaused is set so there's no need to attempt a retry here.
    if (mWaitForBlastSyncComplete) {
        if (DEBUG_BLAST) {
            Log.w(mTag, "Can't perform draw while waiting for a transaction complete");
        }
        mRequestedTraverseWhilePaused = true;
        return;
    }

    mIsInTraversal = true;
    mWillDrawSoon = true;
    boolean windowSizeMayChange = false;
    WindowManager.LayoutParams lp = mWindowAttributes;

    // 存放当前 Activity 窗口大小
    int desiredWindowWidth;
    int desiredWindowHeight;

    final int viewVisibility = getHostVisibility();
    final boolean viewVisibilityChanged = !mFirst
            && (mViewVisibility != viewVisibility || mNewSurfaceNeeded
            // Also check for possible double visibility update, which will make current
            // viewVisibility value equal to mViewVisibility and we may miss it.
            || mAppVisibilityChanged);
    mAppVisibilityChanged = false;
    final boolean viewUserVisibilityChanged = !mFirst &&
            ((mViewVisibility == View.VISIBLE) != (viewVisibility == View.VISIBLE));

    WindowManager.LayoutParams params = null;
    CompatibilityInfo compatibilityInfo =
            mDisplay.getDisplayAdjustments().getCompatibilityInfo();
    if (compatibilityInfo.supportsScreen() == mLastInCompatMode) {
        params = lp;
        mFullRedrawNeeded = true;
        mLayoutRequested = true;
        if (mLastInCompatMode) {
            params.privateFlags &= ~WindowManager.LayoutParams.PRIVATE_FLAG_COMPATIBLE_WINDOW;
            mLastInCompatMode = false;
        } else {
            params.privateFlags |= WindowManager.LayoutParams.PRIVATE_FLAG_COMPATIBLE_WINDOW;
            mLastInCompatMode = true;
        }
    }

    // 计算期望窗口大小
    // 引用 ViewRoolImpl 类成员变量 mWinFrame，保存当前 Activity 大小
    // 数据请求经请求 WMS 计算后得到
    Rect frame = mWinFrame;
    // 第一次被请求执行测量、布局和绘制操作，当前大小等于屏幕大小
    if (mFirst) {
        // 标记需要重新布局和绘制
        mFullRedrawNeeded = true;
        mLayoutRequested = true;

        final Configuration config = getConfiguration();
        // 初始化期望窗口长宽
        // 根据 layoutPrams 的 type （是否有状态栏） 判断是否需要使用屏幕全尺寸
        // 需要则使用屏幕真实尺寸，不去除任何装饰尺寸
        if (shouldUseDisplaySize(lp)) {
            // NOTE -- system code, won't try to do compat mode.
            Point size = new Point();
            mDisplay.getRealSize(size);
            desiredWindowWidth = size.x;    // 包含状态栏
            desiredWindowHeight = size.y;
        // 否则让窗口大小为最大可用尺寸（当 Activity 使用 WarpContent）
        } else if (lp.width == ViewGroup.LayoutParams.WRAP_CONTENT
                || lp.height == ViewGroup.LayoutParams.WRAP_CONTENT) {
            // 对于包装内容，我们无论如何都要在以后重新测量。
            // 使用与下面一致的尺寸，以便我们能够最好地利用测量缓存。
            desiredWindowWidth = dipToPx(config.screenWidthDp);    // 不包含状态栏
            desiredWindowHeight = dipToPx(config.screenHeightDp);
        } else {
            // After addToDisplay, the frame contains the frameHint from window manager, which
            // for most windows is going to be the same size as the result of relayoutWindow.
            // Using this here allows us to avoid remeasuring after relayoutWindow
            desiredWindowWidth = frame.width();
            desiredWindowHeight = frame.height();
        }

        // We used to use the following condition to choose 32 bits drawing caches:
        // PixelFormat.hasAlpha(lp.format) || lp.format == PixelFormat.RGBX_8888
        // However, windows are now always 32 bits by default, so choose 32 bits
        mAttachInfo.mUse32BitDrawingCache = true;
        mAttachInfo.mWindowVisibility = viewVisibility;
        mAttachInfo.mRecomputeGlobalAttributes = false;
        mLastConfigurationFromResources.setTo(config);
        mLastSystemUiVisibility = mAttachInfo.mSystemUiVisibility;
        // Set the layout direction if it has not been set before (inherit is the default)
        if (mViewLayoutDirectionInitial == View.LAYOUT_DIRECTION_INHERIT) {
            host.setLayoutDirection(config.getLayoutDirection());
        }
        host.dispatchAttachedToWindow(mAttachInfo, 0);
        mAttachInfo.mTreeObserver.dispatchOnWindowAttachedChange(true);
        dispatchApplyInsets(host);
    // 非第一次请求，屏幕大小为 mWinFrame 中存储的大小 
    //（数据来自于上一次主动请求 WMS 计算）
    } else {
        desiredWindowWidth = frame.width();
        desiredWindowHeight = frame.height();
        // Activity 当前大小不等于上次主动请求计算的大小
        // 标记需要重新绘制和布局
        if (desiredWindowWidth != mWidth || desiredWindowHeight != mHeight) {
            if (DEBUG_ORIENTATION) Log.v(mTag, "View " + host + " resized to: " + frame);
            mFullRedrawNeeded = true;
            mLayoutRequested = true;
            windowSizeMayChange = true;    // 标记 Activity 窗口大小发生变化
        }
    }

    if (viewVisibilityChanged) {
        mAttachInfo.mWindowVisibility = viewVisibility;
        host.dispatchWindowVisibilityChanged(viewVisibility);
        if (viewUserVisibilityChanged) {
            host.dispatchVisibilityAggregated(viewVisibility == View.VISIBLE);
        }
        if (viewVisibility != View.VISIBLE || mNewSurfaceNeeded) {
            endDragResizing();
            destroyHardwareResources();
        }
    }

    // Non-visible windows can't hold accessibility focus.
    if (mAttachInfo.mWindowVisibility != View.VISIBLE) {
        host.clearAccessibilityFocus();
    }

    // Execute enqueued actions on every traversal in case a detached view enqueued an action
    getRunQueue().executeActions(mAttachInfo.mHandler);

    // 在 Activity 主动请求计算前对顶层视图 host 进行测量
    boolean cutoutChanged = false;
    // 获取重新布局标记
    boolean layoutRequested = mLayoutRequested && (!mStopped || mReportNextDraw);
    // 当需要重新布局时
    if (layoutRequested) {
        final Resources res = mView.getContext().getResources();

        // Activity 第一次被请求
        // 在 Activity 四周留下足够的空间来放置状态栏和输入法
        if (mFirst) {
            // 通过将缓存值设置为与添加的触摸模式相反，确保触摸模式代码的执行。
            // 确保 window 的触摸模式已经打开
            mAttachInfo.mInTouchMode = !mAddedTouchMode;
            ensureTouchModeLocally(mAddedTouchMode);
        // 非第一次请求
        } else {
            // 若 Activity 宽高被设置成了 WarpContent，则窗口大小等于内容大小
            if (lp.width == ViewGroup.LayoutParams.WRAP_CONTENT
                    || lp.height == ViewGroup.LayoutParams.WRAP_CONTENT) {
                windowSizeMayChange = true;    // 标记 Activity 窗口大小发生变化

                // 设置 WarpContent 时当前大小与屏幕大小相同
                // 根据 layoutPrams 的 type （是否有状态栏） 判断是否需要使用屏幕全尺寸
                // 需要则使用屏幕真实尺寸，不去除任何装饰尺寸
                if (shouldUseDisplaySize(lp)) {
                    // NOTE -- system code, won't try to do compat mode.
                    Point size = new Point();
                    mDisplay.getRealSize(size);
                    desiredWindowWidth = size.x;
                    desiredWindowHeight = size.y;
                // 否则让窗口大小为最大可用尺寸
                } else {
                    Configuration config = res.getConfiguration();
                    desiredWindowWidth = dipToPx(config.screenWidthDp);
                    desiredWindowHeight = dipToPx(config.screenHeightDp);
                }
            }
        }

        // 计算顶层视图 host 大小
        // 期间调用 performMeasure() 确定窗口大小，返回窗口大小是否会改变
        // 是测量流程的入口
        // Ask host how big it wants to be
        windowSizeMayChange |= measureHierarchy(host, lp, res,
                desiredWindowWidth, desiredWindowHeight);
    }

    if (collectViewAttributes()) {
        params = lp;
    }
    if (mAttachInfo.mForceReportNewAttributes) {
        mAttachInfo.mForceReportNewAttributes = false;
        params = lp;
    }

    if (mFirst || mAttachInfo.mViewVisibilityChanged) {
        mAttachInfo.mViewVisibilityChanged = false;
        int resizeMode = mSoftInputMode & SOFT_INPUT_MASK_ADJUST;
        // If we are in auto resize mode, then we need to determine
        // what mode to use now.
        if (resizeMode == WindowManager.LayoutParams.SOFT_INPUT_ADJUST_UNSPECIFIED) {
            final int N = mAttachInfo.mScrollContainers.size();
            for (int i=0; i<N; i++) {
                if (mAttachInfo.mScrollContainers.get(i).isShown()) {
                    resizeMode = WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE;
                }
            }
            if (resizeMode == 0) {
                resizeMode = WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN;
            }
            if ((lp.softInputMode & SOFT_INPUT_MASK_ADJUST) != resizeMode) {
                lp.softInputMode = (lp.softInputMode & ~SOFT_INPUT_MASK_ADJUST) | resizeMode;
                params = lp;
            }
        }
    }

    if (mApplyInsetsRequested && !(mWillMove || mWillResize)) {
        dispatchApplyInsets(host);
        if (mLayoutRequested) {
            // Short-circuit catching a new layout request here, so
            // we don't need to go through two layout passes when things
            // change due to fitting system windows, which can happen a lot.
            windowSizeMayChange |= measureHierarchy(host, lp,
                    mView.getContext().getResources(),
                    desiredWindowWidth, desiredWindowHeight);
        }
    }

    // 暂时清空需要重布局的标记，等需要时再重新赋值
    if (layoutRequested) {
        // Clear this now, so that if anything requests a layout in the
        // rest of this function we will catch it and re-run a full
        // layout pass.
        mLayoutRequested = false;
    }

    // 检查 Activity 大小是否变化，若满足条件就需要将其设置为 true
    boolean windowShouldResize = 
        // Activity 发起新的重布局
        layoutRequested 
        // 前面步骤已检测到 Activity 窗口发生变化
        && windowSizeMayChange
        // 并且
        && (
            // 上面流程测得的顶层视图 host 大小与当前 Activity 大小不一致
            (mWidth != host.getMeasuredWidth() || mHeight != host.getMeasuredHeight())
            // Activity 设置为 WarpContent
            // 且 WMS 计算得到的当前大小 小于 当前大小
            // 且 WMS 计算得到的当前大小 不等于 上一次计算大小
            || (lp.width == ViewGroup.LayoutParams.WRAP_CONTENT &&
                    frame.width() < desiredWindowWidth && frame.width() != mWidth)
            || (lp.height == ViewGroup.LayoutParams.WRAP_CONTENT &&
                    frame.height() < desiredWindowHeight && frame.height() != mHeight)
    );
    windowShouldResize |= mDragResizing && mResizeMode == RESIZE_MODE_FREEFORM;

    // If the activity was just relaunched, it might have unfrozen the task bounds (while
    // relaunching), so we need to force a call into window manager to pick up the latest
    // bounds.
    // Activity 重启
    windowShouldResize |= mActivityRelaunched;

    // 检查 Activity 是否需要重新计算边衬
    // 当设置了监听或者存在需要重新设置的空边衬时需要
    // 确定是否要计算边衬。
    // 如果没有剩余的边衬监听器，那么我们可能仍然需要计算边衬
    // 以防旧的边衬是非空的且必须被重置。
    final boolean computesInternalInsets =
            mAttachInfo.mTreeObserver.hasComputeInternalInsetsListeners()
            || mAttachInfo.mHasNonEmptyGivenInternalInsets;

    boolean insetsPending = false;
    int relayoutResult = 0;
    boolean updatedConfiguration = false;

    final int surfaceGenerationId = mSurface.getGenerationId();

    final boolean isViewVisible = viewVisibility == View.VISIBLE;
    final boolean windowRelayoutWasForced = mForceNextWindowRelayout;
    boolean surfaceSizeChanged = false;
    boolean surfaceCreated = false;
    boolean surfaceDestroyed = false;
    // True if surface generation id changes or relayout result is RELAYOUT_RES_SURFACE_CHANGED.
    boolean surfaceReplaced = false;

    final boolean windowAttributesChanged = mWindowAttributesChanged;
    if (windowAttributesChanged) {
        mWindowAttributesChanged = false;
        params = lp;
    }

    if (params != null) {
        if ((host.mPrivateFlags & View.PFLAG_REQUEST_TRANSPARENT_REGIONS) != 0
                && !PixelFormat.formatHasAlpha(params.format)) {
            params.format = PixelFormat.TRANSLUCENT;
        }
        adjustLayoutParamsForCompatibility(params);
        controlInsetsForCompatibility(params);
        if (mDispatchedSystemBarAppearance != params.insetsFlags.appearance) {
            mDispatchedSystemBarAppearance = params.insetsFlags.appearance;
            mView.onSystemBarAppearanceChanged(mDispatchedSystemBarAppearance);
        }
    }
    final boolean wasReportNextDraw = mReportNextDraw;

    // 确定窗口尺寸，调用 WMS 计算并保存
    // 若 Activity 第一次被请求测量布局和绘制
    // 或 Activity 创建大小发生变化
    // 或 Activity 可见性发生变化
    // 或 Activity 窗口属性发生变化（指向 WindowManager.LayoutParams 对象）
    // 或 强制下一个窗口重新布局
    if (mFirst || windowShouldResize || viewVisibilityChanged || params != null
            || mForceNextWindowRelayout) {
        mForceNextWindowRelayout = false;

        // 如果这个窗口给窗口管理器提供了内部边衬，那么我们要首先
        // 在布局过程中使提供的边衬不发生变化。这可以避免它
        // 短暂地导致其他窗口根据窗口的原始框架调整大小/移动，等到我们
        // 可以完成这个窗口的布局，并将最终计算出的边衬返回给窗口管理器。
        // 表示 Activity 窗口由额外的内容边衬和可见边衬等待指定
        // 边衬发生改变
        insetsPending = computesInternalInsets;

        if (mSurfaceHolder != null) {
            mSurfaceHolder.mSurfaceLock.lock();
            mDrawingAllowed = true;
        }

        boolean hwInitialized = false;
        boolean dispatchApplyInsets = false;
        boolean hadSurface = mSurface.isValid();

        // 调用 WMS 重新计算并保存
        try {
            if (DEBUG_LAYOUT) {
                Log.i(mTag, "host=w:" + host.getMeasuredWidth() + ", h:" +
                        host.getMeasuredHeight() + ", params=" + params);
            }
            if (mAttachInfo.mThreadedRenderer != null) {
                // relayoutWindow may decide to destroy mSurface. As that decision
                // happens in WindowManager service, we need to be defensive here
                // and stop using the surface in case it gets destroyed.
                if (mAttachInfo.mThreadedRenderer.pause()) {
                    // Animations were running so we need to push a frame
                    // to resume them
                    mDirty.set(0, 0, mWidth, mHeight);
                }
            }
            if (mFirst || viewVisibilityChanged) {
                mViewFrameInfo.flags |= FrameInfo.FLAG_WINDOW_VISIBILITY_CHANGED;
            }
            // 请求 WMS 计算 Activity 大小及内容边衬和可见边衬大小
            // 通过 IPC 请求 WMS
            // 结果会被保存在 mWinFrame 中
            relayoutResult = relayoutWindow(params, viewVisibility, insetsPending);
            final boolean freeformResizing = (relayoutResult
                    & WindowManagerGlobal.RELAYOUT_RES_DRAG_RESIZING_FREEFORM) != 0;
            final boolean dockedResizing = (relayoutResult
                    & WindowManagerGlobal.RELAYOUT_RES_DRAG_RESIZING_DOCKED) != 0;
            final boolean dragResizing = freeformResizing || dockedResizing;
            if ((relayoutResult & WindowManagerGlobal.RELAYOUT_RES_BLAST_SYNC) != 0) {
                if (DEBUG_BLAST) {
                    Log.d(mTag, "Relayout called with blastSync");
                }
                reportNextDraw();
                if (isHardwareEnabled()) {
                    mNextDrawUseBlastSync = true;
                }
            }

            if (mSurfaceControl.isValid()) {
                updateOpacity(mWindowAttributes, dragResizing);
            }

            if (DEBUG_LAYOUT) Log.v(mTag, "relayout: frame=" + frame.toShortString()
                    + " surface=" + mSurface);

            // If the pending {@link MergedConfiguration} handed back from
            // {@link #relayoutWindow} does not match the one last reported,
            // WindowManagerService has reported back a frame from a configuration not yet
            // handled by the client. In this case, we need to accept the configuration so we
            // do not lay out and draw with the wrong configuration.
            if (!mPendingMergedConfiguration.equals(mLastReportedMergedConfiguration)) {
                if (DEBUG_CONFIGURATION) Log.v(mTag, "Visible with new config: "
                        + mPendingMergedConfiguration.getMergedConfiguration());
                performConfigurationChange(new MergedConfiguration(mPendingMergedConfiguration),
                        !mFirst, INVALID_DISPLAY /* same display */);
                updatedConfiguration = true;
            }

            surfaceSizeChanged = false;
            if (!mLastSurfaceSize.equals(mSurfaceSize)) {
                surfaceSizeChanged = true;
                mLastSurfaceSize.set(mSurfaceSize.x, mSurfaceSize.y);
            }
            final boolean alwaysConsumeSystemBarsChanged =
                    mPendingAlwaysConsumeSystemBars != mAttachInfo.mAlwaysConsumeSystemBars;
            updateColorModeIfNeeded(lp.getColorMode());
            surfaceCreated = !hadSurface && mSurface.isValid();
            surfaceDestroyed = hadSurface && !mSurface.isValid();

            // When using Blast, the surface generation id may not change when there's a new
            // SurfaceControl. In that case, we also check relayout flag
            // RELAYOUT_RES_SURFACE_CHANGED since it should indicate that WMS created a new
            // SurfaceControl.
            surfaceReplaced = (surfaceGenerationId != mSurface.getGenerationId()
                    || (relayoutResult & RELAYOUT_RES_SURFACE_CHANGED)
                    == RELAYOUT_RES_SURFACE_CHANGED)
                    && mSurface.isValid();
            if (surfaceReplaced) {
                mSurfaceSequenceId++;
            }

            if (alwaysConsumeSystemBarsChanged) {
                mAttachInfo.mAlwaysConsumeSystemBars = mPendingAlwaysConsumeSystemBars;
                dispatchApplyInsets = true;
            }
            if (updateCaptionInsets()) {
                dispatchApplyInsets = true;
            }
            if (dispatchApplyInsets || mLastSystemUiVisibility !=
                    mAttachInfo.mSystemUiVisibility || mApplyInsetsRequested) {
                mLastSystemUiVisibility = mAttachInfo.mSystemUiVisibility;
                dispatchApplyInsets(host);
                // We applied insets so force contentInsetsChanged to ensure the
                // hierarchy is measured below.
                dispatchApplyInsets = true;
            }

            if (surfaceCreated) {
                // If we are creating a new surface, then we need to
                // completely redraw it.
                mFullRedrawNeeded = true;
                mPreviousTransparentRegion.setEmpty();

                // Only initialize up-front if transparent regions are not
                // requested, otherwise defer to see if the entire window
                // will be transparent
                if (mAttachInfo.mThreadedRenderer != null) {
                    try {
                        hwInitialized = mAttachInfo.mThreadedRenderer.initialize(mSurface);
                        if (hwInitialized && (host.mPrivateFlags
                                        & View.PFLAG_REQUEST_TRANSPARENT_REGIONS) == 0) {
                            // Don't pre-allocate if transparent regions
                            // are requested as they may not be needed
                            mAttachInfo.mThreadedRenderer.allocateBuffers();
                        }
                    } catch (OutOfResourcesException e) {
                        handleOutOfResourcesException(e);
                        return;
                    }
                }
            } else if (surfaceDestroyed) {
                // If the surface has been removed, then reset the scroll
                // positions.
                if (mLastScrolledFocus != null) {
                    mLastScrolledFocus.clear();
                }
                mScrollY = mCurScrollY = 0;
                if (mView instanceof RootViewSurfaceTaker) {
                    ((RootViewSurfaceTaker) mView).onRootViewScrollYChanged(mCurScrollY);
                }
                if (mScroller != null) {
                    mScroller.abortAnimation();
                }
                // Our surface is gone
                if (isHardwareEnabled()) {
                    mAttachInfo.mThreadedRenderer.destroy();
                }
            } else if ((surfaceReplaced
                    || surfaceSizeChanged || windowRelayoutWasForced)
                    && mSurfaceHolder == null
                    && mAttachInfo.mThreadedRenderer != null
                    && mSurface.isValid()) {
                mFullRedrawNeeded = true;
                try {
                    // Need to do updateSurface (which leads to CanvasContext::setSurface and
                    // re-create the EGLSurface) if either the Surface changed (as indicated by
                    // generation id), or WindowManager changed the surface size. The latter is
                    // because on some chips, changing the consumer side's BufferQueue size may
                    // not take effect immediately unless we create a new EGLSurface.
                    // Note that frame size change doesn't always imply surface size change (eg.
                    // drag resizing uses fullscreen surface), need to check surfaceSizeChanged
                    // flag from WindowManager.
                    mAttachInfo.mThreadedRenderer.updateSurface(mSurface);
                } catch (OutOfResourcesException e) {
                    handleOutOfResourcesException(e);
                    return;
                }
            }

            if (mDragResizing != dragResizing) {
                if (dragResizing) {
                    mResizeMode = freeformResizing
                            ? RESIZE_MODE_FREEFORM
                            : RESIZE_MODE_DOCKED_DIVIDER;
                    final boolean backdropSizeMatchesFrame =
                            mWinFrame.width() == mPendingBackDropFrame.width()
                                    && mWinFrame.height() == mPendingBackDropFrame.height();
                    // TODO: Need cutout?
                    startDragResizing(mPendingBackDropFrame, !backdropSizeMatchesFrame,
                            mAttachInfo.mContentInsets, mAttachInfo.mStableInsets, mResizeMode);
                } else {
                    // We shouldn't come here, but if we come we should end the resize.
                    endDragResizing();
                }
            }
            if (!mUseMTRenderer) {
                if (dragResizing) {
                    mCanvasOffsetX = mWinFrame.left;
                    mCanvasOffsetY = mWinFrame.top;
                } else {
                    mCanvasOffsetX = mCanvasOffsetY = 0;
                }
            }
        } catch (RemoteException e) {
        }

        if (DEBUG_ORIENTATION) Log.v(
                TAG, "Relayout returned: frame=" + frame + ", surface=" + mSurface);

        // Activity 请求 WMS 计算得到窗口左上坐标。保存在 mAttachInfo 的成员变量中
        mAttachInfo.mWindowLeft = frame.left;
        mAttachInfo.mWindowTop = frame.top;

        // !!FIXME!! This next section handles the case where we did not get the
        // window size we asked for. We should avoid this by getting a maximum size from
        // the window session beforehand.
        // Activity 请求 WMS 计算得到的窗口大小。保存在 mWidth 和 mHeight 中
        // 若前一次计算结果和本次不同就重新赋值
        if (mWidth != frame.width() || mHeight != frame.height()) {
            mWidth = frame.width();
            mHeight = frame.height();
        }

        if (mSurfaceHolder != null) {
            // The app owns the surface; tell it about what is going on.
            if (mSurface.isValid()) {
                // XXX .copyFrom() doesn't work!
                //mSurfaceHolder.mSurface.copyFrom(mSurface);
                mSurfaceHolder.mSurface = mSurface;
            }
            mSurfaceHolder.setSurfaceFrameSize(mWidth, mHeight);
            mSurfaceHolder.mSurfaceLock.unlock();
            if (surfaceCreated) {
                mSurfaceHolder.ungetCallbacks();

                mIsCreating = true;
                SurfaceHolder.Callback[] callbacks = mSurfaceHolder.getCallbacks();
                if (callbacks != null) {
                    for (SurfaceHolder.Callback c : callbacks) {
                        c.surfaceCreated(mSurfaceHolder);
                    }
                }
            }

            if ((surfaceCreated || surfaceReplaced || surfaceSizeChanged
                    || windowAttributesChanged) && mSurface.isValid()) {
                SurfaceHolder.Callback[] callbacks = mSurfaceHolder.getCallbacks();
                if (callbacks != null) {
                    for (SurfaceHolder.Callback c : callbacks) {
                        c.surfaceChanged(mSurfaceHolder, lp.format,
                                mWidth, mHeight);
                    }
                }
                mIsCreating = false;
            }

            if (surfaceDestroyed) {
                notifyHolderSurfaceDestroyed();
                mSurfaceHolder.mSurfaceLock.lock();
                try {
                    mSurfaceHolder.mSurface = new Surface();
                } finally {
                    mSurfaceHolder.mSurfaceLock.unlock();
                }
            }
        }

        final ThreadedRenderer threadedRenderer = mAttachInfo.mThreadedRenderer;
        if (threadedRenderer != null && threadedRenderer.isEnabled()) {
            if (hwInitialized
                    || mWidth != threadedRenderer.getWidth()
                    || mHeight != threadedRenderer.getHeight()
                    || mNeedsRendererSetup) {
                threadedRenderer.setup(mWidth, mHeight, mAttachInfo,
                        mWindowAttributes.surfaceInsets);
                mNeedsRendererSetup = false;
            }
        }

        // TODO: In the CL "ViewRootImpl: Fix issue with early draw report in
        // seamless rotation". We moved processing of RELAYOUT_RES_BLAST_SYNC
        // earlier in the function, potentially triggering a call to
        // reportNextDraw(). That same CL changed this and the next reference
        // to wasReportNextDraw, such that this logic would remain undisturbed
        // (it continues to operate as if the code was never moved). This was
        // done to achieve a more hermetic fix for S, but it's entirely
        // possible that checking the most recent value is actually more
        // correct here.
        // 若窗口不处于停止状态或提交了下一次绘制
        if (!mStopped || wasReportNextDraw) {
            // 窗口触摸模式变化导致焦点控件变化检测
            boolean focusChangedDueToTouchMode = ensureTouchModeLocally(
                    (relayoutResult&WindowManagerGlobal.RELAYOUT_RES_IN_TOUCH_MODE) != 0);
            
            // 检查是否需要重新测量 Activity 窗口大小
            // 焦点控件由触摸模式变化而变化
            // 或 测量出的顶层视图 host 大小与 WMS 计算出来的大小不同
            // 或 边衬发生改变
            // 或 配置发生改变（mPendingMergedConfiguration）
            if (focusChangedDueToTouchMode || mWidth != host.getMeasuredWidth()
                    || mHeight != host.getMeasuredHeight() || dispatchApplyInsets ||
                    updatedConfiguration) {
                // 重新计算 decorView 的 MeasureSpec
                int childWidthMeasureSpec = getRootMeasureSpec(mWidth, lp.width);
                int childHeightMeasureSpec = getRootMeasureSpec(mHeight, lp.height);

                if (DEBUG_LAYOUT) Log.v(mTag, "Ooops, something changed!  mWidth="
                        + mWidth + " measuredWidth=" + host.getMeasuredWidth()
                        + " mHeight=" + mHeight
                        + " measuredHeight=" + host.getMeasuredHeight()
                        + " dispatchApplyInsets=" + dispatchApplyInsets);

                // Ask host how big it wants to be
                //执行测量操作
                performMeasure(childWidthMeasureSpec, childHeightMeasureSpec);

                // Implementation of weights from WindowManager.LayoutParams
                // We just grow the dimensions as needed and re-measure if
                // needs be
                int width = host.getMeasuredWidth();
                int height = host.getMeasuredHeight();
                boolean measureAgain = false;

                // 在重新计算之后，若 Activity 窗口属性 lp 指明需要对测出的宽高扩展
                // (即 lp 指向的 WindowManager.LayoutPrams 对象 horizontalWeight
                // 和 verticalWeight 大于 0）
                // 则对顶层视图 host 最大可用控件进行扩展后再测量一次
                if (lp.horizontalWeight > 0.0f) {
                    // 测量宽度加上额外像素
                    width += (int) ((mWidth - width) * lp.horizontalWeight);
                    // 重新计算 MeasureSpec
                    childWidthMeasureSpec = MeasureSpec.makeMeasureSpec(width,
                            MeasureSpec.EXACTLY);
                    // 标记需要重新测量
                    measureAgain = true;
                }
                if (lp.verticalWeight > 0.0f) {
                    height += (int) ((mHeight - height) * lp.verticalWeight);
                    childHeightMeasureSpec = MeasureSpec.makeMeasureSpec(height,
                            MeasureSpec.EXACTLY);
                    measureAgain = true;
                }
                
                // 当标记需要重新测量，调用 performMeasure()
                if (measureAgain) {
                    if (DEBUG_LAYOUT) Log.v(mTag,
                            "And hey let's measure once more: width=" + width
                            + " height=" + height);
                    performMeasure(childWidthMeasureSpec, childHeightMeasureSpec);
                }

                layoutRequested = true;
            }
        }
    // 不是第一次遍历且各个参数都没有变化
    } else {
        // Not the first pass and no window/insets/visibility change but the window
        // may have moved and we need check that and if so to update the left and right
        // in the attach info. We translate only the window frame since on window move
        // the window manager tells us only for the new frame but the insets are the
        // same and we do not want to translate them more than once.
        // 检查窗口发生移动情况
        maybeHandleWindowMove(frame);
    }

    if (surfaceSizeChanged || surfaceReplaced || surfaceCreated || windowAttributesChanged) {
        // If the surface has been replaced, there's a chance the bounds layer is not parented
        // to the new layer. When updating bounds layer, also reparent to the main VRI
        // SurfaceControl to ensure it's correctly placed in the hierarchy.
        //
        // This needs to be done on the client side since WMS won't reparent the children to the
        // new surface if it thinks the app is closing. WMS gets the signal that the app is
        // stopping, but on the client side it doesn't get stopped since it's restarted quick
        // enough. WMS doesn't want to keep around old children since they will leak when the
        // client creates new children.
        prepareSurfaces();
    }

    // 调用布局和绘制流程
    // Activity 测量结束，开始对其进行布局
    // 请求了布局 且 窗口没有处于停止状态或提交了下一次绘制
    final boolean didLayout = layoutRequested && (!mStopped || wasReportNextDraw);
    boolean triggerGlobalLayoutListener = didLayout
            || mAttachInfo.mRecomputeGlobalAttributes;
    if (didLayout) {
        // 开始布局流程
        performLayout(lp, mWidth, mHeight);

        // By this point all views have been sized and positioned
        // We can compute the transparent area

        // 处理透明区域
        if ((host.mPrivateFlags & View.PFLAG_REQUEST_TRANSPARENT_REGIONS) != 0) {
            // start out transparent
            // TODO: AVOID THAT CALL BY CACHING THE RESULT?
            host.getLocationInWindow(mTmpLocation);
            mTransparentRegion.set(mTmpLocation[0], mTmpLocation[1],
                    mTmpLocation[0] + host.mRight - host.mLeft,
                    mTmpLocation[1] + host.mBottom - host.mTop);

            host.gatherTransparentRegion(mTransparentRegion);
            if (mTranslator != null) {
                mTranslator.translateRegionInWindowToScreen(mTransparentRegion);
            }

            if (!mTransparentRegion.equals(mPreviousTransparentRegion)) {
                mPreviousTransparentRegion.set(mTransparentRegion);
                mFullRedrawNeeded = true;
                // TODO: Ideally we would do this in prepareSurfaces,
                // but prepareSurfaces is currently working under
                // the assumption that we paused the render thread
                // via the WM relayout code path. We probably eventually
                // want to synchronize transparent region hint changes
                // with draws.
                SurfaceControl sc = getSurfaceControl();
                if (sc.isValid()) {
                    mTransaction.setTransparentRegionHint(sc, mTransparentRegion).apply();
                }
            }
        }

        if (DBG) {
            System.out.println("======================================");
            System.out.println("performTraversals -- after setFrame");
            host.debug();
        }
    }

    // These callbacks will trigger SurfaceView SurfaceHolder.Callbacks and must be invoked
    // after the measure pass. If its invoked before the measure pass and the app modifies
    // the view hierarchy in the callbacks, we could leave the views in a broken state.
    if (surfaceCreated) {
        notifySurfaceCreated();
    } else if (surfaceReplaced) {
        notifySurfaceReplaced();
    } else if (surfaceDestroyed)  {
        notifySurfaceDestroyed();
    }

    if (triggerGlobalLayoutListener) {
        mAttachInfo.mRecomputeGlobalAttributes = false;
        mAttachInfo.mTreeObserver.dispatchOnGlobalLayout();
    }

    // 通知 WMS Activity 有额外的边衬
    // 处理边衬
    if (computesInternalInsets) {
        // Clear the original insets.
        final ViewTreeObserver.InternalInsetsInfo insets = mAttachInfo.mGivenInternalInsets;
        // 重置边衬树，清空状态
        insets.reset();

        // 遍历计算 Activity 额外边衬
        // Compute new insets in place.
        mAttachInfo.mTreeObserver.dispatchOnComputeInternalInsets(insets);
        mAttachInfo.mHasNonEmptyGivenInternalInsets = !insets.isEmpty();

        // Tell the window manager.
        // 当 Activity 有额外边衬
        // 或 额外边衬发生变化
        // 设置额外边衬到 WMS 中
        if (insetsPending || !mLastGivenInsets.equals(insets)) {
            mLastGivenInsets.set(insets);

            // 转换为屏幕坐标
            // Translate insets to screen coordinates if needed.
            final Rect contentInsets;
            final Rect visibleInsets;
            final Region touchableRegion;
            // 若 mTranslator 指向了一个 Translator 对象说明 Activity 运行在兼容模式
            if (mTranslator != null) {
                // 转换到兼容模式
                contentInsets = mTranslator.getTranslatedContentInsets(insets.contentInsets);
                visibleInsets = mTranslator.getTranslatedVisibleInsets(insets.visibleInsets);
                touchableRegion = mTranslator.getTranslatedTouchableArea(insets.touchableRegion);
            } else {
                contentInsets = insets.contentInsets;
                visibleInsets = insets.visibleInsets;
                touchableRegion = insets.touchableRegion;
            }

            try {
                // 远程调用 WMS 将边衬设置到 WMS 中
                mWindowSession.setInsets(mWindow, insets.mTouchableInsets,
                        contentInsets, visibleInsets, touchableRegion);
            } catch (RemoteException e) {
            }
        }
    }

    if (mFirst) {
        if (sAlwaysAssignFocus || !isInTouchMode()) {
            // handle first focus request
            if (DEBUG_INPUT_RESIZE) {
                Log.v(mTag, "First: mView.hasFocus()=" + mView.hasFocus());
            }
            if (mView != null) {
                if (!mView.hasFocus()) {
                    mView.restoreDefaultFocus();
                    if (DEBUG_INPUT_RESIZE) {
                        Log.v(mTag, "First: requested focused view=" + mView.findFocus());
                    }
                } else {
                    if (DEBUG_INPUT_RESIZE) {
                        Log.v(mTag, "First: existing focused view=" + mView.findFocus());
                    }
                }
            }
        } else {
            // Some views (like ScrollView) won't hand focus to descendants that aren't within
            // their viewport. Before layout, there's a good change these views are size 0
            // which means no children can get focus. After layout, this view now has size, but
            // is not guaranteed to hand-off focus to a focusable child (specifically, the edge-
            // case where the child has a size prior to layout and thus won't trigger
            // focusableViewAvailable).
            View focused = mView.findFocus();
            if (focused instanceof ViewGroup
                    && ((ViewGroup) focused).getDescendantFocusability()
                            == ViewGroup.FOCUS_AFTER_DESCENDANTS) {
                focused.restoreDefaultFocus();
            }
        }
    }

    final boolean changedVisibility = (viewVisibilityChanged || mFirst) && isViewVisible;
    final boolean hasWindowFocus = mAttachInfo.mHasWindowFocus && isViewVisible;
    final boolean regainedFocus = hasWindowFocus && mLostWindowFocus;
    if (regainedFocus) {
        mLostWindowFocus = false;
    } else if (!hasWindowFocus && mHadWindowFocus) {
        mLostWindowFocus = true;
    }

    if (changedVisibility || regainedFocus) {
        // Toasts are presented as notifications - don't present them as windows as well
        boolean isToast = mWindowAttributes.type == TYPE_TOAST;
        if (!isToast) {
            host.sendAccessibilityEvent(AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED);
        }
    }

    // 收尾工作
    // 设置不是第一次请求遍历
    mFirst = false;
    mWillDrawSoon = false;
    mNewSurfaceNeeded = false;
    mActivityRelaunched = false;
    mViewVisibility = viewVisibility;
    mHadWindowFocus = hasWindowFocus;

    mImeFocusController.onTraversal(hasWindowFocus, mWindowAttributes);

    // Remember if we must report the next draw.
    // 判断是否需要设置 mReortNextDraw, 为下一次遍历做准备
    if ((relayoutResult & WindowManagerGlobal.RELAYOUT_RES_FIRST_TIME) != 0) {
        reportNextDraw();
    }

    // 在第一次遍历时不会调用 performDraw(), 因为创建了新的 Surface
    // 在 scheduleTraversals() 中会 post 一个 runnable
    // 那时会再次调用 performDraw() 来执行绘制流程
    boolean cancelDraw = mAttachInfo.mTreeObserver.dispatchOnPreDraw() || !isViewVisible;
    // 若没有取消绘制
    if (!cancelDraw) {
        // 若存在等待执行动画就遍历执行
        if (mPendingTransitions != null && mPendingTransitions.size() > 0) {
            for (int i = 0; i < mPendingTransitions.size(); ++i) {
                mPendingTransitions.get(i).startChangingAnimations();
            }
            mPendingTransitions.clear();
        }
        // 开始绘制流程
        performDraw();
    // 取消绘制
    } else {
        // 若可见，再次尝试遍历
        if (isViewVisible) {
            // Try again
            scheduleTraversals();
        // 若不可见
        } else {
            // 若存在等待执行动画就遍历执行
            if (mPendingTransitions != null && mPendingTransitions.size() > 0) {
                for (int i = 0; i < mPendingTransitions.size(); ++i) {
                    mPendingTransitions.get(i).endChangingAnimations();
                }
                mPendingTransitions.clear();
            }

            // We may never draw since it's not visible. Report back that we're finished
            // drawing.
            if (!wasReportNextDraw && mReportNextDraw) {
                mReportNextDraw = false;
                pendingDrawFinished();
            }
        }
    }

    if (mAttachInfo.mContentCaptureEvents != null) {
        notifyContentCatpureEvents();
    }

    mIsInTraversal = false;
}
```

## 参考文献或资料
1. [计算Activity窗口大小的过程分析](https://www.kancloud.cn/alex_wsc/androids/473778)
2. [performTraversals()分析](https://www.jianshu.com/p/aecff29d6751)
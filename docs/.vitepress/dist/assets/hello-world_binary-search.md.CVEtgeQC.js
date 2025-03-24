import{_ as n,c as a,o as p,ag as i}from"./chunks/framework.DPDPlp3K.js";const o=JSON.parse('{"title":"二分查找","description":"","frontmatter":{},"headers":[],"relativePath":"hello-world/binary-search.md","filePath":"hello-world/binary-search.md"}'),l={name:"hello-world/binary-search.md"};function e(t,s,h,c,k,d){return p(),a("div",null,s[0]||(s[0]=[i(`<h1 id="二分查找" tabindex="-1">二分查找 <a class="header-anchor" href="#二分查找" aria-label="Permalink to &quot;二分查找&quot;">​</a></h1><p>这篇文章讨论二分查找的总体概念，并在此基础上尝试探讨各个细节问题。如：更新 <code>mid</code> <code>high</code> 和 <code>low</code> 时 <code>+1</code> <code>-1</code> 对其效果的影响；边界值确定；变体情况处理。</p><h2 id="基本概念" tabindex="-1">基本概念 <a class="header-anchor" href="#基本概念" aria-label="Permalink to &quot;基本概念&quot;">​</a></h2><p>二分查找是一种时间复杂度为 <code>O(logn)</code> 级别的查找方式，其每轮搜索都会缩小一半的查询范围，可以把两集很大的数据用很少的查找次数来寻找到目标值。</p><p>最简单版本的二分查找是基于有序无重复数列的查找方法：<br><strong>Code</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> binarySearch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] arr, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> size, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> target) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 初始化</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> low </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> high </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> size </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 循环迭代</span></span>
<span class="line highlighted"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(low </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> high) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mid </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (low </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> high) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (arr[mid] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> target) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mid;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (arr[mid] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> target) {</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            low </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mid </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            high </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mid </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 无法找到</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>分析：<br> 情况枚举：</p><ul><li><p>循环条件 (<code>&lt;</code> 和 <code>&lt;=</code>)<br><strong>条件：元素个数为偶数个；循环条件为 <code>&lt;</code>；指针更新都为 <code>+1</code>：</strong><br> 数组元素个数不同可能会造成过早跳出循环。<br> 以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>size: 6; target: 19</span></span>
<span class="line"><span>Iteration 1:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span> ↑     ↑          ↑</span></span>
<span class="line"><span> l     m          h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 2:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span>          ↑   ↑   ↑</span></span>
<span class="line"><span>          l   m   h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 3:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span>          ↑</span></span>
<span class="line"><span>         lmh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Jump out of loop;</span></span>
<span class="line"><span>return -1;</span></span></code></pre></div><p>可以发现，当数组元素个数为偶数个时，查询过程走到两个指针重合后就会跳出循环，而不会进入循环返回目标数的下标。<br> 当元素个数为奇数个时则无此问题如：[3, 6, 8, 19, 25, 30, 32]。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>size: 7; target 25</span></span>
<span class="line"><span>Iteration 1:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30, 32]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5,  6)</span></span>
<span class="line"><span> ↑        ↑           ↑</span></span>
<span class="line"><span> l        m           h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 2:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30, 32]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5,  6)</span></span>
<span class="line"><span>          ↑   ↑       ↑</span></span>
<span class="line"><span>          l   m       h</span></span>
<span class="line"><span>return 4;</span></span></code></pre></div></li><li><p>指针变更 (<code>+1</code> 和 <code>-1</code>) 当保持循环条件不变（即 <code>&lt;=</code>），将 <code>low</code> 指针变更为与 上一次 <code>mid</code> 位置相等。以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>size: 6; target: 30</span></span>
<span class="line"><span>Iteration 1:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span> ↑     ↑          ↑</span></span>
<span class="line"><span> l     m          h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 2:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span>       ↑  ↑       ↑</span></span>
<span class="line"><span>       l  m       h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 3:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span>          ↑   ↑   ↑</span></span>
<span class="line"><span>          l   m   h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 4:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span>              ↑   ↑</span></span>
<span class="line"><span>             lm   h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>...</span></span></code></pre></div><p>可以看出，当目标值为右边界时，程序因为 <code>mid</code> 位置无法进一步更新而进入死循环。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>size: 7; target: 32</span></span>
<span class="line"><span>Iteration 1:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30, 32]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5,  6)</span></span>
<span class="line"><span> ↑        ↑           ↑</span></span>
<span class="line"><span> l        m           h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 2:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30, 32]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5,  6)</span></span>
<span class="line"><span>          ↑   ↑       ↑</span></span>
<span class="line"><span>          l   m       h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 3:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30, 32]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5,  6)</span></span>
<span class="line"><span>              ↑   ↑   ↑</span></span>
<span class="line"><span>              l   m   h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 4:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30, 32]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5,  6)</span></span>
<span class="line"><span>                  ↑   ↑</span></span>
<span class="line"><span>                  lm   h</span></span></code></pre></div><p>当保持循环条件不变（即 <code>&lt;=</code>），将 <code>high</code> 指针变更为与 上一次 <code>mid</code> 位置相等。以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>size: 6; target: 3</span></span>
<span class="line"><span>Iteration 1:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span> ↑     ↑          ↑</span></span>
<span class="line"><span> l     m          h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 2:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span> ↑  ↑  ↑</span></span>
<span class="line"><span> l  m  h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 3:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span> ↑  ↑      </span></span>
<span class="line"><span> lm h      </span></span>
<span class="line"><span></span></span>
<span class="line"><span>...</span></span></code></pre></div><p>可以看出，当目标值为左边界时，程序同样因为 <code>mid</code> 位置无法进一步更新而进入死循环。</p><p>当保持循环条件不变（即 <code>&lt;=</code>），将 <code>high</code> 和 <code>low</code> 指针都变更为与 上一次 <code>mid</code> 位置相等。以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>size: 6; target: 3</span></span>
<span class="line"><span>Iteration 1:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span> ↑     ↑          ↑</span></span>
<span class="line"><span> l     m          h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 2:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span> ↑  ↑  ↑</span></span>
<span class="line"><span> l  m  h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 3:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span> ↑  ↑      </span></span>
<span class="line"><span> lm h      </span></span>
<span class="line"><span></span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>size: 6; target: 30</span></span>
<span class="line"><span>Iteration 1:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span> ↑     ↑          ↑</span></span>
<span class="line"><span> l     m          h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 2:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span>       ↑  ↑       ↑</span></span>
<span class="line"><span>       l  m       h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 3:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span>          ↑   ↑   ↑</span></span>
<span class="line"><span>          l   m   h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Iteration 4:</span></span>
<span class="line"><span>[3, 6, 8, 19, 25, 30]</span></span>
<span class="line"><span>(0, 1, 2, 3,  4,  5)</span></span>
<span class="line"><span>              ↑   ↑</span></span>
<span class="line"><span>             lm   h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>...</span></span></code></pre></div><p>可以看出，当边界值为左边界或右边界时，程序同样因为 <code>mid</code> 位置无法进一步更新而进入死循环。</p><p>当修改循环条件（即 <code>&lt;</code>），将 <code>low</code> 指针变更为与 上一次 <code>mid</code> 位置相等。以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。</p></li></ul><h2 id="参考文献或资料" tabindex="-1">参考文献或资料 <a class="header-anchor" href="#参考文献或资料" aria-label="Permalink to &quot;参考文献或资料&quot;">​</a></h2>`,9)]))}const g=n(l,[["render",e]]);export{o as __pageData,g as default};

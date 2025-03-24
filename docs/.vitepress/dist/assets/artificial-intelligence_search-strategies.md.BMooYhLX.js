import{_ as t,c as i,o as a,ag as r}from"./chunks/framework.DPDPlp3K.js";const o="/img/oNotation.png",n="/img/uniformCost.png",l="/img/depthFirstSearch.png",u=JSON.parse('{"title":"Search Strategies","description":"","frontmatter":{"prev":{"text":"Artificial Intelligence","link":"artificial-intelligence/index"},"next":false},"headers":[],"relativePath":"artificial-intelligence/search-strategies.md","filePath":"artificial-intelligence/search-strategies.md"}'),s={name:"artificial-intelligence/search-strategies.md"};function h(c,e,p,m,d,f){return a(),i("div",null,e[0]||(e[0]=[r('<h1 id="search-strategies" tabindex="-1">Search Strategies <a class="header-anchor" href="#search-strategies" aria-label="Permalink to &quot;Search Strategies&quot;">​</a></h1><p>In AI problems, it is important to use search strategies to find the goal in them.</p><h2 id="search-types" tabindex="-1">Search Types <a class="header-anchor" href="#search-types" aria-label="Permalink to &quot;Search Types&quot;">​</a></h2><ul><li><p><strong>Uniformed Search (Blind Search) 盲目搜索</strong><br><strong>No other information</strong> like path cost or the number of steps are given. Only could it do is to distinguish from goal state from non-goal state.</p><ul><li>Types <ul><li>Breadth-first Search</li><li>Uniform-cost Search</li><li>Depth-first Search</li><li>Depth-limited Search</li><li>Iterative Deeping Search</li><li>Bidirectional Search</li></ul></li></ul></li><li><p><strong>Informed Search (Heuristic Search) 启发式搜索</strong><br> 　<strong>Giving some other information</strong> to help finding the goal state.</p></li></ul><h2 id="performance-measurement" tabindex="-1">Performance Measurement <a class="header-anchor" href="#performance-measurement" aria-label="Permalink to &quot;Performance Measurement&quot;">​</a></h2><ul><li><p><strong>Completeness 完成性</strong><br> Whether the algorithm guarantee to find the solution if there is any.</p></li><li><p><strong>Optimality 最优性</strong><br> Whether the algorithm could find the optimal solution.</p></li><li><p><strong>Time Complexity 时间复杂度</strong><br> Time cost of the algorithm.</p></li><li><p><strong>Space Complexity 空间复杂度</strong><br> Memory cost of the algorithm.</p></li></ul><div class="tip custom-block"><p class="custom-block-title">O-natation</p><p>$O(g(n))={f(n): \\text{there exist positive constants } c \\text{ and } n_0 \\text{ such that for all } n&gt;=n_0}$</p><p>*i.e. When $n&gt;=n_0, f(n)&lt;=cg(n).$<br> $g(n)$ is an asymptotic upper bound (渐进上界) for $f(n)$. If $f(n) \\in O(g(n))$, we write $f(n)=O(g(n))$.<br><img src="'+o+'" alt="O-notation"></p><p>*<em>$g(n)$ is a set of functions.</em><br> *<em>O stand for the order of growth of $f(n)$.</em> O 的含义是 $f(n)$ 的数量级，$g(n)$ 是算法中基本运算的频度。</p></div><h2 id="breadth-first-search" tabindex="-1">Breadth-first Search <a class="header-anchor" href="#breadth-first-search" aria-label="Permalink to &quot;Breadth-first Search&quot;">​</a></h2><ul><li><p>Search every node in the certain level before going to next level.</p></li><li><p>Branching Factor: The maximum number of children for each internal node in a tree.</p></li><li><p>Suppose the branching factor is 2. When the solution node is at the level $d+1$, it should expand the maximum number of node to be $1+2+2^2+2^3+...+2^d=2^{d+1}-1=O(2^d)$.</p></li><li><p>Advantages</p><ul><li>Complete (It is guarantee to find solution if there is any)</li><li>Always find the shallowest goal first when there are multi-solutions.</li></ul></li><li><p>Drawback</p><ul><li>Memory and time cost may not support due to it must maintained all the nodes in memory at the same time.</li></ul></li></ul><h2 id="uniform-cost-search" tabindex="-1">Uniform Cost Search <a class="header-anchor" href="#uniform-cost-search" aria-label="Permalink to &quot;Uniform Cost Search&quot;">​</a></h2><ul><li>Modifies the Bread-first search strategy by always expanding the lowest-cost node.</li><li>The first solution found is guaranteed to be the cheapest solution.<br><img src="'+n+'" alt="Uniform Cost"></li></ul><h2 id="depth-first-search" tabindex="-1">Depth-first Search <a class="header-anchor" href="#depth-first-search" aria-label="Permalink to &quot;Depth-first Search&quot;">​</a></h2><ul><li><p>Depth-first search always expands the node at the deepest level of the tree.<br><img src="'+l+'" alt="Depth-first Search"></p></li><li><p>Advantages</p><ul><li>Have modest memory Requirement. Only store a single path from the root to a leaf node, along with the remaining unexpanded sibling nodes for each node on the path. For branch factor $b$ and maximum depth $m$, it only need $bm$ nodes to storage.</li><li>Time complexity is $O(b^m)$.</li></ul></li><li><p>Drawbacks</p><ul><li>May stuck when going down the wrong path (infinite loop).</li><li>May find a solution path longer than optimal solution.</li><li>Neither complete nor optimal.</li></ul></li></ul><h2 id="references" tabindex="-1">References <a class="header-anchor" href="#references" aria-label="Permalink to &quot;References&quot;">​</a></h2><p>[1] Y.M. Cheung. COMP 7015 Artificial Intelligence. Hong Kong Baptist University, 2020<br> [2] 王道论坛.2020 年数据结构考研复习指导[M].北京:电子工业出版社, 2019</p>',15)]))}const b=t(s,[["render",h]]);export{u as __pageData,b as default};

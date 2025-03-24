import{_ as a,c as s,o as l,ag as t}from"./chunks/framework.DPDPlp3K.js";const k=JSON.parse('{"title":"事务","description":"","frontmatter":{"prev":{"text":"MySQL","link":"mysql/index"},"next":{"text":"索引","link":"mysql/indices"}},"headers":[],"relativePath":"mysql/transaction.md","filePath":"mysql/transaction.md"}'),n={name:"mysql/transaction.md"};function e(o,i,r,c,d,p){return l(),s("div",null,i[0]||(i[0]=[t(`<h1 id="事务" tabindex="-1">事务 <a class="header-anchor" href="#事务" aria-label="Permalink to &quot;事务&quot;">​</a></h1><p>事务会保证一组数据库操作要么全都成功，要么全部失败。事务的支持是在引擎实现的。MyISAM 引擎不支持事务，InnoDB 引擎支持事务。</p><p><strong>特性</strong></p><ul><li>原子性 Atomicity</li><li>一致性 Consistency</li><li>隔离性 Isolation</li><li>持久性 Durability</li></ul><h2 id="隔离性" tabindex="-1">隔离性 <a class="header-anchor" href="#隔离性" aria-label="Permalink to &quot;隔离性&quot;">​</a></h2><p>在多事务同时执行时，可能会出现脏读、不可重复读和幻读的问题：</p><ul><li>脏读：事务 B 在执行中读取到了事务 A 修改过但未提交的数据；</li><li>不可重复读：事务 B 前后读取两次，在读第二次前事务 A 对数据进行了修改，导致事务 B 第二次读取时记录内容不一致；</li><li>幻读：事务 B 前后读取两次，在第二次读取前事务 A 增加或删除了记录，导致事务 B 第二次读取时获得的记录数量不一致；</li></ul><h3 id="隔离级别" tabindex="-1">隔离级别 <a class="header-anchor" href="#隔离级别" aria-label="Permalink to &quot;隔离级别&quot;">​</a></h3><p>MySQL 给出了四个隔离级别，通过隔离级别来解决上面的问题：</p><ul><li>读未提交：事务未提交时其所作更改就对其他事务可见；<br> 直接返回记录最新值，不使用阅读视图。</li><li>读提交：事务提交后所做更改对其他事务可见；<br> 阅读视图在每条 SQL 开始执行时创建。</li><li>可重复读：事务在执行过程中可见的数据与其启动时一致，未提交前所作更改其他事务不可见；<br> 阅读视图在事务启动时创建，在整个事务期间使用该视图。</li><li>串行化：对同一记录根据需求加读锁和写锁，当锁冲突时需要等待前一事务执行完成后才能执行；<br> 使用加锁的形式避免冲突。</li></ul><p>MySQL 会在<strong>读数据</strong>采用一致性读，即利用一致性阅读视图来实现。但在<strong>更新数据</strong>时，会采用当前读的方法来保证更新数据生效。<br> 对于当前读来说， SELECT 语句可以加上 <code>lock in share mode</code> 或 <code>for update</code> 变成当前读。其中第一个是读锁（共享锁），第二个是写锁（排它锁）。</p><h4 id="并发版本控制" tabindex="-1">并发版本控制 <a class="header-anchor" href="#并发版本控制" aria-label="Permalink to &quot;并发版本控制&quot;">​</a></h4><p>具体通过多版本并发控制 (MVCC) 来实现，不同时刻启动的阅读视图 (read-view).<br> 在 MySQL 中，每条更新记录会同时记录一条回滚操作到 undo log 中，记录中的最新值可以通过回滚来回到之前的状态。例如一串操作：1 → 2, 2 → 3, 3 → 4，对应的 undo log 是：2 → 1, 3 → 2, 4 → 3.<br> 假设在第一个更新创建了 read-view A, 在所有操作完成后创建了 read-view B. 对于 read-view A 来说，假如需要回到最原始的值 1，需要依次回滚所有操作；假如有新事务将当前值 4 修改为 5，这个操作对 read-view A,B 所在的事务不冲突。</p><p>示例：<br> 一条记录 r，当前值为 1.<br> |事务 A|事务 B|读未提交|读提交|可重复读|串行化| |:--😐:--😐:--😐:--😐:--😐:--😐:--😐 |R(r)||A: 1|A: 1|A: 1|A: 1| ||R(r)|B: 1|B: 1|B: 1|B: 1| ||W(r): 2||||| |R(r)||A: 2|A: 1|A: 1|A: 1| ||Commit||||| |R(r)||A: 2|A: 2|A: 1|A: 1| |Commit|||||| |R(r)||A: 2|A: 2|A: 2|A: 2|</p><div class="warning custom-block"><p class="custom-block-title">特别的</p><ul><li>不同数据库的默认隔离级别不同，Oracle 的默认隔离级别是<strong>读提交</strong>，而 MySQL 的默认隔离级别是<strong>可重复读</strong>。在使用由 Oracle 数据库迁移到 MySQL 数据库的应用时需要修改隔离级别。启动时设置启动参数 <code>transaction-isolation</code> 为 <code>READ-COMMITTED</code>.<br> 使用语句 <code>SHOW VARIABLES LIKE &#39;transaction-isolation&#39;;</code> 查看当前的隔离级别。</li><li>系统会在判断没有比当前 undo log 更早的 read-view 存在时删除该日志，所有不建议使用长事务。<br> 长事务会导致在该事务提交前所有回滚记录都必须保留，占用很大存储空间。同时它也会占有锁资源。</li></ul></div><p><strong>一致性读视图</strong><br> 阅读视图是基于整个库的。其基本逻辑是：</p><ul><li>对于每一个事物，拥有一个 transaction id, 它按申请顺序严格递增，在事务开始时从事务系统申请。</li><li>每行记录有多个版本，每次事务更新时创建新版本。记录 row trx_id，内容为事务的 transaction id. 旧版本会被保留，新版本可以直接提取到信息。行旧记录版本不是物理存在，而是当前版本根据 undo log 计算得来的。</li><li>事务数组<br> InnoDB 为每个事务创建数组来保存事务启动瞬间当前活跃的所有事务的 ID （启动但未提交） <ul><li>ID 最小值记为低水位；ID 最大值加 1 作为高水位；</li><li>数组和高水位共同组成一致性阅读视图。</li><li>数据版本可见性规则：<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>所有事务：</span></span>
<span class="line"><span>[已提交事务 [未提交事务集合] 未开始事务]</span></span>
<span class="line"><span>         ^       ↑      ^</span></span>
<span class="line"><span>       低水位  当前事务 高水位</span></span>
<span class="line"><span></span></span>
<span class="line"><span>活跃事务数组：</span></span>
<span class="line"><span>[低水位，……，高水位+1]</span></span></code></pre></div>以可重复读隔离级别为例： <ul><li>当 row trx_id 落在已提交事务，说明当前版本是已提交的事务或当前事务自己生成的。该数据可见；</li><li>当 row trx_id 落在未开始事务，说明当前版本是将来事务生成的。数据不可见；</li><li>当 row trx_id 落在未提交事务集合，则对比事务数组（因为序列会标记事务开始时已经提交事务为低水位，其后都标记为未提交或未开始。但这里面的事务有可能会在后续提交）： <ul><li>若 row trx_id 在数组中，表示当前版本是还未提交事务生成。数据不可见；</li><li>若 row trx_id 不在数组中，表示当前版本是已提交的事务生成的。该数据可见。</li></ul></li></ul></li></ul></li></ul><p>总结下来：一个记录的版本对于一致性阅读视图来说有：</p><ul><li>事务自己更新该记录，可见；</li><li>版本未提交，不可见；</li><li>版本已提交，在创建阅读视图后提交，不可见；</li><li>版本已提交，在创建阅读视图前提交，可见。</li></ul><h2 id="启动方式" tabindex="-1">启动方式 <a class="header-anchor" href="#启动方式" aria-label="Permalink to &quot;启动方式&quot;">​</a></h2><ol><li>显示启动。 使用 <code>begin transaction</code> 或者 <code>start transaction</code> 来启动，提交语句是 <code>commit</code>, 回滚语句是 <code>rollback</code>. 这种启动方式会在它之后第一个操作表的语句开启事务。如果想立即启动一个事务，使用 <code>start transaction with consistent snapshot</code>.<br> 在读提交级别下，<code>start transaction with consistent snapshot</code> 等同于 <code>begin transaction</code>, 因为它每个语句都会创建一个一致性阅读视图。</li><li>设置关闭线程自动提交。 使用 <code>set autocommit=0</code> 来关闭自动提交。当就算只执行一个 SELECT 语句时也会开启一个事务。这个事务只有当主动 commit 或 rollback，或者断开连接时才结束。<div class="warning custom-block"><p class="custom-block-title">特别地</p><p>为避免有些客户端框架在连接成功后自动执行 <code>set autocommit=0</code> 的命令造成长连接带来的长事务，推荐使用 <code>set autocommit=1</code> 并用显示的方式启动事务。</p></div></li></ol><h3 id="提交并开启下一个事务" tabindex="-1">提交并开启下一个事务 <a class="header-anchor" href="#提交并开启下一个事务" aria-label="Permalink to &quot;提交并开启下一个事务&quot;">​</a></h3><p>在显示使用事务的时候，可以使用 <code>commit workk and chain</code> 命令来提交当前事务并开启下一个事务。这样可以减少执行一次 <code>begin</code> 语句的交互开销，也可以知道每个语句是否在事务中。</p><p><strong>查找长事务</strong><br> 使用命令来查找时间超过 60 秒的事务:</p><div class="language-SQL vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">SQL</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> information_schema</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">innodb_trx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WHERE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TIME_TO_SEC(timediff(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">now</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),trx_started))</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">60</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div>`,25)]))}const u=a(n,[["render",e]]);export{k as __pageData,u as default};

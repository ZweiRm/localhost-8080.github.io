---
prev: false
next: 
    text: '事务'
    link: 'mysql/transaction'
---

# MySQL

## 语句执行过程
![MySQL 执行过程](/img/mysqlProcess.png)  

### Server 层
Server 层包含了 MySQL 的绝大多数核心服务，包括内置（日期、时间、数学和加密）函数。跨存储引擎的功能（存储过程、触发器、视图）在这一层实现。  

+ 连接器  
  + 负责管理和数据直接的连接，权限验证  
    使用命令来连接数据库：  
    ``` shell
    mysql -h$ip -P$port -u$user -p
    ```
    `mysql` 客户端工具使用 TCP 与服务端建立连接，时候只用密码来验证身份。  
    若密码错误，客户端程序执行结束，否则连接器会查询权限表，根据权限判断赋予当前连接权限。  
    ::: warning 值得注意的是
    一个连接成功建立之后，此时若管理员账户对这个连接的权限进行了修改也不会对其造成实时影响。当重新连接时影响生效。  
    :::
    连接创建以后进入空闲状态，即 Sleep. 使用 `show processlist;` 可以命令查看当前连接。  
    当客户端长时间没有动作，连接器会自动断开连接，默认为 8 小时，由 `wait_timeout` 控制。  
  + 连接分类
    + 长连接  
      连接成功后持续有请求，则这些请求都是用同一个连接执行。  
    + 短连接  
      连接成功后执行几次操作就断开连接，之后重新建立。  
      建立连接的过程复杂，一般情况是用长连接来避免很多的连接动作。  
    ::: tip 问题
    当 MySQL 在执行过程中，临时内存都放在连接对象中管理导致内存占用上涨很快。内存占用过大时会导致系统强行杀掉进程导致 MySQL 异常重启，怎么处理？  
    + 定期断开长连接。当连接执行一段时间后，或程序执行过一个占用内存很大的大查询后断开连接。之后需要查询时重新连接。  
    + 每次执行大操作后，执行 `mysql_reset_connection` 重新初始化连接资源。 此操作不需要重新连接和权限验证，但会将连接恢复到刚创建完成时的状态。<Badge text="MySQL 5.7 +"/>  
    :::
+ 查询缓存 <Badge text="MySQL 8.0 -" type="error"/>  
  MySQL 8.0 前 Server 层包含一个 Query Cache, 查询语句会交给这个缓存和分析器。若命中则进行 Precheck 权限验证，后返回结果，若没有命中则分析器继续执行，结束后将结果存入缓存。  
  ::: warning 值得注意的是
  查询缓存时，会失效很频繁。对于一张表来说，只要有一个更新，那关于这张表的所有缓存都会被清空。这样以来，更新压力大的数据库的缓存命中率会非常低。  
  MySQL 也提供了按需使用的缓存，设置 `query_cache_type` 为 `DEMAND` 后，默认不使用查询缓存，只有在使用了 `SQL_CACHE` 关键字的查询语句才会使用缓存。例如：`SELECT SQL_CACHE * FROM T WHERE ID=10;`  
  :::
+ 分析器  
  词法语法分析，分解输入命令，判断是否符合语法。Precheck 权限验证。目标表和目标列是否存在验证。    
+ 优化器  
  执行计划生成；索引选择  
  在选择时，考虑因素有：扫描行数、是否使用临时表、是否需要排序  
  其中通过统计信息估算会扫描的行数。统计信息指索引的区分度，当一个索引上不同值越多区分度越高。不同值个数称为基数。  
  MySQL 通过采样统计的方式估算基数。InnoDB 选择 N 个数据页统计不同值，计算平均数再乘索引的总页面数。该数据会持续更新，当变更数据行数超过总行数的 1/M 时就会重新统计。通过设置参数 `innodb_stats_persistent` 来选择统计模式：为 `on` 统计持久化存储，默认 N=20, M=10; 为 `off` 时统计内存数据，默认 N=8, M=16.  
  当预估行数与实际行数出入过大时，使用 `analyze table t` 命令重新统计索引信息。  
  当明确某索引更快而优化器选错时，使用 `force index` 强制选择索引。或者修改语句引导 MySQL 选择正确的索引。或者建立一个更合适的索引；删掉误用索引。  
+ 执行器  
  操作引擎返回结果。  
  执行前会进行 Precheck 来判断是否对目标表有权限。通过后根据引擎定义调用引擎对表操作。  
  `row_examined` 表示执行器扫描行数，与执行器调用次数不同。  

### 存储引擎层
存储引擎层负责数据的存储和提取，以插件形式实现其架构。支持 InnoDB, MyISAM, Memory 等多个存储引擎，在 5.5.5+ 后 InnoDB 成为默认存储引擎。不同的存储引擎公用一个 Server 层。  

### 日志模块
在执行查询语句以外的语句时，例如 INSERT, UPDATE, DELETE, CREATE 等时，会涉及到重做日志 redo log 和归档日志 binlog. 

#### redo log
+ MySQL 使用 Write-Ahead Logging (WAL) 技术来减少磁盘访问的随机 I/O 次数来加快运行。 InnoDB 会先将记录写在 redo log 里并更新内存，等待适当时将操作更新在磁盘里。  
+ 例如配置 4 个文件为一组作为 redo log, 每个文件可以存放 1GB 内容，则总共可以存放 4GB 操作。四个文件形成一个循环队列。队头是 check point, 队尾是 write pos, 每当有操作时 write pos 向后移动。如果队满则将队头写入磁盘，更新 checkpoint.  
+ 通过 redo log, InnoDB 可以保证数据库发生异常重启后，之前的记录不对丢失，称为 crash-safe.  
  当崩溃发生，试图恢复时，系统无法知道 redo log 中哪些已经写入磁盘，所以需要保证写入操作的幂等，这些操作基于 Page 的物理日志实现。  
+ `innodn_flush_log_at_trx_commit` 设置为 1 时表示每次事务均直接持久化到磁盘中。可以保证 MySQL 异常重启后数据不丢失。  

#### binlog
+ Server 层的日志会被记录到 binlog 中。这个日志是一个逻辑日志并且所有的引擎都可以使用。  
+ binlog 采用追加逻辑操作的形式记录日志。  
+ `sync_binlog` 设置为 1 时表示每次事务均直接持久化到磁盘中。  

示例：UPDATE 语句的流程：  
`UPDATE T SET c=c+1 WHERE ID=2;`  
1. 执行器调用引擎通过树搜索获取 ID=2 行。若这行已经在内存中则直接返回结果给执行器，否则从磁盘读入内存后返回结果。  
2. 执行器执行 c+1 操作，后调用引擎写入新数据。  
3. 引擎先将数据更新在内存中，同时将该操作写入 redo log，此时 redo log 处于 prepare 状态。之后引擎告知执行器执行完成，可以提交事务。  
4. 执行器生成这个操作的 binlog，写入磁盘。  
5. 执行器调用引擎的事务提交接口。引擎将刚写入的 redo log 状态更新为 commit.  

**两阶段提交**  
通过 redo log 等待 binlog 写入完成前后的状态改变，实现两阶段提交。这可以使得两份日志逻辑一致。  
准备恢复到某一个时间点的状态步骤：  
1. 恢复目标时间点最近的全备份到临时库。  
2. 从备份时间开始，通过 binlog 的日志，依次回放操作直到目标时间点。  
3. 将临时库上线为生产库。  

没有两阶段提交的示例：在执行 `UPDATE T SET c=c+1 WHERE ID=2;` 语句时，写完第一个日志文件后崩溃。操作前 c 的值为 0.  
+ 情形一：redo log 写入完成，binlog 还未写入  
  redo log 拥有 cras-safe 的特性，在恢复完成后 c 的值为 1；但 binlog 并未写入 UPDATE 操作，若根据 binlog 恢复，c 的值为 0. 两者不相等。  
+ 情形二：binlog 写入完成， redo log 还未写入  
  redo log 恢复后 UPDATE 语句事务不存在，c 的值为0；但 binlog 已经记录了更新操作，这个事物恢复后 c 的值为 1. 两者不相等。  

类似的，除了在崩溃恢复，服务器扩容来增加服务器读取能力时，常见的方法也是使用全备份加 binlog 回放来实现，两阶段提交可以保证主从数据库之间数据的一致性。  


### Change Buffer
当更新一个数据时，如果数据页已经在内存中会直接更新，若不在内存中则 InnoDB 会在不影响数据一致性的前提下将修改操作缓存在 change buffer 中。在下次查询访问该数据页时，将数据页读入内存再执行 change buffer 中相关操作(merge 操作)来保证数据逻辑正确性。  
除访问数据页，数据库正常关闭时、系统后台也会定期执行 merge 操作。  
通过使用 change buffer，可以减少磁盘读取，避免内存占用提升内存利用率。  

change buffer 也是持久化数据，需要将更新记录在 redo log 中，并持久化到系统表空间 ibdata1.  

只有普通索引可以使用 change buffer. 因为唯一索引在更新时要先判断操作是否违反唯一性约束，需要将数据页读取到内存中，这时无需 change buffer.  

change buffer 使用 buffer pool 的内存。使用参数 `innodb_change_buffer_max_size` 来设置大小，当设置参数为 50 时表示 change buffer 最多占 buffer pool 的 50%.  

change buffer 因为通过将更新动作缓存下来而减少磁盘 IO, 那么对一个数据页来说，在 merge 之前记录的该页变更越多收益越大。使用它适合于写多读少且写完之后数据页立刻被访问的概率小时的场景，例如账单和日志系统。  
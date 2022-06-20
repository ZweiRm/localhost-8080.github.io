# Hadoop
Hadoop 是一个由 Apache 基金会开发的分布式系统基础架构。它主要解决海量数据的存储和分析计算问题。  

优势：  
1. 高可靠性  
   底层维护多个数据副本，即使某个计算单元火存储单元出现故障也不会导致数据丢失。  
2. 高扩展性  
   在集群间分配任务数据，可方便的扩展数以千计的节点。  
3. 高效性  
   在 MapReduce 的思想下，Hadoop 是并行工作的，以加快任务处理速度。  
4. 高容错性  
   能够自动将失败的任务重新分配。  

## 组成
Hadoop 1.x: Common（辅助工具）、HDFS（数据存储）、MapReduce（计算 + 资源调度）  
Hadoop 2.x: Common（辅助工具）、HDFS（数据存储）、Yarn（资源调度）、MapReduce（计算）  
Hadoop 3.x: Common（辅助工具）、HDFS（数据存储）、Yarn（资源调度）、MapReduce（计算）  

## HDFS
Hadoop Distributed File System，是一个分布式文件系统。  

NameNode (nn): 存储文件的元数据。例如文件名、文件目录结构、文件属性（生成时间、副本数、文件权限）、每个文件的块列表和块所在的 DataNode 等信息。  
Secondary NameNode (2nn): 每隔一段时间对 NameNode 元数据进行备份。  
DataNode (dn): 在本地文件系统存储文件块数据以及块数据的校验和。  

## Yarn
Yet Another Resource Negotiator，是 Hadoop 的资源管理器。  

ResourceManager (RM): 管理整个集群的资源（内存，CPU 等）。  
NodeManager (NM): 管理单个节点服务器的资源。  
ApplicationMaster (AM): 管理单个任务。  
Container: 容器。其中封装了任务运行所需要的资源。  

当客户提交作业时，会在对应的 NodeManager 中生成对应的 ApplicationMaster. ApplicationMaster 向 ResourceManager 申请运行任务所需要的资源，封装成 Container 保存在具体的 NodeManager 管理的节点中。对于同一个作业，ApplicationMaster 可以将任务分配到不同的 NodeManager 管理的节点中执行。对于同一个 NodeManager 管理的节点，其中可以运行多个 Container.  

## MapReduce
MapReduce 将计算过程分为两个阶段：Map 阶段和 Reduce 阶段。  
Map 阶段并行处理输入数据；Reduce 阶段对 Map 阶段的结果进行汇总。  
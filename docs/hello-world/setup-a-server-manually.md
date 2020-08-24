---
prev: ./building-a-vuepress-powered-blog
next: ./TODO
---

# 让我们来手动配置一台服务器
当我们从云服务商购买了一台服务器或者确实有一台服务器在手里时，我们需要对它进行一些最基本的配置来使它可以正常工作。这篇文章可以让你了解到如何对一台 Linux 服务器进行基本的配置。  
当然，某些云服务商也提供了现成的镜像服务一键搭建及配置。可以根据需求自行选择。

## Step 0. 概要
这篇文章记录使用 CentOS 系统配置一个可以让 Java Web 应用程序工作的服务器。将包含：  
+ 基本软件安装及配置
+ 基础配置
+ Java Web 应用相关软件安装及配置

**在此之前你需要掌握的知识：**  Linux 基本操作命令

**在操作中会使用到的软件：** Cmder；FileZilla  
Cmder 用来敲命令，当然你也可以用 PowerShell；  
FileZilla 用来通过 FTP 向服务器端操作文件。

## Step 1. 配置 SSH 密钥及安全组
使用 SSH 连接服务器可以让我们免去每次输入密码的麻烦。安全组的配置可以在云服务商端设置对某端口某协议放行与否，以此来提高安全性。本段所有命令在本机执行。  

### SSH 密钥
+ Vultr 服务器  
  1. 生成 SSH Key  
     使用命令：  
     ``` sh
     ssh-keygen
     ```
     命令会要求进行简单配置，若使用默认配置只需连续按下回车以确认。  
     SSH Key 会默认存放于 `C:\Users\用户名\.ssh`（Windows) ；`~/.ssh/`(Unix)文件夹中。 其中密钥为 `id_rsa`；公钥为 `id_rsa.pub`。  
     
  2. 部署 SSH Key  
     使用命令查看公钥：  
     ``` sh
     cat /home/example_user/.ssh/id_rsa.pub
     ```
     复制弹出的结果，打开 Vultr 网站中 Account> SSH Keys> Add SSH Key 填写表单并保存。  
     ![Add SSH Key](/img/vultr_add_ssh_key.jpg)
  
  3. 使用 SSH Key 部署服务器  
     在 Vultr 网站中 Products>Deploy New Instance 选择所需要的服务器配置、镜像并勾选刚才配置的 SSH Key.  
     
     ::: warning 注意
     在 Vultr 中，自动给服务器实例配置 SSH Key 只发生在购买服务器时。所以如果我们已经拥有了一台服务器后意欲自动配置 SSH Key 只能通过重装 SSH Key 操作来实现。而**这个操作会抹除服务器的所有内容**。  
     方法：Vultr 网站中 Products> Server> Settings> Reinstall SSH Keys  
     
     **手动向服务器部署 SSH Key**  
     除了 Vultr 提供的自动部署 SSH Key，我们还可以手动向服务器上传 SSH Key来避免抹除已有服务器的麻烦。  
     
     + Windows  
       **在 PowerShell 中使用命令：**
       ``` sh
       type $env:USERPROFILE\.ssh\id_rsa.pub | ssh root@你的服务器IP "cat >> .ssh/authorized_keys"
       ```
       **此操作不能使用 Cmder.*
     
     + Linux/macOS  
       使用命令：  
       ``` sh
       ssh-copy-id -i ~/.ssh/id_rsa.pub root@你的服务器IP
       ```
       根据提示要求输入密码来安装 Key.
     :::

  4. 使用 SSH 登录服务器  
     使用命令：  
     ``` sh
     ssh root@你的服务器IP
     ```
     即可免密码登录远程服务器。  

+ 阿里云服务器
  1. 创建密钥对  
     在阿里云 ECS 管理控制台中点击 网络与安全> 密钥对。完成相应的配置，点击确定生成密钥对。下载私钥 `密钥对名称.pem` 到本地，存放于`C:\Users\用户名\.ssh`/`~/.ssh/`下。  
     
  2. 绑定密钥对  
     在密钥对设置中点击：操作> 绑定密钥对。选择要配置的服务器实例，点击确定。（当服务器实例正在运行中时需要对其重新启动）  
     
  3. 使用 SSH 连接服务器  
     + 确认私钥所在位置，并修改其权限。  
       使用命令：  
       ``` sh
       chmod 400 ~/.ssh/密钥对名称.pem
       ```
       
     + 连接服务器实例  
       使用命令：  
       ``` sh
       ssh -i ~/.ssh/密钥对名称.pem root@你的服务器IP
       ```

### 安全组
+ Vultr 服务器  
  1. 新建安全组  
     Vultr 网站 Products> Firewall> Add FireWall Group  
     按提示填写表单。开放端口`22`, `80`, `443`, `3306`, `8080`, `8081`, `8082`并保存。  
  
  2. 绑定安全组  
     Vultr 网站 Products> Server> Settings> Firewall  
     选择刚才配置的安全组并使其生效。  

+ 阿里云服务器  
  1. 创建安全组  
     在 ECS 控制台点击 网络与安全> 安全组> 创建安全组  
     配置安全组开放端口`22`, `80`, `443`, `3306`, `8080`, `8081`, `8082`并保存。  
  
  2. 绑定安全组  
     在 ECS 控制台点击 实例与镜像> 实例> 操作> 管理> 本实例安全组> 加入安全组  
     选择配置的安全组并使其生效。  

## Step 2. 安装 Vim
Vim 是一款基于 Vi 的编辑器。相对于 Vi，它有更强大的功能。我们会使用 Vim 来应对后续编辑文件的需要。  
使用 `yum` 来安装 vim：  
``` sh
yum -y install vim*
```
安装完成后，就可以使用 vim 来创建、编辑文件了。这里附上一个简单的[教程](https://www.runoob.com/linux/linux-vim.html)。

## Step 2.5. 配置 SWAP（可选）
当服务器内存过小时，会造成某些程序崩溃。增加交换区来配置虚拟内存。  

1. SWAP 分区大小  
   根据红帽建议 [Recommended Partitioning Scheme](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/installation_guide/s2-diskpartrecommend-ppc#id4394007)：  
   |物理内存|建议的交换空间大小|若开启休眠功能建议的交换空间大小|
   |:--:|:--:|:--:|
   |⩽ 2GB|2 倍于 RAM 大小|3 倍于 RAM大小|
   |> 2GB – 8GB|和 RAM 大小相等|2 倍于 RAM 大小|
   |> 8GB – 64GB|至少 4 GB|1.5 倍于 RAM 大小|
   |>64GB|至少 4 GB|不建议休眠|

2. 设置 SWAP 分区
   使用命令：  
   1. 创建 SWAP 分区  
      ``` sh
      dd if=/dev/zero of=/swapfile bs=1M count=2048
      ```
      其中 `bs`×`count` 为 SWAP 分区大小，这个示例中大小位 2G. `bs`为每块大小，`count`为块数。  
      `/swapfile`为生成的分区路径。  
   
   2. 将刚才生成的分区设置为 SWAP 分区  
      ``` sh
      mkswap /swapfile
      ```
   
   3. 启用 SWAP 分区  
      ``` sh
      swapon /swapfile
      ```
     
   4. 自动挂载分区  
      ``` sh
      vim /etc/fstab
      ```
      添加行并保存：  
      ``` sh
      /swapfile swap swap defaults 0 0
      ```
   
   5. 检查 swappiness 值  
      这个参数控制操作系统使用 SWAP 分区的时机。参数范围由 0 到 100。当参数为 0 时表示系统最大程度使用物理内存，耗尽时使用 SWAP 分区；100 表示积极使用 SWAP 分区，将物理内存上的内容及时搬运到 SWAP 分区里。CentOS 7 默认为 30；CentOS 6 默认为 60.  
      使用命令检查：  
      ``` sh
      cat /proc/sys/vm/swappiness
      ```
      
      若需修改，执行命令：  
      ``` sh
      # 临时修改
      sysctl vm.swappiness=?
      ```
      
      或者  
      
      ``` sh
      # 永久修改
      vim /etc/sysctl.conf
      ```
      并添加行：  
      ``` sh
      vm.swappiness=?
      ```
      
   6. 查看内存情况  
      使用命令：  
      ``` sh
      free
      ```

## Step 3. 安装并配置 JDK
1. 在 [OpenJDK](http://jdk.java.net/)下载 Linux 适用的 JDK 压缩包，并使用 FileZilla 上传到服务器合适的位置。  
2. 解压缩  
   使用命令：  
   ``` sh
   tar -xzvf openjdk-****_linux-x64_bin.tar.gz
   ```
   **将命令中的文件替换成你所下载的版本。*  
3. 配置环境变量  
   这里使用对系统所有用户有效且便于维护的方法进行设置。这个操作需要管理员权限。使用命令：  
   1. 新建 Shell 脚本并编辑  
      ``` sh
      vim /etc/profile.d/java.sh
      ```
      编辑内容并保存：  
      ``` sh
      # Java Environment
      JAVA_HOME=/root/java/jdk-11
      PATH=$PATH:$JAVA_HOME/bin
      CLASSPATH=$JAVA_HOME/lib
      export JAVA_HOME PATH CLASSPATH
      ```
      **将命令中 `JAVA_HOME` 替换成刚才解压完成后生成的文件夹路径。*  
      这样的配置方式可以在不需要该环境变量时更简便地进行维护。
     
   2. 使环境变量生效  
      使用命令：  
      ``` sh
      source /etc/profile.d/java.sh
      ```
   
   3. 检查是否生效  
      使用命令：  
      ``` sh
      java -version
      ```
      若正确显示版本信息表明配置正确。  

## Step 4. 设置防火墙
1. 检查防火墙状态  
   默认情况下，CentOS 7 已经内置并开启了防火墙 firewalld. 使用命令检查其状态：  
   ``` sh
   firewall-cmd --state
   ```
   若显示 `running` 则已开启。  

   当显示命令不存在时，使用命令安装：  
   ``` sh
   yum install firewalld -y
   ```

2. 设置放行规则  
   使用命令：  
   ``` sh
   firewall-cmd --permanent --zone=public --add-port=22/tcp
   firewall-cmd --permanent --zone=public --add-port=80/tcp
   firewall-cmd --permanent --zone=public --add-port=443/tcp
   firewall-cmd --permanent --zone=public --add-port=3306/tcp
   firewall-cmd --permanent --zone=public --add-port=8080/tcp
   firewall-cmd --permanent --zone=public --add-port=8081/tcp
   firewall-cmd --permanent --zone=public --add-port=8082/tcp
   ```
    每一条都显示`success`则正确。
    
3. 重载防火墙以使得配置生效  
   使用命令：  
   ``` sh
   firewall-cmd --reload
   ```

4. 检查防火墙  
   使用命令：  
   ``` sh
   firewall-cmd --zone=public --list-ports
   ```
   检查所有要设置的端口都已放行。  
   
## Step 5. 安装 MySQL
1. 下载 yum repository  
   访问 [MySQL Community Downloads](https://dev.mysql.com/downloads/repo/yum/)，找到适合的版本，点击`Download`。在页面中，复制`No thanks, just start my download.`链接所对应的地址。  
   在服务器端使用命令下载 rpm 文件：  
   ``` sh
   wget https://dev.mysql.com/get/platform-and-version-specific-package-name.noarch.rpm
   ```
   **命令中 url 替换为刚才复制的链接。*

2. 安装 yum repository  
   使用命令安装：  
   ``` sh
   yum -y install platform-and-version-specific-package-name.noarch.rpm
   ```

3. 安装 MySQL  
   使用命令：  
   ``` sh
   yum install mysql-community-server
   ```
   按提示键入 `y` 来确认。  
   
4. 启动 MySQL  
   使用命令来启动 MySQL 服务：  
   ``` sh
   systemctl start mysqld.service
   ```
   
   接着使用命令来查看 MySQL 服务的状态：  
   ``` sh
   systemctl status mysqld.service
   ```
   若显示绿色的 `active (running)` 则 MySQL 启动正常。  
   
5. 登录并配置 MySQL  
   输入命令获得 MySQL 自动生成的初始密码：  
   ``` sh
   grep 'temporary password' /var/log/mysqld.log
   ```
   **返回的 `2020-08-23T13:59:15.793152Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: ********` 末尾为初始密码*  
   
   复制初试密码并登录 MySQL：  
   ``` sh
   mysql -uroot -p
   ```
   按提示粘贴密码并确定。  
   
   使用命令更改自定义 MySQL 登录密码：  
   ``` sh
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';
   ```
   **注意这里是 SQL 语句，需以分号结尾。*
   
## Step 6. 安装 Tomcat
1. 下载 Tomcat  
   访问 [Apache Tomcat](https://tomcat.apache.org/), 选择合适的版本并下载。  

2. 安装 Tomcat  
   将下载好的文件使用 FileZilla 上传到服务器，按类似安装 JDK 的方法在合适的位置解压缩。按需要可以解压多份 Tomcat 服务器以后备用。  

## Step 7. 安装并配置 Tengine
1. 下载并安装相关软件  
   使用命令安装编译器：  
   ``` sh
   yum -y install gcc gcc-c++ autoconf automake make
   ```
   
   使用命令安装 pcre-devel：  
   ``` sh
   yum -y install pcre-devel
   ```
   
   使用命令安装 OpenSSL：  
   ``` sh
   yum -y install openssl openssl-devel
   ```
   
2. 下载并安装 Tengine  
   访问[The Tengine Web Server](http://tengine.taobao.org/)下载压缩包，并使用 FileZilla 上传到服务器适当的位置。按类似安装 JDK 的方法解压缩。  
   
   在服务器访问解压好的文件夹，使用命令：  
   ``` sh
   ./configure
   make
   sudo make install
   ```
   **请确保安装过程没有报错：类似`./configure: error`的错误提示。若有，请查阅相关文档解决。*  
   **Tengine 默认将安装在 `/usr/local/nginx` 目录。*  

3. 配置环境变量  
   使用命令生成并保存文件：  
   ``` sh
   vim /etc/profile.d/tengine.sh
   ```
   
   编辑内容：  
   ``` sh
   # Tengine Environment
   PATH=$PATH:/usr/local/nginx/sbin
   export PATH
   ```
   使环境变量生效  使用命令：  
   ``` sh
   source /etc/profile.d/tengine.sh
   ```
   
   检查是否生效  
   使用命令：  
   ``` sh
   nginx -v
   ```
   若正确显示版本信息表明配置正确。

## Step 8. 部署并测试项目
下面再对 Tomcat 和 Tengine 进行一些操作和配置，最后进行简单地测试确保项目已经正确运行。  

### 上传项目包
在本地测试完成后，使用 FileZilla 将 `.war` 压缩包上传到服务器端。上传路径为 `apache-tomcat-****/webapps`  
若你有多个项目需要分别上传到每个 Tomcat 中。在这篇文章的示例里，会将三个项目分别上传到三份 Tomcat 中。  

::: warning 注意
当在 IDE 测试导出项目时，请：  
+ 明确项目配置文件中 MySQL 密码已经与服务器中安装的 MySQL 密码相同。
+ 明确配置文件中当前项目的端口号以便后续配置。在这篇文章的示例里三个项目的端口号分别为 `8080`, `8081` 和 `8082`.
:::

上传完毕后对文件夹中的部分文件做些修改，以使我们的项目成为该 Tomcat 的默认项目。  
+ 重命名 `ROOT` 文件夹，添加后缀类似 `_1` 以使自动生成的 ROOT 项目不再是默认项目。  
+ 重命名我们上传的项目为 `ROOT.war`. 当服务器启动时会自动解压该包来生成默认项目文件夹 ROOT.  

完成后：  
![Tomcat Webapps](/img/tomcat_webapps.jpg)

### 配置 Tomcat

### 再配置 Tengine

### 启动项目以测试

## 你可能会遇到的问题
1. Q：项目正常运行几天后再访问报 502 Bad Gateway 错误怎么办？  
   A：明确报错项目，命令访问到它所在的 Tomcat 并尝试重新启动它。
      
## 参考文献或资料
[1] vim. [GitHub - vim/vim: The official Vim repository](https://github.com/vim/vim)  
[2] Vultr. [How Do I Generate SSH Keys?](https://www.vultr.com/docs/how-do-i-generate-ssh-keys)  
[3] Vultr. [Deploy a New Server with an SSH Key](https://www.vultr.com/docs/deploy-a-new-server-with-an-ssh-key)  
[4] Vultr. [How to Add and Delete SSH Keys](https://www.vultr.com/docs/how-to-add-and-delete-ssh-keys)  
[5] 阿里云. [创建SSH密钥对](https://help.aliyun.com/document_detail/51793.html)  
[6] 阿里云. [绑定SSH密钥对](https://help.aliyun.com/document_detail/51796.html)  
[7] 阿里云. [使用SSH密钥对连接Linux实例](https://help.aliyun.com/document_detail/51798.html)  
[8] 明济安. [linux设置虚拟内存（swap）解决mysql因内存不足挂掉的故障](https://www.cnblogs.com/mingjian/p/5230387.html)  
[9] 乾乾君子. [Linux SWAP交换分区应该设置多大？](https://blog.csdn.net/sirchenhua/article/details/87861709)  
[10] 悠悠i. [Linux环境变量配置全攻略](https://www.cnblogs.com/youyoui/p/10680329.html)  
[11] taodanc. [Linux下配置JDK11环境变量](https://blog.csdn.net/duan9015/article/details/103332154)  
[12] 菩提尘. [Linux 环境下/etc/profile和/etc/profile.d 的区别](https://www.cnblogs.com/kevin1990/p/8641315.html)  
[13] 老蒋. [CentOS7安装firewalld防火墙添加放行端口简单演示过程](https://www.itbulu.com/centos7-firewalld.html)  
[14] Oracle. [A Quick Guide to Using the MySQL Yum Repository](https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/)  
[15] 24只羊. [CentOS7安装MySQL（完整版）](https://blog.csdn.net/qq_36582604/article/details/80526287)  
[16] Alibaba Group. [简单例子-The Tengine Web Server](http://tengine.taobao.org/document_cn/install_cn.html)  
[17] 随风ˇ止步. [Tengine安装](https://www.cnblogs.com/zhoudemo/p/9043585.html)  

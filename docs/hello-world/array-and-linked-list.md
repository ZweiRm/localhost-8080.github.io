# 数组和链表的区别
在数据结构中，顺序存储结构的顺序表和链式存储的链表合称线性表。这篇文章记录面试题可能会被问道这两种结构的主要区别的分析。

## 定义
### 数组 (顺序表)
+ **线性表的顺序存储称顺序表**（数组）。利用地址连续的存储单元依次存储线性表中的数据元素，使得逻辑上相邻的两个元素物理位置也相邻。  

+ 数组拥有**随机访问**的特点。即使用 `base_address + k * type_size` 来通过给出偏移量来直接访问数组中的某元素。  
  例如：有存放 `int` 类型的数组 `a`, 其基准地址是 `0x005`，那么该数组下标为 3 的元素可通过 `0x002 + 3 * 4` 计算得到`a[3]`的地址为 `0x00E`.

+ 由于数组逻辑相邻物理也相邻，所以**插入删除元素操作可能需要移动大量元素**来避免内存中有空位置。

### 链表
+ 链表有多种形式，其中最简单的一种是单链表，即**线性表的链式存储**。链表可以使用任意存储单元来存储元素而无需保证它们物理地址相连，元素结点之间通过指针相互关联。

+ 单就插入删除操作本身来讲，由于链表在内存中没有受限于连续，所以**只需通过修改元素结点中指针信息**即可实现，不需要移动元素。

## 性能分析
### 复杂度分析
我们以两种数据结构最大差别角度分析其复杂度，即访问操作和插入删除操作。  
+ 访问操作  
  + 数组  
    + 当预知要访问元素的下标，可以通过随机访问的方式进行访问操作，其时间复杂度为 `O(1)`.  
    + 当通过查找的方式进行访问，其时间复杂度会因为查找策略不同而改变。以存储着有序数据的数组使用二分查找策略为例，其时间复杂度为 `O(logn)`.
  + 链表  
    链表没有随机访问的特性，需通过遍历的方法从头依次访问。其时间复杂度为 `O(n)`.

+ 插入、删除操作  
  + 数组  
    + 因为涉及移动操作，在最好情况时，其时间复杂度为 `O(1)`, 最坏为 `O(n)`, 平均为 `O(n)`.
  + 链表  
    以单链表为例。  
    + 删除链表中某个具体值的元素  
      通过遍历操作寻找目标结点，其时间复杂度为 `O(n)`.
    + 删除给定指针指向的结点  
      为获取给定结点的前驱结点信息，仍需要从头遍历链表，其时间复杂度为 `O(n)`.
    + 在指定位置插入结点  
      需要知道指定位置的前驱结点信息，仍需要从头遍历链表，其时间复杂度为 `O(n)`.
    + 只考虑插入和删除操作本身  
      链表的插入和删除操作本身只需更改指针信息，而无须移动元素，其时间复杂度为 `O(1)`.

### 源码分析
以 Java 语言为例，对于[数组](/java/grammars.html#_2-7-数组)本身请参考 Java 相关笔记。

观察 Java 其提供的容器类 `ArrayList` 和 `LinkedList`.  

+ `ArrayList`  
`ArrayList` 类是对数组操作进行封装得到的容器，在 `java.util`包内。  

  + 插入和删除      
    我们先看插入方法：  
    + 方法通过调用 `System` 类中的 `arraycopy()` 函数复制数组来实现插入数据。在函数中， 首先将全局变量（真实的数组）赋值给函数局部变量 `elementData`，之后的操作具体分为两种情况：  
        + 当数组当前容量已经全部被数据填充，则触发 `grow()` 函数进行扩容。扩容后生成原来长度 1.5 倍的新数组，赋值给局部变量 `elementData`. 之后使用 `arraycopy()` 将原来的数组转移到新数组。
        + 当数组还未完全填充时，直接使用 `arraycopy()` 在本数组转移，即实现将相关元素向右移动。

    ``` java{6,7}
    public void add(int index, E element) {
            rangeCheckForAdd(index);
            modCount++;
            final int s;
            Object[] elementData;
            if ((s = size) == (elementData = this.elementData).length)
                elementData = grow();
            System.arraycopy(elementData, index,
                            elementData, index + 1,
                            s - index);
            elementData[index] = element;
            size = s + 1;
        }
    ```

    ``` java
    private Object[] grow(int minCapacity) {
            return elementData = Arrays.copyOf(elementData,
                                            newCapacity(minCapacity));
        }
    ```
    ``` java{4}
    private int newCapacity(int minCapacity) {
            // overflow-conscious code
            int oldCapacity = elementData.length;
            int newCapacity = oldCapacity + (oldCapacity >> 1);
            if (newCapacity - minCapacity <= 0) {
                if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA)
                    return Math.max(DEFAULT_CAPACITY, minCapacity);
                if (minCapacity < 0) // overflow
                    throw new OutOfMemoryError();
                return minCapacity;
            }
            return (newCapacity - MAX_ARRAY_SIZE <= 0)
                ? newCapacity
                : hugeCapacity(minCapacity);
        }
    ```
    删除操作和插入类似，都是通过 `arraycopy()` 完成具体操作。

  + 访问  
    在检查所指定下标是否越界后，调用 `elementData()` 函数进行访问操作。
    ``` java
    public E get(int index) {
        Objects.checkIndex(index, size);
        return elementData(index);
    }
    ```
    `elementData()` 函数的本质就是使用随机访问来访问数组的指定下标数据。
    ``` java
    E elementData(int index) {
        return (E) elementData[index];
    }
    ```

+ `LinkedList`  
  `LinkedList` 也是封装在 `java.util` 中的容器类，实现了链表的相关操作。特别需要注意的是，`LinkedList` 默认实现了双向链表。

  + 插入和删除  
    先看插入操作。  
    当指定位置与当前链表长度相同时，进行尾插(`linkLast()`)；不同时，在指定位置前调用`linkBefore()`插入。
    ``` java
    public void add(int index, E element) {
        checkPositionIndex(index);

        if (index == size)
            linkLast(element);
        else
            linkBefore(element, node(index));
    }
    ```
    在尾插时，将 `l` 指向原来的尾结点(`last` 指针指向的结点)。  
    然后申请一个新的结点，其 `prev`指针为 `l` 指向的原来的尾结点，`next` 指针指向 `null`. 因为新节点将为链表的最后一个结点，所以将`last` 指针指向新节点。  
    之后进行判断，若链表本身为空，则新节点为头结点，故 `first` 结点指向新节点；若链表不为空，则修改原来尾结点的 `next` 指针，使其指向新节点。
    ``` java
    void linkLast(E e) {
        final Node<E> l = last;
        final Node<E> newNode = new Node<>(l, e, null);
        last = newNode;
        if (l == null)
            first = newNode;
        else
            l.next = newNode;
        size++;
        modCount++;
    }
    ```
    在指定位置之前插入结点操作时，用指针 `succ` 指向目标结点。  
    目标结点的前驱结点标记为 `pred`（即用 `pred` 指针指向该前驱）。  
    申请新的结点，新结点的 `prev` 指针指向 `pred` 所指向的结点；新结点的 `next` 指针指向 `succ` 指向的结点。  
    修改目标结点的 `prev` 指针，使其指向新结点。  
    进行判断，若目标的前驱不存在，则新结点实则为链表的头结点，故将指针 `first` 指向新节点；若存在，则修改原来目标结点的 `next` 指针，使其指向新结点。
    ``` java
    void linkBefore(E e, Node<E> succ) {
        // assert succ != null;
        final Node<E> pred = succ.prev;
        final Node<E> newNode = new Node<>(pred, e, succ);
        succ.prev = newNode;
        if (pred == null)
            first = newNode;
        else
            pred.next = newNode;
        size++;
        modCount++;
    }
    ```
    类似的，删除链表结点的操作也通过修改相应的指针来实现。  
    *值得注意的是，由于使用了双向链表，可以直接获得前驱后继关系，所以不存在之前讨论的由于需要获取这样的关系而需遍历整个链表。故在双向链表中，插入删除的时间复杂度将下降为 `O(1)`.  

  + 访问  
    在检查所要求访问的位置未出界后，使用 `node()` 函数进行访问操作。  
    ``` java
    public E get(int index) {
        checkElementIndex(index);
        return node(index).item;
    }
    ```
    在 `node()` 函数中，根据位置和链表长度计算是在前一半还是后一半。若指定位置在前一半，则 `for` 循环正序遍历查找；若在后一半则 `for` 循环逆序遍历查找。
    ``` java
    Node<E> node(int index) {
        // assert isElementIndex(index);

        if (index < (size >> 1)) {
            Node<E> x = first;
            for (int i = 0; i < index; i++)
                x = x.next;
            return x;
        } else {
            Node<E> x = last;
            for (int i = size - 1; i > index; i--)
                x = x.prev;
            return x;
        }
    }
    ```
    因为需要遍历操作，时间复杂度为 `O(n)`.

## 结论
+ 从存取方式上看，数组可以顺序存取也可以随机存取，时间复杂度分别为 `O(n)` 和 `O(1)`；链表只能顺序存取，时间复杂度为 `O(n)`.  

+ 数组逻辑相邻的元素物理位置也相邻；链表逻辑相邻的元素物理位置不一定相邻。  

+ 按值查找时，若均使用顺序遍历查找，时间复杂度均为 `O(n)`。当对有序表进行二分查找时，数组的时间复杂度可以下降为 `O(logn)`.  

+ 按序号查找时，数组可以通过随机访问的方式来访问，时间复杂度为 `O(1)`；链表需要进行遍历，时间复杂度为 `O(n)`.

+ 对于插入删除操作本身：数组平均需要移动半个数组长度的元素；链表只需修改指针。  

+ 数组的空间密度要比数组高。  

+ 当数组需要扩容时，需要整体复制给新的更长的数组。故需要更长的时间开销。且当极端情况时，由于数组强制要求连续空间，而内存无法提供这样的空间时会发生 `OutOfMemory` 错误；链表天然地支持动态扩充。  

*上述“链表”均指单链表，其他形式的链表会有不同情况。

## 参考文献或资料
[1] 王道论坛.2020年数据结构考研复习指导[M].北京:电子工业出版社,2019  
[2] 王争.[数据结构与算法之美](https://time.geekbang.org/)  

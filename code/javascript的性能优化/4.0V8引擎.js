//V8:
//主流的js执行引擎
//即时编译
//内存设有上限 64位 1.5G 32位800M
//V8垃圾回收策略：
 //采用分代回收的思想
 //内存分为新生代、老生代
 //针对不同对象采用不同策略
//V8常用GC算法：
    //分代回收
    //空间复制
    //标记清除
    //标记整理
    //标记增量
//V8内存空间分为新生代对象存储空间（64位32M，32位16M），老生代对象存储空间（1.4G，700M）

//V8如何回收新生代对象：新生代指的是存活时间较短的对象（局部作用域中的对象，因为执行完毕就清除）
    //回收过程采用复制算法 + 标记清除
    //新生代分为两个等大的空间
    //使用空间为From，空闲空间为To
    //活动对象存储于From空间
    //标记整理后将活动对象拷贝至TO
    //From与To交换空间完成释放
//V8如何回收老生代对象：老生代指的是存活时间较长的对象（全局对象，闭包）    
    //标记清除，标记整理，增量标记
    //首先使用标记清除完成垃圾空间的回收（老生代存储空间大暂不考虑空间，首先考虑速度）
    //档把新生代的空间向老生代转移但是空间又不够，此时采用标记整理
    //采用增量标记进行效率优化
//标记增量如何优化垃圾回收
    //可以实现垃圾回收与程序执行交替执行
//新生代与老生代回收的对比
    //新生代使用空间换时间，老生代垃圾回收不适合复制算法，对象较多，而且会有空间浪费    
//内存问题的外在体现
    //页面出现延迟加载或经常性暂停（频繁的垃圾回收）
    //页面出现了持续性的糟糕的性能（内存膨胀）
    //页面的性能随着时间的加长越来越差（内存泄漏）
//监控内存的方式
    //内存泄漏：内存使用的持续升高
    //内存膨胀：为了达到最优性能申请的内存空间超出设备
    //频繁的垃圾回收：通过内存变化图进行分析
 //监控内存的方式
    //浏览器任务管理器
    //Timeline 时序图记录
    //堆快照查找分离DOM   
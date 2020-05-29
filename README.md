<!--
 * @Descripttion: 
 * @version: 
 * @Author: liannian9
 * @Date: 2020-05-22 07:53:47
 * @LastEditors: liannian9
 * @LastEditTime: 2020-05-29 07:41:06
--> 
# fed-e-task-01-02
part1模块二作业
## 简答题
### 1. 描述引用计数的工作原理和优缺点；

```
  工作原理：当对象进入执行栈之后，每个对象都会绑定一个引用计数器，每次对象被引用次数+1，删除引用次数-1，当次数为0
  说明该对象为垃圾对象，可以触发GC,
  优点：1.STW短，回收垃圾不需要遍历堆了,只针对某一个对象以及它所依赖的其它对象；
       2.发现垃圾立即回收，GC开销分摊于整个程序运行中,不需要挂起整个应用stw,最大程度减少程序暂停（时刻监控内存即
       将爆满，立即检查）(即刻回收垃圾，在更改引用时就知道该对象是否为垃圾若是垃圾立马进行回收(但是该操作会占用用
       户线程的时间片))
       3.不需要根据GC root遍历所有对象
  缺点：1.循环引用的对象无法回收；
       2.性能消耗大，每个对象都有一个计数器，每当一个对象的引用发生变化，需要它相关的域进行引用计数器的操作，不再
       指向次数-1，指向次数+1
```
### 2. 描述标记整理算法的工作流程；

```
  1.标记阶段：遍历所有对象，对通过根节点可以查找的存活对象进行标识；
  2.整理阶段:移动存活对象，按照内存地址次序进行排列，然后将末端地址以后的内存全部回收；
 
  优点：1.解决标记清除内存区域分散的缺点；
       2.可以回收循环引用对象
  缺点：1.不会立刻回收垃圾；
       2.因为js单线程机制，会暂停整个应用直至垃圾回收结束；
       
```

### 3. 描述V8中新生代存储区垃圾回收的流程；

```
  1.新生代存储区垃圾回收使用的时复制算法 + 标记整理；
  2.将空间等分为两个区域 from(使用),to(闲置)；
  3.所有对象存储于from区域，to区域闲置，当开始进行GC时，对from区域的对象进行遍历，
    找出所有的活动对象，复制到to区域，删除from区域的所有数据,此时to区域变为from区域，from区域变为to区域；
  4.在将from区域的活动对象复制到to区域时，如果经过一轮GC还存在的对象，或者此时to区域使用率超过25%，就会出现对象
  晋升（对象复制到老生代存储区）
```
### 4. 描述增量标记算法在何时使用及工作原理；
```
  增量标记主要用于老生代存储区垃圾回收中；老生代存储区的垃圾回收机制采用的时标记清除+标记整理+增量标记，其中标记清
  楚与标记整理的运行机制都是STW（stop-the-world），js的单线程的，在标记清楚与标记整理运行阶段，js主线程处理GC
  时其他操作都要停止，而老生代存储区中对象比较多，一次Gc操作占用时间比较长，此时无法处理任何操作会给用户带来不好的
  体验，因此引入了增量标记的概念，其与react的fiber类似，GC操作一段时间后就将执行权交还给主线程处理其他任务，处理
  完之后在沿着上次GC操作的时间点继续操作，如此往复，此时虽然在处理GC操作但是还是能与用户进行交互，用户体验较好。
```

## 代码题一（基于以下代码完成下面四个练习）

```
  const fp = require('lodash/fp');
  //数据
  // horsepower 马力 dollar_value 价格 in_stock 库存
  const cars =[
    {name: "Ferrari FFM", horsepower: 660 dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-Sn", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8n", horsepower: 525, dollar_value: 114200, in stock: false},
    {name: "ASton MArtin One-77", horsepower: 750, dollar_value: 1850000, in stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in stock: false}
  ]
```
### 练习1 使用函数组合fp.flowRight() c重新实现下面这个函数
```
  let isLastInStock = function (cars) {
    //获取最后一条数据
    let last_car = fp.last(cars)
    //获取最后一条数据 in_stock 属性值
    return fp.prop('in_stock', last_car)
  }
```
#### 解答
```
  let isLastInStock = fp.flowRight(fp.prop('in_stock'),fp.last)
  isLastInStock(cars)
```

### 练习2 使用fp.flowRight(), fp.prop(), fp.first()获取第一个car的name

#### 解答
```
  let isLastInStock = fp.flowRight(fp.prop('name'),fp.first)
  isLastInStock(cars)

```

### 练习3 使用帮助函数_average重构averageDollarValue，使用函数组合实现
```
  let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
  }//无需改动
  
  let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function (car) {
      return car.dollar_value
      }, cars)
      return _average(dollar_values)
    })
  }
  
```

#### 解答
```
let averageDollarValue = fp.flowRight(_average,fp.map(item => item.dollar_value))
averageDollarValue(cars)

```

### 练习4 使用flowRight 写一个sanitizenames()函数，返回一个下划线链接的小写字符串，把数组中的name转化为这种形式：例如：sanitizenames(["Hello World"]) => ["hello_world]

```
let _underscore = fp.replace(/\W+/g, '_) // 无需改动，并在函数中使用它
```
#### 解答
```
  let sanitizenames = fp.map(item => {
      item.name = fp.flowRight(_underscore, fp.toLower)(item.name)
      return item
  })
  sanitizenames(cars)
```

## 代码题二（基于以下代码完成下面四个练习）
```
//support.js
class Container {
  static of (value) {
    return new Container(value)
  }
  constructor (value) {
    this._value = value
  }
  map (fn) {
    return Container.of(fn(this._value))
  }
}
class Maybe {
  static of (x) {
    return new MayBe(x)
  }
  constructor (x) {
      this._value = x
  }
  map(fn) {
      return this.isNothing() ? this : Maybe.of(fn(this._value))
  }
  isNothing() {
      return this._value === null || this._value === undefined
  }
}

module.exports = {
  Maybe,
  Container
}
```
### 练习1 使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1

```
const fp = require('lodash/fp')
const {Maybe, Container} = require('./support')
let maybe = Maybe.of([5,6,1])
let ex1 = //实现
```

#### 解答：
```
  function ex1(maybe, num) {
    return maybe.map(fp.map(fp.add(num)))._value
  }
  ex1(maybe, 1) // [ 6, 7, 2 ]
  
  fp.curry(maybe)(1)

```
### 练习2 实现一个函数ex2能够使用fp.first获取列表的第一个元素

```
const fp = require('lodash/fp')
const {Maybe, Container} = require('./support')
let xs = Container.of(['do','ray','me','fa','so','la','ti', 'do])
let ex2 = //实现
```

#### 解答：
```
function ex2(xs) {
  return xs.map(fp.first)._value
}
ex2(xs) // 'do'
```

### 练习3 实现一个函数ex3，能够使用safeProp和fp.first找到user的名字的首字母

```
const fp = require('lodash/fp')
const {Maybe, Container} = require('./support')
let safeProp = fp.curry(function (x, o) {
  return MayBe.of(o[x])
})
let user = {id:2, name:'Albert'}
let ex3 = //实现
```
#### 解答
```

  function ex3(user) {
    let getName = safeProp('name')
    return getName(user).map(fp.first)._value
  } 
  ex3(user) // 'A'
```

### 练习4 使用Maybe重写ex4，不要有if语句

```
const fp = require('lodash/fp')
const {Maybe, Container} = require('./support')
let ex4 = function (n) {
  if (n) return parseInt(n)
}

```

#### 解答
```
  加入undefined兼容null，0， false等参数

  let ex4 = function(n) {
    return Maybe.of(n || undefined).map(parseInt)._value
  }
```
<!--
 * @Descripttion: 
 * @version: 
 * @Author: liannian9
 * @Date: 2020-05-22 07:53:47
 * @LastEditors: liannian9
 * @LastEditTime: 2020-05-26 21:37:55
--> 
# fed-e-task-01-02
part1模块二作业
## 简答题
### 1. 描述引用计数的工作原理和优缺点；

### 2. 描述标记整理算法的工作流程；

### 3. 描述V8中新生代存储区垃圾回收的流程；

### 4. 描述增量标记算法在何时使用及工作原理；

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
  function ex1(maybe) {
    let fn = fp.map((item) => {
        return fp.add(1, item)
      })

    return maybe.map(fn)._value
  }
  ex1(maybe) // [ 6, 7, 2 ]

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
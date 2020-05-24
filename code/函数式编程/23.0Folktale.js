//Folktale一个标准的函数式编程库
//么有太多的功能函数
//只提供了一些函数式处理的操作，如compose，curry一些函子Task，Either，MayBe

const {compose, curry} = require('folktale/core/lambda')
const {toUpper, first} = require('lodash/fp')
//第一个参数表名后面函数的参数个数
let f = curry(2, (x, y) => {
    return x + y
})
console.log(f(1))
console.log(f(1)(2))
console.log(f(1, 2))

let f1 = compose(toUpper, first)
console.log(f1(['one', 'two']))
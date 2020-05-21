export {};
//柯里化:将多元函数转化为一元函数（多参函数转化为一参函数）
//当一个函数有多个参数的时候先传递一部分参数调用它(这部分参数永远不变)
//返回一个新的函数接受剩余参数，返回结果
const _ = require("lodash")

function getSum(a:number,b:number,c:number) {
    return a + b + c
}

let KLHfun = _.curry(getSum)

//结果一样都为6
console.log(KLHfun(1,2,3)) //多元
console.log(KLHfun(1)(2,3))
console.log(KLHfun(1, 2)(3))
console.log(KLHfun(1)(2)(3)) //一元
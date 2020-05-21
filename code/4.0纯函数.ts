export {}
//纯函数：相同的输入永远会得到相同的输出，没有任何可观察的副作用
//函数式编程在执行过程中不会保留计算中间的结果，所以变量时不可变的（无状态）
//可以把一个函数的处理结果交给另一个函数处理
//数组的slice与splice 分别是纯函数与非纯函数

let arr:Array<number> = [1, 2,3,4];
//纯函数
console.log(arr.slice(0,3));
console.log(arr.slice(0,3));
console.log(arr.slice(0,3));
// [ 1, 2, 3 ]
// [ 1, 2, 3 ]
// [ 1, 2, 3 ]

//相同的输入相同的输出

//不纯函数
console.log(arr.splice(0,3));
console.log(arr.splice(0,3));
console.log(arr.splice(0,3));
// [ 1, 2, 3 ]
// [ 4 ]
// []
//有副作用，改变原数组

//纯函数
function test(x:number, y:number) {
  return x +y
}

console.log(test(1, 2))
console.log(test(1, 2))
console.log(test(1, 2))
console.log(test(1, 2))
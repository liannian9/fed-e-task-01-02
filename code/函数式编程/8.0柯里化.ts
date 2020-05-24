export {}

//柯里化:将多元函数转化为一元函数（多参函数转化为一参函数）
//当一个函数有多个参数的时候先传递一部分参数调用它(这部分参数永远不变)
//返回一个新的函数接受剩余参数，返回结果
// function checkAge(age:number) {
//   let mini = 18;//硬编码 数据直接嵌入到程序或其他可执行对象
//   return age > mini
// }


//普通纯函数
function checkAge(mini:number, age:number) {
  return age > mini
}

console.log(checkAge(18, 20))
console.log(checkAge(18, 22))
console.log(checkAge(20, 22))

//柯里化
function checkAgeKLH(mini:number) {
  return function (age:number) {
    return age > mini
  }
}

let checkAge18 = checkAgeKLH(18);
let checkAge20 = checkAgeKLH(20);

console.log(checkAge18(20))
console.log(checkAge18(22))
console.log(checkAge20(22))
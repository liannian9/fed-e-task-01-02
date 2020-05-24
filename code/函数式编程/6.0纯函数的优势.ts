export {}
//1.可缓存（因为纯函数对相同的输入有相同的输出，所以可以缓存纯函数的结果）
//2.可测试 测试更方便
//3.并行处理 不需要访问共享内存，在并行环境下可任意运行纯函数

//记忆函数
const _ = require('lodash')


function getArea(r:number) {
  console.log(r);
  return Math.PI * (r ** 2);
}

let getAreaWithMemory = _.memoize(getArea);
//console.log() 只执行了一次 其余都是取得缓存
console.log(getAreaWithMemory(5))
console.log(getAreaWithMemory(5))
console.log(getAreaWithMemory(5))
console.log(getAreaWithMemory(5))
/* 5 ===> r
78.53981633974483
78.53981633974483
78.53981633974483
78.53981633974483 */

//模拟memorize 方法

interface memorizeType {
  (num:number):number
}
interface cacheType {
  [props:string]:number
}
function memorize (f:memorizeType) {
  let cache:cacheType = {}
  return function (num:number) {
    let key = JSON.stringify(num)
    cache[key] = cache[key] || f.apply(f, [num])
    return cache[key];
  }
}

let getAreaWithMemoryMIne = memorize(getArea);
//console.log() 只执行了一次 其余都是取得缓存
console.log(getAreaWithMemoryMIne(5))
console.log(getAreaWithMemoryMIne(5))
console.log(getAreaWithMemoryMIne(5))
console.log(getAreaWithMemoryMIne(5))

/* 5
78.53981633974483
78.53981633974483
78.53981633974483
78.53981633974483 */
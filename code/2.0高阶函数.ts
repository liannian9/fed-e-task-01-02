//高阶函数-函数作为参数
interface fnType {
  (item:number):void
}
interface filterType {
  (item:number):boolean
}

function forEach(array:number[], fn:fnType):void {
  for(let i = 0; i<array.length; i++) {
    fn(array[i])
  }
}

//测试
let arr = [1, 2, 3, 4, 5]

forEach(arr, function (item:number) {
  console.log(item)
})

function filter(array:number[], fn:filterType):number[] {
  let results:number[] = []
  for(let i = 0; i<array.length; i++) {
    if(fn(array[i])){
      results.push(array[i])
    }
  }
  return results;
}

let newArr = filter(arr, function(item) {
    return item % 2 === 0
})

console.log(newArr)//[ 2, 4 ]


//高阶函数 - 函数作为返回值

function makeFn () {
  let msg = "hello function"
  return function () {
    console.log(msg)
  }
}

const fn = makeFn()

fn() // hello function
makeFn()() // hello function

//once 一个函数只执行一次
function once (fn:any) {
  let done = false;
  return function (...arg:number[]) {
    if (!done) {
      done = true;
      return fn.apply(this, arg)
    }
  }
}
let pay = once(function (money:number) {
  console.log(money)
})
//执行一次5
pay(5)
pay(5)
pay(5)
pay(5)
pay(5)


//高阶函数的意义
  // 高阶函数用来抽象通用的问题
  // 抽象可以帮助我们屏蔽细节，只关注目标；
//常用的高阶函数 数组的新方法
interface mapType{
  (item:any):any
}
function map (array:Array<number>, fn:mapType) {
  let results = [];
  for(let value of array) {
    results.push(fn(value))
  }
  return results;
}
let mapArr = map(arr, function (item:any) {
    return item * item;
})
console.log(mapArr) //[ 1, 4, 9, 16, 25 ]


interface everyType{
  (item:any):boolean
}
function every (array:Array<number>, fn:everyType):boolean {
  let results = true;
  for(let value of array) {
    results = fn(value);
    if (!results) {
      break
    }
  }
  return results;
}
let everyRes = every(arr, function (item:any):boolean {
    return item > 6;//false
    return item > 0; //true
})
console.log(everyRes) //true


interface someType{
  (item:any):boolean
}
function some (array:Array<number>, fn:someType):boolean {
  let results = false;
  for(let value of array) {
    results = fn(value);
    if (results) {
      break
    }
  }
  return results;
}
let someRes = some(arr, function (item:any):boolean {
    return item > 4;//true
    return item > 6; //false
})
console.log(someRes) //true
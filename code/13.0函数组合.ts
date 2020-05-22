//函数组合
//纯函数与柯里化很容易生成洋葱代码


//如果一个函数需要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数
//函数组合默认从右到左执行

//fn = compose(f1,f2,f3)
//fn(a) 执行顺序 f3 => f2 => f1
type  fType = (arg:any) => any
type  gType = (arg:any) => any


function compose (f:fType, g:gType) {
  return function (value:any) {
    return f(g(value))
  }
}

function reverse (array:any[]) {
  return array.reverse()
}
function first (array:any[]) {
  return array[0]
}

const last = compose(first, reverse);

console.log(last([2, 3, 4, 5]));//5
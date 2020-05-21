//柯里化案例
export {}
''.match(/\s+/g) //匹配空白
''.match(/\d+/g) //匹配数字
interface regType {
  (reg:RegExp, str:string):boolean
}
const _ = require('lodash');
const match = _.curry(function (reg:RegExp, str:string) {
  return str.match(reg);
})

const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)

const filter = _.curry((fun:(item:string,index:number) => boolean, array:string[]) => array.filter(fun))

let filterSpace = filter(haveSpace)

console.log(filterSpace(['john conna', 'john_conna']))
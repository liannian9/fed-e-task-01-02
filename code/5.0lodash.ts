export {}
const _ = require('lodash');

const arr:Array<string> = ['jack', 'tom', "luck", "kayte"]
console.log(Array.prototype.reverse.call(arr))
console.log(_.first(arr))
console.log(_.last(arr))
console.log(_.reverse(arr)) //reverse 非纯函数
console.log(arr);
console.log(_.toUpper(_.first(arr)))
const r = _.each(arr, (item:string, index:number) => {
    console.log(item, index)
})
console.log(r);




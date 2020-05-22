// flow 从左到右  flowRight 从右到左

export {};

const _ = require("lodash")

function reverse (array:any[]) {
  return array.reverse()
}
function first (array:any[]) {
  return array[0]
}
interface upperType {
  (s:any) : string
}
const toUpper : upperType = (s:any) => s.toUpperCase()

const compose = _.flowRight(toUpper, first, reverse)

console.log(compose([5, 6, 'ssss']))
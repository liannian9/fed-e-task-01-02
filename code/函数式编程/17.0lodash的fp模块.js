const fp = require('lodash/fp')
const _ = require('lodash')
//
let str = 'NEVER SAY DIE';

// console.log(fp.split(str, ' ', 2))

const log = v => {
  console.log(v);
  return v;
}

const f = fp.flowRight(fp.join('-'), log,  fp.map(fp.toLower), log,  fp.split(' '))
console.log(f(str))


//lodash  数据有限 函数滞后
//lodash fp模块 函数优先数据滞后


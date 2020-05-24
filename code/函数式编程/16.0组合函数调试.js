const _ = require('lodash')

let str = 'NEVER SAY DIE';

// console.log(_.split(str, ' ', 2))

const split = _.curry((sep, str) => _.split(str, sep))
const join = _.curry((sep, arr) => _.join(arr, sep))
const log = v => {
  console.log(v);
  return v;
}
const f = _.flowRight(join('-'), log,  _.toLower, log,  split(' '))
console.log(f(str))
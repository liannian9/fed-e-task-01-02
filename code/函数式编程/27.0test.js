const fp = require('lodash/fp')


class Maybe {
  static of (x) {
    return new Maybe(x)
  }
  constructor (x) {
      this._value = x
  }
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value))
  }
  isNothing() {
      return this._value === null || this._value === undefined
  }
}

class Container {
  static of (value) {
    return new Container(value)
  }
  constructor (value) {
    this._value = value
  }
  map (fn) {
    return Container.of(fn(this._value))
  }
}
// console.log(Maybe.of([5,6,1]));
// // console.log(fp.add(5,6))
// console.log(fp.map((item) => {
//   console.log(item, 'map')
//   return item
// },[5,6]))

// function addMap(arr) {
//   return fp.map((item) => {
//     return fp.add(1, item)
//   }, arr)
// }
function compose (...arg) {
  return function (value) {
      return arg.reduceRight((prev, curr) => {
          return curr(prev)
      }, value)
  }
}
function curry (fn) {
    return function curryFn(...arg) {
      if (arg.length < fn.length) {
        return function () {
            return curryFn(...arg.concat([...arguments]))
        }
      }
      return fn(...arg)
    }
}
let maybe = Maybe.of([5,6,1])

function ex1(maybe) {
  let fn = fp.map((item) => {
      return fp.add(1, item)
    })

  return maybe.map(fn)._value
}
// function addMap(arr) {

//   return fp.map((item) => {
//     return fp.add(1, item)
//   }, arr)
// }


console.log(ex1(maybe), 'ex1')

let xs = Container.of(['do','ray','me','fa','so','la','ti', 'do']);

// console.log(xs, 's')
// function ex2(xs) {
//   return xs.map(fp.first)._value
// }

// console.log(ex2(xs), 'ex2')

let safeProp = fp.curry(function (x, o) {
  console.log(o, x, o[x])
  return Maybe.of(o[x])
})
// // function ex3 (user) {
// //   console.log(user, 'user')
// //   return fp.first(user.name)
// // }
let user = {id:2, name:'Albert'}


// // console.log(safeProp(user)(ex3))

function ex3(user) {
  let getName = safeProp('name')
  return getName(user).map(fp.first)._value
}
console.log(ex3(user), 'ex3')



let ex4 = function (n) {
  if (n) return parseInt(n)
}
console.log(ex4(false))
let ex5 = function(n) {
  return Maybe.of(n).map(parseInt)._value
}
console.log(ex5(false))

// Maybe.of(n).map(parseInt)

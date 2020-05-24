function compose (...args) {
  return function (value) {
    return args.reduceRight((pre, curr) => {
      return curr(pre)
    },value)
  }
}
const compose2 = (...args) => (value) => args.reduceRight((pre, curr) => curr(pre), value)

const first = (arr) => arr[0]
const reverse = (arr) => arr.reverse()
const toUpperCase = (s) => s.toUpperCase()

// 结合律 可以任意结合 只要函数 f,g,h顺序不变

// const last = compose2 (toUpperCase, first, reverse)
// const last = compose2 (compose2(toUpperCase, first), reverse)
const last = compose2 (toUpperCase, compose2(first, reverse))

console.log(last(['l', 'j', 'y']))
//IO 函子
// IO函子中的_value是一个函数，这里把函数作为值来处理
// IO函子可以把不纯的动作存储到_value中，延迟执行这个不纯的操作（惰性执行），包装当前的操作
// 把不纯的操作交给调用者处理

const fp = require('lodash/fp')
const fs = require('fs')
class IO {
    static of(value) {
        return new IO(function () {
            return value
        })
    }
    constructor(fn) {
        this._value = fn;
    }
    map (fn) {
        return new IO(fp.flowRight(fn, this._value));
    }
}

//
let io = IO.of(process).map(p => p.execPath)

console.log(io._value())


//IO函子的问题

let readFile = function (filename) {
    return new IO(function () {
        return fs.readFileSync(filename, 'utf-8')
    })
}

let print = function (x) {
    return new IO(function () {
        console.log(x);
        return x;
    })
}

let cat = fp.flowRight(print, readFile)
//IO { _value: [Function] }
let r = cat('./package.json')._value()._value()

console.log(r)
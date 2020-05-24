//Monad函子（解决函子嵌套）

//可以变扁的Pointed函子
//一个函子如果具有join与of两个方法并且遵守一些定律就是一个Monad函子


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
    join () {
        return this._value()
    }
    flatMap (fn) {
        return this.map(fn).join()
    }
}
 
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

let r = readFile('./package.json')
            .flatMap(print).join()

console.log(r)
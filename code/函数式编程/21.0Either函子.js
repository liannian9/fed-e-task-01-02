//Either 函子
// Either两者中的任何一个，类似 if...else...
//异常会让函数变得不纯，Either函数可以用来做异常处理


class Left {
    static of(value) {
        return new Left(value)
    }
    constructor(value) {
        this._value = value;
    }
    map (fn) {
        return this;
    }
}


class Right {
    static of(value) {
        return new Right(value)
    }
    constructor(value) {
        this._value = value;
    }
    map (fn) {
        return Right.of(fn(this._value));
    }
}

let right = Right.of(12).map(x => x + 2)
let left = Left.of(12).map(x => x + 2)
console.log(right, left)//Right { _value: 14 } Left { _value: 12 }

function parseJSON (str) {
    try {
        return Right.of(JSON.parse(str))
    } catch (error) {
        // console.log(error)
        return Left.of({err:error.message})
    }
}

let r = parseJSON('{name:zs}')
let r2= parseJSON('{"name":"zs"}').map(x => x.name.toUpperCase())

console.log(r, r2)
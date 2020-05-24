//MayBe 函子

class MayBe {
    static of(value) {
        return new MayBe(value)
    }
    constructor(value) {
        this._value = value;
    }
    map (fn) {
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
    }
    isNothing(){
        return this._value === null || this._value === undefined
    }
}
// MayBe { _value: 'HELLO' }
// let r = MayBe.of('hello')
//             .map(x => x.toUpperCase())
// MayBe { _value: null }
// let r = MayBe.of(null)
// .map(x => x.toUpperCase())

// MayBe { _value: null }  无法判断是哪个阶段出现的null
let r = MayBe.of('hell word')
.map(x => x.toUpperCase())
.map(x => null)
.map(x => x.toUpperCase())
console.log(r)
//函子:一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理（变形关系）
//为什么要学：可以帮助我们在函数时编程中将副作用控制在可控范围内
//总计：
//函数式编程的运算不直接操作值，而是由函子完成
//函子就是一个实现了map契约的对象
//我们可以把函子想象成一个盒子，盒子内封装了一个值
//想要处理盒子中的值，我们需要给盒子的map方法传递一个处理值的函数（纯函数），由这个函数来处理值
//最终map返回一个包含新值的盒子（函子）
class Container {
    static of (value) {
        return new Container(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Container.of(fn(this._value))
    }
}
console.log(Container.of(2)._value)

//传入null与undefined的问题

//TypeError: Cannot read property 'toUpperCase' of null
console.log(Container.of(null).map((x) => x.toUpperCase()))

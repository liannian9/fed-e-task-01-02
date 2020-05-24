//对象间的循环引用 引用计数垃圾回收机制失效
function fn() {
    const obj1={};
    const obj2={};
    obj1.name=obj2;
    obj2.name=obj1;
    return 'coder'
}

fn()
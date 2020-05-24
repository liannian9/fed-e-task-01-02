//js中的垃圾

//js中垃圾管理是自动的
//对象不再引用时是垃圾
//对象不能再从根上访问到是垃圾


//可达对象（呢个够访问到的对象）
//可以访问到的对象就是可达对象（引用，作用域链）
//可达的标准，从根出发能否被找到
//js中的根可以理解为全局对象

let obj = {name:'xm'};//引用

let obj2 = obj; //空间多了一次引用

obj = null;

console.log(obj2, obj)//{name:'xm'} null


function objGroup (obj1, obj2) {
    obj1.next = obj2;
    obj2.prev = obj1;
    return {
        o1:obj1,
        o2:obj2
    }
}


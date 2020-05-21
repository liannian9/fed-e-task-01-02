export {}
//闭包（closure）：函数和启周围状态（词法环境）的引用捆绑在一起形成闭包
    // 可以在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域中的成员
  /* 闭包的本质：函数在执行的时候会放到一个执行栈上当函数执行完毕后会从执行栈上移除，
  但是堆上作用域成员因为被外部引用不能释放，因此内部函数仍然可以访问外部成员 */



  const testFn1 = function testFn1() {
    debugger
    let msg = 'testFn1';
    debugger
    return function testFn2() {
      debugger
      let msg2 = "testFn2"
      let msg4 = "testFn4"
      debugger
      return function testFn3() {
        debugger
        console.log(msg2)
        debugger
        return 123
      }
    }
  }
  
  let fn = testFn1()()
  fn()

  //以上代码当执行到testFn3时 闭包区域只有testFn2的msg变量，其余全部释放，因此闭包中作用域保存的仅为被调用的变量
  //(与内部函数相关的变量会缓存下来)
  //callStack 调用栈
  //scope下面
    //global全局作用域
    //local局部作用域
    //script let const 定义的变量
    //closure 闭包
 
  
  interface powerType {
    (num:number):number
  }
  function makePower (power:number):powerType {
      return function (number) {
        return Math.pow(number, power)
      }
  }

  let power2 = makePower(2);
  let power3 = makePower(3);

  console.log(power2(4)); //16
  console.log(power3(4)); // 64
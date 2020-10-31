# 简答题
## JS异步编程
   Js的执行环境是单线程的。所谓单线程就是一次只能执行一个任务，多个任务就要排队，当前面的任务响应时间过长导致卡死时，会影响后面的任务不能执行。
   JS的异步编程，可以很好的改善单线程带来的问题，它使每一个任务有一个或多个回调函数（callback），当前一个任务结束后，
                此时不会去执行后一个任务，而是执行回调函数，而后一个任务则是不等前一个任务结束就会执行。
                这样可以很好的解决因前面业务时间过长，而后面任务不能执行的问题。
## EventLoop、消息队列
   1、所有同步任务都在主线程（由JS引擎维护，用来负责解释和执行JavaScript代码）上执行，形成一个执行栈（execution context stack）。
   2、主线程之外，还存在一个"消息队列"（queue）（特点：先进先出）。只要异步任务有了运行结果，就在"消息队列"之中放置一个事件。
   3、一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"消息队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
   4、主线程不断重复上面的第三步。 

## 什么是宏任务，什么是微任务

宏任务是由宿主(Node、浏览器)发起的，而微任务由JavaScript自身(JS引擎)发起。

详情参见[JavaScript异步编程【上】](https://blog.csdn.net/zimeng303/article/details/109305444)


# 代码题
## 改写 setTimeout嵌套
function p (str) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(str)
        }, 10)
    }) 
}

p('hello ').then(value => p(value + 'lagou '))
           .then(value => p(value + 'I ❤ U'))
           .then(value => console.log(value))

## 四个练习

### 1. 
let isLastInStock = function (cars) {
    return fp.flowRight(fp.prop('in_stock'), fp.last)(cars)
}

### 2.
let getFirstInName = function (cars) {
    return fp.flowRight(fp.prop('name'), fp.first)(cars)
}

### 3.
let averageDollarValue = function (cars) {
    return fp.flowRight(_average, fp.map('dollar_value'))(cars)
}

### 4.
let sanitizeNames = function (cars) {
    return fp.flowRight(_underscore, fp.map(fp.toLower))(cars)
}
sanitizeNames(["Hello World"]) // ["hello_world"]

# 手写实现 Promise 源码


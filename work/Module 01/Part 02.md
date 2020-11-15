一、
var a = []
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    }
}
a[6]()

打印结果：10

原因：在这里，i使用的是var进行定义的，而var是没有块级作用域的概念的，因此这里的i可以看做是全局变量，也就是说，数组a的成员里面的i，指向的都是同一个i。因此当我们在外部调用a[6]()时，所打印的i应该是全局变量i，而在最后一轮循环中由于i = 10，并不满足 i < 10的条件，所以 i的最后结果是10，最后的打印结果是 10。 

二、
var tmp = 123
if (true) {
    console.log(tmp);
    let tmp
}
结果：报错ReferenceError

原因：虽然使用var关键字声明了tmp全局变量，但是在 if 语句中，又使用let 关键字声明了一个局部变量tmp，导致局部变量tmp就绑定了这个作用域，形成了暂时性死区，所以在let声明tmp之前，使用tmp，就会报错。

三、
var arr = [12, 34, 32, 89, 4]
var min = Math.min(...arr)
console.log(min)

四、



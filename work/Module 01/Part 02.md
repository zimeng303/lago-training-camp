一、
```c
var a = []

for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    }
}
a[6]()

打印结果：10

原因：
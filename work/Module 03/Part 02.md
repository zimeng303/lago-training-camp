###  1、请简述 Vue 首次渲染的过程。

* 1，在 `src/core/index.js` 中调用 initGlobalAPI(Vue) ，初始化 Vue 静态成员

>  initGlobalAPI(Vue)   在 `src/core/global-api/index.js` 中定义

* 2，在 `src/core/instance/index.js` 中，定义 Vue 的构造函数
* 3，在 `src/core/instance/index.js` ，调用多个注册 Vue 实例成员的方法，实现 Vue 的初始化；
* 4，执行 new Vue() 时，会找到 `src/core/instance/index.js` 文件中的 Vue 构造函数，并创建 Vue 的实例，调用 _init() 方法；_
* 5，_init() 是在 `src/core/instance/init.js` 文件中定义的的 initMixin() 中 注册的，初始化 vm，并且调用 vm.$mount() 挂载整个页面；
* 6，首先，会找到 `src/platforms/web/entry-runtime-with-compiler.js` 中定义的 $mount() 方法，根据用户传入的 this.$options ，判断是否传入了 render 函数，若没有，则调用 compileToFunctions() 将 template 转化为 render 函数。最后会返回 mount.call(this, el, hydrating)，调用 mount()；
* 7，然后，会执行 `src/platforms/web/runtime/index.js` 中定义的 $mount()，并返回 mountComponent(this, el, hydrating) ；
* 8， mountComponent() 在 `src/core/instance/lifecycle.js` 中定义，

> 1）会先判断用户是否传入 render 函数，如果没有传入 render 函数，会创建 空VNode；并且如果当前是开发环境的话，会发送警告。
>
> 2）会调用 callHook()，触发 beforeMount 生命钩子；
>
> 3）定义 updateComponent (更新组件)，实现挂载，会调用 vm.`_update`(vm.`_render()`, hydrating) ，`vm._update() `在 `src/core/instance/lifecycle.js` 中定义，将 VNode 转换为 真实DOM，`vm._render` 在 `src/core/instance/render.js` 中定义，渲染虚拟 DOM；
>
> 4）创建 Watcher 实例，并且传递 updateComponent ，调用 get() 方法；

* 9，在 `src/core/observer/watcher.js` 中定义 Watcher 类，

> 1）创建完 watcher 会调用一次 get()；
>
> 2）调用 updateComponent()；
>
> 3）调用 vm._render() ，创建 VNode；
>
> 4）调用 vm.update(vnode, ...)

* 10， 在 mountComponent() 的最后，会触发 mounted 生命钩子，此时页面渲染完成；并返回 vm （Vue 实例）。

![](C:\Users\li_sh\Desktop\WebStudy\LaGou\03-module\02-min-module\assets\首次渲染过程.png)

详细参见：【[https://blog.csdn.net/zimeng303/article/details/111562719](https://blog.csdn.net/zimeng303/article/details/111562719)】

### 2、请简述 Vue 响应式原理。

* 使用 new Vue() 创建 Vue 实例时，触发 `src\core\instance\index.js` 中的 Vue 构造函数，从而调用 `_init() ` 方法，`_init()` 方法是在 `initMixin() `中进行注册的；在 `src/core/instance/init.js` 中导出 `initMixin() `  ，并在 `initMixin() ` 中注册 `_init()` 方法，`_init()` 是整个 Vue 的入口；在 `_init()` 中调用`initState()`初始化 vm 的 `_props/methods/_data/computed/watch`，在`initState`方法中调用了`initData()`， `initData()`是把 `data ` `中的成员 注入到 Vue 实例中，并且调用`observe(data)`将`data`对象转化成响应式的对象。

* 在 `src/core/observer/index.js` 中定义 `observe()` ，`observe()` 是数据响应式的入口，
  * 判断 value 是否是对象 或者 value 是否是 VNode 的实例，如果不是对象，但是是 VNode 则直接返回；

  * 判断 value 对象是否有 `__ob__`，
    * 如果有直接返回 `observer` 对象，类似于缓存，提升性能
    * 如果没有，则创建 observe 对象，返回 observer 对象。

* 创建 observer 对象，即 new 一个 Observer 的实例。Observer 构造函数 在 `src/core/observer/index.js` 中定义，给当前传入的`value`对象(即 vm._data) 添加不可枚举的`__ob__`属性，并将当前的`observer`实例对象挂载到 `value.__ob__` 中，然后再进行数组的响应式处理和对象的响应式处理。
  * **数组的响应式处理**，就是重写数组中修改原数组的方法，如 `push`、`pop`、`shift` 等，当执行数组的 `push`、`unshift`、`splice`(插入或替换元素) 方法 ，对数组中新插入的元素，会调用 `observer` 实例的 `observeArray()` 方法，重新遍历数组元素，并将其设置为响应式数据。最后，调用数组的 `observer` 对象中的 `dep` 依赖的 `notify()`方法，进行发送通知操作。
  * **对象的响应式处理**，就是调用 `observer` 对象的 `walk()` 方法，遍历对象中的每一个属性，调用 `defineReactive()` ，为每一个属性添加 `setter` / `getter`。

* `defineReactive` 方法，为每一个属性创建 `dep` 实例对象，`dep`负责为当前属性 key 收集依赖，即收集当前观察属性的 Watcher。如果当前属性的值是对象，会进行深度监听，并调用`observe`。`defineReactive`中利用 `Object.defineProperty() `为属性添加 `getter` 和 `setter`。其中，`getter` 的作用是收集依赖，即为当前的 `Watcher `对象添加依赖，1个 `watcher` 会对应多个 `dep`（即，要观察的属性很多） 。如果这个属性的值是对象，那也要给子对象添加依赖，最后返回属性的值。在`setter` 中，先保存新值，如果新值是对象，也要调用 `observe` ，观察子对象并返回子对象的 observer 对象，然后，调用`dep.notify()`，进行派发更新（发送通知）。
* 收集依赖时，在`watcher`对象的`get`方法中调用`pushTarget`,记录`Dep.target`属性。访问`data`中的成员的时候收集依赖，`defineReactive`的`getter`中收集依赖。把属性对应的 `watcher` 对象添加到`dep`的`subs`数组中，给`childOb`收集依赖，目的是子对象添加和删除成员时发送通知。
* 在数据发生变化的时候，会调用`dep.notify()`发送通知，在 `dep.notify()`中会调用`watcher`对象的`update()`方法，`update()`中的调用的`queueWatcher()`去判断`watcher`是否被处理，如果watcher没有被处理，则添加到`queue`队列中，并调用`flushScheduleQueue()`。
* 在 `flushScheduleQueue()` 中，会渲染 Watcher， 触发 `beforeUpdate` 生命钩子函数，并调用`watcher.run()`：`run()` 中，调用 `get()` ，获取属性的新值，get() 中，`value = this.getter.call(vm, vm)`获取新值，调用 `this.cb()`，即调用 `updateComponent`，渲染 `watcher`。最后，调用 `resetSchedulerState()`，清空上一次的依赖；调用 `callActivatedHooks(activatedQueue)`，触发 actived 钩子函数；调用 `callUpdatedHooks(updatedQueue)`，触发 updated 钩子函数。

![](C:\Users\li_sh\Desktop\WebStudy\LaGou\03-module\02-min-module\assets\响应式处理过程.png)

 详细参见：【[https://blog.csdn.net/zimeng303/article/details/111562719](https://blog.csdn.net/zimeng303/article/details/111562719)】

### 3、请简述虚拟 DOM 中 Key 的作用和好处。

`key` 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

有相同父元素的子元素必须有**独特的 key**。重复的 key 会造成渲染错误。

它也可以用于强制替换元素/组件而不是重复使用它。

### 4、请简述 Vue 中模板编译的过程。

* 在 `src/platforms/web/entry-runtime-with-compiler.js` 中，调用 `compileToFunctions()` ，先从缓存中加载编译好的 render 函数，缓存中没有，调用 compile(template, options)。最后，返回 {render, staticRenderFns}，将 template 转换成 render 函数。`compileToFunctions` 函数是模板编译的入口。
* 在 `compileToFunctions()` 中会调用 `createCompiler(baseOptions)`，定义 `compile(template, options) `函数，合并 options。最后，生成 `compileToFunctions`，返回 `{compile, compileToFunctions}`。
* 在 `createCompilerCreator(function baseCompile(){})`中，传入了 `baseCompile(template, finalOptions)` 函数。在 ``baseCompile()` 中， 调用 `parse()`，将模板解析为抽象语树 AST，只有将模板解析成 AST 后，才能基于它做优化或者生成代码字符串。调用 `optimize()`，优化抽象语法树，检测子节点中是否是纯静态节点，检测到静态子树，设置为静态，不需要在每次重新渲染的时候，重新生成节点，patch 阶段跳过静态子树。调用 `generate` ，把优化后的 AST 转换成字符串形式的代码。最后，返回 createCompiler 函数。
* 在`compileToFunctions()` 中，调用 `createFunction()`，把上一步生成的字符串形式js代码转换为函数，render 和 staticRenderFns 初始化完毕，挂载到 Vue 实例的 options 对应的属性中。

详情参见：【[https://blog.csdn.net/zimeng303/article/details/111569143](https://blog.csdn.net/zimeng303/article/details/111569143)】




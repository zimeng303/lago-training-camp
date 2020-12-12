# 一、简答题

## 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```js
let vm = new Vue({
    el: '#el',
    data: {
        o: 'object',
        dog: {}
    },
    methods: {
    	clickHandler () {
    		// 该 name 属性是否是响应式的
    		this.dog.name = 'Trump' 
		}
	}
})
```

上面的 `name` 属性不是响应式的。

修改后的代码，如下：

```js
let vm = new Vue({
    el: '#el',
    data: {
        o: 'object',
        dog: {}
    },
    methods: {
        clickHandler () {
            // 该 name 属性不是响应式的           
            // this.dog.name = 'Trump'
            
            // 使 name 属性变成响应式的
            this.$set(this.dog, 'name', 'Trump')
        }
    }
})
```

**内部原理**：

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将遍历此对象所有的 property，并使用 `Object.defineProperty` 把这些 property 全部转为 getter/setter。

1. ```this.dog.name = 'Trump' ```

![image-20201211085227608](C:\lago-training-camp\work\Module 03\images\image-20201211085227608.png)

Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的。

对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。

2. ```this.$set(this.dog, 'name', 'Trump')```

![image-20201211085427017](C:\lago-training-camp\work\Module 03\images\image-20201211085427017.png)

## 2、请简述  Diff 算法 的执行过程

### Vue 中的 diff 算法

vue 中主要是在 `updateChildren` 方法中使用，用来 对比新旧节点的 children，更新 DOM。

**执行过程**

* 要对比两棵树的差异，我们可以取第一棵树的每一个节点依次和第二课树的每一个节点比较，但是这样的时间复杂度为 O(n^3)
* 在DOM 操作的时候我们很少会把一个父节点移动/更新到某一个子节点
* 因此只需要找**同级别**的**子节点**依次**比较**，然后再找下一级别的节点比较，这样算法的时间复杂度为 O(n)
* 在进行同级别节点比较的时候，首先会对新老节点数组的开始和结尾节点设置标记索引，遍历的过程中移动索引
* 在对**开始和结束节点**比较的时候，总共有四种情况
  1. oldStartVnode / newStartVnode (旧开始节点 / 新开始节点)
  2. oldEndVnode / newEndVnode (旧结束节点 / 新结束节点)
  3. oldStartVnode / oldEndVnode (旧开始节点 / 新结束节点)
  4. oldEndVnode / newStartVnode (旧结束节点 / 新开始节点)
* 开始节点和结束节点比较，这两种情况类似
  1. oldStartVnode / newStartVnode (旧开始节点 / 新开始节点)
  2. oldEndVnode / newEndVnode (旧结束节点 / 新结束节点)
* 如果 oldStartVnode 和 newStartVnode 是 sameVnode (key 和 sel 相同)

  1. 调用 patchVnode() 对比和更新节点
  2. 把旧开始和新开始索引往后移动 oldStartIdx++ / oldEndIdx++
* oldStartVnode / newEndVnode (旧开始节点 / 新结束节点) 相同

  1. 调用 patchVnode() 对比和更新节点
  2. 把 oldStartVnode 对应的 DOM 元素，移动到右边
     * 更新索引
* oldEndVnode / newStartVnode (旧结束节点 / 新开始节点) 相同

  1. 调用 patchVnode() 对比和更新节点
  2. 把 oldEndVnode 对应的 DOM 元素，移动到左边
  3. 更新索引
* 如果不是以上四种情况

  1. 遍历新节点，使用 newStartNode 的 key 在老节点数组中找相同节点
  2. 如果没有找到，说明 newStartNode 是新节点
     * 创建新节点对应的 DOM 元素，插入到 DOM 树中
  3. 如果找到了
     * 判断新节点和找到的老节点的 sel 选择器是否相同
     * 如果不相同，说明节点被修改了
       1. 重新创建对应的 DOM 元素，插入到 DOM 树中
     * 如果相同，把 elmToMove 对应的 DOM 元素，移动到左边
* 循环结束
  1. 当老节点的所有子节点先遍历完 (oldStartIdx > oldEndIdx)，循环结束
  2. 新节点的所有子节点先遍历完 (newStartIdx > newEndIdx)，循环结束
* 如果老节点的数组先遍历完(oldStartIdx > oldEndIdx)，说明新节点有剩余，把剩余节点批量插入到右边
* 如果新节点的数组先遍历完(newStartIdx > newEndIdx)，说明老节点有剩余，把剩余节点批量删除。

## 二、编程题

## 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

代码参见：[https://gitee.com/zimeng303/lago-training-camp/tree/master/work/Module%2003/01-part-code/vue-hash](https://gitee.com/zimeng303/lago-training-camp/tree/master/work/Module%2003/01-part-code/vue-hash)

## 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

代码详见：[https://gitee.com/zimeng303/lago-training-camp/tree/master/work/Module%2003/01-part-code/minivue](https://gitee.com/zimeng303/lago-training-camp/tree/master/work/Module%2003/01-part-code/minivue)

## 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：

代码详见：[https://gitee.com/zimeng303/lago-training-camp/tree/master/work/Module%2003/01-part-code/snabbdom](https://gitee.com/zimeng303/lago-training-camp/tree/master/work/Module%2003/01-part-code/snabbdom)








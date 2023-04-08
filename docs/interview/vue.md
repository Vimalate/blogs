---
title: Vue 面试题整理
date: 2023-03-06
tags:
  - 其他
  - 面试
categories:
  - 面试
---

## vue3 与 vue2 的区别

1. 性能比 vue2 快了 1.2-2 倍
2. 使用 proxy 替代 Object.defineproperty，结局 vue2 中新增删除属性监听不到的问题，同时 proxy 支持对数组的监听，不需要像 vue2 对数组的方法拦截重写
3. diff 算法优化：增加静态标记(patchflag),虚拟节点对比时，只会对这些标记了的节点对比
4. 静态提升，vue3 对于不参与跟新的元素，会做静态提升，只会创建一次，渲染时直接复用即可，不需要像vue2中每次更新都会重新创建并渲染
5. 事件侦听器缓存：默认情况下onClick会被视为动态绑定，所以每次都会追踪它的变化，但是因为是同一个函数，所以不用追踪变化，直接缓存起来复用即可 
6. 更好的 treeSharking 
7. 组合式api，hooks 更好的逻辑复用
8. 更好的ts 支持 

## 父子组件的生命周期

- **加载渲染阶段：** 父 beforeCreate => 父 created => 父 beforeMount => 子 beforeCreate => 子 created => 子 beforeMount => 子 mounted => 父 mounted
- **更新阶段：** 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
- **销毁阶段：** 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

## this.$nextTick 原理（vue2/3）

vue nextTick 的源码实现，异步优先级判断，总结就是 ```Promise -> MutationObserver -> setImmediate -> setTimeout

[this.$nextTick 你真的理解了吗？](https://juejin.cn/post/7177681326861418556)

### nextTick 为什么要优先使用微任务实现？

因为根据 event-loop 和浏览器更新渲染时机，宏任务 -> 微任务 -> 渲染更新，而使用微任务，本次 event loop 就可以货渠道更新的 dom

如果使用微任务，那么得下次 event loop 才能获取到更新的 dom

vue2 的初始化过程做了哪些事情？

```js
new Vue走到了vue的构造函数中：`src\core\instance\index.js`文件。
​
this._init(options)
​
然后从Mixin增加的原型方法看，initMixin(Vue)，调用的是为Vue增加的原型方法_init
​
// src/core/instance/init.js
​
function initMixin (Vue) {
  Vue.prototype._init = function (options) {
     var vm = this; 创建vm,
     ...
     // 合并options 到 vm.$options
     vm.$options = mergeOptions(  
       resolveConstructorOptions(vm.constructor),
       options || {},  
       vm
     );
  }
  ...
   initLifecycle(vm); //初始生命周期
   initEvents(vm); //初始化事件
   initRender(vm); //初始render函数
   callHook(vm, 'beforeCreate'); //执行 beforeCreate生命周期钩子
   ...
   initState(vm);  //初始化data，props，methods computed，watch
   ...
   callHook(vm, 'created');  //执行 created 生命周期钩子
  
   if (vm.$options.el) {
      vm.$mount(vm.$options.el); //这里也是重点，下面需要用到
   }
 }
​
总结
​
所以，从上面的函数看来，new vue所做的事情，就像一个流程图一样展开了，分别是
​
-   合并配置
-   初始化生命周期
-   初始化事件
-   初始化渲染
-   调用 `beforeCreate` 钩子函数
-   init injections and reactivity（这个阶段属性都已注入绑定，而且被 `$watch` 变成reactivity，但是 `$el` 还是没有生成，也就是DOM没有生成）
-   初始化state状态（初始化了data、props、computed、watcher）
-   调用created钩子函数。
​
在初始化的最后，检测到如果有 el 属性，则调用 vm.$mount 方法挂载 vm，挂载的目标就是把模板渲染成最终的 DOM。
```

## 简单说下 Vue 的 diff 算法

![](./img/diff.png)

diff 算法是一种通过同层的树节点进行比较的高效算法

diff 算法的整体策略是：深度优先，同层比较
比较的过程中，循环从两边向中间靠拢

- 当数据发生改变，订阅者 watcher 会调用 patch 给真实 dom 打补丁
- 通过 isSameVNode 判断，相同则调用 patchVNode 方法
- 其中，patchVNode 将做以下几个操作
  1.  找到真实 dom ，称为 el
  2.  如果都由文本节点且不相等，那么将 el 文本节点设置为 VNode 的文本节点
  3.  如果 oldNode 有子节点而 newNoe 没有，则删除 el 子节点
  4.  如果 oldNode 没有子节点而 VNode 有，则将 VNode 的子节点真实化后添加到 el
  5.  如果两者都有子节点，则执行 updateChildren 函数比较子节点
- 其中 updateChildren 做了以下操作

1. 设置新旧 VNode 的头尾指针
2. 新旧指针头尾进行比较，向中间靠拢，再根据情况调用 patchVNode 进行 patch 重复流程，调用 createElem 创建一个新节点，从哈希表寻找 key 值一致的 VNode 再分情况进行后续操作

## vue组件渲染过程

Vue组件的渲染过程可以分为以下几个阶段：

1. 解析模板：Vue会解析组件的模板，将其转换为一个渲染函数。
   
2. 触发响应式，监听 data 属性 getter、setter

3. 执行渲染函数：渲染函数会返回一个VNode对象，描述了组件的DOM结构。

4. 生成真实DOM：Vue会根据VNode对象来创建真实的DOM节点。

5. 挂载到页面：将真实DOM节点挂载到页面上，完成渲染过程。

在Vue的响应式系统中，当组件的数据发生变化时，会触发 setter（此前已被getter监听）会触发重新渲染。这时，Vue会再次执行渲染函数，并生成新的VNode对象。然后，Vue会使用Diff算法比较新旧VNode对象的差异，并只更新需要更新的部分，从而实现高效的DOM操作。

## 项目按钮权限

[面试官问我按钮级别权限怎么控制](https://juejin.cn/post/7209648356530896953)

## vite

### vite 原理

1. 通过 koa 开启一个服务，回去请求的静态文件内容
2. 通过`es-module-lexer`解析`ast`拿到 import 的内容
3. 判断 import 倒入模块是否为第三方模块，是的话做路径的替换，换成了 /@modules/ 返回给浏览器，浏览器发起对 /@modules/ 的请求，并且由 vite 再次拦截，返回 node_module 下的模块， 如 import vue 返回 import './@modules/vue'
4. 如果是.vue 文件，vite 拦截对应的请求，读取.vue 文件内容进行编译，把一个 .vue 的文件拆成了三个请求（分别对应 script、style 和 template） ，浏览器会先收到包含 script 逻辑的 App.vue 的响应，然后解析到 template 和 style 的路径后，会再次发起 HTTP 请求来请求对应的资源，此时 Vite 对其拦截并再次处理后返回相应的内容。
5. 通过 babel parse 对 js 进行编译，最终返回编译后的 js 文件

> Vite 主要对应的场景是开发模式（生产模式是用 rollup 打包）

Vite 的是通过 WebSocket 来实现的热更新通信，监听来自服务端的 HMR 消息推送。

[](https://juejin.cn/post/6844904146915573773)

## vuex 原理

1. vuex 本质就是一个没有 template 的隐藏式的 vue 组件
2. vuex 利用 vue 的 mixin 混入机制，于 beforeCreate 生命钩子混入 vuexInit 方法
3. vuexInit 方法将 vuex store 注册到当前组件的 $store 属性上
4. vuex 的 state 作为一个隐藏的 vue 组件的 data，定义在 state 上面的变量，相当于这个 vue 实例的 data 属性，凡是定义在 data 上的数据都是响应式的
5. 当页面上使用了 vuex state 中的数据时，就是依赖收集的过程，当 vuex 中的数据变化时，通过调用对应属性的 dep 对象的 notify 方法，去修改试图变化

## vue-router 原理

1. 创建的页面路由会与该页面形成一个路由表（key value 形式，key 为该路由，value 为对应的页面）
2. 监听 URL 变化，然后匹配路由规则，新路由页面替换旧页面，达到无需刷新的目的
3. 单页面路由目前主要两种方式：`hash 模式，history模式`
4. hash 模式：通过 hashchange 事件监听路由变化 `window.addEventListener('hashchange', （)=>{})`
5. history 模式: 通过 pushState() 和 replaceState() 方法，实现网历史记录添加新的或替换对应的浏览记录，通过 popSate 事件监听 路由变化，`window.addEventListener('popstate', ())=>{})`

## vue history模式nginx配置

```bash
server {
    listen 80;
    server_name example.com;

    location / {
        root /var/www/example.com/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

在这个示例中，我们告诉Nginx监听80端口，并将所有流量发送到名为example.com的服务器。location /指定了Web根目录，并使用try_files指令来确保Nginx能够正确地处理Vue路由。

具体来说，try_files指令尝试按顺序查找文件或目录，直到找到一个存在的位置。如果找不到任何匹配项，则返回/index.html，这是Vue应用程序的入口点。

如果Vue应用程序不在Web根目录下，请相应地更改根路径。如果使用的是HTTPS，则应将listen指令更改为443，并提供证书和密钥文件。

## vue2是怎么做到监听数组的

在 Vue2 中，监听数组的实现是通过重写数组变异方法（mutation methods）来实现的。

具体地说，Vue2 中使用了一个名为 Observer 的类来观察数据对象，如果数据对象是一个数组，则会对其进行特殊处理。在处理数组时，Vue2 会获取数组原型上的变异方法（例如 push、pop、shift、unshift、splice 等），然后对这些方法进行改写，以便在执行这些方法时能够发出变化通知。

具体来说，Vue2 会将这些变异方法重写成如下形式：
```js
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)

;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})
```

>Object.defineProperty 实际是可以做到监听数组的，通过 arr[index]=val 监听数组下标来做到，但是为了性能取舍而没有这样做

```js
var arr = [1,2,3,4]
arr.forEach((item,index)=>{
    Object.defineProperty(arr,index,{
        set:function(val){
            console.log('set')
            item = val
        },
        get:function(val){
            console.log('get')
            return item
        }
    })
})
arr[1]; // get  2
arr[1] = 1; // set  1
```

## ref 为什么需要 .value

- ref 是一个对象（不丢失响应式），value  存储值
- 通过 .value 属性的 get 和 set 实现响应式

## vue3 更快了，它做了哪些优化
- proxy 响应式
- tree-shaking
- 静态提升

  - 将静态节点的定义，提升到父级别，缓存起来
  - 多个相邻的静态节点会被合并


## hooks useForm useDialo
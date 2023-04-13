---
title: 参考题库
date: 2023-01-31
tags:
 - 面试
categories: 
 - 面试
---

## 参考题库

- [web-interview](https://github.com/febobo/web-interview)
- [1000+大厂前端面试真题](https://lgwebdream.github.io/FE-Interview/vue/#vue%E9%A2%98%E7%9B%AE%E6%B1%87%E6%80%BB)

- [大厂面试题每日一题](https://q.shanyue.tech/fe/)

- [前端进阶之旅](https://interview.poetries.top/docs/base.html)
  
- [从输入URL开始建立前端知识体系](https://juejin.cn/post/6935232082482298911)

- [前端可以做的性能优化有哪些](https://juejin.cn/post/7194400984490049573)
[从输入URL开始建立前端知识体系](https://juejin.cn/post/6935232082482298911)
- [前端面试题整理](http://fanyouf.gitee.io/interview/nb/03.html#%E4%BA%8C%E3%80%81%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F)

## 一些神奇的面试提问

[面试官:你觉得你最大的缺点是什么?](https://juejin.cn/post/7120805355042373662)


- promise
- set map
- requestAnimationFrame
- nextTick 及原理实现
- vue diff 算法，响应式原理
- 宏任务、微任务
- BFC、flex 布局
- 自定义指令极其生命周期(vue2/3)

1. 注册方式：Vue2中自定义指令使用Vue.directive()方法进行注册，而Vue3中使用app.directive()方法进行注册。Vue3中取消了全局指令的概念，所有指令都需要在组件中进行注册。

2. 钩子函数：Vue2中自定义指令提供了bind、inserted、update、componentUpdated、unbind等五个钩子函数，分别对应指令绑定、插入DOM、更新、组件更新、解绑等不同的生命周期。Vue3中钩子函数的名称发生了变化，分别为beforeMount、mounted、beforeUpdate、updated、beforeUnmount、unmounted。

3. 钩子函数参数：Vue2中的钩子函数参数为el、binding、vnode、oldVnode，其中el表示指令所绑定的元素，binding表示指令的绑定值，vnode表示Vue编译生成的虚拟节点，oldVnode表示上一个虚拟节点。Vue3中的钩子函数参数为el、binding、vnode、prevVnode，其中prevVnode表示前一个虚拟节点。

4. 钩子函数返回值：Vue3中自定义指令的钩子函数可以返回一个函数，用于在指令解绑时执行清理操作。该函数会在指令解绑时自动执行。

5. 钩子函数调用时机：Vue2中的自定义指令钩子函数是在元素插入DOM时就会被调用，而Vue3中的自定义指令钩子函数是在元素挂载到DOM之前就会被调用。这意味着在Vue3中，自定义指令的钩子函数可以在组件挂载之前就对元素进行处理。

需要注意的是，虽然Vue3对自定义指令进行了一些改进，但是Vue2中的自定义指令仍然可以在Vue3中使用，只需要对钩子函数的名称进行相应的修改即可。


- 全局注册组建、按需引入
- CI/CD
- 水印防删除
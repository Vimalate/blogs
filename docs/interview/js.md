---
title: js 面试题整理
date: 2023-03-06
tags:
 - 其他
 - 面试
categories: 
 - 面试
---

## js 的数据类型有哪几种，怎么存储的

一共8 种：

7种基本数据类型：Undefined，Null，Boolean，Number，String，Symbol(es6 新增，表示独一无二的值)，BigInt(es10 新增)
1种引用数据类型：Object(Object 本质上是由一组无序的名值对组成)，包含 Function，Array，Date等

- 原始数据类型：直接存储在**栈**（stack）中，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。
  
- 引用数据类型：同时存储在**栈**（stack）和**堆**（heap）中，占据空间大、大小不固定。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

## null 和 undefined 的区别？

首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。
​
undefined 代表的含义是未定义， null 代表的含义是空对象（其实不是真的对象，请看下面的**注意**！）。一般变量声明了但还没有定义的时候会返回 undefined，null 主要用于赋值给一些可能会返回对象的变量，作为初始化。
​
其实 null 不是对象，虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。
​
undefined 在 js 中不是一个保留字，这意味着我们可以使用 undefined 来作为一个变量名，这样的做法是非常危险的，它 会影响我们对 undefined 值的判断。但是我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。
​
当我们对两种类型使用 typeof 进行判断的时候，Null 类型化会返回 “object”，这是一个历史遗留的问题。当我们使用双等 号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。

## 谈谈你对 this、call、apply 和 bind 的理解

1. 浏览器中，全局范围内 this 指向 window 对象
2. 函数中，this 永远指向最后调用他的那个对象
3. 构造函数中，this 指向 new 出来的那个新对象
4. call、apply、bind 中的 this 强绑定与指定的对象上
5. 箭头函数的 this 比较特殊，他的 this 为父作用域的 this，不是调用时的this,前四种方式, 都是调用时确定, 也就是动态的, 而箭头函数的 this 指向是静态的, 声明的时候就确定了下来；
6.  apply、call、bind 都是 js 给函数内置的一些 API，调用他们可以为函数指定 this 的执行, 同时也可以传参。

## js 延迟加载的方式有哪些

js 的加载、解析和执行会阻塞页面的渲染过程，因此我们希望 js 脚本能够尽可能的延迟加载，提高页面的渲染速度。
​
1.  将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。
2.  给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
3.  给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
4.  动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。


## ES6有哪些新特性？

```js
*   块作用域
*   类
*   箭头函数
*   模板字符串
*   加强的对象字面
*   对象解构
*   Promise
*   模块
*   Symbol
*   代理（proxy）Set
*   函数默认参数
*   展开
```

## promise.all 执行顺序

```js
// 方法a，返回一个Promise对象
function a() {
	return new Promise((r, j) => {
		setTimeout(() => {
			console.log('a')
			r('a')
		}, 3000)
	})
}
// 方法b，返回一个Promise对象
function b() {
	return new Promise((r, j) => {
		setTimeout(() => {
			console.log('b')
			r('b')
		}, 1000)
	})
}
Promise.all([a(), b()]).then(r => {
	console.log(r)
})
// 输出情况
b
a
['a', 'b']
```
all()中的Promise对象执行先后顺序由自己快慢控制，全部执行完毕后，按照放入all()的先后顺序放入Promise.all().then的 resolve 中。

## 参考

[金三银四，我为面试所准备的100道面试题以及答案](https://juejin.cn/post/7202639428132274234)
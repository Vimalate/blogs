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

一共 8 种：

7 种基本数据类型：Undefined，Null，Boolean，Number，String，Symbol(es6 新增，表示独一无二的值)，BigInt(es10 新增)
1 种引用数据类型：Object(Object 本质上是由一组无序的名值对组成)，包含 Function，Array，Date 等

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

## == 运算符

```js
obj = {
  x: 1,
}
if (obj.a == null) {
}
```

相当于：`if(obj.a === null || obj.a === undefined){}`

> 实际开发中，除了 == null 外，建议其他使用 ====

## 谈谈你对 this、call、apply 和 bind 的理解

1. 浏览器中，全局范围内 this 指向 window 对象
2. 函数中，this 永远指向最后调用他的那个对象
3. 构造函数中，this 指向 new 出来的那个新对象
4. call、apply、bind 中的 this 强绑定与指定的对象上
5. 箭头函数的 this 比较特殊，他的 this 为父作用域的 this，不是调用时的 this,前四种方式, 都是调用时确定, 也就是动态的, 而箭头函数的 this 指向是静态的, 声明的时候就确定了下来；
6. apply、call、bind 都是 js 给函数内置的一些 API，调用他们可以为函数指定 this 的执行, 同时也可以传参。
7. apply 参数数组形式，call 参数逗号分隔 apply，call 会立即执行，bind 加（）才会，react 常用 bind ，如按钮点击事件，并不想在未点击时调用

>熟记技巧：apply 是以 a 开头，它传给 fun 的参数是 Array，也是以 a 开头的，

## js 延迟加载的方式有哪些

js 的加载、解析和执行会阻塞页面的渲染过程，因此我们希望 js 脚本能够尽可能的延迟加载，提高页面的渲染速度。
​

1.  将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。
2.  给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
3.  给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
4.  动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。

## ES6 有哪些新特性？

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

## 如何判断一个空对象

- JSON.stringify

```js
let obj = { name: '你好' }
//是true为空对象，是false则不是空对象
console.log(JSON.stringify(obj) === '{}') //false
```

> JSON.stringify()只能序列化对象的可枚举的自有属性，即如果有属性是不可枚举或继承属性的话，结果也是 true,对于 undefined、symbol，函数会忽略

- Object.getOwnPrototypeNames()

返回该对象所有可枚举和不可枚举属性的属性名组成的数组，然后通过判断返回的数组长度是否为 0

```js
var data = {}
var arr = Object.getOwnPrototypeNames(data)
alert(arr.length == 0) //true
```

- Object.keys() 获取给定对象的所有可枚举属性的字符串数组

```js
var data = {}
var arr = Object.keys(data)

alert(arr.length == 0) //true
```

- for in 和 hasOwnProperty

```js
let obj = { name: '1' }

//hasOwnProperty  检测属性是否存在对象实例中（可枚举属性）
//如果存在返回true，不存在返回false

let fn = (s) => {
  for (let key in s) {
    if (s.hasOwnProperty(key)) {
      return false
    }
    return true
  }
}

console.log(fn(obj)) //false
//若是反回true则就是空对象
```

- Reflect.ownKeys() （完美）强烈推荐

Reflect.ownKeys(obj).length===0

## for in、for of 和 Object.keys 区别

for-in、for-of、Object.keys()都是用于遍历对象的属性或数组、字符串的方法，但它们之间有一些区别：

- for-in 遍历的是对象的可枚举属性，包括自身属性和继承属性，不适合遍历数组和字符串。

- for-of 遍历的是可迭代对象的元素，包括数组、字符串、Set、Map 等，不适合遍历对象。

- Object.keys()返回一个由对象的可枚举属性组成的数组，只遍历对象自身的属性，不包括继承属性，也不适合遍历其他类型的可迭代对象。

- for-in 和 Object.keys()遍历的属性顺序是不确定的，而 for-of 遍历的元素顺序是确定的。

因此，如果需要遍历对象的自身属性，可以使用 Object.keys()或 for-in。如果需要遍历数组或字符串的元素，可以使用 for-of。如果需要遍历对象的所有属性，包括继承属性，可以使用 for-in。需要注意的是，for-in 和 Object.keys()不适合遍历其他类型的可迭代对象，例如 Set 和 Map。

## clientHeight、offsetHeight、scrollHeight 的区别

这三个属性都是用来获取元素高度的，但是它们所获取的高度是不同的：

- offsetHeight：元素可视区域的高度加上上下边框和上下内边距的高度，但不包括水平滚动条和外边距，即（border + padding + content）。
- clientHeight：元素可视区域的高度，不包括水平滚动条、边框和外边距，即（padding + content）。
- scrollHeight：元素内容的总高度，包括由于溢出而无法显示的部分，但不包括外边距，即（padding + 实际内容尺寸）

举个例子，如果一个元素的高度为 200px，上下边框和内边距各为 20px，内容高度为 300px，而水平滚动条和外边距都为 0，那么这三个属性的值分别为：

clientHeight：160px（200 - 20 - 20）
offsetHeight：200px（160 + 20 + 20）
scrollHeight：300px
在实际开发中，我们可以根据需要选择使用这三个属性来获取元素的高度。

## 简单介绍一哈 promise


- Promise.all()

 Promise.all()将多个Promise放在一个数组中，当整个数组的全部promise成功时才会返回成功(返回顺序就是定义数组的速度)，当数组中的promise有一个出现失败时就返回失败 (失败的原因是第一个失败promise的结果)。

使用场景：

 **多个表单同时校验**

 - Promise.race() 赛跑，竞速

同样，将对个promise实例放于一个数组中，数组中有一个最先得到结果，不管成功或者失败，那么这个 race方法即放回这个结果。

使用场景：
**点击按钮，发送请求，超过一定时间，还未返回结果的话，提示用户请求超时**

>race 方法传入数组里，一个promise是定时器，如规定多少秒的超时提醒，另外一个为接口请求

## async/await 和 Promise 的关系

async/await 是基于 Promise 的语法糖，它们都是用于处理异步操作的 JavaScript 特性。Promise 通过 then 和 catch 方法来处理异步操作的结果，而 async/await 则使用像同步代码一样的语法来处理异步操作。async 函数内部可以使用 await 来等待一个返回 Promise 对象的表达式执行完毕，并将其解析为一个值或抛出错误。因此，在某种程度上，async/await 可以看作是一种更加简单易用的 Promise 的封装。

- 执行 async 函数，返回的是 Promise 对象
- await 相当于是 Promise 的 then
- try... catch 可用来捕获异常，相当于 Promise 的 catch

> await 后面的内容都可以看做是异步 callback 里的内容

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
Promise.all([a(), b()]).then((r) => {
  console.log(r)
})
// 输出情况
b
a[('a', 'b')]
```

all()中的 Promise 对象执行先后顺序由自己快慢控制，全部执行完毕后，按照放入 all()的先后顺序放入 Promise.all().then 的 resolve 中。

## 用 promise 如何实现异步加载图片，说下大概思路

1. 创建一个 Promise 对象，该对象包含一个异步操作，例如加载图片。
2. 在异步操作中，使用 Image 对象加载图片，并监听其 onload 和 onerror 事件。
3. 如果图片加载成功，调用 resolve 方法，并将 Image 对象作为参数传递给 resolve 方法。
4. 如果图片加载失败，调用 reject 方法，并将错误信息作为参数传递给 reject 方法。
5. 在使用异步操作时，调用 Promise 对象的 then 方法，如果图片加载成功，则在 then 方法中获取 Image 对象并使用它；如果图片加载失败，则在 catch 方法中处理错误。

```js
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject(`图片加载失败-${url}`)
    }
    img.url = url
  })
}

// 使用
loadImg('xxx.png')
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.log(error)
  })
```

## 依据什么来定义宏任务和微任务

- 微任务是 ES6 语法规定
- 宏任务是由浏览器规定

**宏任务微任务有哪些**

 宏任务：
- setTimeout 、setInterval
- requestAnimationFrame[?具体一些讨论](https://zhuanlan.zhihu.com/p/360507457)：用于浏览器下一次绘制之前执行
- 事件：（click，load）
- i/o, 特殊的完成回调 (e.g. 文件读取)
- ui 渲染 (浏览器)

微任务：
- Promise 回调函数中的 then、catch、finally 方法
- MutationObserve：监听dom变化并执行
- process.nexttick (node.js)


## requestAnimationFrame

requestAnimationFrame 是浏览器提供的一个 API，用于在下一帧动画之前执行指定的函数。与 setTimeout 相比，requestAnimationFrame 的优势在于它可以根据浏览器的刷新频率来调整动画的帧数，从而避免掉帧现象，提高动画的流畅度和性能。**如果你想在下一次浏览器重绘之前再次调用回调函数更新动画，那么就需要在回调函数内部递归调用 window.requestAnimationFrame 函数**

[介绍一下 requestAnimationFrame 和 requestIdleCallback](https://juejin.cn/post/7217601930917855269)

## 简述闭包

所有自由变量的查找，**是在函数定义的地方，向上级作用域查找，而不是在执行的地方**

## 手写一个函数实现数组深度扁平化

- 遍历递归

```js
export function flattenDeep(arr) {
  let res = []
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      flattenDeep(item).forEach((n) => res.push(n))
    } else {
      res.push(item)
    }
  })
  return res
}
```

- concat

```js
export function flattenDeep2(arr) {
  let res = []
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      res = res.concat(flattenDeep2(item))
    } else {
      res = res.concat(item)
    }
  })
  return res
}
```

## 自己动手实现一个 new 

1. 创建一个新对象，该对象的原型链指向构造函数的原型对象
2. 将构造函数作为普通对象调用，传入参数并绑定this作为为新对象
3. 判断构造函数返回值是否为对象，如果是则返回该对象，否则返回新对象

```js
function myNew (Constructor, ...args) {
  //创建一个新对象，对象的原型链指向构造函数的原型对象
  const obj = Object.create(Constructor.prototype)
  // 将构造函数作为普通函数调用，传入参数并绑定this为新对象
  const result = Constructor.apply(obj, args)
  return result instanceof Object ? result : obj
}
```

>Object.create()方法可以创建一个新对象，该对象的原型链指向指定的对象

**验证**

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person = myNew(Person, 'Tom', 18);
console.log(person); // { name: 'Tom', age: 18 }
console.log(person instanceof Person); // true
```

**追问：Object.create()方法和{}对象字面量的区别**

Object.create()方法接受两个参数:Object.create(obj,propertiesObject) ;

 obj:一个对象，应该是新创建的对象的原型。

 propertiesObject：可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符（这些属性描述符的结构与Object.defineProperties()的第二个参数一样）。注意：该参数对象不能是 undefined，另外只有该对象中自身拥有的可枚举的属性才有效，

- Object.create()创建的新对象的原型指向指定的对象，而字面量创建的对象的原型链指向 ```Object.prototype```
- Object.create()方法可以指定新对象的属性，而{}对象字面量创建的对象不可以指定属性。例如，可以使用Object.create(null)创建一个没有任何属性和原型链的对象。


## 实现一个lazyMan

```js
class LazyMan {
  constructor(name) {
    this.name = name
    this.tasks = []
    console.log(`Hi! This is ${name}!`)
    setTimeout(() => this.next(), 0)
  }
  addTask (task) {
    this.tasks.push(task)
    return this
  }
  sleep (time) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}s!`)
        this.next()
      }, time * 1000)
    }

    return this.addTask(task)
  }
  eat (food) {
    const task = () => {
      console.log(`Eat ${food}!`)
      this.next()
    }
    return this.addTask(task)
  }
  next () {
    const task = this.tasks.shift()
    task && task()
  }
}
```


**测试**

```js
function lazyMan (name) {
  return new LazyMan(name)
}

lazyMan('Bob').sleep(2).eat('dinner').sleep(3).eat('橘子')
```

## instanceOf 的原理是什么，如何手写实现一个

**instanceOf 是用来判断一个对象是否是某个构造函数的实例**

每个对象都有一个隐藏的属性__proto__，它指向了对象的原型。我们可以通过不断访问这个属性，直到找到null，来确定对象的原型链。如果原型链上存在指定的构造函数的原型

```js
function myInstanceOf (obj, constructorFn) {
  if (obj == null) return false // null undefined
  // 其他基础数据类型
  if (typeof obj !== 'object' && typeof obj !== 'function') return false

  let proto = obj.__proto__
  while (proto) {
    if (proto === constructorFn.prototype) {
      return true
    }
    // 顺着原型链往上找
    proto = proto.__proto__
  }
  return false
}
```
## 手写 apply call

>区别：传参不同，apply 第二个参数为数组，a开头，参数也是arrry形式，call 后边参数为函数本身的参数，一个个传

- call

```js
/**
 * 
 * 如果传入值类型，返回对应类型构造函数创建的实例
 * 如果传入对象，则返回对象本身
 * 如果传入 undefined 或者 null 会返回空对象
 */
Function.prototype._call = function (ctx, ...args) {
  if (ctx == null) ctx = globalThis
  if (typeof ctx !== 'object') ctx = new Object(ctx)
   //给context新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol()
  ctx[key] = this
  // 立即执行一次
  const res = ctx[key](...args)
  // 删除这个属性，防止污染
  delete ctx[key]
  // 把函数的返回值赋值给_call的返回值
  return res
}

let name = '一尾流莺'
const obj = {
  name: 'warbler',
}
function foo() {
  console.dir(this);
  return 'success'
}

foo._call(undefined) // window
foo._call(null) // window
foo._call(1) // Number
foo._call('11') // String
foo._call(true) // Boolean
foo._call(obj) // {name: 'warbler'}
console.log(foo._call(obj)); // success
```

- apply

```js
Function.prototype._apply = function (ctx, args = []) {
  if (ctx == null) ctx = globalThis
  if (typeof ctx !== 'object') ctx = new Object(ctx)
   //给context新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol()
  ctx[key] = this
  // 立即执行一次
  const res = ctx[key](...args)
  // 删除这个属性
  delete ctx[key]
  // 把函数的返回值赋值给_apply的返回值
  return res
}
```

[参考](https://juejin.cn/post/7030759884542967821)

## 手写bind

bind() 方法会创建一个新函数，当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一系列参数将会在传递的实参前传入作为它的参数。

```js
Function.prototype.myBind = function(context, ...args1) {
  const self = this; // 当前的函数本身
  return function(...args2) {
    return self.apply(context, [...args1, ...args2]); // apply 参数数组
  }
}
```

## 垃圾回收机制



## 参考

[金三银四，我为面试所准备的 100 道面试题以及答案](https://juejin.cn/post/7202639428132274234)

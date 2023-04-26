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


## 谈谈对this的理解

**全局环境中**
- 全局环境中：this 指向全局对象（视宿主环境而定，浏览器 window，node global）

**函数中**
- 普通函数调用：this指向全局对象
- 对象方法调用：指向所属对象
- 作为构造函数调用：指向实例化对象
- 通过call, apply, bind调用：如果指定了第一个参数thisArg，this的值就是thisArg的值（如果是原始值，会包装为对象）；如果不传thisArg，要判断严格模式，严格模式下this是undefined，非严格模式下this指向全局对象。
- 箭头函数的 this 比较特殊，他的 this 为父作用域的 this，不是调用时的 this,前四种方式, 都是调用时确定, 也就是动态的, 而箭头函数的 this 指向是静态的, 声明的时候就确定了下来；


## 谈谈你对 this、call、apply 和 bind 的理解

1. 浏览器中，全局范围内 this 指向 window 对象
2. 函数中，this 永远指向最后调用他的那个对象
3. 构造函数中，this 指向 new 出来的那个新对象
4. call、apply、bind 中的 this 强绑定与指定的对象上
5. 箭头函数的 this 比较特殊，他的 this 为父作用域的 this，不是调用时的 this,前四种方式, 都是调用时确定, 也就是动态的, 而箭头函数的 this 指向是静态的, 声明的时候就确定了下来；
6. apply、call、bind 都是 js 给函数内置的一些 API，调用他们可以为函数指定 this 的执行, 同时也可以传参。
7. apply 参数数组形式，call 参数逗号分隔 apply，call 会立即执行，bind 加（）才会，react 常用 bind ，如按钮点击事件，并不想在未点击时调用

> 熟记技巧：apply 是以 a 开头，它传给 fun 的参数是 Array，也是以 a 开头的

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

Promise.all()将多个 Promise 放在一个数组中，当整个数组的全部 promise 成功时才会返回成功(返回顺序就是定义数组的速度)，当数组中的 promise 有一个出现失败时就返回失败 (失败的原因是第一个失败 promise 的结果)。

使用场景：

**多个表单同时校验**

- Promise.race() 赛跑，竞速

同样，将对个 promise 实例放于一个数组中，数组中有一个最先得到结果，不管成功或者失败，那么这个 race 方法即放回这个结果。

使用场景：
**点击按钮，发送请求，超过一定时间，还未返回结果的话，提示用户请求超时**

> race 方法传入数组里，一个 promise 是定时器，如规定多少秒的超时提醒，另外一个为接口请求

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
- MutationObserve：监听 dom 变化并执行
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

1. 创建一个新对象，该对象的原型链```__proto__```指向构造函数的原型对象```prototype```
2. 将构造函数作为普通对象调用，传入参数并绑定 this 作为为新对象
3. 判断构造函数返回值是否为对象，如果是则返回该对象，否则返回新对象

```js
function myNew(Constructor, ...args) {
  //创建一个新对象，对象的原型链指向构造函数的原型对象
  const obj = Object.create(Constructor.prototype)
  // 将构造函数作为普通函数调用，传入参数并绑定this为新对象
  const result = Constructor.apply(obj, args)
  return result instanceof Object ? result : obj
}
```

> Object.create()方法可以创建一个新对象，该对象的原型链指向指定的对象

**验证**

```js
function Person(name, age) {
  this.name = name
  this.age = age
}

const person = myNew(Person, 'Tom', 18)
console.log(person) // { name: 'Tom', age: 18 }
console.log(person instanceof Person) // true
```

**追问：Object.create()方法和{}对象字面量的区别**

Object.create()方法接受两个参数:Object.create(obj,propertiesObject) ;

obj:一个对象，应该是新创建的对象的原型。

propertiesObject：可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符（这些属性描述符的结构与 Object.defineProperties()的第二个参数一样）。注意：该参数对象不能是 undefined，另外只有该对象中自身拥有的可枚举的属性才有效，

- Object.create()创建的新对象的原型指向指定的对象，而字面量创建的对象的原型链指向 `Object.prototype`
- Object.create()方法可以指定新对象的属性，而{}对象字面量创建的对象不可以指定属性。例如，可以使用 Object.create(null)创建一个没有任何属性和原型链的对象。

## 实现一个 lazyMan

```js
class LazyMan {
  constructor(name) {
    this.name = name
    this.tasks = []
    console.log(`Hi! This is ${name}!`)
    setTimeout(() => this.next(), 0)
  }
  addTask(task) {
    this.tasks.push(task)
    return this
  }
  sleep(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}s!`)
        this.next()
      }, time * 1000)
    }

    return this.addTask(task)
  }
  eat(food) {
    const task = () => {
      console.log(`Eat ${food}!`)
      this.next()
    }
    return this.addTask(task)
  }
  next() {
    const task = this.tasks.shift()
    task && task()
  }
}
```

**测试**

```js
function lazyMan(name) {
  return new LazyMan(name)
}

lazyMan('Bob').sleep(2).eat('dinner').sleep(3).eat('橘子')
```

## instanceOf 的原理是什么，如何手写实现一个

**instanceOf 是用来判断一个对象是否是某个构造函数的实例**

每个对象都有一个隐藏的属性**proto**，它指向了对象的原型。我们可以通过不断访问这个属性，直到找到 null，来确定对象的原型链。如果原型链上存在指定的构造函数的原型

```js
function myInstanceOf(obj, constructorFn) {
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

> 区别：传参不同，apply 第二个参数为数组，a 开头，参数也是 arrry 形式，call 后边参数为函数本身的参数，一个个传

**在非严格模式下使用call或者apply时，如果第一个参数被指定为null或undefined，那么函数执行时的this指向全局对象（浏览器环境中是window）；如果第一个参数被指定为原始值，该原始值会被包装。**

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
  console.dir(this)
  return 'success'
}

foo._call(undefined) // window
foo._call(null) // window
foo._call(1) // Number
foo._call('11') // String
foo._call(true) // Boolean
foo._call(obj) // {name: 'warbler'}
console.log(foo._call(obj)) // success
```

- apply

apply 传参为数组形式

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

## 手写 bind

bind() 方法会创建一个新函数，当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一系列参数将会在传递的实参前传入作为它的参数。

```js
Function.prototype.myBind = function (context, ...args1) {
  const self = this // 当前的函数本身
  return function (...args2) {
    return self.apply(context, [...args1, ...args2]) // apply 参数数组
  }
}
```

## 函数柯里化

**柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术**。

> 函数柯里化定义：接收一部分参数，返回一个函数接收剩余参数，接收足够参数后，执行原函数。

实现：

```js
const myCurried = (fn, ...args) => {
  if (args.length < fn.length) {
    // 未接受完参数
    return (..._args) => myCurried(fn, ...args, ..._args)
  } else {
    // 接受完所有参数，直接执行
    return fn(...args)
  }
}

function add(a, b, c) {
  return a + b + c
}

const curriedAdd = myCurried(add)

console.log(curriedAdd(1)(2)(3)) // 输出 6
console.log(curriedAdd(1, 2)(3)) // 输出 6
console.log(curriedAdd(1)(2, 3)) // 输出 6
```

[前端常考 JS 编程题](https://juejin.cn/post/7223046446941110328)
[彻底搞懂闭包，柯里化，手写代码，金九银十不再丢分！](https://juejin.cn/post/6864378349512065038)
[十个高阶 Javascript 知识及用法](https://juejin.cn/post/7222838155605639226#heading-1)

## 实现单例模式

**确保一个类只有一个实例**

场景：Redux/Vuex 中的 store、JQ 的$

```js
let cache
class A {
  // ...
}

function getInstance() {
  if (cache) return cache
  return (cache = new A())
}

const x = getInstance()
const y = getInstance()
console.log(x === y) // true
```

## 剩余参数和 arguments 对象之间的区别

>剩余参数允许我们将不定数量的参数表示为一个数组

```js
function add(a, ...args) {
  return args.reduce((prev, curr) => {
    return prev + curr
  }, a)
}
```

区别：
- 剩余参数表示那些没有对应形参的实参，而 arguments 对象表示传递的所有实参
- arguments 对象是一个类数组，而剩余参数是一个真正的array
- 参数默认值赋值不同：当使用剩余参数时，我们可以为参数提供默认值。但是，无法针对arguments对象设置默认参数值。

```js
function fn(a, b, rest = []) {
  console.log(rest);
}
fn(1,2,3,4,5) // [3,4,5]
```

>类数组：类数组（ArrayLike）对象具备一个非负的length属性，并且可以通过从0开始的索引去访问元素，让人看起来觉得就像是数组，比如NodeList，但是类数组默认没有数组的那些内置方法，比如push, pop, forEach, map。

剩余语法和展开运算符看起来很相似，然而从功能上来说，是完全相反的。

>剩余语法(Rest syntax) 看起来和展开语法完全相同，不同点在于, 剩余参数用于解构数组和对象。从某种意义上说，剩余语法与展开语法是相反的：展开语法将数组展开为其中的各个元素，而剩余语法则是将多个元素收集起来并“凝聚”为单个元素。


## 函数记忆化

使用缓存来保存函数的结果，从而避免重复计算。提高函数的性能

```js
function memoize (fn) {
  const cache = {}
  return (...args) => {
    console.log(...args, 'args:', args)
    const key = JSON.stringify(args)
    if (cache[key]) return cache[key]
    const result = fn(...args)
    cache[key] = result
    return result
  }
}

function add (a, b) {
  console.log("Calculating sum...")
  return a + b
}
const memoizedAdd = memoize(add)
console.log(memoizedAdd(2, 3)) // Calculating sum... 5
console.log(memoizedAdd(2, 3)) // 5 (from cache)
```

## 说说对闭包的理解

>能够访问另外一个函数作用域中变量的函数就叫做闭包

场景：


## 垃圾回收机制

## js 的编译过程

- 分词：词法分析（词法单元token）
  词法分析器使用正则表达式将源代码字符串划分为一个个的单词，这些单词也被称为token，它们是具有一定语意的代码单元，
- 解析：语法分析（抽象语法树 AST）
  将词法分析产生的词法单元转化为AST，并检查语法错误
- 代码生成（可执行代码（机器指令））
  代码生成器将AST转换为可执行的机器码或者字节码

## 高阶函数

满足两个条件：
1. 函数可以作为参数传递
2. 函数可以作为返回值输出

>首先是个函数,参数或者返回值是函数

常见的高阶函数：

filter/map/reduce/sort

## js 中的几种模块规范

- commonjs：module.export 导出模块，require 引入模块
- AMD：异步加载模块，不影响后面语句的加载，AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的模块，在依赖模块加载完成后就直接执行依赖模块，依赖模块的执行顺序和我们书写的顺序不一定一致，require.js 实现了 AMD 规范
- CMD：同样异步加载模块，sea.js 实现了 CMD 规范。CMD 推崇就近依赖，只有在用到某个模块的时候再去 require， CMD 在依赖模块加载完成后并不执行，只是下载而已，等到所有的依赖模块都加载好后，进入回调函数逻辑，遇到 require 语句 的时候才执行对应的模块，这样模块的执行顺序就和我们书写的顺序保持一致了
- 第四种方案是 ES6 提出的方案，使用 import 和 export 的形式来导入导出模块。

## 怎么理解 js 中变量提升和函数提升

在js中，变量或者函数的声明会被提升到当前作用域的顶部，这就是所谓的变量提升和函数提升

变量提升：只有变量的声明会被提升，赋值不会，如果在变量被声明之前就进行了访问或赋值，那么会得到一个 undefined 的值。

函数提升：，JavaScript 引擎会将当前作用域中所有函数的声明提前到函数作用域或全局作用域的顶部，这个过程就叫做函数提升。**函数提升与变量提升不同的是，函数声明会被整个提前到作用域的顶部，包括函数名和函数体，因此在函数声明之前就可以直接调用该函数。**

**JS 中函数提升的优先级高于变量提升:**这意味着如果在同一个作用域中同时存在一个函数声明和一个变量声明，那么该函数的声明将被提升到该作用域的顶部，而变量将被提升到函数声明的下面。

>需要注意的是，函数表达式和箭头函数并不会被提升，只有函数声明才会被提升

## 参考

[金三银四，我为面试所准备的 100 道面试题以及答案](https://juejin.cn/post/7202639428132274234)
```

// const throttle = (fn, delay) => {
//   let timer = null
//   return function (...args) {
//     if (!timer) {
//       setTimeout(() => {
//         fn.apply(this, args)
//         timer = null
//       }, delay)
//     }
//   }
// }

// const lazyLoadImages = () => {
//   const images = document.querySelectorAll('img[data-src]')
//   images.forEach(img => {
//     const rect = img.getBoundingClientRect()
//     if (rect.top < window.innerHeight) {
//       img.src = img.dataSet.src
//       img.removeAttribute('data-src')
//     }
//   })
// }

// const throttledLazyLoad = throttle(lazyLoadImages, 100)

// window.addEventListener('scroll', throttledLazyLoad)



// const fns = new Set()
// // const obj = new Proxy(target, handler)
// // 被代理之后返回的对象 = new Proxy(被代理对象，要代理对象的操作)
// function reactive (data) {
//   const proxy = new Proxy(data, {
//     get (target, key, receiver) {
//       const result = Reflect.get(target, key, receiver)
//       return reactive(result)
//     },
//     set (target, key, newVal, receiver) {
//       // 重复的数组，不处理
//       if (val === target[key]) {
//         return true
//       }
//       const result = Reflect.set(target, key, val, receiver)
//       return result  // 是否设置成功 true/false
//     },
//     deleteProperty (target, key) {
//       const result = Reflect.deleteProperty(target, key)
//       console.log('deleteProperty', key)
//       return result
//     }
//   })

//   return proxy
// }

// function myCurried (fn) {
//   return function curry (...args) {
//     if (args.length < fn.length) { // 未接受完参数
//       return function (..._args) {
//         return curry.apply(this, fn, [...args, ..._args])
//       }
//     }
//     return fn.apply(this, ...args)
//   }
// }
// const myCurried = (fn, ...args) => {
//   if (args.length < fn.length) {
//     return (..._args) => myCurried(fn, ...args, ..._args)
//   } else {
//     return fn(...args)
//   }
// }

// function add (a, b, c) {
//   return a + b + c
// }

// const curriedAdd = myCurried(add)

// console.log(curriedAdd(1)(2)(3)) // 输出 6
// console.log(curriedAdd(1, 2)(3)) // 输出 6
// console.log(curriedAdd(1)(2, 3)) // 输出 6



// function memoize (fn) {
//   const cache = {}
//   return (...args) => {
//     console.log(...args, 'args:', args)
//     const key = JSON.stringify(args)
//     if (cache[key]) return cache[key]
//     const result = fn(...args)
//     cache[key] = result
//     return result
//   }
// }

// function add (a, b) {
//   console.log("Calculating sum...")
//   return a + b
// }
// const memoizedAdd = memoize(add)
// console.log(memoizedAdd(2, 3)) // Calculating sum... 5
// console.log(memoizedAdd(2, 3)) // 5 (from cache) 

// function isEqual(num1, num2) {
//   return Math.abs(num1 - num2) < Number.EPSILON;
// }

// console.log(isEqual(0.1 + 0.2, 0.3)); // true


// function jsonp (url, callbackName, success) {
//   const script = document.createElement('script')
//   script.src = `${url}?callback=${callbackName}`
//   document.body.appendChild(script)
//   window['callbackName'] = (response) => {
//     success(response)
//     document.body.removeChild(script)
//   }
// }

// jsonp(url, 'handleResponse', (response) => console.log(response)) 

// // 服务端将返回响应
// handleResponse({
//   name:'树哥',
//   age:18
// })

// function mySetinterval (fn, delay) {
//   let timerId = setTimeout(function tick () {
//     fn()
//     setTimeout(tick, delay)
//   }, delay)
//   return {
//     cancel: () => clearTimeout(timerId)
//   }
// }

// function mySetinterval(callback, interval) {
//   let timerId
//   const intervalWrapper = () => {
//     callback()
//     timerId = setTimeout(intervalWrapper, interval)
//   }
//   timerId = setTimeout(intervalWrapper, interval)
//   return {
//     cancel: () => clearTimeout(timerId)
//   }
// }

// function mySetinterval(callback, interval) {
//   let timeoutId = null

//   function repeat() {
//     callback()
//     timeoutId = setTimeout(repeat, interval)
//   }

//   repeat()

//   return {
//     cancel: () => clearTimeout(timeoutId)
//   }
// }

// const interval = mySetinterval(() => console.log('Hello'), 1000)

// setTimeout(() => {
//   interval.cancel()
// }, 5000)

// function _flat (arr, depth) {
//   if (!Array.isArray(arr) || depth <= 0) {
//     return arr
//   }
//   return arr.reduce((prev, cur) => {
//     if (Array.isArray(cur)) {
//       return prev.concat(_flat(cur, depth - 1))
//     } else {
//       return prev.concat(cur)
//     }
//   }, [])
// }


// const list = [1, 2, [3, 4, [5]], 6, 7]

// console.log(_flat(list, 1))

// const task = (color, timeout) => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(console.log(color)), timeout)
//   })
// }

// const task = (light, timeout) => {
//   return new Promise((resolve) => {
//       setTimeout(() => resolve(console.log(light)), timeout);
//   })
// }

// const taskRunner = async () => {
//   await task('red', 1000)
//   await task('green', 2000)
//   await task('yellow', 3000)
//   taskRunner()
// }

// taskRunner()

// function create (obj) {
//   function F () { }
//   F.prototype = obj
//   return new F()
// }

// function myInstanceof (obj, constructor) {
//   while (obj !== null) {
//     if (obj.__proto__ === constructor.prototype) {
//       return true
//     }
//     obj = obj.__proto__
//   }
//   return false
// }

// function Person(name) {
//   this.name = name;
// }

// const person1 = new Person('John');

// console.log(myInstanceof(person1, Person));  // true
// console.log(myInstanceof(person1, Object));  // true
// console.log(myInstanceof({}, Person));       // false
// console.log(myInstanceof([], Object));       // true


// function debounce (fn, delay = 500) {
//   let timer = null
//   return function () {
//     timer && clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.apply(this, arguments)
//       timer = null
//     }, delay)
//   }
// }

// function throttle (fn, delay = 500) {
//   let timer
//   return function (...args) {
//     if (timer) return
//     timer = setTimeout(() => {
//       fn.apply(this, args)
//       timer = null
//     }, delay)
//   }
// }

// function throttle (fn, delay = 500) {
//   let start = +Date.now()
//   return function (...args) {
//     const now = +Date.now()
//     if (now - start >= delay) {
//       fn.apply(this, ...args)
//       start = now
//     }
//   }
// }

// function sleep (time) {
//   return new Promise(resolve => {
//     setTimeout(resolve, time)
//   })
// }

// async function test() {
//   console.log('start');
//   await sleep(2000);
//   console.log('end');
// }
// test();
// const list = [1, 2, 3, 4, 5]
// Array.prototype.myPush = function (...args) {
//   const length = this.length
//   for (let i = 0; i < args.length; i++) {
//     this[this.length + i] = args[i]
//   }
//   return this.length
// }

// Array.prototype.myFilter = function (callback) {
//   const newArr = []
//   for (let i = 0; i < this.length; i++) {
//     if (callback(this[i], i, this)) {
//       newArr.push(this[i])
//     }
//   }
//   return newArr
// }

// Array.prototype.myMap = function (callback) {
//   const newArr = []
//   for (let i = 0; i < this.length; i++) {
//     newArr.push(callback(this[i], i, this))
//   }
//   return newArr
// }


// console.log(list.myPush(6),list)
// console.log(list.myFilter(i => i > 3))
// console.log(list.myMap(i => i + 1))


// class Subject {
//   constructor() {
//     this.observers = []
//   }

//   addObserver (observer) {
//     this.observers.push(observer)
//   }
//   removeObserver (observer) {
//     this.observers = this.observers.filter(item => item !== observer)
//   }

//   notify () {
//     this.observers.forEach(observer => observer.update())
//   }
// }

// class Observer {
//   constructor(data) {
//     this.data = data
//   }
//   update () {
//     console.log('data：', this.data)
//   }
// }

// // 创建主题对象
// const subject = new Subject()

// // 创建两个观察者对象
// const observer1 = new Observer('Hello啊，树哥!')
// const observer2 = new Observer('Hello')

// // 将观察者添加到主题对象中
// subject.addObserver(observer1)
// subject.addObserver(observer2)

// // 通知观察者
// subject.notify()


const getSearchParams = () => {
  const searchPar = new URLSearchParams(window.location.search)
  const paramsObj = {}
  for (const [key, value] of searchPar.entries()) {
    paramsObj[key] = value
  }
  return paramsObj
}

// 树结构转数组
// function treeToArray(tree) {
//   const list=[]
//   const traverse = (node) => {
//     list.push(node)
//     if (node.children) {
//       for (let i = 0; i < node.children.length; i++) {
//         traverse(node.children[i])
//       }
//     }
//   }
// }

// 两个数组求交集

// function intersection(arr1,arr2){
//   const newArr = []
//   for (let i = 0; i < arr1.length; i++) {
//     for (let j = 0; j < arr2.length; j++) {
//       if (arr1[i] === arr2[j]&&!newArr.includes(arr1[i])) {
//         newArr.push(arr1[i])
//         break
//       }
//     }
//   }
//   return newArr
// }

// function intersection(arr1,arr2){
//   const set1 = new Set(arr1)
//   const set2 = new Set(arr2)
//   return [...set1].filter(item => set2.has(item))
// }


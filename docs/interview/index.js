// // function flattenDeep (arr) {
// //   let res = []
// //   arr.forEach(item => {
// //     if (Array.isArray(item)) {
// //       flattenDeep(item).forEach(n => res.push(n))
// //     } else {
// //       res.push(item)
// //     }
// //   })
// //   return res
// // }
// // function flattenDeep2 (arr) {
// //   let res = []
// //   arr.forEach(item => {
// //     if (Array.isArray(item)) {
// //       res = res.concat(flattenDeep2(item))
// //     } else {
// //       res.push(item)
// //     }
// //   })
// //   return res
// // }

// // const list = [1, 2, 3, [4, [5,[110]], [10, 11]], 6, 7]

// // console.log(flattenDeep(list))
// // console.log(flattenDeep2(list))

// function myNew (Constructor, ...args) {
//   //创建一个新对象，对象的原型链指向构造函数的原型对象
//   const obj = Object.create(Constructor.prototype)
//   // 将构造函数作为普通函数调用，传入参数并绑定this为新对象
//   const result = Constructor.apply(obj, args)
//   return result instanceof Object ? result : obj
// }

// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// const person = myNew(Person, 'Tom', 18);
// console.log(person); // { name: 'Tom', age: 18 }
// console.log(person instanceof Person); // true




// class LazyMan {
//   constructor(name) {
//     this.name = name
//     this.tasks = []
//     console.log(`Hi! This is ${name}!`)
//     setTimeout(() => this.next(), 0)
//   }

//   addTask (task) {
//     this.tasks.push(task)
//     return this
//   }

//   sleep (time) {
//     const task = () => {
//       setTimeout(() => {
//         console.log(`Wake up after ${time}s!`)
//         this.next()
//       }, time * 1000)
//     }
//     return this.addTask(task)
//   }


//   eat (food) {
//     const task = () => {
//       console.log(`Eat ${food}!`)
//       this.next()
//     }
//     return this.addTask(task)
//   }

//   next () {
//     const task = this.tasks.shift()
//     task && task()
//   }
// }

// function myInstanceOf (obj, constructorFn) {
//   if (obj == null) return false // null undefined
//   // 其他基础数据类型
//   if (typeof obj !== 'object' && typeof obj !== 'function') return false

//   let proto = obj.__proto__
//   while (proto) {
//     if (proto === constructorFn.prototype) {
//       return true
//     }
//     // 顺着原型链往上找
//     proto = proto.__proto__
//   }
//   return false
// }
// console.log(myInstanceOf([], Array))
// console.log(myInstanceOf(true, Boolean))
// console.log(myInstanceOf('123', String))
// console.log(myInstanceOf({}, Object))
// console.log(myInstanceOf('12io', Object))
// console.log(myInstanceOf([], Boolean))
// console.log(myInstanceOf(() => { }, Function))
// console.log('instanceof', (() => { }) instanceof Function)
/**
 * 
 * 如果传入值类型，返回对应类型构造函数创建的实例
 * 如果传入对象，则返回对象本身
 * 如果传入 undefined 或者 null 会返回空对象
 */
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


// call
Function.prototype._call = function (ctx, ...args) {
  if (ctx == null) ctx = globalThis
  if (typeof ctx !== 'object') ctx = new Object(ctx)
  //给context新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol()
  ctx[key] = this
  // 立即执行一次
  const res = ctx[key](...args)
  // 删除这个属性
  delete ctx[key]
  // 把函数的返回值赋值给_call的返回值
  return res
}

let name = '一尾流莺'
const obj = {
  name: 'warbler',
}
function foo () {
  console.dir(this)
  return 'success'
}

foo._call(undefined) // window
foo._call(null) // window
foo._call(1) // Number
foo._call('11') // String
foo._call(true) // Boolean
foo._call(obj) // {name: 'warbler'}
console.log(foo._call(obj)); // success


['1', '2', '3'].map(parseInt)

['1', '2', '3'].map((item, index) => parseInt(item, index))
// parseInt('1',0) // 1
// parseInt('2',1) // NaN
// parseInt('3',2) // NaN
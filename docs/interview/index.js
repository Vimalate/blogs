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
console.log(myInstanceOf([], Array))
console.log(myInstanceOf(true, Boolean))
console.log(myInstanceOf('123', String))
console.log(myInstanceOf({}, Object))
console.log(myInstanceOf('12io', Object))
console.log(myInstanceOf([], Boolean))
console.log(myInstanceOf(() => { }, Function))
console.log('instanceof', (() => { }) instanceof Function)
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


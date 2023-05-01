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


function lengthOfLongestSubstring (s) {
  let i = 0, j = 0
  let maxLen = 0
  const set = new Set()

  while (j < s.length) {
    if (!set.has(s[j])) {
      set.add(s[j])
      j++
      maxLen = Math.max(maxLen, set.size)
    } else {
      set.delete(s[i])
      i++
    }
  }
  console.log(set)
  return maxLen
}

console.log(lengthOfLongestSubstring('abcabcbb'))
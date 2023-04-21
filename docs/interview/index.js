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



const fns = new Set()
// const obj = new Proxy(target, handler)
// 被代理之后返回的对象 = new Proxy(被代理对象，要代理对象的操作)
function reactive (data) {
  const proxy = new Proxy(data, {
    get (target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      return reactive(result)
    },
    set (target, key, newVal, receiver) {
      // 重复的数组，不处理
      if (val === target[key]) {
        return true
      }
      const result = Reflect.set(target, key, val, receiver)
      return result  // 是否设置成功 true/false
    },
    deleteProperty (target, key) {
      const result = Reflect.deleteProperty(target, key)
      console.log('deleteProperty', key)
      return result
    }
  })

  return proxy
}



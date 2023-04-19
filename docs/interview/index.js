const throttle = (fn, delay) => {
  let timer = null
  return function (...args) {
    if (!timer) {
      setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}

const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]')
  images.forEach(img => {
    const rect = img.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      img.src = img.dataSet.src
      img.removeAttribute('data-src')
    }
  })
}

const throttledLazyLoad = throttle(lazyLoadImages, 100)

window.addEventListener('scroll', throttledLazyLoad)
// function loadImg (url) {
//   return new Promise((resolve, reject) => {
//     const img = new Image()
//     img.onload = () => {
//       resolve(img)
//     }
//     img.onerror = () => {
//       reject(`图片加载失败-${url}`)
//     }
//     img.url = url
//   })
// }

// // 使用
// loadImg('xxx.png').then(res => {
//   console.log(res)
// }).catch(error => {
//   console.log(error)
// })
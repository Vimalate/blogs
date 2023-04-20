---
title: 手写一个 mini qiankun
date: 2023-03-06
tags:
  - 其他
  - 面试
categories:
  - 面试
---


***本文正在参加[「金石计划」](https://juejin.cn/post/7207698564641996856/ "https://juejin.cn/post/7207698564641996856/")***

书接上回，我们在前不久（其实也挺久了），主要讲了关于微前端 qiankun 的快速上手以及日常开发中可能遇到的一些问题，此次我们将从微前端的原理入手，自己动手实现一个简单的 mini qiankun。

首先我们知道，微前端的运行原理可以概括为以下 4 点：

1. 监听路有变化
2. 匹配子应用
3. 加载子应用
4. 渲染子应用

在之前的一篇[文章](https://juejin.cn/post/7202108772924325949)里有简单介绍到 qiankun 的入门使用，在我们使用 qiankun 的时候，我们主要使用的就是`registerMicroApps、start` 这两个方法

```js
import { registerMicroApps, start } from 'qiankun'
```

这也就是说，如果我们能够实现这两个方法，那么就能打造属于我们自己的微前端

## 手写 mini qiankun

微前端 qiankun 的本质是通过监控路由的变化，根据所配置的子应用路由规则，匹配到对应的子应用，根据 entry 远程 fetch 获取 HTML 的内容，解析 HTML 里面的 script 标签和 css 标签，fetch 获取这些资源，执行获取的 script 代码，将 css 获取的内容添加到 HTML DOM 中；根据配置的路由渲染规则，将 HTML 渲染到配置的主应用目标 container 中。

我们本次基于之前一篇文章【[用微前端 qiankun 接入十几个子应用后，我遇到了这些问题](https://juejin.cn/post/7202108772924325949)】的快速上手实现的微前端主子应用做改造，通过自己实现 registerMicroApps, start 这两个方法从而做到我们自己的 mini qiankun。

首先，我们在 src 目录下新建文件夹`mini-qiankun`

然后文件夹下新建 `index.js` 方便我们后续的导出

index.js 中暂且先导出我们所需要的两个方法

```js
export const registerMicroApps = () => {}

export const start = () => {}
```

现在我们将这两个方法改为从我们新建的文件引入

```js
import { registerMicroApps, start } from '../mini-qiankun'
```

### 实现 registerMicroApps 方法

从之前的文章中我们知道 registerMicroApps 方法的使用如下：

```js
registerMicroApps([
  {
    name: 'sub-vue',
    entry: 'http://localhost:8086/',
    container: '#subapp-viewport',
    activeRule: '/sub-vue',
  },
])
```

registerMicroApps 主要用于注册子应用信息，包括子应用的名称、路由信息、挂载节点等等。registerMicroApps 实现起来比较简单，我们可以很容易将 registerMicroApps 方法修改如下：

```js
// index.js
const _apps = [] // 存储已注册的子应用信息

export const registerMicroApps = (apps) => {
  // apps 为我们调用函数时传入的注册子应用信息
  _apps = apps
}
```

为方便我们后续拿到注册的子应用信息，我们于`index.js`新增一个函数

```js
export const getApps = () => _apps
```

### 实现 start 方法

接下来，我们还需要实现 start 方法，用来启动我们的微前端框架，其实现主要为我们之前提到的几个步骤：

1. 监听路由变化
2. 匹配当前路由对应的子应用
3. 加载子应用
4. 渲染子应用

路由模式有 hash 模式和 history 模式两种。hash 模式需要监控 window.onhashchange 事件；history 模式 需要监控 pushState、 replaceState、 window.onpopstate 事件。pushState、 replaceState 不包括浏览器的前进、后退，所以也需要对 window.onpopstate 事件进行监控。

我们创建文件 `rewrite-router.js`,用来监听路由变化和页面跳转，这里我们以实现 history 模式为例，（hash 模式同理，监控 window.onhashchange 事件即可）。

```js
// rewrite-router.js
import { handleRouter } from './handle-router'

let prevRoute = '' //上一个路由
let nextRoute = window.location.pathname // 下一个路由

export const getPrevRoute = () => prevRoute
export const getNextRoute = () => nextRoute

window.getNextRoute = getNextRoute
window.getPrevRoute = getPrevRoute

export const rewriteRouter = () => {
  window.addEventListener('popstate', () => {
    // popstate 触发的时候，路由已经完成导航了
    prevRoute = nextRoute // 之前的
    nextRoute = window.location.pathname //最新的
    handleRouter()
  })

  /**
   * 重写 pushState
   */
  const rawPushState = window.history.pushState
  window.history.pushState = (...args) => {
    // 导航前
    prevRoute = window.location.pathname
    rawPushState.apply(window.history, args) // 这是在真正的改变历史记录
    nextRoute = window.location.pathname
    // 导航后
    handleRouter()
  }

  /**
   * 重写replacestate
   */
  const rawReplaceState = window.history.replaceState
  window.history.replaceState = (...args) => {
    prevRoute = window.location.pathname
    rawReplaceState.apply(window.history, args)
    nextRoute = window.location.pathname
    handleRouter()
  }
}
```

我们通过 `prevRoute、nextRoute`两个变量缓存路由变化前后的值，当有发生了变化时卸载(unmount)路由变化前的子应用，加载路由变化后的子应用，从而做到应用间的切换。

然后于 mini-qiankun 文件夹下创建一个 js 文件，`fetch-resource.js`，用来获取子应用的html、js、css

```js
// 获取子应用的html、js、css
export const fetchResource = url => fetch(url).then(res => res.text())
```

再创建一个js文件，```import-html.js```

这个文件主要用以渲染我们匹配到的子应用

>浏览器出于安全考虑，innerHtml 中的 script 不会加载执行,而我们页面的渲染需要 js 的执行生成内容，所以我们需要手动加载子应用的 script 并执行 script 中的代码，对于获取到的字符串 JavaScript 的执行有两种方式：eval或者new Function

```js
import { fetchResource } from "./fetch-resource"
export const importHTML = async (url) => {
  const html = await fetchResource(url)
  const template = document.createElement("div")
  template.innerHTML = html

  const scripts = template.querySelectorAll("script")
  // 获取所有 script 标签
  function getExternalScripts () {
    return Promise.all(
      Array.from(scripts).map((script) => {
        const src = script.getAttribute("src")
        if (!src) {
          return Promise.resolve(script.innerHTML)
        } else {
          return fetchResource(src.startsWith("http") ? src : `${url}${src}`)
        }
      })
    )
  }

  // 执行所有的 script脚本代码
  async function execScripts () {
    const scripts = await getExternalScripts()

    //手动构造一个 CommonJS 模块环境
    const module = { exports: {} }
    const exports = module.exports

    scripts.forEach((code) => {
      // eval执行的代码可以访问外部变量
      eval(code)
    })
    return module.exports
  }
  return {
    template,
    getExternalScripts,
    execScripts,
  }
}
```




接下来我们新建`handle-router.js`，拿到子应用在main.js注册的```bootstrap、mount、unmount```三个方法，我们在主应用调用这个方法，实现我们 qiankun 里面的生命周期事件。

```js
import { getApps } from "."
import { importHTML } from './import-html'
import { getPrevRoute } from './rewrite-router'
export const handleRouter = async () => {
  // 2 匹配子应用
  // 2.1 获取当前路由路径
  // 2.2 注册子应用apps里查找
  const apps = getApps()
  // 卸载上一个路由应用
  const prevApp = apps.find((item) => {
    return getPrevRoute().startsWith(item.activeRule)
  })
  // 获取下一个路由应用
  const app = apps.find((item) => getNextRoute().startsWith(item.activeRule))

  // 如果有上一个应用，则先销毁
  if (prevApp) {
    console.log('prevApp', '先销毁')
    await unmount(prevApp)
  }

  // 未匹配上，不做处理
  if (!app) return
  // 3 加载子应用
  const { template,execScripts } = await importHTML(app.entry)
  const container = document.querySelector(app.container)
  container.appendChild(template)
  console.log('container', container)
  // 配置全局环境变量
  window.__POWERED_BY_QIANKUN__ = true
  // 在微应用 bootstrap 之前注入一个运行时的 publicPath，主要用来解决的是微应用动态载入的 脚本、样式、图片 等地址不正确的问题
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry

  const appExports = await execScripts()
  app.bootstrap = appExports.bootstrap
  app.mount = appExports.mount
  app.unmount = appExports.unmount
  console.log(appExports)
  await bootstrap(app)
  await mount(app)
}


async function bootstrap (app) {
  app.bootstrap && (await app.bootstrap())
}
async function mount (app) {
  app.mount &&
    (await app.mount({
      container: document.querySelector(app.container),
    }))
}
async function unmount (app) {
  app.unmount &&
    (await app.unmount({
      container: document.querySelector(app.container),
    }))
}
```

最后我们对 ```index.js``` 稍加修改，其主要是对两个实现方法的导出，修改后如下：

```js
import { handleRouter } from './handle-router'
import { rewriteRouter } from './rewrite-router'
let _apps = []
export const registerMicroApps = (apps) => {
  _apps = apps
}
export const getApps = () => _apps

export const start = () => {
  console.log('start...')
  // 监控制路由变化
  rewriteRouter()
  // 初始执行匹配
  handleRouter()
}
```

## 效果

最后，我们把主应用和子应用都启动，可以看到正常加载并渲染出子应用，实现效果和 qiankun 基本一致


![mini-qiankun.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f1b667af7b24e4fbefea770d401f60a~tplv-k3u1fbpfcp-watermark.image?)

此次的文章最初源于一天晚上我躺在床上刷B站时，首页突然给我推荐【手写 qiankun 微前端框架】，我就好奇点进去看了看，然后跟着教程一起实现了下，不得不说大数据真牛啊（狗头）

也是源于此次的学习，算是让我对于微前端的实现原理有了一些更深的理解，当然，这里我们实现的 mini qiankun 还有很多不完备的地，比如没有做 js 的沙箱隔离，也未处理 css 的样式隔离，但是作为对微前端原理实现的学习也算够了。

## 往期回顾
[用微前端 qiankun 接入十几个子应用后，我遇到了这些问题](https://juejin.cn/post/7202108772924325949)
<br>
[vue3 正式发布两年后，我才开始学 — vue3+setup+ts 🔥](https://juejin.cn/post/7158331832512020511)
<br>
[2022年了，我才开始学 typescript ，晚吗？（7.5k字总结）](https://juejin.cn/post/7124117404187099172)
<br>
[当我们对组件二次封装时我们在封装什么](https://juejin.cn/post/7127925414885851144)
<br>
[vue 项目开发，我遇到了这些问题](https://juejin.cn/post/7119018849353072677)
<br>
[关于首屏优化，我做了哪些](https://juejin.cn/post/7117515006714839047)

## 参考

[qiankun官网](https://qiankun.umijs.org/zh/guide)

[手写微前端 simple-qiankun](https://juejin.cn/post/7079379620348313637)

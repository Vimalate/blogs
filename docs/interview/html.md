---
title: html 面试题整理
date: 2023-03-06
tags:
  - 其他
  - 面试
categories:
  - 面试
---

## 如何理解语义化标签

概念
​
语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化），便于开发者阅读和写出更优雅的代码的同时，让浏览器的爬虫和机器很好的解析。
​
语义化的好处
​

- 用正确的标签做正确的事情；
- 去掉或者丢失样式的时候能够让页面呈现出清晰的结构；
- 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
- 有利于`SEO`：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；
- 便于团队开发和维护，语义化更具可读性，遵循 W3C 标准的团队都遵循这个标准，可以减少差异化。

## html5 有哪些新特性、移除了那些元素

新特性
​
**HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。**
​

- 拖拽释放`(Drag and drop)` `API`；
- 语义化更好的内容标签（`header`, `nav`, `footer`, `aside`, `article`, `section`）;
- 音频、视频 API(`audio`, `video`);
- 画布`(Canvas)` `API`;
- 地理`(Geolocation)` `API`;
- 本地离线存储 `localStorage` 长期存储数据，浏览器关闭后数据不丢失；
- `sessionStorage` 的数据在浏览器关闭后自动删除;
- 表单控件:`calendar`、`date`、`time`、`email`、`url`、`search` ;
- 新的技术`webworker`, `websocket`, `Geolocation`等；
  ​
  移除元素
  ​
  **纯表现元素**：
  ​
- `<basefont>` 默认字体，不设置字体，以此渲染；
- `<font>` 字体标签；
- `<center>` 水平居中；
- `<u>` 下划线；
- `<big>`字体；
- `<strike>`中横字；
- `<tt>`文本等宽；
  ​
  **对可用性产生负面影响的元素**：
  ​
  `<frameset>`,`<noframes>`和`<frame>`；

## script 标签中 defer 和 async 的区别？

- script 会阻碍 html 的解析，只有下载并且执行好脚本后才会继续解析 html
- script + async 解析 html 过程中会异步下载脚本，下载成功后立马执行 html ，可能会阻碍 html 的解析，多个带有 async 属性的脚本无法保证执行顺序。
- script + defer ，脚本在 HTML 文件解析完成后被执行，多个带有 defer 属性的脚本会按顺序在文档解析完成后依次执行，且在 DOMContentLoaded 事件之前完成。

## attribute 和 property 的区别是什么？

property 和 attribute 非常容易混淆，两个单词的中文翻译也都非常相近（property：属性，attribute：特性），但实际上，二者是不同的东西，属于不同的范畴。

- property 是 DOM 中的属性，是 JavaScript 里的对象；
- attribute 是 HTML 标签上的特性，它的值只能够是字符串；

简单理解，Attribute 就是 dom 节点自带的属性，例如 html 中常用的 id、class、title、align 等。
而 Property 是这个 DOM 元素作为对象，其附加的内容，例如 childNodes、firstChild 等。

## 圣杯布局双飞翼布局

- 圣杯布局

html:

```html
<div id="container" class="clearfix">
  <p class="center">我是中间</p>
  <p class="left">我是左边</p>
  <p class="right">我是右边</p>
</div>
```

css:

```css
* {
  margin: 0;
  padding: 0;
}
#container {
  padding-left: 200px;
  padding-right: 150px;
  overflow: auto;
  height: 400px;
}
#container p {
  float: left;
  height: 400px;
  box-sizing: border-box;
}
.center {
  width: 100%;
  background-color: lightcoral;
}
.left {
  width: 200px;
  position: relative;
  /* 覆盖padding-left */
  left: -200px;
  /* 拉至上一行 */
  margin-left: -100%;
  background-color: lightcyan;
}
.right {
  width: 150px;
  /* 拉至上一行，覆盖padding-right */
  margin-right: -150px;
  background-color: lightgreen;
}
.clearfix:after {
  content: '';
  display: table;
  clear: both;
}
```

- 双飞翼布局

html:

```html
<div id="main" class="float">
  <div id="main-wrap">main</div>
</div>
<div id="left" class="float">left</div>
<div id="right" class="float">right</div>
```

css:

```css
* {
  margin: 0;
  padding: 0;
}

.float {
  float: left;
}
#main {
  width: 100%;
  height: 400px;
  background-color: lightpink;
}

#main-wrap {
  margin: 0 200px 0 200px;
}

#left {
  width: 200px;
  height: 400px;
  background-color: lightsalmon;
  margin-left: -100%;
}

#right {
  width: 200px;
  height: 400px;
  background-color: lightskyblue;
  margin-left: -200px;
}
```

## web worker 和 service worker

- Web Worker 
是在与主线程分离的独立线程中执行 JavaScript 的 API，常用来做**计算密集型或者执行耗时较长**的任务

使用：

```js
// worker.js 文件
self.addEventListener('message', function (e) {
  var result = doWork(e.data)
  self.postMessage(result)
})

function doWork (data) {
  // 计算密集型任务的实现
}

// 主线程中使用
var worker = new Worker('worker.js')
worker.onmessage = function (e) {
  console.log('Result:', e.data)
}
worker.postMessage(someData)
```

- Service Worker 则是一种与页面完全分离的脚本，它是一种独立的 JavaScript 线程，可以拦截网络请求并缓存资源，从而实现网络代理的功能。Service Worker 可以**离线使用**，又可以在后台自动更新，这使得它成为实现 Web **应用离线化、推送通知**等功能的重要技术手段。
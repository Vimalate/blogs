---
title: 修改Vue打包后文件的接口地址配置
date: 2020-04-04 20:00:38
tags:
 - Vue
 - 技巧
categories: 
 - Vue
---
## 1、public/static文件夹下新增 config.js

## 2、在config.js文件中添加一个全局的window对象

```js
//config.js
window.apiObj = {
  apiUrl:'http://192.100.5.106',
  apiName: '网段地址',
  apiArea: '这个地址是用于商品列表功能'
}
```

## 3、在public目录下的index.html中引入这个config.js文件

```html
<script src="/static/config.js"></script>
```

## 4、组件中直接使用 window 对象

```js
const baseURL= window.apiObj.apiUrl
```
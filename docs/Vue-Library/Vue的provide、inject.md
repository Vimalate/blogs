---
title: Vue的provide、inject
date: 2020-04-04 20:00:38
tags:
 - Vue
categories: 
 - Vue
---
## Vue的provide、inject

**祖组件：**
```js
provide() {
  return {
    elForm: this
  };
},
```

子孙组件

```js
inject: ['elForm'],
```
[参考](https://zhuanlan.zhihu.com/p/184967263)

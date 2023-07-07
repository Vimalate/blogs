---
title: vue3 里使用jsx
date: 2023-07-07
tags:
 - vue
categories: 
 - vue
---
## 前言

在大多数情况下，我们使用 Vue 都是用的 sfc 单文件组件模式，即一个组件就是一个文件。而且 Vue 也是默认推荐使用模板```<template>```写法的，但其实 Vue 也是支持使用 jsx 来编写组件的。

前段时间，树哥也尝试在 vue 的项目中使用 jsx 去进行开发，本篇也是对如何在 Vue 中是用 jsx 做的一个总结。


## 什么是jsx

jsx（JavaScript XML）是一种用于在JavaScript中编写类似XML的语法扩展。

jsx 允许开发者在 JavaScript 代码中直接编写类似HTML的标记语法，以声明式地描述UI组件的结构和交互。通过使用 jsx，可以将HTML结构、组件逻辑和数据绑定等内容组合在一起，更加直观地描述页面结构和交互。

写 react 的小伙伴可能会很熟悉。那么如何在 vue 的项目中使用 jsx 呢，这里我们以 vue3 + vite 项目为例

默认的情况下，vue3+vite 的项目不支持 jsx，如果想支持 jsx，需要安装插件```@vitejs/plugin-vue-jsx```

**安装**

```npm i @vitejs/plugin-vue-jsx -D```

然后在 vite.config.js 中进行下相应配置：

```js
// 配置 vue 使用jsx
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
});
```
好了，基本的准备工作完成，那么我们就可以尝试在 Vue 的项目中使用 jsx 了

**简单上手**

```vue
<script lang="jsx">
import { ref } from "vue"
export default {
  setup () {
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    return () => (
      <div>
        <h1>Counter: {count.value}</h1>
        <button onClick={increment}>Increment</button>
      </div>
    )
  },
}
</script>
```

>script 中 lang 要改成 jsx

这里我们使用 jsx 实现了，点击按钮数字加一的功能

## 语法

通过上面简单的示例，我们



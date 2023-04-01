---
title: css 面试题整理
date: 2023-03-06
tags:
  - css
  - 面试
categories:
  - 面试
---

## 说一下你对 BFC 的理解
- 什么是 BFC

块级格式化上下文，是一种特性（文档中一块渲染区域），他拥有一套自己的渲染规则，决定了子元素讲如何布局，以及和其他元素的相互关系和作用。

- 怎么出发 BFC

1. 根元素 ```<html></html>``` （天生俱备BFC特性）
2. 浮动元素（float 不为 none）
3. 绝对定位元素（元素的position 为absolute或fixed）
4. 行内快元素 display 为 inline-block
5. overflow 不等于 visible clib 的块级元素
6. display 设置 flow-root

- BFC 特性有什么用

1. 可以包含内部浮动元素
2. 排除外部浮动造成的影响
3. 防止外边距塌陷



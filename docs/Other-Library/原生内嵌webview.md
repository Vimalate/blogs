---
title: 原生内嵌webview
date: 2020-06-02 22:54:01
tags:
 - h5
categories: 
 - 其他
---
## js 调用

通信方面iOS采用messageHandlers[fn].postMessage(data)方法。Android采用window.AndroidWebView[fn] (data)
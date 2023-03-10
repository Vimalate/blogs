---
title: axios token失效取消后续请求
date: 2020-06-02 22:54:01
tags:
 - 技巧
categories: 
 - 其他
---
## 使用 CancelToken

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.interceptors.request.use(
    config => {
        config.cancelToken = source.token; // 全局添加cancelToken
            return config;
        },
        err => {
            return Promise.reject(err);
        }
   );
/** 设置响应拦截 **/
axios.interceptors.response.use(
    response => {
        // 登录失效101
        if ( response.data.code===101) {
            source.cancel(); // 取消其他正在进行的请求
            setTimeout(() => { // 重新赋值,保证后续操作的请求可正常发送
              source = axios.CancelToken.source()
            }, 1000)
           // some coding
        }
        return response;
    },
    error => {
        if (axios.isCancel(error)) { // 取消请求的情况下，终端Promise调用链
            return new Promise(() => {});
        } else {
            return Promise.reject(error);
        }
    }
);
```

axiosv0.22.0之前取消请求是使用的cancel token API，而在v0.22.0开始使用的是AbortController

## 参考
[vue阻止重复请求](https://juejin.cn/post/7189231050806001719)
[封装新版axios（v0.22.0）中的取消请求](https://juejin.cn/post/7204038175768100901)
module.exports = {
  "title": "博客首页",
  "description": "Vimalakirti blog",
  "dest": "public",
  "base": "/blogs/",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "plugins": {
    "@vuepress/pwa": {
      serviceWorker: true,
      updatePopup: {
        message: "新的风暴再次出现！",
        buttonText: "刷新",
      },
    },
    "demo-container":true,
    // "@vuepress/back-to-top": true,
    "@vuepress/active-header-links": {
      sidebarLinkSelector: ".sidebar-link",
      headerAnchorSelector: ".header-anchor",
    },
    "@vssue/vuepress-plugin-vssue": {
      // 设置 `platform` 而不是 `api`
      platform: "github-v4",
      // 其他的 Vssue 配置
      owner: "Vimalate",
      repo: "Vimalate",
      clientId: "7fabb016743a2a816a75",
      clientSecret: "b07104f78c7cb82b05c2a816645a6165846c0a93",
      autoCreateIssue: true,
    },
    "cursor-effects": {
      size: 2, // size of the particle, default: 2
      shape: "star", // ['star' | 'circle'], // shape of the particle, default: 'star'
      zIndex: 999999999, // z-index property of the canvas, default: 999999999
    },
    // "@vuepress-reco/vuepress-plugin-kan-ban-niang": {
    //   theme: [
    //     "blackCat",
    //     "whiteCat",
    //     "haru1",
    //     "haru2",
    //     "haruto",
    //     "koharu",
    //     "izumi",
    //     "shizuku",
    //     "wanko",
    //     "miku",
    //     "z16",
    //   ],
    // },
    // "vuepress-plugin-nuggets-style-copy": {
    //   copyText: "复制代码",
    //   tip: {
    //     content: "复制成功",
    //   },
    // },
  },
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "首页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "文档",
        "icon": "reco-message",
        "items": [
          // {
          //   "text": "vuepress-reco",
          //   "link": "/docs/theme-reco/"
          // },
          {
            "text": "HTML-Library",
            "link": "/docs/HTML-Library/"
          },
          {
            "text": "CSS-Library",
            "link": "/docs/CSS-Library/"
          },
          {
            "text": "Javascript-Library",
            "link": "/docs/Javascript-Library/"
          },
          {
            "text":"Vue-Library",
            "link":"/docs/Vue-Library"
          },
          {
            "text": "Other-Library",
            "link": "/docs/Other-Library/"
          },
          {
            "text": "juejin",
            "link": "/docs/juejin/"
          },
          {
            "text": "前端性能优化与实践",
            "link": "/docs/前端性能优化与实践/"
          },
          {
            "text": "使用webpack定制前端开发环境",
            "link": "/docs/使用webpack定制前端开发环境/"
          }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/recoluan",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      // "/docs/theme-reco/": [
      //   "",
      //   "theme",
      //   "plugin",
      //   "api"
      // ],
      "/docs/HTML-Library/": [
        // "",
        "HTML-Study",
        "HTML技巧"
      ],
      "/docs/CSS-Library/": [
        "",
        "那些奇妙的 CSS ",
        "我都知道的CSS",
        "CSS 技巧",
        "别再问我布局了喔"
      ],
      "/docs/Javascript-Library/": [
        "",
        "常见对象方法",
        "常见手写代码",
        "常见数组方法",
        "常见字符串方法",
        "字符串技巧",
        "解构赋值",
        "可选链式操作符",
        "空值合并运算符",
        "了解Event Loop么",
        "聊聊原型和原型链",
        "我都知道的JS",
        "ES6的Set ，WeakSet，Map和WeakMap",
        "for of 和 for in 及forEach",
        "Javascript 面试题",
        "js存储和垃圾回收",
        "js继承",
        "js跳出循环的方法区别break,continue,return",
        "实现一个 new 操作符",
        "reduce 的妙用"
      ],
      "/docs/Vue-Library": [
        "",
        "$ref和$el区别",
        "常用mixin",
        "项目添加svgIcon",
        "修改Vue打包后文件的接口地址配置",
        "虚拟列表",
        "自定义指令",
        "axios封装",
        "Element-ui 全局默认属性配置",
        "evnetbus-事件总线",
        "router-view 的 key 属性",
        "vue 整理面试题",
        "Vue的provide、inject",
        "vue响应原理",
        "vue项目路由权限配置",
        "Vue项目启动时间太慢",
        "vue项目问题总结",
        "vue中的$attrs和$listeners"
      ],
      "/docs/Other-Library/": [
        "",
        "常见手写",
        "错误监控",
        "登录鉴权方式",
        "工具函数",
        "利器推荐",
        "面试总结",
        "设计模式",
        "模板方法模式，父类封装流程，子类具体实现",
        "那些面试的手写",
        "那些年，我们忘了的正则 ×",
        "前端模块化：CommonJS,AMD,CMD,ES6",
        "前端协作规范",
        "去掉那些if else",
        "使用signature_pad实现数字签名",
        "算法初探",
        "图片上传压缩",
        "网络安全",
        "微前端qiankun实践",
        "移动端常见兼容问题",
        "移动端适配",
        "原生内嵌webview",
        "axios token失效取消后续请求",
        "axios.all和axios.spread",
        "excel指定行导入",
        "HTTP",
        "http协议",
        "js函数工具库",
        "markdown语法",
        "nginx配置",
        "Oauth2.0",
        "print 打印",
        "session、cookie、Token和JWT",
        "Vite初识",
      ],
      "/docs/juejin/": [
        "",
        "20个js工具函数助力高效开发",
        "当我们二次封装时我们在封装什么",
        "关于首屏优化，我做了哪些",
        "使用VuePress搭建Element的组件库文档",
        "Typescript学习指南",
        "vue3正式发布两年后，我才开始学（2w字总结）",
      ],
      "/docs/前端性能优化与实践/": [
        "",
        "开篇：知识体系与小册格局",
        "存储篇 1：浏览器缓存机制介绍与缓存策略剖析",
        "存储篇 2：本地存储——从 Cookie 到 Web Storage、IndexDB",
       "前方的路：希望以此为你的起点",
       "网络篇 1：webpack 性能调优与 Gzip 原理",
       "网络篇 2：图片优化——质量与性能的博弈",
       "性能监测篇：Performance、LightHouse 与性能 API",
       "渲染篇 1：服务端渲染的探索与实践",
       "渲染篇 2：知己知彼——解锁浏览器背后的运行机制",
       "渲染篇 3：对症下药——DOM 优化原理与基本实践",
       "渲染篇 4：千方百计——Event Loop 与异步更新策略",
       "应用篇 1：优化首屏体验——Lazy-Load 初探",
       "应用篇 2：事件的节流（throttle）与防抖（debounce）",
       "彩蛋篇：CDN 的缓存与回源机制解析"
      ],
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    // "friendLink": [
    //   {
    //     "title": "午后南杂",
    //     "desc": "Enjoy when you can, and endure when you must.",
    //     "email": "1156743527@qq.com",
    //     "link": "https://www.recoluan.com"
    //   },
    //   {
    //     "title": "vuepress-theme-reco",
    //     "desc": "A simple and beautiful vuepress Blog & Doc theme.",
    //     "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
    //     "link": "https://vuepress-theme-reco.recoluan.com"
    //   }
    // ],
    "logo": "/resb.jpg",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "Vimalakirti",
    "authorAvatar": "/resb.jpg",
    "record": "xxxx",
    "startYear": "2019"
  },
  "markdown": {
    "lineNumbers": true
  }
}
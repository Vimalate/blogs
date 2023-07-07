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
        "href": "/avatar.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    // [
    //   'script', 
    //   { "src": `https://unpkg.com/element-ui/lib/index.js` }
    // ],
    // [
    //   "link",
    //   {
    //     "rel": "stylesheet",
    //     "href": "https://unpkg.com/element-ui/lib/theme-chalk/index.css"
    //   }
    // ],
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
    // "vuepress-plugin-nuggets-style-copy": true,
    "one-click-copy": {
    copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
    copyMessage: '复制成功！', // default is 'Copy successfully and then paste it for use.'
    showInMobile: false // whether to display on the mobile side, default: false.
    },
    'vuepress-plugin-helper-live2d': {
      // 是否开启控制台日志打印(default: false)
      log: false,
      live2d: {
        // 是否启用(关闭请设置为false)(default: true)
        enable: true,
        // 模型名称(default: hibiki)>>>取值请参考：
        // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
        model: 'wanko',
        display: {
          position: "right", // 显示位置：left/right(default: 'right')
          width: 135, // 模型的长度(default: 135)
          height: 300, // 模型的高度(default: 300)
          hOffset: 65, //  水平偏移(default: 65)
          vOffset: 0, //  垂直偏移(default: 0)
        },
        mobile: {
          show: true // 是否在移动设备上显示(default: false)
        },
        react: {
          opacity: 0.8 // 模型透明度(default: 0.8)
        }
      }
    },
    "dynamic-title":
    {
      showText: "(/≧▽≦/)咦！又好了！",
      hideText: "(●—●)喔哟，崩溃啦！",
      recoverTime: 2000
    },
    "ribbon-animation": {
      size: 90,   // 默认数据
      opacity: 0.3,  //  透明度
      zIndex: -1,   //  层级
      opt: {
        // 色带HSL饱和度
        colorSaturation: "80%",
        // 色带HSL亮度量
        colorBrightness: "60%",
        // 带状颜色不透明度
        colorAlpha: 0.65,
        // 在HSL颜色空间中循环显示颜色的速度有多快
        colorCycleSpeed: 6,
        // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
        verticalPosition: "center",
        // 到达屏幕另一侧的速度有多快
        horizontalSpeed: 200,
        // 在任何给定时间，屏幕上会保留多少条带
        ribbonCount: 2,
        // 添加笔划以及色带填充颜色
        strokeSize: 0,
        // 通过页面滚动上的因子垂直移动色带
        parallaxAmount: -0.5,
        // 随着时间的推移，为每个功能区添加动画效果
        animateSections: true
      },
      ribbonShow: false, //  点击彩带  true显示  false为不显示
      ribbonAnimationShow: true  // 滑动彩带
    }
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
            "link":"/docs/Vue-Library/"
          },
          {
            "text":"React-Library",
            "link":"/docs/React-Library/"
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
            "text": "web-interview",
            "link":"/docs/interview/"
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
            "link": "https://github.com/Vimalate",
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
      "/docs/Vue-Library/": [
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
      "/docs/React-Library/": [
        "",
        "react-study",
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
        "verdaccio搭建npm私有仓库",
        "网络安全",
        "微前端qiankun实践",
        "手写 mini qiankun",
        "移动端常见兼容问题",
        "移动端适配",
        "原生内嵌webview",
        "axios token失效取消后续请求",
        "axios.all和axios.spread",
        "nvm问题处理",
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
        "一些工作中值得收藏的网站",
        "pnpm、vue3搭建组件库",
        "WebRtc初探"
      ],
      "/docs/juejin/": [
        "",
        "20个js工具函数助力高效开发",
        "当我们二次封装时我们在封装什么",
        "关于首屏优化，我做了哪些",
        "使用VuePress搭建Element的组件库文档",
        "Typescript学习指南",
        "vue3正式发布两年后，我才开始学（2w字总结）",
        "微前端实践",
        "我迟来的 2022 年终总结：前已无通路，后不见归途",
        "如何使用 pnpm+vue3+vite 搭建组件库并发布到私有仓库",
        "常见手写代码",
        "vue3 里使用jsx",
      ],
      "/docs/interview/": [
        "",
        "2023-web-interview",
        "简历准备",
        "面试题整理",
        "计算机与网络安全",
        "工程化",
        "html",
        "js",
        "css",
        "vue",
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
    "logo": "/avatar.jpg",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "呛再首",
    "authorAvatar": "/avatar.jpg",
    "record": "回到顶部",
    "startYear": "2019"
  },
  "markdown": {
    "lineNumbers": true
  },
  chainWebpack: config => {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features')
}
}
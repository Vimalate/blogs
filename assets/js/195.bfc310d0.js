(window.webpackJsonp=window.webpackJsonp||[]).push([[195],{844:function(e,a,s){"use strict";s.r(a);var n=s(2),t=Object(n.a)({},(function(){var e=this,a=e._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"用-hmr-提高开发效率"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#用-hmr-提高开发效率"}},[e._v("#")]),e._v(" 用 HMR 提高开发效率")]),e._v(" "),a("p",[e._v("HMR 全称是 Hot Module Replacement，即模块热替换。在这个概念出来之前，我们使用过 Hot Reloading，当代码变更时通知浏览器刷新页面，以避免频繁手动刷新浏览器页面。HMR 可以理解为增强版的 Hot Reloading，但不用整个页面刷新，而是局部替换掉部分模块代码并且使其生效，可以看到代码变更后的效果。所以，HMR 既避免了频繁手动刷新页面，也减少了页面刷新时的等待，可以极大地提高前端页面开发效率。")]),e._v(" "),a("h2",{attrs:{id:"配置使用-hmr"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置使用-hmr"}},[e._v("#")]),e._v(" 配置使用 HMR")]),e._v(" "),a("p",[e._v("HMR 是 webpack 提供的非常有用的一个功能，跟我们之前提到的一样，安装好 webpack-dev-server， 添加一些简单的配置，即在 webpack 的配置文件中添加启用 HMR 需要的两个插件：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("const webpack = require('webpack')\n\nmodule.exports = {\n  // ...\n  devServer: {\n    hot: true // dev server 的配置要启动 hot，或者在命令行中带参数开启\n  },\n  plugins: [\n    // ...\n    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径\n    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件\n  ],\n}\n\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br")])]),a("blockquote",[a("p",[e._v("笔者觉得 HMR 应该是 development mode 默认启动的功能，这个希望 webpack 后续能有优化。")])]),e._v(" "),a("h2",{attrs:{id:"hmr-运行原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hmr-运行原理"}},[e._v("#")]),e._v(" HMR 运行原理")]),e._v(" "),a("p",[e._v("HMR 的实现和运行相对复杂，需要多个部分协同配合，这里稍微介绍一下 HRM 的运行原理。")]),e._v(" "),a("p",[e._v("首先我们要知道一个概念：webpack 内部运行时，会维护一份用于管理构建代码时各个模块之间交互的表数据，webpack 官方称之为 "),a("strong",[e._v("Manifest")]),e._v("，其中包括入口代码文件和构建出来的 bundle 文件的对应关系。可以使用 "),a("a",{attrs:{href:"https://github.com/danethurber/webpack-manifest-plugin",target:"_blank",rel:"noopener noreferrer"}},[e._v("WebpackManifestPlugin"),a("OutboundLink")],1),e._v(" 插件来输出这样的一份数据。")]),e._v(" "),a("p",[e._v("了解这个概念后，我们来看一下 HMR 的大致运行流程图。")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/3/19/1623bffb086c3918?w=1272&h=890&f=png&s=218413",alt:"hmr flow chart"}})]),e._v(" "),a("p",[e._v("当你使用前面的配置启动了支持 HMR 的 webpack-dev-server，然后在浏览器打开页面时，你也可以从控制台看到大概的 HMR 执行流程：")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/3/19/1623c0004b223528?w=396&h=122&f=png&s=18243",alt:"hmr log in console"}})]),e._v(" "),a("p",[e._v("开启了 hot 功能的 webpack 会往我们应用的主要代码中添加 WS 相关的代码，用于和服务器保持连接，等待更新动作。")]),e._v(" "),a("p",[e._v("当你配置了 HMR 的插件时，会往应用代码中添加 HMR 运行时的代码，主要用于定义代码模块应用更新时的 API，后面会详细介绍。")]),e._v(" "),a("blockquote",[a("p",[e._v("有兴趣可以查看源码："),a("a",{attrs:{href:"https://github.com/webpack/webpack/blob/master/lib/HotModuleReplacement.runtime.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("HotModuleReplacement.runtime.js"),a("OutboundLink")],1),e._v("。")])]),e._v(" "),a("p",[e._v("有了这两个部分就可以支持整个 HMR 的功能了。我们先忽略流程图的右上角部分，左下角的流程相对容易理解：当有更新时，webpack-dev-server 发送更新信号给 HMR 运行时，然后 HMR 再请求所需要的更新数据，请求的更新数据没有问题的话就应用更新。")]),e._v(" "),a("p",[e._v("如果 HMR 只是简单替换了代码模块的内容，如替换掉所谓的 "),a("code",[e._v("installedModules")]),e._v(" 中需要更新的部分，那么这样并没有办法把更新后的结果实时地在浏览器上显示出来，所以才会需要流程图的右上角部分。")]),e._v(" "),a("blockquote",[a("p",[e._v("如果无法理解 "),a("code",[e._v("installedModules")]),e._v("，可以参考第 13 小节中的「bundler 的基础流程」这一部分的内容")])]),e._v(" "),a("p",[e._v("前面提到的 HMR 运行时代码会提供定义代码模块应用更新时执行的 API，这些 API 可以让我们在模块中定义接收到 HMR 更新应用信号时，需要额外做什么工作。例如， "),a("a",{attrs:{href:"https://github.com/webpack-contrib/style-loader",target:"_blank",rel:"noopener noreferrer"}},[e._v("style-loader"),a("OutboundLink")],1),e._v(" 就需要实现 HMR 接口，当收到更新时，使用新的样式替换掉旧的样式，大概是这样：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("if (module.hot) {\n  module.hot.accept('/some/path', function() {\n    // ... 用新样式替换旧样式\n  })\n}\n\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br")])]),a("p",[e._v("详情可以参考 "),a("a",{attrs:{href:"https://github.com/webpack-contrib/style-loader",target:"_blank",rel:"noopener noreferrer"}},[e._v("style-loader"),a("OutboundLink")],1),e._v(" 中的代码实现："),a("a",{attrs:{href:"https://github.com/webpack-contrib/style-loader/blob/master/index.js#L36",target:"_blank",rel:"noopener noreferrer"}},[e._v("HMR interface implemention in style-loader"),a("OutboundLink")],1),e._v("。")]),e._v(" "),a("p",[e._v("HMR 应用更新时是使用 "),a("code",[e._v("webpackHotUpdate")]),e._v(" 来处理的：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("webpackHotUpdate(id, { \n  'modulePath': \n  function() {\n    // 模块更新后的代码\n  }\n})\n\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br")])]),a("p",[e._v("执行 "),a("code",[e._v("webpackHotUpdate")]),e._v(" 时如发现模块代码实现了 HMR 接口，就会执行相应的回调或者方法，从而达到应用更新时，模块可以自行管理自己所需要额外做的工作。不过，并不是所有的模块都需要做相关的处理，当遇见没有实现 HMR 接口的模块时，就会往上层冒泡，如本节开头部分的流程图所示。")]),e._v(" "),a("p",[e._v("这里还有一个问题是，webpack 如何保证 HMR 接口中的引用是最新的模块代码？我们看一个简单的例子：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("import './index.css'\nimport hello from './bar'\n\nhello()\n\nif (module.hot) {\n  module.hot.accept('./bar', () => {\n    // console.log('Accepting the updated bar module!')\n    hello()\n  })\n}\n\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br")])]),a("p",[e._v("从代码上看，hello 都是同一个，这样的话并没有办法引用最新的模块代码，但是我们看一下上述代码在 webpack 构建后的结果：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('if (true) {\n  module.hot.accept("./src/bar.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { \n    /* harmony import */ \n    __WEBPACK_IMPORTED_MODULE_1__bar__ = __webpack_require__("./src/bar.js"); \n    (() => {\n      // console.log(\'Accepting the updated bar module!\')\n      Object(__WEBPACK_IMPORTED_MODULE_1__bar__["default"])()\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); \n  })\n}\n\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br")])]),a("p",[e._v("其他代码比较杂，我们集中看 "),a("code",[e._v("module.hot")]),e._v(" 的处理部分。这里可以发现，我们的 hello 已经重新使用 "),a("code",[e._v("__webpack_require__")]),e._v(" 来引用了，所以可以确保它是最新的模块代码。")]),e._v(" "),a("p",[e._v("基本上 HMR 的执行原理就是这样，更具体的实现部分就不展开讲解了。在日常开发中，我们需要更多的工具来帮助我们实现 HMR 的接口，避免编写过多 HMR 需要的代码。例如，React 在组件代码更新时可能需要触发重新 render 来实现实时的组件展示效果，官方提供了一些现有的工具，需要的可以参考一下："),a("a",{attrs:{href:"https://webpack.js.org/guides/hot-module-replacement/#other-code-and-frameworks",target:"_blank",rel:"noopener noreferrer"}},[e._v("hot module replacement tools"),a("OutboundLink")],1),e._v("。")]),e._v(" "),a("h2",{attrs:{id:"module-hot-常见的-api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#module-hot-常见的-api"}},[e._v("#")]),e._v(" module.hot 常见的 API")]),e._v(" "),a("p",[e._v("前面 HMR 实现部分已经讲解了实现 HMR 接口的重要性，下面来看看常见的 "),a("code",[e._v("module.hot")]),e._v(" API 有哪些，以及如何使用。")]),e._v(" "),a("p",[e._v("之前已经简单介绍过，"),a("code",[e._v("module.hot.accept")]),e._v(" 方法指定在应用特定代码模块更新时执行相应的 callback，第一个参数可以是字符串或者数组，如：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("if (module.hot) {\n  module.hot.accept(['./bar.js', './index.css'], () => {\n    // ... 这样当 bar.js 或者 index.css 更新时都会执行该函数\n  })\n}\n\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br")])]),a("p",[a("code",[e._v("module.hot.decline")]),e._v(" 对于指定的代码模块，拒绝进行模块代码的更新，进入更新失败状态，如 "),a("code",[e._v("module.hot.decline('./bar.js')")]),e._v("。这个方法比较少用到。")]),e._v(" "),a("p",[a("code",[e._v("module.hot.dispose")]),e._v(" 用于添加一个处理函数，在当前模块代码被替换时运行该函数，例如：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("if (module.hot) {\n  module.hot.dispose((data) => {\n    // data 用于传递数据，如果有需要传递的数据可以挂在 data 对象上，然后在模块代码更新后可以通过 module.hot.data 来获取\n  })\n}\n\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br")])]),a("p",[a("code",[e._v("module.hot.accept")]),e._v(" 通常用于指定当前依赖的某个模块更新时需要做的处理，如果是当前模块更新时需要处理的动作，使用 "),a("code",[e._v("module.hot.dispose")]),e._v(" 会更加容易方便。")]),e._v(" "),a("p",[a("code",[e._v("module.hot.removeDisposeHandler")]),e._v(" 用于移除 "),a("code",[e._v("dispose")]),e._v(" 方法添加的 callback。")]),e._v(" "),a("p",[e._v("关于 "),a("code",[e._v("module.hot")]),e._v(" 的更多 API 详情可以参考官方文档："),a("a",{attrs:{href:"https://doc.webpack-china.org/api/hot-module-replacement",target:"_blank",rel:"noopener noreferrer"}},[e._v("Hot Module Replacement APIs"),a("OutboundLink")],1),e._v("。")]),e._v(" "),a("h2",{attrs:{id:"小结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[e._v("#")]),e._v(" 小结")]),e._v(" "),a("p",[e._v("Hot Module Replacement 是 webpack 具备的一个相当重要的特性，用于提升开发效率和体验。在这一小节中，我们介绍了：")]),e._v(" "),a("ul",[a("li",[e._v("在 webpack 中配置使用 HMR")]),e._v(" "),a("li",[e._v("HMR 的运行原理")]),e._v(" "),a("li",[e._v("模块中的 HMR 接口 API")])]),e._v(" "),a("h2",{attrs:{id:"例子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#例子"}},[e._v("#")]),e._v(" 例子")]),e._v(" "),a("p",[e._v("本小节提及的一些简单的 Demo 可以在 "),a("a",{attrs:{href:"https://github.com/teabyii/webpack-examples",target:"_blank",rel:"noopener noreferrer"}},[e._v("webpack-examples"),a("OutboundLink")],1),e._v(" 找到。")])])}),[],!1,null,null,null);a.default=t.exports}}]);
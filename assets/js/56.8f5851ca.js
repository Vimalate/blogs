(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{691:function(s,a,t){"use strict";t.r(a);var e=t(2),n=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"空值合并运算符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#空值合并运算符"}},[s._v("#")]),s._v(" 空值合并运算符'??'")]),s._v(" "),a("div",{staticClass:"language-! line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("当第一个参数不是 null/undefined，则 ?? 返回第一个参数，否则返回第二个参数\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"用法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#用法"}},[s._v("#")]),s._v(" 用法")]),s._v(" "),a("p",[s._v("let result=a??b")]),s._v(" "),a("p",[s._v("和")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" result"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("undefined")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("是等价的，结果都是")]),s._v(" "),a("ul",[a("li",[s._v("如果 a 是已定义的，则结果是 a")]),s._v(" "),a("li",[s._v("如果 a 不是已定义的，则结果是 b")])]),s._v(" "),a("h3",{attrs:{id:"使用场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用场景"}},[s._v("#")]),s._v(" 使用场景")]),s._v(" "),a("p",[s._v("为未定义的变量提供一个默认值")]),s._v(" "),a("p",[s._v("例如 "),a("code",[s._v("name")]),s._v(" 未定义，则显示"),a("code",[s._v("Lili")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" name\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("??")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Lili'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Lili")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("当 "),a("code",[s._v("name")]),s._v("已定义时，则显示定义值")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Tom'")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("??")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Lili'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Tom")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h3",{attrs:{id:"与-比较"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#与-比较"}},[s._v("#")]),s._v(" 与 || 比较")]),s._v(" "),a("ul",[a("li",[s._v("|| 返回第一个真值")]),s._v(" "),a("li",[s._v("?? 返回第一个已定义值")])]),s._v(" "),a("p",[s._v("即，"),a("code",[s._v("||")]),s._v(" 无法区分"),a("code",[s._v("false")]),s._v(","),a("code",[s._v("0")]),s._v("空字符串以及"),a("code",[s._v("null/undefined")])]),s._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),a("ul",[a("li",[s._v("?? 被用于为变量分配默认值")]),s._v(" "),a("li",[s._v("?? 运算符的优先级非常低，仅略高于 ? 和 =，因此在表达式中使用它时请考虑添加括号")]),s._v(" "),a("li",[s._v("如果没有明确添加括号，不能将其与 || 或 && 一起使用")])])])}),[],!1,null,null,null);a.default=n.exports}}]);
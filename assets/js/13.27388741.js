(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{568:function(t,e,s){},649:function(t,e,s){"use strict";s(568)},665:function(t,e,s){"use strict";s.r(e);var i={name:"EllipsisTooltip",props:{text:{type:String,default:""},placement:{type:String,default:"top-start"},effect:{type:String,default:"dark"},color:String},data:()=>({disableTip:!1}),methods:{onMouseOver(){let t=this.$refs.ellipsis.parentNode.offsetWidth,e=this.$refs.ellipsis.offsetWidth;this.disableTip=e<=t}}},l=(s(649),s(2)),o=Object(l.a)(i,(function(){var t=this,e=t._self._c;return e("el-tooltip",{attrs:{effect:t.effect,content:t.text,disabled:t.disableTip,placement:t.placement}},[e("div",{staticClass:"ellipsis",on:{mouseover:t.onMouseOver}},[e("span",{ref:"ellipsis",staticClass:"text",style:{color:t.color}},[t._v(t._s(t.text))])])])}),[],!1,null,"0c7ca815",null);e.default=o.exports}}]);
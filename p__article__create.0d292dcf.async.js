(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{"9Cog":function(e,t,a){"use strict";a.r(t);a("IzEo");var n=a("bx4M"),l=(a("miYZ"),a("tsqr")),r=a("k1fw"),c=a("q1tI"),i=a.n(c),o=a("p12T"),u=a("Hx5s"),s=a("UnBh"),m=function(e){var t=e.dispatch,a=e.updating,o=e.allCategories,m=function(e){try{t({type:"article/createArticle",payload:Object(r["a"])({},e)})}catch(a){l["a"].error("\u65b0\u5efa\u5931\u8d25")}};return Object(c["useEffect"])((function(){t({type:"category/fetchAllCategory"})}),[]),i.a.createElement(u["b"],null,i.a.createElement(n["a"],null,i.a.createElement(s["a"],{allCategories:o,updating:a,onFinish:m,submitTitle:"\u65b0\u5efa\u6587\u7ae0"})))};t["default"]=Object(o["a"])((function(e){var t=e.category,a=e.loading;return{updating:a.effects["article/updateArticle"],allCategories:t.allCategory}}))(m)},UnBh:function(e,t,a){"use strict";a("BoS7");var n=a("Sdc0"),l=(a("DZo9"),a("8z0m")),r=(a("+L6B"),a("2/Rp")),c=(a("IzEo"),a("bx4M")),i=a("0Owb"),o=(a("OaEy"),a("2fM7")),u=a("oBTY"),s=(a("y8nQ"),a("Vl3Y")),m=a("tJVT"),d=a("q1tI"),f=a.n(d),g=a("1M3H"),b=a.n(g),p=a("56rK"),v=a.n(p),E=(a("i8oR"),a("71ry")),O=a("whJP"),C=(a("5Dmo"),a("3S7+")),h=(a("+BJd"),a("mr32")),j=a("xvlK"),y=(a("O3gP"),a("lrIw")),I=(a("5NDa"),a("5rEg")),w=a("9kvl"),T=function(e){var t=e.value,a=e.isFocus,n=e.onChange,l=e.onSelect,r=e.onBlur,c=e.onPressEnter,i=e.tagList,o=e.dispatch,u=Object(d["useState"])([]),s=Object(m["a"])(u,2),g=s[0],b=s[1],p=Object(d["useRef"])(null),v=function(e){var t=i.map((function(e){return{value:e.tagName}})),a=t.filter((function(t){return-1!==t.value.indexOf(e)}));b(a)};return Object(d["useEffect"])((function(){p.current&&p.current.focus()}),[a]),Object(d["useEffect"])((function(){o({type:"tag/fetchAllTag"})}),[]),Object(d["useEffect"])((function(){b(i.map((function(e){return{value:e.tagName}})))}),[i]),f.a.createElement(y["a"],{style:{width:200},onSelect:l,onSearch:v,value:t,defaultOpen:!0,autoFocus:!0,backfill:!0,options:g},f.a.createElement(I["a"],{allowClear:!0,ref:p,size:"small",value:t,onChange:n,onBlur:r,placeholder:"\u53ef\u4ee5\u641c\u7d22",onPressEnter:c}))},k=Object(w["a"])((function(e){var t=e.tag,a=e.loading;return{tagList:t.tagList||[],loading:a.effects["tag/fetchAllTag"]||!1}}))(T),S=(a("VbOK"),["#f50","#2db7f5","#87d068","#108ee9","magenta","red","volcano","orange","gold","lime","green","cyan","blue","geekblue","purple"]),F=function(e){var t=e.tags,a=e.setTags,n=Object(d["useState"])(!1),l=Object(m["a"])(n,2),r=l[0],c=l[1],i=Object(d["useState"])(""),o=Object(m["a"])(i,2),s=o[0],g=o[1],b=Object(d["useState"])(-1),p=Object(m["a"])(b,2),v=p[0],E=p[1],O=Object(d["useState"])(""),y=Object(m["a"])(O,2),I=y[0],w=y[1],T=Object(d["useState"])(!1),F=Object(m["a"])(T,2),x=F[0],B=F[1],q=Object(d["useState"])(!1),N=Object(m["a"])(q,2),V=N[0],P=N[1],D=function(e){var n=t.filter((function(t){return t!==e}));a(n)},L=function(){c(!0),B(!0)},M=function(e){g(e.target.value)},z=function(e){w(e.target.value)},A=function(){s&&-1===t.indexOf(s)&&a([].concat(Object(u["a"])(t),[s])),c(!1),g("")},J=function(){var e=Object(u["a"])(t),n=e[v];n&&(e[v]=I,a(e)),E(-1),g("")},R=function(e){g(e),e&&-1===t.indexOf(e)&&a([].concat(Object(u["a"])(t),[e])),c(!1),g("")},K=function(e,n){w(e);var l=Object(u["a"])(t),r=l[v];r&&(l[n]=e,a(l)),E(-1),g("")};return Object(d["useEffect"])((function(){}),[]),f.a.createElement(f.a.Fragment,null,t.map((function(e,t){if(v===t)return f.a.createElement(k,{key:e,isFocus:V,value:I,onChange:z,onSelect:function(e){return K(e,v)},onBlur:J,onPressEnter:J});var a=e.length>20,n=f.a.createElement(h["a"],{color:S[t],className:"edit-tag",key:e,closable:!0,onClose:function(){return D(e)}},f.a.createElement("span",{onDoubleClick:function(a){a.preventDefault(),E(t),w(e),P(!0)}},a?"".concat(e.slice(0,20),"..."):e));return a?f.a.createElement(C["a"],{title:e,key:e},n):n})),r&&f.a.createElement(k,{isFocus:x,value:s,onChange:M,onSelect:R,onBlur:A,onPressEnter:A}),!r&&f.a.createElement(h["a"],{className:"site-tag-plus",onClick:L},f.a.createElement(j["a"],null)," New Tag"))},x=F,B={wrapperCol:{lg:{offset:2,span:4},xs:{offset:0,span:24}}},q={labelCol:{span:2},wrapperCol:{span:17}},N=new b.a,V="/api/upload/file",P=function(e){var t=e.articleDetail,a=e.allCategories,g=e.updating,b=e.onFinish,p=e.submitTitle,C=Object(d["useState"])([]),h=Object(m["a"])(C,2),j=h[0],y=h[1],I=Object(d["useState"])(""),w=Object(m["a"])(I,2),T=w[0],k=w[1],S=s["a"].useForm(),F=Object(m["a"])(S,1),P=F[0],D=function(e){var t=e.text;P.setFieldsValue({articleContent:t})},L=function(e){},M={action:V,onChange:function(e){var t=Object(u["a"])(e.fileList);t=t.slice(-1),t=t.map((function(e){return e.response&&(e.url=e.response.data),e}));var a=t[0]&&t[0].url||"";P.setFieldsValue({articleCoverImage:a}),k(a)},listType:"picture",multiple:!0};return Object(d["useEffect"])((function(){P.setFieldsValue({articleTitle:null===t||void 0===t?void 0:t.articleTitle,articleTags:null===t||void 0===t?void 0:t.articleTags,articleCategoryId:null===t||void 0===t?void 0:t.articleCategoryId,articleContent:null===t||void 0===t?void 0:t.articleContent,articleStatus:null===t||void 0===t?void 0:t.articleStatus,enableComment:null===t||void 0===t?void 0:t.enableComment,articleCoverImage:null===t||void 0===t?void 0:t.articleCoverImage}),k((null===t||void 0===t?void 0:t.articleCoverImage)||""),y((null===t||void 0===t?void 0:t.articleTags.map((function(e){return e.tagName})))||[])}),[t]),Object(d["useEffect"])((function(){P.setFieldsValue({articleTags:j})}),[j]),f.a.createElement(s["a"],Object(i["a"])({},q,{form:P,name:"basic",onFinish:b,onFinishFailed:L}),f.a.createElement(s["a"].Item,{label:"\u6807\u9898",name:"articleTitle",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u9898!"}]},f.a.createElement(O["a"],{placeholder:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u9898",autoSize:{minRows:1,maxRows:6}})),f.a.createElement(s["a"].Item,Object(i["a"])({label:"\u5206\u7c7b"},{labelCol:{span:2},wrapperCol:{span:6}},{name:"articleCategoryId",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6587\u7ae0\u5206\u7c7b!"}]}),f.a.createElement(o["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u6587\u7ae0\u5206\u7c7b"},"undefined"!==typeof a&&a.map((function(e){return f.a.createElement(o["a"].Option,{value:e.categoryId,key:e.categoryId},e.categoryName)})))),f.a.createElement(s["a"].Item,{label:"\u6807\u7b7e",name:"articleTags",rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u7b7e!"}]},f.a.createElement(x,{tags:j,setTags:y})),f.a.createElement(s["a"].Item,{label:"\u5c01\u9762",name:"articleCoverImage",rules:[{required:!1,message:"\u8bf7\u4e0a\u4f20\u6587\u7ae0\u5c01\u9762!"}]},f.a.createElement(f.a.Fragment,null,f.a.createElement(c["a"],{hoverable:!0,style:{width:400,marginBottom:"20px"},cover:f.a.createElement("img",{alt:"\u5c01\u9762",src:T})},f.a.createElement(c["a"].Meta,{title:P.getFieldValue("articleTitle"),description:P.getFieldValue("articleCoverImage")})),f.a.createElement(l["a"],M,f.a.createElement(r["a"],null,f.a.createElement(E["UploadOutlined"],null)," \u70b9\u51fb\u4e0a\u4f20")))),f.a.createElement(s["a"].Item,{label:"\u72b6\u6001",name:"articleStatus",valuePropName:"checked",rules:[{required:!1,message:"\u8bf7\u9009\u62e9\u6587\u7ae0\u72b6\u6001!"}]},f.a.createElement(n["a"],{defaultChecked:!0,checkedChildren:"\u53d1\u5e03",unCheckedChildren:"\u8349\u7a3f"})),f.a.createElement(s["a"].Item,{label:"\u8bc4\u8bba",name:"enableComment",valuePropName:"checked",rules:[{required:!1,message:"\u8bf7\u9009\u62e9\u8bc4\u8bba\u5f00\u542f\u72b6\u6001!"}]},f.a.createElement(n["a"],{defaultChecked:!0,checkedChildren:"\u5f00\u542f",unCheckedChildren:"\u5173\u95ed"})),f.a.createElement(s["a"].Item,Object(i["a"])({label:"\u5185\u5bb9"},{labelCol:{span:2},wrapperCol:{span:20}},{name:"articleContent",rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u5185\u5bb9!"}]}),f.a.createElement(v.a,{placeholder:"\u8bf7\u8f93\u5165\u6587\u7ae0\u5185\u5bb9",config:{view:{menu:!0,md:!0,html:!1}},style:{height:"500px"},renderHTML:function(e){return N.render(e)},onChange:D})),f.a.createElement(s["a"].Item,B,f.a.createElement(r["a"],{block:!0,type:"primary",htmlType:"submit",loading:g},p||"\u66f4\u65b0\u6587\u7ae0")))};t["a"]=P},VbOK:function(e,t,a){}}]);
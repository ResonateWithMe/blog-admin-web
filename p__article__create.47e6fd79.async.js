(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"2ctX":function(e,a,t){},"9Cog":function(e,a,t){"use strict";t.r(a);t("IzEo");var l=t("bx4M"),n=(t("miYZ"),t("tsqr")),r=t("k1fw"),i=t("q1tI"),c=t.n(i),o=t("p12T"),s=t("Hx5s"),m=t("jeE3"),u=function(e){var a=e.dispatch,t=e.creating,o=function(e){try{a({type:"article/createArticle",payload:Object(r["a"])({},e)})}catch(t){n["a"].error("\u65b0\u5efa\u5931\u8d25")}};return Object(i["useEffect"])((function(){}),[]),c.a.createElement(s["b"],null,c.a.createElement(l["a"],null,c.a.createElement(m["a"],{submitting:t,onFinish:o,submitTitle:"\u65b0\u5efa\u6587\u7ae0"})))};a["default"]=Object(o["a"])((function(e){var a=e.loading;return{creating:a.effects["article/createArticle"]}}))(u)},jeE3:function(e,a,t){"use strict";t("+L6B");var l=t("2/Rp"),n=(t("BoS7"),t("Sdc0")),r=t("0Owb"),i=(t("OaEy"),t("2fM7")),c=(t("+BJd"),t("mr32")),o=(t("y8nQ"),t("Vl3Y")),s=t("tJVT"),m=t("q1tI"),u=t.n(m),d=t("1M3H"),g=t.n(d),p=t("56rK"),f=t.n(p),h=(t("i8oR"),t("whJP")),b=t("p12T"),v=(t("DZo9"),t("8z0m")),C=t("fWQN"),E=t("mtLc"),y=t("yKVA"),I=t("879j"),w=(t("miYZ"),t("tsqr")),j=t("ye1Q"),O=t("xvlK");t("2ctX");function T(e){var a="image/jpeg"===e.type||"image/png"===e.type;a||w["a"].error("You can only upload JPG/PNG file!");var t=e.size/1024/1024<2;return t||w["a"].error("Image must smaller than 2MB!"),a&&t}var k=function(e){Object(y["a"])(t,e);var a=Object(I["a"])(t);function t(e){var l;return Object(C["a"])(this,t),l=a.call(this,e),l.handleChange=function(e){"uploading"!==e.file.status?"done"===e.file.status&&(l.setState({loading:!1}),l.props.setCoverImage(e.file.response.data)):l.setState({loading:!0})},l.state={loading:!1},l}return Object(E["a"])(t,[{key:"render",value:function(){var e=this.props.coverImage,a=u.a.createElement("div",null,this.state.loading?u.a.createElement(j["a"],null):u.a.createElement(O["a"],null),u.a.createElement("div",{className:"ant-upload-text"},"\u4e0a\u4f20"));return u.a.createElement(v["a"],{name:"file",listType:"picture-card",className:"avatar-uploader",showUploadList:!1,action:"/api/upload/file",beforeUpload:T,onChange:this.handleChange},e?u.a.createElement("img",{src:e,alt:"avatar",style:{width:"100%"}}):a)}}]),t}(u.a.Component),q=k,N={wrapperCol:{lg:{offset:2,span:4},xs:{offset:0,span:24}}},F={labelCol:{span:2},wrapperCol:{span:17}},S=["#f50","#2db7f5","#87d068","#108ee9","magenta","red","volcano","orange","gold","lime","green","cyan","blue","geekblue","purple"],x=new g.a,M=function(e){var a=e.articleDetail,t=e.allCategories,d=e.submitting,g=e.onFinish,p=e.submitTitle,b=e.dispatch,v=e.allTags,C=Object(m["useState"])(""),E=Object(s["a"])(C,2),y=E[0],I=E[1],w=o["a"].useForm(),j=Object(s["a"])(w,1),O=j[0],T=function(e){var a=e.text;O.setFieldsValue({articleContent:a})},k=function(e){},M=function(e){var a=e.closable,t=e.label,l=e.onClose;return u.a.createElement(c["a"],{color:S[Math.floor(Math.random()*S.length)],closable:a,onClose:l,style:{marginTop:2,marginBottom:2,marginRight:4}},t)};return Object(m["useEffect"])((function(){O.setFieldsValue({articleTitle:null===a||void 0===a?void 0:a.articleTitle,articleTags:null===a||void 0===a?void 0:a.articleTags.map((function(e){return e.tagName})),articleCategoryId:null===a||void 0===a?void 0:a.articleCategoryId,articleContent:null===a||void 0===a?void 0:a.articleContent,articleStatus:null===a||void 0===a?void 0:a.articleStatus,enableComment:null===a||void 0===a?void 0:a.enableComment,articleCoverImage:null===a||void 0===a?void 0:a.articleCoverImage})}),[a]),Object(m["useEffect"])((function(){b({type:"category/fetchAll"}),b({type:"tag/fetchAll"})}),[]),u.a.createElement(o["a"],Object(r["a"])({},F,{form:O,name:"basic",onFinish:g,onFinishFailed:k}),u.a.createElement(o["a"].Item,{label:"\u6807\u9898",name:"articleTitle",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u9898!"}]},u.a.createElement(h["a"],{placeholder:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u9898",autoSize:{minRows:1,maxRows:6}})),u.a.createElement(o["a"].Item,Object(r["a"])({label:"\u5206\u7c7b"},{labelCol:{span:2},wrapperCol:{span:6}},{name:"articleCategoryId",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6587\u7ae0\u5206\u7c7b!"}]}),u.a.createElement(i["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u6587\u7ae0\u5206\u7c7b"},t.map((function(e){return u.a.createElement(i["a"].Option,{value:e.categoryId,key:e.categoryId},e.categoryName)})))),u.a.createElement(o["a"].Item,{label:"\u6807\u7b7e",name:"articleTags",rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u7b7e!"}]},u.a.createElement(i["a"],{tagRender:M,mode:"tags",style:{width:"100%"},options:v.map((function(e){return{label:e.tagName,value:e.tagName}})),placeholder:"\u8bf7\u9009\u62e9\u6216\u65b0\u5efa\u6807\u7b7e"})),u.a.createElement(o["a"].Item,{label:"\u5c01\u9762",name:"articleCoverImage",rules:[{required:!1,message:"\u8bf7\u4e0a\u4f20\u6587\u7ae0\u5c01\u9762!"}]},u.a.createElement(q,{coverImage:y,setCoverImage:function(e){O.setFieldsValue({articleCoverImage:e}),I(e)}})),u.a.createElement(o["a"].Item,{label:"\u72b6\u6001",name:"articleStatus",valuePropName:"checked",rules:[{required:!1,message:"\u8bf7\u9009\u62e9\u6587\u7ae0\u72b6\u6001!"}]},u.a.createElement(n["a"],{defaultChecked:!0,checkedChildren:"\u53d1\u5e03",unCheckedChildren:"\u8349\u7a3f"})),u.a.createElement(o["a"].Item,{label:"\u8bc4\u8bba",name:"enableComment",valuePropName:"checked",rules:[{required:!1,message:"\u8bf7\u9009\u62e9\u8bc4\u8bba\u5f00\u542f\u72b6\u6001!"}]},u.a.createElement(n["a"],{defaultChecked:!0,checkedChildren:"\u5f00\u542f",unCheckedChildren:"\u5173\u95ed"})),u.a.createElement(o["a"].Item,Object(r["a"])({label:"\u5185\u5bb9"},{labelCol:{span:2},wrapperCol:{span:20}},{name:"articleContent",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u5185\u5bb9!"}]}),u.a.createElement(f.a,{placeholder:"\u8bf7\u8f93\u5165\u6587\u7ae0\u5185\u5bb9",config:{view:{menu:!0,md:!0,html:!1}},style:{height:"500px"},renderHTML:function(e){return x.render(e)},onChange:T})),u.a.createElement(o["a"].Item,N,u.a.createElement(l["a"],{block:!0,type:"primary",htmlType:"submit",loading:d},p||"\u66f4\u65b0\u6587\u7ae0")))};a["a"]=Object(b["a"])((function(e){var a=e.tag,t=e.category;return{allTags:a.allTag||[],allCategories:t.allCategory||[]}}))(M)}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"0jlH":function(e,t,n){"use strict";n.r(t);var r=n("fWQN"),a=n("mtLc"),c=n("yKVA"),i=n("879j"),o=n("q1tI"),s=n.n(o),u=n("Hx5s"),l=n("Ty5D"),d=n("9kvl"),p=n("s4NR"),h=function(e){Object(c["a"])(n,e);var t=Object(i["a"])(n);function n(){var e;Object(r["a"])(this,n);for(var a=arguments.length,c=new Array(a),i=0;i<a;i++)c[i]=arguments[i];return e=t.call.apply(t,[this].concat(c)),e.state={isReady:!1},e}return Object(a["a"])(n,[{key:"componentDidMount",value:function(){this.setState({isReady:!0});var e=this.props.dispatch;e&&e({type:"user/fetchCurrent"})}},{key:"render",value:function(){var e=this.state.isReady,t=this.props,n=t.children,r=t.loading,a=t.currentUser,c=a&&a.userId,i=Object(p["stringify"])({redirect:window.location.href});return!c&&r||!e?s.a.createElement(u["c"],null):c||"/user/login"===window.location.pathname?n:s.a.createElement(l["c"],{to:"/user/login?".concat(i)})}}]),n}(s.a.Component);t["default"]=Object(d["a"])((function(e){var t=e.user,n=e.loading;return{currentUser:t.currentUser,loading:n.models.user}}))(h)}}]);
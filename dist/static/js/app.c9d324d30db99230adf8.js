webpackJsonp([12],{"1dmq":function(t,e,n){"use strict";var u={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"header"},[e("div",{staticClass:"title"},[this._v("在线音乐播放器")]),this._v(" "),e("div",{staticClass:"user-btn"},[e("button",{on:{click:this.signOut}},[e("img",{staticClass:"user-bg",attrs:{src:this.headerImg}}),this._v(" "),e("span",[this._v("退出")])])])])},staticRenderFns:[]};e.a=u},"22O3":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.clearHistory=e.setHistoryList=e.getHistoryList=void 0;var u,r=n("mvHQ"),i=(u=r)&&u.__esModule?u:{default:u};var o=function(t,e){localStorage.setItem(t,e)},a=function(t){var e=localStorage.getItem(t);return"string"==typeof e?JSON.parse(e):[]},s=function(){localStorage.clear()};e.getHistoryList=function(){return a("playerhistory")},e.setHistoryList=function(t,e){console.log("type: "+e);var n=[],u=(n=a("playerhistory")).findIndex(function(e,n,u){return e.id==t.id});return"remove"==e?n.splice(u,1):"add"==e&&(u<0?n.unshift(t):u>0&&(n.splice(u,1),n.unshift(t))),o("playerhistory",(0,i.default)(n)),n},e.clearHistory=function(){return s(),[]}},Cz8s:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=n("wqBJ"),r=n.n(u);for(var i in u)"default"!==i&&function(t){n.d(e,t,function(){return u[t]})}(i);var o=n("1dmq");var a=function(t){n("FtGP")},s=n("VU/8")(r.a,o.a,!1,a,null,null);e.default=s.exports},FtGP:function(t,e){},Hqqj:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n("oVAp"));var r={setAudio:function(t,e){var n=t.commit;t.state;n(u.GET_AUDIO,e)},setUid:function(t,e){var n=t.commit;t.state;n(u.SET_UID,e)},setCurrentList:function(t,e){var n=t.commit;t.state;n(u.SET_CURRENTLIST,e)},setPlayFlag:function(t,e){var n=t.commit;t.state;n(u.SET_PLAYFLAG,e)},setCurrentIndex:function(t,e){var n=t.commit;t.state;n(u.SET_CURRENTINDEX,e),n(u.SET_PLAYFLAG,!0)},initCurrentIndex:function(t){var e=t.commit;t.state;e(u.SET_INITCURRENTINDEX),e(u.SET_PLAYFLAG,!1)},addHistoryList:function(t,e){var n=t.commit;t.state;n(u.ADD_HISTORYLIST,e)},removeHistoryList:function(t,e){var n=t.commit;t.state;n(u.REMOVE_HISTORYLIST,e)}};e.default=r},IcnI:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=c(n("7+uW")),r=c(n("NYxO")),i=c(n("lwq5")),o=c(n("m9kF")),a=c(n("Hqqj")),s=c(n("TBfp"));function c(t){return t&&t.__esModule?t:{default:t}}u.default.use(r.default);var l=new r.default.Store({state:i.default,mutations:o.default,actions:a.default,getters:s.default});e.default=l},LOoJ:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.removeUserInfo=e.getUserInfo=e.setUserInfo=void 0;var u,r=n("mvHQ"),i=(u=r)&&u.__esModule?u:{default:u};e.setUserInfo=function(t){t&&t.token&&sessionStorage.setItem("userInfo",(0,i.default)(t))},e.getUserInfo=function(){return sessionStorage.getItem("userInfo")},e.removeUserInfo=function(){return sessionStorage.removeItem("userInfo")}},M93x:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=n("xJD8"),r=n.n(u);for(var i in u)"default"!==i&&function(t){n.d(e,t,function(){return u[t]})}(i);var o=n("SQHY");var a=function(t){n("ZOt1")},s=n("VU/8")(r.a,o.a,!1,a,null,null);e.default=s.exports},NHnr:function(t,e,n){"use strict";var u=s(n("7+uW")),r=s(n("M93x")),i=s(n("YaEn"));n("d8/S"),n("SPU+");var o=s(n("IcnI")),a=s(n("Twad"));function s(t){return t&&t.__esModule?t:{default:t}}u.default.config.productionTip=!1,u.default.use(a.default),n("kTXO"),new u.default({el:"#app",router:i.default,store:o.default,components:{App:r.default},template:"<App/>"})},"SPU+":function(t,e){},SQHY:function(t,e,n){"use strict";var u={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},["/login"!==this.$route.path&&"/"!==this.$route.path?e("header-vue"):this._e(),this._v(" "),e("router-view"),this._v(" "),e("audio",{ref:"audio"})],1)},staticRenderFns:[]};e.a=u},T452:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=o(n("//Fk")),r=o(n("mtWM")),i=o(n("mw3O"));function o(t){return t&&t.__esModule?t:{default:t}}r.default.defaults.timeout=5e4,r.default.defaults.baseURL="http://localhost:3000",r.default.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",r.default.interceptors.request.use(function(t){return"post"===t.method&&(t.data=i.default.stringify(t.data)),t},function(t){return u.default.reject(t)}),r.default.interceptors.response.use(function(t){return t.data.code&&200!==t.data.code?u.default.reject(t):t},function(t){return u.default.reject(t)}),e.default=r.default},TBfp:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={audio:function(t){return t.audio},uid:function(t){return t.uid},currentIndex:function(t){return t.currentIndex},currentList:function(t){return t.currentList},historyList:function(t){return t.historyList},playFlag:function(t){return t.playFlag},currentMusic:function(t){return t.currentList[t.currentIndex]||{}}}},Twad:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];Array.prototype.remove||(Array.prototype.remove=function(t){if(this.length){var e=this.indexOf(t);return e>-1?(this.splice(e,1),this):void 0}});var e="/static/image/loading.gif",n=[],u=[],r=window,i=function(t){var e=t.ele,r=t.src,i=e.getBoundingClientRect().top;window.innerHight;if(i+10<window.innerHeight){var o=new Image;return o.src=r,o.onload=function(){e.src=r,u.push(r),n.remove(t)},!0}return!1},o=function(t,o){r=o.value.scrollEl||window;var a=o.value.imgs;if(function(t){return u.indexOf(t)>-1}(a))return t.src=a,!1;var s={ele:t,src:a};t.src=e,i(s)||(n.push(s),r.addEventListener("scroll",function(){for(var t=n.length,e=0;e<t;e++)i(n[e])}))};t.directive("lazyload",{inserted:o,updated:o})}},"Y8t/":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=i(n("//Fk")),r=i(n("T452"));function i(t){return t&&t.__esModule?t:{default:t}}var o="9688"===window.location.port?"http://localhost:3000":"http://139.224.229.251:3000";e.default=function(t,e,n){return"get"==t?new u.default(function(u,i){(0,r.default)({type:t,url:""+o+e,params:n}).then(function(t){u(t.data)},function(t){i(t)}).catch(function(t){i(t)})}):"post"==t?new u.default(function(t,n){(0,r.default)({method:method,url:""+o+e,data:data}).then(function(e){t(e.data)}).catch(function(t){n(t)})}):void 0}},YaEn:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=i(n("7+uW")),r=i(n("/ocq"));function i(t){return t&&t.__esModule?t:{default:t}}u.default.use(r.default);var o=[{path:"/",redirect:"/music"},{path:"/login",component:function(t){Promise.all([n.e(0),n.e(8)]).then(function(){t(n("Ntyz"))}.bind(null,n)).catch(n.oe)}},{path:"/music",component:function(t){Promise.all([n.e(1),n.e(0)]).then(function(){t(n("8/c5"))}.bind(null,n)).catch(n.oe)},redirect:"/music/recommend",children:[{path:"/music/recommend",name:"recommend",component:function(t){Promise.all([n.e(0),n.e(6)]).then(function(){t(n("OQYS"))}.bind(null,n)).catch(n.oe)}},{path:"/music/currentPlay",name:"currentPlay",component:function(t){Promise.all([n.e(0),n.e(10)]).then(function(){t(n("xOtC"))}.bind(null,n)).catch(n.oe)}},{path:"/music/songsheet",name:"songsheet",component:function(t){Promise.all([n.e(0),n.e(2)]).then(function(){t(n("XL2y"))}.bind(null,n)).catch(n.oe)}},{path:"/music/search",name:"search",component:function(t){Promise.all([n.e(0),n.e(5)]).then(function(){t(n("JDFc"))}.bind(null,n)).catch(n.oe)}},{path:"/music/ownlist",name:"ownlist",component:function(t){n.e(7).then(function(){t(n("vfoA"))}.bind(null,n)).catch(n.oe)}},{path:"/music/historyPlay",name:"historyPlay",component:function(t){Promise.all([n.e(0),n.e(9)]).then(function(){t(n("bKHD"))}.bind(null,n)).catch(n.oe)}},{path:"/music/transceiver",name:"transceiver",component:function(t){n.e(4).then(function(){t(n("BE7E"))}.bind(null,n)).catch(n.oe)}},{path:"/music/transceiverParams/:id",name:"transceiverParams",component:function(t){Promise.all([n.e(0),n.e(3)]).then(function(){t(n("rDQK"))}.bind(null,n)).catch(n.oe)}}]},{path:"*",redirect:"/music"}],a=new r.default({mode:"history",routes:o});e.default=a},ZOt1:function(t,e){},"d8/S":function(t,e){},gfkZ:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.userReset=e.userRegister=e.userLogin=void 0;var u,r=n("Y8t/"),i=(u=r)&&u.__esModule?u:{default:u};e.default={getCurrentList:function(t){return(0,i.default)("get","/top/list",t)},getSongUrl:function(t){return(0,i.default)("get","/song/url",t)},getSearch:function(t){return(0,i.default)("get","/search",t)},getSearchHot:function(t){return(0,i.default)("get","/search/hot",t)},getCatlist:function(t){return(0,i.default)("get","/playlist/catlist",t)},getTopPlaylist:function(t){return(0,i.default)("get","/top/playlist",t)},getTopPlaylistHigh:function(t){return(0,i.default)("get","/top/playlist/highquality",t)},getTopPlaylistDetail:function(t){return(0,i.default)("get","/playlist/detail",t)},getLyric:function(t){return(0,i.default)("get","/lyric",t)},getdjcatelist:function(t){return(0,i.default)("get","/dj/catelist",t)},getdjrecommend:function(t){return(0,i.default)("get","/dj/recommend/type",t)},getdjprogram:function(t){return(0,i.default)("get","/dj/program",t)},getdjdetail:function(t){return(0,i.default)("get","/dj/detail",t)},setLogin:function(t){return(0,i.default)("get","/login/cellphone",t)},getUserPlaylist:function(t){return(0,i.default)("get","/user/playlist",t)}};e.userLogin=function(t){return(0,i.default)("get","/node-api/user/login",t)},e.userRegister=function(t){return(0,i.default)("get","/node-api/user/register",t)},e.userReset=function(t){return(0,i.default)("get","/node-api/user/reset",t)}},kTXO:function(t,e,n){"use strict";var u,r=s(n("Xxa5")),i=s(n("exGp")),o=s(n("YaEn")),a=n("LOoJ");function s(t){return t&&t.__esModule?t:{default:t}}o.default.beforeEach((u=(0,i.default)(r.default.mark(function t(e,n,u){return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:(0,a.getUserInfo)()?"/login"===e.path?u("/"):u():"/login"===e.path?u():u("/login");case 1:case"end":return t.stop()}},t,void 0)})),function(t,e,n){return u.apply(this,arguments)}))},lwq5:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u={uid:"",audio:null,currentList:[],currentIndex:-1,playFlag:!1,historyList:(0,n("22O3").getHistoryList)()||[]};e.default=u},m9kF:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u,r,i=n("bOdI"),o=(u=i)&&u.__esModule?u:{default:u},a=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n("oVAp")),s=n("22O3");var c=(r={},(0,o.default)(r,a.GET_AUDIO,function(t,e){t.audio=e}),(0,o.default)(r,a.SET_UID,function(t,e){t.uid=e}),(0,o.default)(r,a.SET_CURRENTLIST,function(t,e){t.currentList=e}),(0,o.default)(r,a.SET_PLAYFLAG,function(t,e){t.playFlag=e}),(0,o.default)(r,a.SET_CURRENTINDEX,function(t,e){t.currentIndex=e}),(0,o.default)(r,a.SET_INITCURRENTINDEX,function(t){t.currentIndex=-1}),(0,o.default)(r,a.ADD_HISTORYLIST,function(t,e){t.historyList=(0,s.setHistoryList)(e,"add")}),(0,o.default)(r,a.REMOVE_HISTORYLIST,function(t,e){t.historyList=(0,s.setHistoryList)(e,"remove")}),(0,o.default)(r,a.CLEARHISTORY,function(t,e){t.historyList=(0,s.clearHistory)()}),r);e.default=c},oVAp:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.GET_AUDIO="GET_AUDIO",e.SET_UID="SET_UID",e.SET_CURRENTLIST="SET_CURRENTLIST",e.SET_PLAYFLAG="SET_PLAYFLAG",e.SET_CURRENTINDEX="SET_CURRENTINDEX",e.SET_INITCURRENTINDEX="SET_INITCURRENTINDEX",e.ADD_HISTORYLIST="ADD_HISTORYLIST",e.REMOVE_HISTORYLIST="REMOVE_HISTORYLIST",e.CLEARHISTORY="CLEARHISTORY"},wqBJ:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=a(n("Dd8w")),r=a(n("gfkZ")),i=n("NYxO"),o=n("LOoJ");function a(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{headerImg:"/static/image/userBg.jpg",uid:""}},methods:(0,u.default)({},(0,i.mapActions)(["setUid"]),{signOut:function(){(0,o.removeUserInfo)(),this.$router.replace("/login")}}),created:function(){var t=this;r.default.setLogin({phone:13175573352,password:"123456"}).then(function(e){t.headerImg=e.profile.avatarUrl;var n=e.profile.userId;t.uid=n,t.setUid(n)}).catch(function(t){console.log(t)})}}},xJD8:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=o(n("Dd8w")),r=o(n("Cz8s")),i=n("NYxO");function o(t){return t&&t.__esModule?t:{default:t}}e.default={name:"App",components:{HeaderVue:r.default},methods:(0,u.default)({},(0,i.mapActions)(["setAudio"])),mounted:function(){var t=this.$refs.audio;this.setAudio(t)}}}},["NHnr"]);
//# sourceMappingURL=app.c9d324d30db99230adf8.js.map
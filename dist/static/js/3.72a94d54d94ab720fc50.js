webpackJsonp([3],{"9nwB":function(t,s){},KRmY:function(t,s,e){"use strict";var i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{ref:"paramsheight",staticClass:"transceiver-params"},[e("div",{staticClass:"content"},[e("div",{staticClass:"img"},[e("img",{attrs:{src:t.transceiverInfo.picUrl}})]),t._v(" "),e("div",{staticClass:"content-detail"},[e("div",{staticClass:"detail-title"},[e("span",{staticClass:"detail-title-sign"},[t._v("电台")]),t._v(" "),e("h3",[t._v(t._s(t.transceiverInfo.name))])]),t._v(" "),e("div",{staticClass:"detail-title"}),t._v(" "),e("div",{staticClass:"detail-btn"},[e("button",[e("span",{staticClass:"iconfont icon-shoucang1"}),t._v("订阅("+t._s(t.transceiverInfo.subCount)+")")]),t._v(" "),e("button",{on:{click:t.playAll}},[e("span",{staticClass:"iconfont icon-zhuanjibofang"}),t._v("播放全部")]),t._v(" "),e("button",[e("span",{staticClass:"iconfont icon-share"}),t._v("分享("+t._s(t.transceiverInfo.shareCount)+")")])]),t._v(" "),e("div",{staticClass:"detail-des"},[e("span",{staticClass:"detail-des-name"},[t._v("有声书")]),t._v(" "),e("span",[t._v(t._s(t.transceiverInfo.desc))])])])]),t._v(" "),e("div",{staticClass:"list",style:{height:t.paramsheight+"px"}},[e("transceiver-list",{ref:"list",attrs:{rid:t.id},on:{setTransceiver:t.getTransceiver}})],1)])},staticRenderFns:[]};s.a=i},NW4I:function(t,s){},Qifn:function(t,s,e){"use strict";var i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"transceiver-list"},t._l(t.list,function(s,i){return e("div",{staticClass:"transceiver-item",on:{click:function(e){t.getTransceiver(s,i)}}},[e("div",{staticClass:"index"},[t._v(t._s(i+1))]),t._v(" "),e("img",{staticClass:"img",attrs:{src:s.coverUrl}}),t._v(" "),e("div",{staticClass:"name"},[t._v(t._s(s.name))]),t._v(" "),e("div",{staticClass:"subscribe"},[e("span",{staticClass:"iconfont icon-zhengzaijinhang"}),t._v(" "),e("span",{staticClass:"subscribe-count"},[t._v(t._s(s.listenerCount))])]),t._v(" "),e("div",{staticClass:"subscribe"},[e("span",{staticClass:"iconfont icon-changjingtuijian"}),t._v(" "),e("span",{staticClass:"subscribe-count"},[t._v(t._s(s.likedCount))])]),t._v(" "),e("div",{staticClass:"date"},[t._v(t._s(t._f("_getDate")(s.createTime)))]),t._v(" "),e("div",{staticClass:"time"},[t._v(t._s(t._f("_formatTime")(s.duration/1e3)))])])}))},staticRenderFns:[]};s.a=i},RqdV:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("sn8f"),n=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(s,t,function(){return i[t]})}(a);var r=e("Qifn");var c=function(t){e("NW4I")},o=e("VU/8")(n.a,r.a,!1,c,null,null);s.default=o.exports},bp1E:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=o(e("Dd8w")),n=o(e("RqdV")),a=e("NYxO"),r=e("G3uJ"),c=o(e("gfkZ"));function o(t){return t&&t.__esModule?t:{default:t}}s.default={data:function(){return{paramsheight:0,id:"",transceiverInfo:{},transceiverList:[],transceiverUrl:""}},computed:(0,i.default)({},(0,a.mapGetters)(["currentMusic","playFlag","currentIndex","currentList"])),methods:(0,i.default)({},(0,a.mapActions)(["setPlayFlag","setCurrentIndex","setCurrentList","addHistoryList"]),{init:function(){try{var t=this;c.default.getdjdetail({rid:t.id}).then(function(s){t.transceiverInfo=s.djRadio}).catch(function(t){console.log(t)})}catch(t){console.log(t)}},getTransceiver:function(t,s){try{var e=(0,r.settransceiverformatSongs)([t],"transceiver");this.setCurrentList(e),this.setCurrentIndex(0),this.setPlayFlag(!0)}catch(t){console.log(t)}},playAll:function(){try{var t=this.$refs.list.list,s=(0,r.settransceiverformatSongs)(t,"transceiver");this.setCurrentList(s),this.setCurrentIndex(0),this.setPlayFlag(!0)}catch(t){console.log(t)}}}),created:function(){this.id=this.$route.params.id,this.init()},mounted:function(){var t=this;t.$nextTick(function(){t.paramsheight=t.$refs.paramsheight.offsetHeight-230})},components:{TransceiverList:n.default}}},rDQK:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("bp1E"),n=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(s,t,function(){return i[t]})}(a);var r=e("KRmY");var c=function(t){e("9nwB")},o=e("VU/8")(n.a,r.a,!1,c,null,null);s.default=o.exports},sn8f:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i,n=e("5g4Q"),a=e("gfkZ"),r=(i=a)&&i.__esModule?i:{default:i};s.default={mixins:[n.getDate,n.formatTimeMixins],data:function(){return{list:[]}},methods:{init:function(){try{var t=this,s={rid:t.rid,limit:30,offset:0};r.default.getdjprogram(s).then(function(s){t.list=s.programs}).catch(function(t){console.log(t)})}catch(t){console.log(t)}},getTransceiver:function(t,s){try{this.$emit("setTransceiver",t,s)}catch(t){console.log(t)}}},computed:{},created:function(){this.init()},props:{rid:{default:"",type:[String,Number]}}}}});
//# sourceMappingURL=3.72a94d54d94ab720fc50.js.map
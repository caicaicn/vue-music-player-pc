webpackJsonp([10],{"5ZjQ":function(t,e){},"Kkj+":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=c(n("X+yh")),i=c(n("Dd8w"));n("34+y");var u=n("NYxO"),r=c(n("M0Mu"));function c(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{}},computed:(0,i.default)({},(0,u.mapGetters)(["currentList","currentMusic"]),{newCurrentList:function(){return this.currentList}}),methods:(0,i.default)({},(0,u.mapActions)(["setCurrentIndex","initCurrentIndex","setPlayFlag"]),{selectMusic:function(t,e){try{this.setCurrentIndex(e),this.setPlayFlag(!0)}catch(t){console.log(t)}},delMusic:function(t,e){try{this.currentMusic.id==t.id&&(console.log("删除的是当前的音乐"),this.setPlayFlag(!1),this.initCurrentIndex()),this.newCurrentList.splice(e,1),(0,s.default)("删除成功")}catch(t){console.log(t)}}}),components:{MusicList:r.default}}},"Q+LF":function(t,e,n){"use strict";var s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"current-play"},[e("music-list",{attrs:{list:this.newCurrentList},on:{selectCurMusic:this.selectMusic,delMusicIndex:this.delMusic}},[e("p",[this._v("当前没有音乐哦~")])])],1)},staticRenderFns:[]};e.a=s},xOtC:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("Kkj+"),i=n.n(s);for(var u in s)"default"!==u&&function(t){n.d(e,t,function(){return s[t]})}(u);var r=n("Q+LF");var c=function(t){n("5ZjQ")},l=n("VU/8")(i.a,r.a,!1,c,null,null);e.default=l.exports}});
//# sourceMappingURL=10.e68167f2c7cd9b66ac1d.js.map
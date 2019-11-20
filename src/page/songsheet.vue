<template>
    <div @scroll="loadMore($event)" ref="songsheet" class="songsheet">
        <!-- 分类选择 -->
        <div class="classify">
            <div @click.stop="categoriesFlag = !categoriesFlag" class="classify-select">{{categoriesSubName}}</div>
            <div class="classify-select-order">
                <button @click="setOrder(item.type)" v-for="(item, index) in orderType">{{item.name}}</button>
            </div>
            <div v-show="categoriesFlag" class="classify-list">
                <div  v-for="(item, index) in categories" :key="index" class="classify-list-type">
                    <div class="classify-list-type-title">
                        <span class="iconfont icon-zhengzaijinhang"></span> 
                        <span>{{item}}</span>
                    </div>
                    <div class="classify-list-item">
                        <span @click="getSelectSub(item)"  v-if="item.category == index" v-for="(item, idx) in categoriesSub" class="classify-list-item-l" :class="{'active-classify-list-item': item.name == selectSub.name}">{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分类歌单列表 -->
        <div ref="songsheetList" v-if="!categoriesFlag" class="songsheet-list">
            <div @click="getDetail(item)" v-for="(item, index) in playlist" class="songsheet-list-item">
                <img v-lazyload="{ scrollEl: songsheet, imgs: item.coverImgUrl }">
                <div class="song-list-dec">{{item.name}}</div>
                <div class="playCount">
                    <span class="playCount-info iconfont icon-zhengzaijinhang"></span>
                    <span class="playCount-info">{{item.playCount | playCount}}</span>
                </div>
                <div class="nickname">
                    <span class="nickname-info iconfont icon-zhengzaijinhang"></span>
                    <span class="nickname-info">{{item.nickname}}</span>
                </div>
            </div>
        </div>
        <load-vue :loading="loadingFlag" :tips="loadingTip"></load-vue>
    </div>
</template>
<style lang='less'>
    .songsheet{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        position: relative;
        .classify{
            padding: 10px 0;
            box-sizing: border-box;
            position: relative;
            .classify-select{
                width: 140px;
                text-align: center;
                box-sizing: border-box;
                border-radius: 10px;
                border: 1px solid #ffffff;
                padding: 6px 10px;
                cursor: pointer;
            }
            .classify-list{
                border: 1px solid #ccc;
                box-shadow: 0px 0px 4px #000;
                overflow-y: scroll;
                position: absolute;
                left: 0;
                top: 70px;
                .classify-list-type{
                    display: flex;
                    .classify-list-type-title{
                        padding: 16px 20px;
                        vertical-align: middle;
                        .iconfont{
                            padding: 0 6px;
                            font-size: 20px;
                            vertical-align: middle;
                        }
                    }
                    .classify-list-item{
                        flex: 1;
                        border-left: 1px solid #ccc;
                        padding: 16px 10px 0 10px;
                        .classify-list-item-l{
                            cursor: pointer;
                            display: inline-block;
                            margin-bottom: 10px;
                            padding: 4px 8px;
                            border-radius: 5px;
                        }
                        .active-classify-list-item{
                            background-color: rgba(0,0,0,.3);
                        }
                    }
                }
            }
            .classify-select-order{
                position: absolute;
                right: 50px;
                top: 16px;
                button{
                    border: 1px solid #ffffff;
                    padding: 6px 10px;
                    border-radius: 10px;
                    margin-left: 14px;
                }
            }
        }
        .songsheet-list{
            width: 100%;
            .songsheet-list-item{
                cursor: pointer;
                width: 200px;
                height: 206px;
                margin-top: 20px;
                text-align: center;
                display: inline-block;
                overflow: hidden;
                position: relative;
                img{
                    width: 80%;
                }
                .song-list-dec{
                    text-align: left;
                    box-sizing: border-box;
                    padding:  0 20px;
                    margin: 10px 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .playCount{
                    position: absolute;
                    top: 10px;
                    right: 30px;
                    color: #fff;
                    .playCount-info{
                        color: #fff;
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
                .nickname{
                    position: absolute;
                    top: 136px;
                    left: 30px;
                    .nickname-info{
                        font-size: 14px;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
<script>
    import server from '../http/index.js';
    import { setsearchformatSongs} from '../assets/js/song.js';
    import { mapGetters, mapActions } from 'vuex';
    import LoadVue from '../components/loadVue.vue';
    import { loadMixins } from '../assets/js/mixins.js';
    export default {
        mixins: [loadMixins],
        data(){
            return{
                songsheet: null,
                orderType: [
                    {
                        name: '最新',
                        type: 'new'
                    },
                     {
                         name: '最热',
                         type: 'hot'
                     }
                ],                              // 精选类型 new hot 列表
                order: 'hot',                   // 精选类型具体值
                categoriesFlag: false,          // 显示隐藏分类列表
                categories: [],                 // 分类列表
                categoriesSub: [],              // 分类详情
                selectSub: {},                  // 选中分类
                playlist: [],                   // 选中分类歌单列表
                musicList: [],                  // 歌曲列表
                loadingFlag: false,             // 控制loading
                loadingTip: '',                 // loading要显示的内容
            }
        },
        computed:{
            categoriesSubName(){
                return this.selectSub.name || '选择分类';
            }
        },
        filters: {
            playCount(val){
                if(val>9999){
                    return `${parseInt(val/10000)}万`
                }else{
                    return val;
                }
            }
        },
        methods: {
            ...mapActions(['setCurrentList', 'setCurrentIndex']),
            init() {
                try{
                    const _this = this;
                    _this.setLoading(true);
                    server.getCatlist()
                    .then(res=>{
                        _this.setLoading(false);
                        _this.categories = res.categories;
                        _this.categoriesSub = res.sub;
                        _this.selectSub = _this.categoriesSub[0];
                       _this.getTopPlaylist()
                    })
                    .catch(error=>{
                        _this.setLoading(false);
                        console.log(error)
                    })
                } catch(error) {
                    console.log(error)
                }
            }, 
            // 选择分类
            getSelectSub(selectSub) {
                try{
                    const _this = this;
                    _this.categoriesFlag = !_this.categoriesFlag;
                    _this.selectSub = selectSub;
                    _this.getTopPlaylist();
                } catch(error) {
                    console.log(error)
                }
            },
            // 获取歌单列表
            getTopPlaylist() {
                try{
                    const _this = this;
                    _this.setLoading(true);
                    let params = {
                        limit: 20,
                        order: _this.order,
                        cat: _this.selectSub.name
                    }
                    server.getTopPlaylist(params)
                    .then(res=>{
                        let list = res.playlists;
                        _this.setLoading(false);
                        _this.playlist = list.map((item, index) => {
                            return {
                                name: item.name,
                                playCount: item.playCount,
                                coverImgUrl: item.coverImgUrl,
                                id: item.id,
                                nickname: item.creator.nickname
                            }
                        });
                    })
                    .catch(error=>{
                        _this.setLoading(false);
                        console.log(error)
                    })
                } catch(error) {
                    console.log(error)
                }
            }, 
            // 选择分类详情 
            getDetail(item) {
                try{
                    const _this = this;
                    _this.setLoading(true);
                    server.getTopPlaylistDetail({id: item.id})
                    .then(res=>{
                        _this.setLoading(false);
                    //    let list = res.result.tracks;
                       let list = res.playlist.tracks;
                        let listFilter = setsearchformatSongs(list.slice(0,100));
                        _this.musicList = listFilter;
                        _this.setCurrentList(listFilter);
                        _this.setCurrentIndex(0);
                        _this.$router.push('/music/currentPlay')
                    })
                    .catch(error=>{
                        _this.setLoading(false);
                        console.log(error)
                    })
                } catch(error) {
                    console.log(error)
                }
            },
            // 精选类型  hot  new
            setOrder(val) {
                try{
                    const _this = this;
                    _this.order = val;
                    _this.getTopPlaylist();
                } catch(error) {
                    console.log(error)
                }
            }, 
            // 加载更多
            nextPage() {
                try{
                    const _this = this;
                    let params = {
                        cat: _this.selectSub.name,
                        order: _this.order,
                        before: _this.playlist[_this.playlist.length-1],
                        limit: 20
                    }
                    server.getTopPlaylistHigh(params)
                    .then(res=>{
                        _this.setLoading(false);
                        _this.$nextTick(()=>{
                            _this.playlist.push.apply(_this.playlist,res.playlists);;
                        })
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                } catch(error) {
                    console.log(error)
                }
            },
            loadMore() {
                try{
                    const _this = this;
                    let songsheet = _this.$refs.songsheet;
                    let songsheetList = _this.$refs.songsheetList;
                    let top = songsheet.scrollTop || songsheet.scrollTop,
                        songsheetHeight = songsheet.offsetHeight,
                        songsheetListHeoght = songsheetList.offsetHeight;
                    if(songsheetHeight+top-40 >= songsheetListHeoght){
                        _this.nextPage();
                    };
                } catch(error) {
                    console.log(error)
                }
            }, 
        },
        created(){
            this.init()
        },
        mounted(){
            const _this = this;
            _this.songsheet = _this.$refs.songsheet;
        },
        components:{
            LoadVue
        },
    }
</script>
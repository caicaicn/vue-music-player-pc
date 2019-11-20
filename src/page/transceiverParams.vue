<template>
    <div ref="paramsheight" class="transceiver-params">
        <div class="content">
            <div class="img">
                <img :src="transceiverInfo.picUrl">
            </div>
            <div class="content-detail">
                <div class="detail-title">
                    <span class="detail-title-sign">电台</span>
                    <h3>{{transceiverInfo.name}}</h3>
                </div>
                <div class="detail-title">
                    <!-- <img :src="transceiverInfo.dj.avatarUrl">
                    <span class="singer-name">{{transceiverInfo.dj.nickname}}</span> -->
                </div>
                <div class="detail-btn">
                    <button><span class="iconfont icon-shoucang1"></span>订阅({{transceiverInfo.subCount}})</button>
                    <button @click="playAll"><span class="iconfont icon-zhuanjibofang"></span>播放全部</button>
                    <button><span class="iconfont icon-share"></span>分享({{transceiverInfo.shareCount}})</button>
                </div>
                <div class="detail-des">
                    <span class="detail-des-name">有声书</span>
                    <span>{{transceiverInfo.desc}}</span>
                </div>
            </div>
        </div>
        <div :style="{height: paramsheight+'px'}" class="list">
            <transceiver-list ref="list" @setTransceiver="getTransceiver" :rid="id" />
        </div>
    </div>
</template>
<style lang='less'>
    .transceiver-params{
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        // overflow-y: scroll;
        .content{
            width: 100%;
            height: 180px;
            display: flex;
            margin-bottom: 20px;
            .img{
                width: 180px;
                margin-right: 20px;
                img{
                    width: 100%;
                }
            }
            .content-detail{
                flex: 1;
                height: 100%;
                min-width: 340px;
                .detail-title{
                    margin: 14px 0;
                    .detail-title-sign{
                        padding: 4px 8px;
                        border-radius: 5px;
                        background-color: #aa3419;
                        font-size: 14px;
                        margin-right: 10px;
                    }
                    h3{
                        display: inline-block;
                    }
                    img{
                        width: 34px;
                        border-radius: 100%;
                        vertical-align: middle;
                    }
                    .singer-name{
                        vertical-align: middle;
                        font-size: 14px;
                    }
                }
                .detail-btn{
                    width: 100%;
                    margin: 20px 0;
                    button{
                        padding: 6px 10px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 14px;
                        margin-right: 10px;
                    }
                    .iconfont{
                        margin-right: 3px;
                    }
                    .icon-zhuanjibofang{
                        color: #aa3419;
                    }
                }
                .detail-des{
                    .detail-des-name{
                        text-emphasis: none;
                        border: 1px solid #aa3419;
                        color: #aa3419;
                        margin-right: 5px;
                    }
                    font-size: 14px;
                    line-height: 22px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3; //需要控制的文本行数
                    overflow: hidden;
                }
            }

        }
        .list{
            overflow-y: scroll;
        }
    }
</style>
<script>
    import TransceiverList from '../components/transceiverlist.vue';
    import { mapGetters, mapActions } from 'vuex';
    import { settransceiverformatSongs } from '../assets/js/song.js';
    import { Toast } from 'mint-ui';
    import server from '../http/index.js';
    export default {
        data(){
            return{
                paramsheight: 0,
                id: '',
                transceiverInfo: {},
                transceiverList: [],            // 电台项目列表
                transceiverUrl: '',             // 电台mp3url
            }
        },
        computed:{
            ...mapGetters([
                'currentMusic',
                'playFlag',
                'currentIndex',
                'currentList'
            ]),
        },
        methods: {
            ...mapActions(['setPlayFlag', 'setCurrentIndex', 'setCurrentList','addHistoryList']),
            init() {
                try{
                    const _this = this;
                    server.getdjdetail({rid: _this.id})
                    .then(res=>{
                        _this.transceiverInfo = res.djRadio;
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                } catch(error) {
                    console.log(error)
                }
            }, 
            getTransceiver(val, index) {
                try{
                    const _this = this;
                    let listFilter = settransceiverformatSongs([val], 'transceiver');
                    // 设置当前播放列表
                    _this.setCurrentList(listFilter);
                    _this.setCurrentIndex(0);
                    _this.setPlayFlag(true);
                } catch(error) {
                    console.log(error)
                }
            },
            playAll() {
                try{
                    const _this = this;
                    let list = _this.$refs.list.list
                    let listFilter = settransceiverformatSongs(list, 'transceiver');
                    // 设置当前播放列表
                    _this.setCurrentList(listFilter);
                    _this.setCurrentIndex(0);
                    _this.setPlayFlag(true);
                } catch(error) {
                    console.log(error)
                }
            }, 
        },
        created(){
            this.id = this.$route.params.id;
            this.init();
        },
        mounted(){
            const _this = this;
            _this.$nextTick(()=>{
                _this.paramsheight = _this.$refs.paramsheight.offsetHeight - 230;
            })
        },
        components:{
            TransceiverList
        },
    }
</script>
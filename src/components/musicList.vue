<template>
    <div ref="musicList" class="music-list">
        <div v-if="list.length > 0" class="title list-border"> 
            <div class="list-name">歌曲</div>
            <div class="list-singer singer-width">歌手</div>
            <div class="list-time time-width">时长</div>
        </div>
        <div v-if="list.length > 0" class="music-list-content" :style="{height: musicListHeight - speciallyHeight - 46 + 'px'}">
            <div v-for="(item, index) in list" @dblclick="selectMusic(item, index)" class="music-list-item list-border">
                <div class="item-name">
                    <span v-if="currentMusic.id == item.id && playFlag" class="item-name-index playgif"></span>
                    <span v-else class="item-name-index">{{index+1}}</span>
                    <span>{{item.name}}</span>
                    <div @click.stop="selectMusic(item, index)" class="play-img iconfont" :class="{'icon-bofang': currentMusic.id != item.id, 'icon-zanting': currentMusic.id == item.id }"></div>
                </div>
                <div class="item-singer singer-width">{{item.singer}}</div>
                <div class="item-time time-width">
                    <span class="item-time-info">{{item.duration | _formatTime}}</span>
                    <span @click.stop="del(item, index)" class="iconfont icon-changyonggoupiaorenshanchu"></span>
                </div>
            </div>
        </div>
        <div v-if="list.length == 0" class="no-music">
            <slot></slot>
        </div>
    </div>
</template>
<style lang='less'>
    .music-list{
        height: 100%;
        width: 100%;
        overflow-y: hidden;
        box-sizing: border-box;
        // background-color: red;
        .title{
            display: flex;
            .list-name{
                flex: 1;
                text-indent: 40px;
                color: #ffffff;
            }
        }
        .music-list-content{
            width: 100%;
            overflow-y: scroll;
            .music-list-item{
                padding: 15px 10px;
                font-size: 14px;
                display: flex;
                box-sizing: border-box;
                font-weight: 700;
                cursor: pointer;
                &:hover{
                    // 删除按钮
                    .icon-changyonggoupiaorenshanchu{
                        display: block!important;
                    }
                    // 播放暂停按钮
                    .play-img{
                        display: block!important;
                    }
                    // 隐藏时间
                    .item-time-info{
                        display: none!important;
                    }
                }
                .item-name{
                    flex: 1;
                    position: relative;
                    .item-name-index{
                        display: inline-block;
                        width: 40px;
                        height: 100%;
                    }
                    .play-img{
                        position: absolute;
                        top: -11px;
                        right: 30px;
                        height: 36px;
                        line-height: 36px;
                        width: 36px;
                        border-radius: 50%;
                        font-size: 30px;
                        vertical-align: center;
                        display: none;
                    }
                }
                .item-time{
                    position: relative;
                    vertical-align: center;
                    .icon-changyonggoupiaorenshanchu{
                        position: absolute;
                        left: 0;
                        top: -15px;
                        font-size: 24px;
                        vertical-align: center;
                        padding: 10px;
                        display: none;
                    }
                }
                .item-singer{
                    overflow: hidden;
                    white-space: nowrap;/*不换行*/
                    text-overflow:ellipsis;/*超出部分文字以...显示*/
                    box-sizing: border-box;
                    padding-right: 5px;
                }
            }
        }

        .list-border{
            padding: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, .2);
        }
        .singer-width{
            width: 150px;
        }
        .time-width{
            width: 60px;
        }
        .playgif{
            vertical-align: bottom;
            background: url('../assets/image/wave.gif') no-repeat left center ;
            background-size: 10px;
        }
        .no-music{
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
<script>
    import server from '../http/index.js';
    import {Toast} from 'mint-ui';
    import { formatTimeMixins } from '../assets/js/mixins.js';
    import { mapGetters, mapActions } from 'vuex';
    export default {
        mixins: [formatTimeMixins],
        data(){
            return{
                musicListHeight: 0,   
            }
        },
        props: {
            list: Array,
            speciallyHeight: {
                default: 0,
                type: Number
            }
        },
        computed:{
            ...mapGetters(['currentMusic', 'audio', 'playFlag', 'currentIndex'])
        },
        methods: {
            ...mapActions(['setPlayFlag']),
            selectMusic(musicInfo, index) {
                try{
                    const _this = this;
                    if(_this.currentMusic && _this.currentMusic.id && _this.playFlag && musicInfo.id == _this.currentMusic.id){
                        console.log('同一首歌');
                        _this.setPlayFlag(false);
                        return;
                    }

                    server.getSongUrl({id: musicInfo.id})
                    .then(res=>{
                       if(!res.data[0].url){
                            Toast('当前音乐无法播放，请播放其他音乐')
                       }else{
                        //    console.log(`当前${index}`);
                            _this.$emit('selectCurMusic', musicInfo, index);
                       }
                    })
                    .catch(error=>{
                        console.log(error)
                        Toast('当前音乐无法播放，请播放其他音乐')
                    })
                } catch(error) {
                    console.log(error)
                }
            }, 
            del(musicInfo, index) {
                try{
                    const _this = this;
                    _this.$emit('delMusicIndex', musicInfo, index)
                } catch(error) {
                    console.log(error)
                }
            }, 
        },
        created(){

        },
        mounted(){
            const _this = this;
            _this.$nextTick(()=>{
                let height = _this.$refs.musicList.offsetHeight;
                _this.musicListHeight = height;
            })
        },
    }
</script>
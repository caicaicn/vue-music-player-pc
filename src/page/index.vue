<template>
    <div class="index" :style="{height: musicHeight + 'px'}">
        <div class="music-content" :style="{height: musicContentHeight + 'px'}">
            <div class="content-info" :style="{height: musicInfoHeight + 'px'}">
                <keep-alive>
                    <control-type/>
                </keep-alive>
                <div class="content-left">
                    <router-view/>
                </div>
                <div class="content-right">
                    <lyric @currentLyric="currentSelLyric" :currentTime="currentplayTime" :lyric="currentLyric"/>
                </div>
            </div>
        </div>
        <!-- 播放器控制 -->
        <div class="music-contrl">
            <div class="bar-btn">
                <div @click="pre" class="bar-btn-list btn-pre iconfont icon-fast-backward"></div>
                <div class="bar-btn-list btn-play iconfont" @click="play" :class="{'icon-poweroff-circle-fill': playFlag, 'icon-play-circle-fill': !playFlag}"></div>
                <div @click="next" class="bar-btn-list btn-next iconfont icon-fast-forward"></div>
            </div>
            <div class="play-percent">
                <div class="play-percent-title">
                    <span>{{currentMusic.name || '在线播放器'}}</span>
                    <span class="play-percent-title-time" v-show="currentMusic && currentMusic.duration">{{currentplayTime | _formatTime}}/{{currentMusic.duration | _formatTime}}</span>
                </div>
                <percent 
                    type="play"
                    :playPercent="currentplayPercent"
                    :loadPercent="currentLoadPercent"
                    @dotPercent="playDotPercent"
                ></percent>
            </div>
            <!-- 0 顺序播放 1 随机播放 2 单曲播放 3 列表循环 -->
            <div @click="setMode" class="loop-btn iconfont" :class="{
            'icon-liebiaoshunxu': orderCount == 0, 
            'icon-suijibofang': orderCount == 1, 
            'icon-danquxunhuan': orderCount == 2, 
            'icon-retweet': orderCount == 3
            }">
            </div>
            <!-- <div class="remark-btn iconfont icon-pinglun"></div> -->
            <div @click="setMute" class="volume-btn iconfont" :class="{'icon-icon_voice': currentVolumePercent > 0, 'icon-icon_mute': currentVolumePercent == 0}"></div>
            <div class="volume-percent">
                <percent 
                    class="volume-percent-component"
                    type="volume"
                    :playPercent="currentVolumePercent"
                    loadPercent="0"
                    @dotPercent="volumeDotPercent"
                ></percent>
            </div>
        </div>
        <!-- 模态框 -->
        <div class="mask" :style="{backgroundImage: picUrl}"></div>
        <div class="mask-bg"></div>
    </div>
</template>
<style lang="less">
    .index{
        box-sizing: border-box;
        overflow: hidden;
        .music-content{
            width: 100%;
            box-sizing: border-box;
            padding: 10px 20px;
            // background-color: pink;
            overflow: hidden;
            .content-info{
                width: 100%;
                display: flex;
                // background-color: pink;
                .content-left{
                    flex: 1;
                    height: 100%;
                }
                .content-right{
                    width: 280px;
                    height: 100%;
                }
            }
        }
        .music-contrl{
            height: 80px;
            box-sizing: border-box;
            padding: 10px 20px;
            display: flex;
            line-height: 60px;
            cursor: pointer;
            .bar-btn{
                display: flex;
                width: 200px;
                .bar-btn-list{
                    width: 50px;
                    color: #ffffff;
                    font-size: 36px;
                    text-align: center;
                }
                .icon-poweroff-circle-fill{
                    animation: rotatePlay 3s linear infinite;
                }
                @keyframes rotatePlay {
                    from{
                        transform: rotate(0deg);
                    }   
                    to{
                        transform: rotate(360deg);
                    }
                }
                .btn-play{
                    flex: 1;
                }
            }
            .play-percent{
                flex: 1;
                box-sizing: border-box;
                padding: 0 30px;
                overflow: hidden;
                font-size: 14px;
                line-height: 14px;
                .play-percent-title{
                    margin: 10px 0;
                    .play-percent-title-time{
                        float: right;
                    }
                }
            }
            .loop-btn, .remark-btn, .volume-btn{
                width: 48px;
                font-size: 26px;
            }
            .volume-percent{
                width: 160px;
                position: relative;
                .volume-percent-component{
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
    .mask{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: -2;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .mask-bg{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        background-color: rgba(0,0,0,.5);
    }
</style>
<script>
    import Server from '../http/index.js';
    import {defaultBgImage} from '../assets/js/config.js'
    import ControlType from '../components/controlType.vue';
    import Percent from '../components/percent.vue';
    import Lyric from '../components/lyric.vue';
    import {Toast} from 'mint-ui';
    import server from '../http/index.js';
    import { mapGetters, mapActions } from 'vuex';
    import { formatTimeMixins } from '../assets/js/mixins.js';
    import { parseLyric } from '../assets/js/utils.js';
    export default {
        mixins: [formatTimeMixins],
        data () {
            return {
                musicHeight: 0,                // 设置播放器高度
                musicContentHeight: 0,
                musicInfoHeight: 0,
                musicReady: false,             // 播放器状态判断有没有音乐
                currentplayPercent: 0,         // 播放进度%
                currentplayTime: 0,            // 当前已经播放时间
                currentLoadPercent: 0,         // 当前加载%
                currentVolumePercent: 0,       // 当前音量
                beforeVolumePercent: 0,        // 记录静音之前音量
                currentLyric: [],              // 当前歌词
                orderCount: 0,                 // 当前播放顺序  0 顺序播放 1 随机播放 2 单曲播放 3 列表循环
            }
        },
        methods:{
            ...mapActions(['setPlayFlag', 'setCurrentIndex', 'addHistoryList', 'initCurrentIndex']),
            initAudio() {
                try{
                    const _this = this;
                    let audio = _this.audio;
                    // 音频播放时间监听
                    audio.addEventListener('timeupdate', ()=>{

                        _this.currentplayPercent = audio.currentTime/audio.duration;
                        _this.currentplayTime = audio.currentTime;
                        // console.log(`当前播放时间${_this.currentplayTime}`);
                        if(_this.currentplayPercent == 1){
                            // 自动播放下一首
                            _this.setOrder();
                        }
                    })
                    // 请求数据失败
                    audio.addEventListener('error', ()=>{
                        if(_this.currentIndex >= 0) Toast('播放失败')
                    })
                    // 音频缓冲
                    audio.addEventListener('progress', ()=>{
                        _this.currentLoadPercent = audio.buffered.end(0)/audio.duration;
                    })
                    // 获取播放音量
                    _this.beforeVolumePercent = _this.currentVolumePercent = _this.audio.volume;

                } catch(error) {
                    console.log(error)
                }
            }, 
            // 上一首
            pre() {
                try{
                    const _this = this;
                    if(!_this.musicReady){
                        Toast("请选择要播放的音乐");
                        return
                    }

                    if(_this.currentIndex == 0){
                        Toast('已经是第一首了哦')
                        _this.setCurrentIndex(_this.currentList.length - 1);
                    }else{
                        _this.setCurrentIndex(_this.currentIndex - 1);
                    }

                } catch(error) {
                    console.log(error)
                }
            }, 
            // 播放暂停
            play() {
                try{
                    const _this = this;
                    if(!_this.musicReady){
                        Toast("请选择要播放的音乐");
                        return
                    }
                    _this.setPlayFlag(!_this.playFlag)
                } catch(error) {
                    console.log(error)
                }
            }, 
            // 下一首
            next() {
                try{
                    const _this = this;
                    if(!_this.musicReady){
                        Toast("请选择要播放的音乐");
                        return
                    }

                    if(_this.currentIndex < _this.currentList.length - 1){
                        _this.setCurrentIndex(_this.currentIndex + 1);
                    }else{
                        _this.setCurrentIndex(0);
                    }
                } catch(error) {
                    console.log(error)
                }
            },
            // 设置播放模式
            setMode() {
                try{
                    const _this = this;
                    _this.orderCount ++ ;
                    if(_this.orderCount > 3) _this.orderCount = 0;
                    // console.log(_this.orderCount);
                } catch(error) {
                    console.log(error)
                }
            },
            // 0 顺序播放 1 随机播放 2 单曲播放 3 列表循环
            setOrder() {
                try{
                    const _this = this;
                    let orderCount = _this.orderCount;
                    if(orderCount == 0){
                        if(_this.currentIndex < _this.currentList.length - 1){
                            _this.setCurrentIndex(_this.currentIndex + 1);
                        }else{
                            _this.initCurrentIndex();
                        }
                    }else if(orderCount == 1){
                        let tempIndex = Math.floor(Math.random()*_this.currentList.length);
                        if(tempIndex == _this.currentIndex){
                            tempIndex = Math.floor(Math.random()*_this.currentList.length)
                        }
                        _this.setCurrentIndex(tempIndex);
                    }else if(orderCount == 2){
                        _this.setCurrentIndex(_this.currentIndex);
                        _this.audio.play();
                    }else{
                        _this.next();
                    }
                } catch(error) {
                    console.log(error)
                }
            }, 
            // 移动点控制播放进度
            playDotPercent(val) {
                try{
                    const _this = this;
                    _this.currentplayPercent = val;
                    // console.log(`播放进度${_this.audio.currentTime}`);
                    _this.$nextTick(()=>{
                        if(_this.audio.currentTime){
                            _this.audio.currentTime = val * _this.audio.duration;
                        }
                    })
                } catch(error) {
                    console.log(error)
                }
            }, 
            // 移动点控制音量
            volumeDotPercent(val) {
                try{
                    const _this = this;
                    _this.$nextTick(()=>{
                        _this.audio.volume = _this.currentVolumePercent = _this.beforeVolumePercent = val;
                    })
                } catch(error) {
                    console.log(error)
                }
            }, 
            // 静音 
            setMute() {
                try{
                    const _this = this;
                    if(_this.currentVolumePercent > 0){
                        _this.audio.volume = _this.currentVolumePercent = 0;
                    }else{
                        _this.audio.volume = _this.currentVolumePercent = _this.beforeVolumePercent
                    }
                } catch(error) {
                    console.log(error)
                }
            }, 
            // 选择歌词更改播放进度
            currentSelLyric(val) {
                try{
                    const _this = this;
                    _this.audio.currentTime = _this.currentplayPercent = val;
                } catch(error) {
                    console.log(error)
                }
            }, 
            setHeight(){
                try {
                    const _this = this;
                    let height = document.documentElement.clientHeight || document.body.clientHeight;
                    _this.musicHeight = height - 60;
                    _this.musicContentHeight = height - 60 - 80;
                    _this.musicInfoHeight = height - 63 - 80;
                } catch (error) {
                    console.log(error)
                }
            },
            // 获取歌词
            setLyric(id) {
                try{
                    const _this = this;
                    server.getLyric({id})
                    .then(res=>{
                        if(res.lrc && res.lrc.lyric){
                            _this.currentLyric = parseLyric(res.lrc.lyric)
                        }else{
                            _this.currentLyric = [];
                        }       
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                } catch(error) {
                    console.log(error)
                }
            },
            // 获取电台url 并播放
            getSongUrl(id) {
                try{
                    const _this = this;
                    server.getSongUrl({id})
                    .then(res=>{
                        if(res.data && res.data[0] && res.data[0].url){
                            _this.audio.src = res.data[0].url;
                            _this.audio.play();
                        }else{
                            Toast('歌曲不存在')
                        }
                    })
                    .catch(error=>{
                        console.log(error)
                        Toast('歌曲不存在')
                    })
                } catch(error) {
                    return '';
                    console.log(error)
                }
            }, 
        },
        computed:{
            ...mapGetters([
                'currentMusic',
                'audio',
                'playFlag',
                'currentIndex',
                'currentList',
                'historyList'
            ]),
            // 设置背景图片
            picUrl() {
                return this.currentMusic && this.currentMusic.id && this.currentMusic.image ? `url(${this.currentMusic.image}?param=300y300)` : `url(${defaultBgImage})`
            }
        },
        watch:{
            // 当前播放音乐
            currentMusic(newVal, oldVal){
                const _this = this;
                // console.log(`当前播放音乐名字: ${newVal.name}`);
                // console.log('当前播放状态: '+ _this.playFlag);
                if(!newVal.id){
                    _this.audio.src = '';
                    return
                }
                if(newVal.id == oldVal.id){
                    // console.log('当前是同一首歌');
                    return
                }
                
                // 获取歌词
                _this.setLyric(newVal.id);

                // 把当前音乐存入缓存
                _this.addHistoryList(newVal);
                // 判断是否是电台歌曲
                if(newVal.type == 'transceiver'){
                    _this.getSongUrl(newVal.id)
                }else{
                    _this.audio.src = newVal.url;
                    _this.audio.play();
                }
            },
            // 设置播放暂停
            playFlag(newVal, oldVal){
                const _this = this;
                // console.log('播放状态' + newVal);
                newVal ? _this.audio.play() : _this.audio.pause();
                _this.musicReady = true;
            }
        },
        created(){
            const _this = this;
        },
        components:{
            ControlType,
            Percent,
            Lyric
        },
        mounted(){
            const _this = this;
            // 设置布局元素高度
            _this.setHeight();
            _this.initAudio();
        },
    }
</script>


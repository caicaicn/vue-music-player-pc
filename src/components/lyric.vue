<template>
    <div ref="lyric" class="lyric">
        <div class="lyric-name">{{currentMusic.name | musicContent('name')}}</div>
        <div class="lyric-info">歌手: {{currentMusic.singer | musicContent('singer')}}</div>
        <div class="lyric-info">专辑: {{currentMusic.album | musicContent('album')}}</div>
        <div v-if="currentMusic.id" :style="{height: lyricHeight+'px'}" class="lyric-con">
            <div class="lyric-con-center">
                <div :style="{transform: 'translateY('+ translateY +'px)'}" class="lyric-con-list">
                    <div @click="selLyric(item.time)" v-for="(item, index) in lyric" class="lyric-con-item" :class="{'active': currentIndex == index}">{{item.text}}</div>
                </div>
            </div>
        </div>
        <div v-else class="none-lyric" :style="{height: lyricHeight+'px'}">
            <div class="none-info">
                <div class="iconfont icon-yinle"></div>
                <div>在线播放器 歌真多</div>
            </div>
        </div>
    </div>
</template>
<style lang='less'>
    .lyric{
        width: 100%;
        height: 100%;   
        box-sizing: border-box;
        .lyric-name{
            line-height: 58px;
            font-size: 20px;
            font-weight: 700;
            text-align: center;
        }
        .lyric-info{
            width: 100%;
            line-height: 26px;
            text-align: center;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
        }
        .lyric-con{
            padding: 20px;
            margin-top: 40px;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            .lyric-con-center{
                height: 40px;
                width: 100%;
                text-align: center;
                .lyric-con-list{
                    .lyric-con-item{
                        cursor: pointer;
                        transition: color,font-size .8s linear;
                        line-height: 40px;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(255,255,255,.6);
                    }
                    .active{
                        font-weight: 700;
                        font-size: 16px;
                        color: rgba(255,255,255,.9);
                    }
                }
            }
        }
        .none-lyric{
            position: relative;
            text-align: center;
            .none-info{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                .iconfont{
                    font-size: 70px;
                    margin-bottom: 50px;
                    animation: rotate 3s linear infinite;
                }
                @keyframes rotate {
                    0%{
                        transform: rotate(0deg) scale(1);
                    }   
                    50%{
                        transform: rotate(180deg) scale(1.2);
                    }
                    100%{
                        transform: rotate(360deg) scale(1);
                    }
                }
            }
        }
    }
</style>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data(){
            return{
                lyricHeight: 0,
                translateY: 0,
                currentIndex: 0,
            }
        },
        filters:{
            musicContent(val, info){
                if(info == 'name'){
                    return  val ? val : '在线音乐播放器'
                }else if(info == 'singer'){
                    return val ? val : '未知歌手'
                }else if(info == 'album'){
                    return val ? val : '未知专辑'
                }
            }
        },
        methods: {
            setCurrentLyric(index) {
                try{
                    const _this = this;
                    _this.translateY = index * (-40);
                } catch(error) {
                    console.log(error)
                }
            },
            //选择歌词
            selLyric(val) {
                try{
                    const _this = this;
                    _this.$emit('currentLyric', val)
                } catch(error) {
                    console.log(error)
                }
            },  
        },
        props: {
            lyric:{
                default: [],
                type: Array
            },
            currentTime:{
                default: 0,
                type: [Number, String]
            }
        },
        watch: {
            currentTime(val){
                let lyric = this.lyric;
                for (let i = 0; i < lyric.length; i++) {
                    if(lyric[i].time == parseInt(val)){
                        this.currentIndex = i;
                        this.setCurrentLyric(i);
                    }
                }
            }
        },
        computed:{
            ...mapGetters(['currentMusic'])
        },
        mounted(){
            const _this = this;
            this.$nextTick(()=>{
                this.lyricHeight = this.$refs.lyric.offsetHeight - 210;
            })
        },
    }
</script>
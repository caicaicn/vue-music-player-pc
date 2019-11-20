<template>
    <div class="transceiver">
        <transceiver-type @select="selectTransceiver" :list="transceivertypeList"></transceiver-type>
        <div class="transceiver-con">
            <div class="transceiver-recommend-title">推荐电台</div>
            <div ref="transceive" class="transceiver-recommend-list">
                <div @click="getTransceiverDetail(item)" v-for="(item, index) in transceiverList" class="transceiver-recommend-item">
                    <img v-lazyload="{ scrollEl: transceive, imgs: item.picUrl }" alt="">
                    <h3>{{item.name}}</h3>
                    <p>{{item.desc}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang='less'>
    .transceiver{
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        overflow: scroll;
        background-color: rgba(255,255,255,.2);
        .transceiver-con{
            // overflow: hidden;
            width: 100%;
            .transceiver-recommend-title{
                line-height: 40px;
                font-weight: 700;
                font-size: 20px;
            }
            .transceiver-recommend-list{
                width: 100%;
                // overflow: hidden;
                .transceiver-recommend-item{
                    width: 20%;
                    height: 210px;
                    margin-top: 30px;
                    text-align: center;
                    float: left;
                    cursor: pointer;
                    img{
                        width: 120px;
                        height: 120px;
                    }
                    h3{
                        margin: 10px 0;
                        color: #ffffff;
                        overflow: hidden;/*超出部分隐藏*/
                        white-space: nowrap;/*不换行*/
                        text-overflow:ellipsis;/*超出部分文字以...显示*/
                    }
                    p{
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2; //需要控制的文本行数
                        overflow: hidden;
                        padding: 0 6px;
                        line-height: 22px;
                        box-sizing: border-box;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>
<script>
    import TransceiverType from '../components/transceiverType.vue';
    import server from '../http/index.js' 
    export default {
        data(){
            return{
                transceive: null,
                transceivertypeList: [],        // 电台分类
                transceiverList: [],            // 电台列表
            }
        },
        methods: {
            selectTransceiver(rid) {
                try{
                    const _this = this;
                    server.getdjrecommend({type: rid})
                    .then(res=>{
                        _this.transceiverList = res.djRadios;
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                } catch(error) {
                    console.log(error)
                }
            }, 
            getTransceiverDetail(item) {
                try{
                    const _this = this;
                    _this.$router.push(`/music/transceiverParams/${item.id}`);
                } catch(error) {
                    console.log(error)
                }
            }, 
        },
        components:{
            TransceiverType
        },
        mounted(){
            const _this = this;
            _this.transceive = _this.$refs.transceive;
        },
    }
</script>
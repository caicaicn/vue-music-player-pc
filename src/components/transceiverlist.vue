<template>
    <div class="transceiver-list">
        <!-- {{list}}---{{rid}} -->
        <div v-if="true" @click="getTransceiver(item, index)" v-for="(item, index) in list" class="transceiver-item">
            <div class="index">{{index+1}}</div>
            <img class="img" :src="item.coverUrl" />
            <div class="name">{{item.name}}</div>
            <div class="subscribe">
                <span class="iconfont icon-zhengzaijinhang"></span>
                <span class="subscribe-count">{{item.listenerCount}}</span>
            </div>
            <div class="subscribe">
                <span class="iconfont icon-changjingtuijian"></span>
                <span class="subscribe-count">{{item.likedCount}}</span>
            </div>
            <div class="date">{{item.createTime| _getDate}}</div>
            <div class="time">{{item.duration/1000|_formatTime}}</div>
        </div>
    </div>
</template>
<style lang='less'>
    .transceiver-list{
        width: 100%;
        .transceiver-item{
            cursor: pointer;
            padding: 6px 0;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            text-align: center;
            .index{
                width: 60px;
            }
            .img{
                width: 40px;
                height: 40px;
                border-radius: 100%;
            }
            .name{
                flex: 1;
                text-align: left;
                margin-left: 20px;
            }
            .subscribe{
                width: 90px;
                text-align: left;
            }
            .date{
                width: 100px;
            }
            .time{
                padding: 0 10px;
            }
        }
    }
</style>
<script>
    import { getDate, formatTimeMixins } from '../assets/js/mixins.js'
    import server from '../http/index.js';
    export default {
        mixins: [ getDate, formatTimeMixins ],
        data(){
            return{
                list: [],
            }
        },
        methods: {
            init() {
                try{
                    const _this = this;
                    let params = {
                        rid: _this.rid, 
                        limit: 30,
                        offset: 0
                    };
                    server.getdjprogram(params)
                    .then(res=>{
                        // console.log(res);
                        _this.list = res.programs;
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
                    _this.$emit('setTransceiver', val, index);
                } catch(error) {
                    console.log(error)
                }
            }, 
        },
        computed:{

        },
        created(){
            this.init();
        },
        props: {
            rid: {
                default: '',
                type: [String, Number]
            }
        }
    }
</script>
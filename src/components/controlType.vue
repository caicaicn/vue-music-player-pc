<template>
    <div class="controlType">
        <div v-for="(btnTypeList, index) in btnType" class="control-btn-list">
            <div class="controlType-title">{{btnTypeList.title}}</div>
            <router-link class="btn iconfont" :to="item.route" :class="{active: item.id == selectId}" v-for="(item, index) in btnTypeList.list" :key="index">
                <button  @click="setMusicType(item.id)"> <span class="iconfont" :class="item.icon"></span> {{item.name}}</button>
            </router-link>
        </div>
    </div>
</template>
<style lang='less'>
    .controlType{
        height: 100%;
        width: 120px;
        .control-btn-list{
            margin-bottom: 40px;
            .controlType-title{
                font-size: 14px;
            }
            .btn{
                display: block;
                margin-top: 10px;
                height: 30px;
                button{
                    font-size: 16px;
                    width: 100%;
                    height: 100%;
                    text-align: left;
                    .iconfont{
                        font-size: 18px;
                        font-weight: 700;
                        display: inline-block;
                        width: 20px;
                    }
                }
            }
            .active{
                button{
                    color: rgba(255, 255, 255, 1);
                    font-size: 18px;
                    .iconfont{
                        font-size: 20px;
                    }
                }
            }
        }
    }
</style>
<script>
    export default {
        data(){
            return{
                selectId: 0,
                btnType: [
                    {
                        title: '推荐',
                        list: [
                            {
                                route: '/music/recommend',
                                name: '推荐',
                                id: 0,
                                icon: 'icon-changjingtuijian'
                            },
                            {
                                route: '/music/transceiver',
                                name: '主播电台',
                                id: 1,
                                icon: 'icon-diantaizhibo'
                            },
                            {
                                route: '/music/songsheet',
                                name: '歌单',
                                id: 2,
                                icon: 'icon-icon-'
                            },
                            {
                                route: '/music/search',
                                name: '搜索',
                                id: 3,
                                icon: 'icon-sousuo'
                            }
                        ]
                    },
                    {
                        title: '我的音乐',
                        list: [
                            {
                                route: '/music/currentPlay',
                                name: '正在播放',
                                id: 4,
                                icon: 'icon-zhengzaijinhang'
                            },
                            {
                                route: '/music/ownlist',
                                name: '我的歌单',
                                id: 5,
                                icon: 'icon-weibiaoti2fuzhi12'
                            },
                            {
                                route: '/music/historyPlay',
                                name: '我听过的',
                                id: 6,
                                icon: 'icon-yijingwanchengdexiangmu'
                            },
                        ]
                    }
                ]
            }
        },
        methods: {
            setMusicType(val) {
                try{
                    const _this = this;
                    _this.selectId = val;
                } catch(error) {
                    console.log(error)
                }
            }, 
        },
        created(){
            
        },
    }
</script>
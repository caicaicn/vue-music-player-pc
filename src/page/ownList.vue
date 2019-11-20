<template>
    <div class="own-list">
        <div v-if="true" class="list-con">
            <h3>歌单列表</h3>
            {{playList}}
            <div v-for="(item, index) in playList " class="list-item">{{item.name}}</div>
        </div>
        <div v-else class="list-none">暂时没有歌单</div>
    </div>
</template>
<style lang='less'>

</style>
<script>
    import { mapGetters } from 'vuex';
    import server from '../http/index.js';
    export default {
        data(){
            return{
                playList: [],
            }
        },
        computed:{
            ...mapGetters(['uid'])
        },
        watch:{
            uid(val){
                this.init();
                console.log(val);
            }
        },
        methods: {
            init() {
                try{
                    const _this = this;
                    server.getUserPlaylist({uid: _this.uid})
                    .then(res=>{
                        console.log(res);
                        // _this.playList = res.playList;
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                } catch(error) {
                    console.log(error)
                }
            }, 
        },
        created(){
            
        },
    }
</script>
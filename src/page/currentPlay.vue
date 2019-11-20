<template>
    <div class="current-play">
        <music-list 
            :list="newCurrentList"
            @selectCurMusic="selectMusic"
            @delMusicIndex="delMusic"
            >
            <p>当前没有音乐哦~</p>
        </music-list>
    </div>
</template>
<style lang='less'>
    .current-play{
        height: 100%;
        width: 100%;
    }
</style>
<script>
    import { mapGetters, mapState, mapActions } from 'vuex';
    import { Toast } from 'mint-ui';
    import MusicList from '../components/musicList.vue';
    export default {
        data(){
            return{
            }
        },
        computed:{
            ...mapGetters(['currentList', 'currentMusic']),
            // 当前播放列表
            newCurrentList(){
                return this.currentList;
            }
        },
        methods: {
            ...mapActions(['setCurrentIndex', 'initCurrentIndex', 'setPlayFlag']),
            selectMusic(music, index) {
                try{
                    const _this = this;
                    _this.setCurrentIndex(index);
                    _this.setPlayFlag(true);
                } catch(error) {
                    console.log(error)
                }
            }, 
            delMusic(music, index) {
                try{
                    const _this = this;
                    if(_this.currentMusic.id == music.id){
                        console.log('删除的是当前的音乐');
                        _this.setPlayFlag(false);
                        _this.initCurrentIndex();
                    }
                    _this.newCurrentList.splice(index, 1);
                    Toast('删除成功');
                } catch(error) {
                    console.log(error)
                }
            }, 
        },
        components:{
            MusicList
        },
    }
</script>
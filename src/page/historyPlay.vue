<template>
    <div class="historyPlay">
        <music-list 
            :list="historyList"
            @selectCurMusic="selectMusic"
            @delMusicIndex="delMusic"
            >
            <p class="no-music-info">当前没有音乐哦~</p>
        </music-list>
    </div>
</template>
<style lang='less'>
    .historyPlay{
        width: 100%;
        height: 100%;
    }
</style>
<script>
    import MusicList from '../components/musicList.vue';
    import { Toast } from 'mint-ui';
    import { mapGetters, mapActions } from 'vuex';
    export default {
        computed:{
            ...mapGetters(['historyList', 'currentMusic'])
        },
        components:{
            MusicList
        },
        methods: {
            ...mapActions(['removeHistoryList', 'setCurrentList', 'setCurrentIndex', 'setPlayFlag', 'initCurrentIndex']),
            selectMusic(music, index) {
                try{
                    const _this = this;
                    try{
                        const _this = this;
                        // 设置当前播放列表
                        _this.setCurrentList(_this.historyList);
                        _this.setCurrentIndex(index);
                        _this.setPlayFlag(true);
                    } catch(error) {
                        console.log(error)
                    }
                } catch(error) {
                    console.log(error)
                }
            }, 
            delMusic(music, index) {
                try{
                    const _this = this;
                    if(_this.currentMusic.id == music.id){
                        _this.setPlayFlag(false);
                        _this.initCurrentIndex();
                    }
                    _this.removeHistoryList(music);
                    Toast('删除成功')
                } catch(error) {
                    console.log(error)
                }
            }, 
        },
        created(){
            
        },
    }
</script>
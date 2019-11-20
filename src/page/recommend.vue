<template>
    <div class="song-sheet">
        <music-list 
            :list="recommendList"
            @selectCurMusic="selectMusic"
            @delMusicIndex="delMusic"
            >
            <p class="no-music-info">当前没有音乐哦~</p>
        </music-list>
    </div>
</template>
<style lang='less'>
    .song-sheet{
        height: 100%;
        width: 100%;
    }
</style>
<script>
    import MusicList from '../components/musicList.vue';
    import { mapGetters, mapActions } from 'vuex';
    import server from '../http/index.js';
    import {createTopList, setformatSongs} from '../assets/js/song.js';
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return{
                recommendList: [],
            }
        },
        methods: {
            ...mapActions(['setPlayFlag', 'setCurrentIndex', 'initCurrentIndex', 'setCurrentList']),
            init() {
                try{
                    const _this = this;
                    server.getCurrentList({idx: 1})
                    .then(res=>{
                        if(res.playlist){
                            let list = res.playlist.tracks;
                            // console.log(list);
                            let listFilter = setformatSongs(list.slice(0,100));
                            _this.recommendList = listFilter
                        }
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                } catch(error) {
                    console.log(error)
                }
            }, 
            selectMusic(music, index) {
                try{
                    const _this = this;
                    // 设置当前播放列表
                    _this.setCurrentList(_this.recommendList);
                    // 设置当前播放顺序
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
                    _this.currentList.splice(index, 1);
                    Toast('删除成功')
                } catch(error) {
                    console.log(error)
                }
            }
        },
        computed:{
            ...mapGetters(['currentList', 'currentMusic'])
        },
        components:{
            MusicList
        },
        created(){
            this.init();
        },
    }
</script>
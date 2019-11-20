<template>
    <div class="search">
        <div class="search-area">
            <div class="enumeration">
                <div class="enumeration-select  select-title">选择热搜</div>
                <div @click="setrecommendHot" class="enumeration-select  select-result">{{hotResult}}</div>
                <ul v-if="hotselFlag">
                    <li @click="selectSearchName(item)" v-for="(item, index) in searchHotList">{{item.first}}</li>
                </ul>
            </div>
            <input @keyup.enter="search" v-model="searchName" class="music-name" placeholder="音乐/歌手" type="text">
        </div>
        <music-list 
            :speciallyHeight='searchHeight'
            :list="searchResult"
            @selectCurMusic="selectMusic"
            @delMusicIndex="delMusic"
            >
            <p>当前没有音乐哦~</p>
        </music-list>
    </div>
</template>
<style lang='less'>
    .search{
        width: 100%;
        height: 100%;
        .search-area{
            width: 100%;
            height: 40px;
            display: flex;
            background-color: rgba(0, 0, 0, .3);
            box-shadow: 0px 0px 6px rgba(0, 0, 0, .3);
            .enumeration{
                flex: 1;
                display: flex;
                height: 100%;
                position: relative;
                .enumeration-select{
                    margin: 12px 50px;
                }
                .select-title{
                    width: 80px;
                }
                .select-result{
                    flex: 2;
                    min-width: 50px;
                    cursor: pointer;
                }
                ul{
                    width: 340px;
                    margin:0 180px 0 210px;
                    position: absolute;
                    top: 60px;
                    left: 0;
                    max-height: 280px;
                    overflow-y: scroll;
                }
                li{
                    cursor: pointer;
                    height: 40px;
                    line-height: 40px;
                    text-indent: 20px;
                    background-color: rgba(0,0,0, 1);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }
            }
            .music-name{
                width: 200px;
                height: 28px;
                background-color: rgba(0, 0, 0, .3);
                border: 1px solid rgba(255, 255, 255, 0.7);
                margin: 6px 10px;
                color: rgba(255, 255, 255, 0.7);
                outline: none;
                font-size: 14px;
                box-sizing: border-box;
                padding: 0 5px;
            }
            
        }
    }
</style>
<script>
    import MusicList from '../components/musicList.vue';
    import server from '../http/index.js';
    import {setsearchformatSongs} from '../assets/js/song.js';
    import { mapActions, mapGetters } from 'vuex';
    export default {
        data(){
            return{
                hotselFlag: false,
                hotResult: '请选择',
                searchHeight: 40,
                searchHotList: [],
                searchName: '',
                searchResult: []
            }
        },
        methods: {
            ...mapActions(['setPlayFlag', 'setCurrentIndex', 'setCurrentIndex', 'initCurrentIndex', 'setCurrentList']),
            init() {
                try{
                    const _this = this;
                    server.getSearchHot()
                    .then(res=>{
                        _this.searchHotList = res.result.hots
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                } catch(error) {
                    console.log(error)
                }
            }, 
            // 热搜
            selectSearchName(hot) {
                try{
                    const _this = this;
                    _this.searchName = hot.first;
                    _this.hotselFlag = false;
                    _this.search();
                } catch(error) {
                    console.log(error)
                }
            }, 
            setrecommendHot() {
                try{
                    const _this = this;
                    _this.hotselFlag = !_this.hotselFlag;
                } catch(error) {
                    console.log(error)
                }
            },
            search() {
                try{
                    const _this = this;
                    if(_this.musicName == ''){
                        return
                    }
                    server.getSearch({keywords: _this.searchName})
                    .then(res=>{
                        let list = res.result.songs;
                        // console.log(list);
                    //    let listFilter = setsearchformatSongs(list.slice(0,100));
                       let listFilter = setsearchformatSongs(list);
                       _this.searchResult = listFilter
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
                    _this.setCurrentList(_this.searchResult);
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
                } catch(error) {
                    console.log(error)
                }
            }, 
        },
        computed:{
            ...mapGetters(['currentMusic', 'currentList'])
        },
        created(){
            this.init()
        },
        components:{
            MusicList
        },
    }
</script>
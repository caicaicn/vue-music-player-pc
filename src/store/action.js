import * as types from './mutationType';

const action = {
    setAudio({commit, state}, audio){
        commit(types.GET_AUDIO, audio);
    },
    setUid({commit, state}, uid){
        commit(types.SET_UID, uid);
    },
    //设置当前播放列表
    setCurrentList({commit, state}, list){
        commit(types.SET_CURRENTLIST, list);
    },
    // 设置当前播放状态
    setPlayFlag({commit, state}, boolean){
        commit(types.SET_PLAYFLAG, boolean);
    },
    // 设置当前播放索引 
    setCurrentIndex({commit, state}, index){
        commit(types.SET_CURRENTINDEX, index);
        commit(types.SET_PLAYFLAG, true);
    },
    // 初始化当前播放索引与播放状态
    initCurrentIndex({commit, state}){
        commit(types.SET_INITCURRENTINDEX);
        commit(types.SET_PLAYFLAG, false);
    },
    //添加播放历史
    addHistoryList({ commit, state }, music){
        commit(types.ADD_HISTORYLIST, music);
    },
    //删除一条播放历史
    removeHistoryList({ commit, state }, music){
        commit(types.REMOVE_HISTORYLIST, music);
    },
}

export default action;
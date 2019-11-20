import * as types from './mutationType';
import { setHistoryList, clearHistory } from '../assets/js/storage'
const mutations = {
    [types.GET_AUDIO](state, audio){
        state.audio = audio;
    },
    [types.SET_UID](state, uid){
        state.uid = uid;
    },
    // 设置当前播放列表
    [types.SET_CURRENTLIST](state, list){
        state.currentList = list;
    },
    // 设置当前播放状态
    [types.SET_PLAYFLAG](state, boolean){
        state.playFlag = boolean;
    },
    // 设置当前播放索引
    [types.SET_CURRENTINDEX](state, index){
        // console.log('mutation: ' + index);
        state.currentIndex = index;
    },
    // 初始化当前播放索引
    [types.SET_INITCURRENTINDEX](state){
        state.currentIndex = -1;
    },
    // 添加一条播放历史
    [types.ADD_HISTORYLIST](state, music){
        state.historyList = setHistoryList(music, 'add');
    },
    // 删除一条播放历史
    [types.REMOVE_HISTORYLIST](state, music){
        state.historyList = setHistoryList(music, 'remove');
    },
    // 清除播放历史
    [types.CLEARHISTORY](state, list){
        state.historyList = clearHistory();
    },
}

export default mutations;
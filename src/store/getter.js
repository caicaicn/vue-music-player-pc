const getters = {
    // 当前元素
    audio: state => state.audio,
    uid: state => state.uid,
    // 当前播放索引
    currentIndex: state => state.currentIndex,
    // 当前播放列表
    currentList: state => state.currentList,
    // 历史播放列表
    historyList: state => state.historyList,
    // 当前播放状态
    playFlag: state => state.playFlag,
    // 当前播放音乐
    currentMusic(state){
        return state.currentList[state.currentIndex] || {};
    },
}

export default getters;
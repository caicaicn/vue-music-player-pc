import { getHistoryList } from '../assets/js/storage'
const state = {
    uid: '',
    audio: null,
    currentList: [],        // 当前播放列表
    currentIndex: -1,       // 当前播放索引
    playFlag: false,        // 当前播放状态
    historyList: getHistoryList() || [],        // 播放历史
}

export default state
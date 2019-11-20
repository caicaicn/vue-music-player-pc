import http from '../api/http';

export default {
    // 获取网友精选碟作为当前播放列表
    getCurrentList(params){
        return http('get', '/top/list', params);
    },
    // 获取音乐url
    getSongUrl(params){
        return http('get', '/song/url', params);
    },
    // 搜索音乐
    getSearch(params){
        return http('get', '/search', params);
    },
    // 热搜
    getSearchHot(params){
        return http('get', '/search/hot', params);
    },
    // 歌单分类列表
    getCatlist(params){
        return http('get', '/playlist/catlist', params);
    },
    // 歌单分类列表 => 获取歌单
    getTopPlaylist(params){
        return http('get', '/top/playlist', params);
    },
    // 歌单分类列表 => 获取歌单 => 分页
    getTopPlaylistHigh(params){
        return http('get', '/top/playlist/highquality', params);
    },
    // 歌单分类列表 => 获取歌单详情
    getTopPlaylistDetail(params){
        return http('get', '/playlist/detail', params);
    },
    // 获取歌词
    getLyric(params){
        return http('get', '/lyric', params);
    },
    // 获取电台分类
    getdjcatelist(params){
        return http('get', '/dj/catelist', params);
    },
    // 推荐电台列表
    getdjrecommend(params){
        return http('get', '/dj/recommend/type', params);
    },
    // 获取电台节目
    getdjprogram(params){
        return http('get', '/dj/program', params);
    },
    // 获取电台节目信息
    getdjdetail(params){
        return http('get', '/dj/detail', params);
    },
    // 登录
    setLogin(params){
        return http('get', '/login/cellphone', params);
    },
    // 获取用户歌单
    getUserPlaylist(params){
        return http('get', '/user/playlist', params);
    },
}
// 用户登录
export const userLogin = params => {
    return http('get', '/node-api/user/login', params);
}
// 用户注册
export const userRegister = params => {
    return http('get', '/node-api/user/register', params);
}
// 用户重置密码
export const userReset = params => {
    return http('get', '/node-api/user/reset', params);
}
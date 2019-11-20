function filterSinger(singers) {
    let arr = [];
    singers.forEach(item => {
        arr.push(item.name)
    });
    return arr.join('/')
}

export class Song {
    constructor({id, name, singer, album, image, duration, url, type}) {
        this.id = id;
        this.name = name;
        this.singer = singer;
        this.album = album;
        this.image = image;
        this.duration = duration;
        this.url = url;
        this.type = type || '';
    }
}

export function createPlayList(music) {
    return new Song({
        id: music.id,
        name: music.name,
        singer: music.artists.length > 0 && filterSinger(music.artists),
        album: music.album.name,
        image: music.album.picUrl || null,
        duration: music.duration / 1000,
        url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
    })
}
// 推荐歌曲处理 
export function createTopList(music) {
    return new Song({
        id: music.id,
        name: music.name,
        singer: music.ar.length>0 && filterSinger(music.ar),
        album: music.al.name,
        image: music.al.picUrl,
        duration: music.dt/1000,
        url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
    })
}
// 搜索歌曲处理
export function createSearchList(music) {
    return new Song({
        id: music.id,
        name: music.name,
        singer: music.ar.length > 0 && filterSinger(music.ar),
        album: music.al.name,
        image: music.al.picUrl || null,
        duration: music.dt / 1000,
        url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
    })
}

// 电台歌曲处理
export function createtransceiverList(music, type) {
    return new Song({
        type,
        id: music.id,
        name: music.name,
        singer: music.artists.length > 0 && filterSinger(music.artists),
        album: music.album.name,
        image: music.album.picUrl || null,
        duration: music.duration / 1000,
        url: ''
    })
}

// 歌曲数据格式化
const formatSongs = function formatPlayList(list) {
    let Songs = [];
    list.forEach((item) => {
        const musicData = item;
        if (musicData.id) {
            Songs.push(createPlayList(musicData))
        }
    });
    return Songs
};

// 推荐歌曲数据处理
export const setformatSongs = (list) => {
    let ret = [];
    list.forEach((item) => {
        const musicData = item;
        if (musicData.id) {
            ret.push(createTopList(musicData))
        }
    });
    return ret
}
// 搜索歌曲数据处理
export const setsearchformatSongs = (list) => {
    let ret = [];
    list.forEach((item) => {
        const musicData = item;
        if (musicData.id) {
            ret.push(createSearchList(musicData))
        }
    });
    return ret
}

// 电台歌曲数据处理
export const settransceiverformatSongs = (list, type) => {
    // console.log('-------<<'+type+'>>');
    let ret = [];
    list.forEach((item) => {
        const musicData = item.mainSong;
        if (musicData.id) {
            ret.push(createtransceiverList(musicData, type))
        }
    });
    return ret
}

export default formatSongs

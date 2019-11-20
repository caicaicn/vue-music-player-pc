// 设置本地缓存
const playerhistory = 'playerhistory';
let local = {
    set(key, val){
        localStorage.setItem(key, val);
    },
    get(key){
        let item = localStorage.getItem(key);
        // console.log(`判断历史记录类型: ${typeof item}`);
        if (typeof item == 'string'){
            // console.log('有历史');
            return JSON.parse(item)
        }else{
            // console.log('没有历史');
            return [];
        }
    },
    clear(){
        localStorage.clear()
    }
}

// 获取播放历史

export const getHistoryList = ()=>{
    // 清除播放历史
    // local.clear();
    return local.get(playerhistory);
}

// 更新播放历史
export const setHistoryList = (music, type)=>{
    console.log(`type: ${type}`);
    let list = [];
    list = local.get(playerhistory);

    let indexFlag = list.findIndex((val, index, arr) => {
        return val.id == music.id
    });
    if(type == 'remove'){
        list.splice(indexFlag, 1);
    }else if(type == 'add'){

        // 判断历史歌单有没有当前音乐
        if (indexFlag < 0) {
            list.unshift(music);
        } else if (indexFlag > 0) {
            list.splice(indexFlag, 1);
            list.unshift(music);
        }
    }

    // 获取本地播放历史
    local.set(playerhistory, JSON.stringify(list))

    return list;
}

export const clearHistory = ()=>{
    local.clear();
    return [];
}
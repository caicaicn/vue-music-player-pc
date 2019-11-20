export const formatTimeMixins = {
    filters: {
        _formatTime(val) {
            let hours = Math.floor(val / 3600);
            let minutes = Math.floor(val / 60);
            let seconds = Math.floor(val % 60);
            let str = `${hours > 0 ? hours + ':' : ''}${minutes > 9 ? minutes + ":" : '0' + minutes + ":"}${seconds > 9 ? seconds : '0' + seconds}`
            // console.log(str);
            return str;
        }
    }
}

export const loadMixins = {
    methods: {
        setLoading(val, tips) {
            try {
                const _this = this;
                if (val) {
                    _this.loadingFlag = val;
                    if(tips){
                        _this.loadingTip = tips;
                    }
                } else {
                    setTimeout(() => {
                        _this.loadingFlag = val;
                        _this.loadingTip = '';
                    }, 1000);
                }
            } catch (error) {
                console.log(error)
            }
        },
    }
}

export const getDate = {
    filters: {
        _getDate(val){
            // console.log(val);
            var date = new Date(val);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            // console.log(`Y${Y}--M${M}--D${D}--h${h}--m${m}--s${s}`);
            return Y + M + D;
        }
    }
}

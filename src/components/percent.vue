<template>
    <div @mousedown="selStart($event)" class="percent">
        <div ref="total" class="total">
            <div :style="{width: loadWidth + 'px'}" class="load"></div>
            <div :style="{width: playWidth + 'px'}" class="play"></div>
            <div @mousedown.self="start($event)" :style="{left: dotoffset + 'px'}" class="dot"></div>
        </div>
    </div>
</template>
<style lang='less'>
    .percent{
        width: 100%;
        font-size: 0;
        line-height: 0;
        .total{
            width: 100%;
            display: inline-block;
            position: relative;
            height: 2px;
            background-color: rgba(255, 255, 255, .2);
            .dot{
                width: 12px;
                height: 12px;
                border-radius: 100%;
                position: absolute;
                left: -12px;
                top: -5px;
                background-color: #ffffff;
            }
            .play{
                position: absolute;
                height: 100%;
                background-color: rgba(255, 255, 255, .9);
            }
            .load{
                position: absolute;
                height: 100%;
                background-color: rgba(255, 255, 255, .4);
            }
        }
    }
</style>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data(){
            return{
                totalWidth: 0,      // 总宽度
                status: false,      // 鼠标按下状态
                offsetX: 0,         // 拖动距离
            }
        },
        props: ['playPercent', 'loadPercent', 'type'],
        computed: {
            ...mapGetters(['playFlag', 'currentIndex']),
            // 当前进度
            playWidth(){
                return this.playPercent * this.totalWidth; 
            },
            // 当前进度
            loadWidth(){
                return this.loadPercent * this.totalWidth; 
            },
            // 按钮移动
            dotoffset(){
                return this.playPercent * this.totalWidth - 12; 
            },
        },
        methods: {
            start(e) {
                try{
                    const _this = this;
                    // e.stopPropagation();
                    if(!_this.playFlag && _this.type != 'volume'){
                        return 
                    }
                
                    if(_this.type == 'volume' && _this.playPercent == 0){
                        _this.offsetX = 0;
                    }else{
                        _this.offsetX = _this.playWidth;
                    }
                    
                    _this.status = true;

                    let startX = 0,     // 鼠标按下的位置
                        dist = 0,       // 按下移动距离  
                        percent = 0;    // 移动百分比

                    startX = e.clientX - _this.offsetX; 
                    document.addEventListener('mousemove', (event)=>{
                        event.preventDefault();
                        if(_this.status){
                            dist = event.clientX - startX;
                            _this.offsetX = dist;
                            _this.setPercent(event);
                        }
                    })
                    document.addEventListener('mouseup', (event)=>{
                       event.preventDefault();
                        _this.status = false;
                    })
                } catch(error) {
                    console.log(error)
                }
            },
            selStart(e) {
                try{
                    const _this = this;
                    _this.setPercent(e)
                } catch(error) {
                    console.log(error)
                }
            }, 
            setPercent(e) {
                try{
                    const _this = this;
                    let percent = 0;
                    _this.offsetX = e.clientX - _this.$refs.total.getBoundingClientRect().left;
                    percent = _this.offsetX/_this.totalWidth;
                    if(percent < 0){
                        percent = 0
                    }else if(percent > 1){
                        percent = 1
                    }
                    _this.$emit('dotPercent', percent);
                } catch(error) {
                    console.log(error)
                }
            },  
        },
        mounted(){
            const _this = this;
            _this.totalWidth = _this.$refs.total.offsetWidth
        }
    }
</script>
<template>
    <div v-show="loading" class="loading">
        <div class="loading-con">
            <img src="../assets/image/loading.gif" alt="">
            <div class="tip">{{tips}}</div>
        </div>
    </div>
</template>
<style lang='less'>
    .loading{
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,.8);
        z-index: 996;
        img{
            width: 80px;
        }
        .tip{
            margin-top: 10px;
            width: 100%;
            text-align: center;
        }
    }
</style>
<script>
    export default {
        data(){
            return{
                
            }
        },
        props:{
            loading:{
                default: false,
                type: Boolean
            },
            tips:{
                default: '',
                type: String
            }
        }
    }
</script>
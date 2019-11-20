<template>
    <div class="header">
        <div class="title">在线音乐播放器</div>
        <div class="user-btn">
            <button @click="signOut">
                <img :src="headerImg" class="user-bg">
                <span >退出</span>
            </button>
        </div>
    </div>
</template>
<style lang='less'>
    .header{
        display: flex;
        height: 60px;
        line-height: 60px;
        text-align: center;
        .title{
            flex: 1;
            font-weight: 700;
            font-size: 18px;
        }
        .user-btn{
            width: 100px;
            height: 100%;
            button{
                width: 100%;
                height: 100%;
                display: flex;
                align-items:center;
                .user-bg{
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                }
                span{
                    flex: 1;
                }
            }
        }
    }
</style>
<script>
    import server from '../http/index.js';
    import { mapActions } from 'vuex';
    import { removeUserInfo } from "../utils/user";
    export default {
        data(){
            return{
                headerImg: '/static/image/userBg.jpg',
                uid: ''
            }
        },
        methods: {
            ...mapActions(['setUid']),
            signOut() {
                removeUserInfo();
                this.$router.replace("/login");
            },
        },
        created(){
            const _this = this;
            let params = {
                phone: 13175573352,
                password: '123456'
            }
            server.setLogin(params)
            .then(res=>{
                _this.headerImg = res.profile.avatarUrl;
                let uid = res.profile.userId;
                _this.uid = uid;
                _this.setUid(uid);
            })
            .catch(error=>{
                console.log(error)
            })
        },
    }
</script>
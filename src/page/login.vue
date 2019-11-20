<template>
    <div class="login">
        <div class="login-bg"></div>
        <div class="login-contain">
            <h3>在线音乐播放器</h3>
            <div v-if="!isReset" class="user-info">
                <span class="iconfont icon-icon-user"></span>
                <input v-model="userName" placeholder="请输入用户名" type="text">
            </div>
            <div class="user-info">
                <span class="iconfont icon-mima1"></span>
                <input v-model="userPwd" placeholder="请输入密码" type="text">
            </div>
            <button v-if="!isReset" class="btn" @click="submit('login')">登录</button>
            <button v-if="!isReset" class="btn" @click="submit('register')">注册</button>
            <button class="btn" @click="submit('reset')">密码重置</button>
        </div>
    </div>
</template>
<style lang='less' scoped>
.login{
    position: fixed;
    left: 0;
    top: 0;
    min-width: 100%;
    min-height: 100vh;
    .login-bg{
        background: url("../assets/image/login_bg.jpg") no-repeat center center;
        background-size: cover;
        width: 100%;
        height: 100%;
        position: fixed;
        opacity: .5;
    }
    .login-contain{
        width: 320px;
        background-color: #fff;
        position: fixed;
        right: 100px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 10px;
        padding: 50px 0;
        .user-info{
            border-bottom: 1px solid #ccc;
            margin: 20px 30px;
            padding: 8px 0;
            span{
                font-size: 24px;
                color: #666;
                height: 100%;
            }
            input{
                border: none;
                font-size: 16px;
                color: #000;
                margin-left: 10px;
                width: 210px;
            }
            input::placeholder {
                font-size: 16px;
            }
        }
        h3{
            width: 100%;
            color: #000;
            font-size: 20px;
            font-weight: 700;
            text-align: center;
            padding-bottom: 30px;
        }
        .btn{
            background-color: #8BC34A;
            display: inline-block;
            width: 260px;
            margin: 10px 30px;
            border-radius: 30px;
            padding: 10px;
        }
    }
}
</style>
<script>
    import { setUserInfo } from "../utils/user"
    import { userRegister, userLogin, userReset } from "../http"
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return{
                userName: "",
                userPwd: "",
                isReset: false
            }
        },
        methods: {
            async submit(type){
                let params = {
                    name: this.userName,
                    pwd: this.userPwd
                },
                    res = {};

                try {
                    if(type == "login"){
                        res = await userLogin(params);
                    }else if(type == "register"){
                        res = await userRegister(params)
                    }else if(type == "reset"){
                        res = await userReset(params)
                    }
                } catch (error) {
                    Toast(error.data.msg)
                    console.log(error)
                }

                if (res && res.data && res.data.userInfo){
                    Toast(res.msg)
                    setUserInfo(res.data.userInfo)
                    this.$router.push("/")
                }
            }
        }
    }
</script>
<template>
    <div id="app">
        <header-vue v-if="$route.path !== '/login' && $route.path !== '/'"></header-vue>
        <router-view/>
        <audio ref="audio"></audio>
    </div>
</template>

<script>
    import HeaderVue from './components/header.vue';
    import { mapActions } from 'vuex';
    
    export default {
        name: "App",
        components:{
            HeaderVue
        },
        methods:{
            ...mapActions(['setAudio']),
        },
        mounted(){
            const _this = this;
            // 初始化audio标签
            let el = _this.$refs.audio;
            _this.setAudio(el)
        },
    };
</script>

<style>
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>

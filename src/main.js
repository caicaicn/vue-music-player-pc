// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import 'mint-ui/lib/style.css';
Vue.config.productionTip = false;
import '@/assets/css/index.less';
import store from './store';
import lazyLoad from './assets/js/lazyload';
Vue.use(lazyLoad)
require("./permission");
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

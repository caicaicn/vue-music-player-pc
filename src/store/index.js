import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import state from './state';
import mutations from './mutation';
import actions from './action';
import getters from './getter';

let store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store;
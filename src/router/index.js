import Vue from 'vue';
import Router from 'vue-router';

// 首页
const Index = resolve => {
    require.ensure(['@/page/index'], () => {
        resolve(require('@/page/index'));
    })
}

const Login = resolve => {
    require.ensure(['@/page/login'], () => {
        resolve(require('@/page/login'));
    })
}

// 推荐
const Recommend = resolve => {
    require.ensure(['@/page/recommend'], () => {
        resolve(require('@/page/recommend'));
    })
}

// 正在播放列表
const CurrentPlay = resolve => {
    require.ensure(['@/page/currentPlay'], () => {
        resolve(require('@/page/currentPlay'));
    })
}

// 歌单
const Songsheet = resolve => {
    require.ensure(['@/page/songsheet'], () => {
        resolve(require('@/page/songsheet'));
    })
}

// 歌单
const Search = resolve => {
    require.ensure(['@/page/search'], () => {
        resolve(require('@/page/search'));
    })
}

// 我的歌单
const Ownlist = resolve => {
    require.ensure(['@/page/ownlist'], () => {
        resolve(require('@/page/ownlist'));
    })
}

// 历史列表
const HistoryPlay = resolve => {
    require.ensure(['@/page/historyPlay'], () => {
        resolve(require('@/page/historyPlay'));
    })
}

// 电台
const Transceiver = resolve => {
    require.ensure(['@/page/transceiver'], () => {
        resolve(require('@/page/transceiver'));
    })
}

// 电台节目
const TransceiverParams = resolve => {
    require.ensure(['@/page/transceiverparams'], () => {
        resolve(require('@/page/transceiverparams'));
    })
}

Vue.use(Router);


let routes = [
    {
        path: '/',
        redirect: '/music',
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/music',
        component: Index,
        redirect: '/music/recommend',
        children: [
            // 推荐
            {
                path: '/music/recommend',
                name: 'recommend',
                component: Recommend,
            },
            // 当前正在播放
            {
                path: '/music/currentPlay',
                name: 'currentPlay',
                component: CurrentPlay,
            },
            // 歌单 
            {
                path: '/music/songsheet',
                name: 'songsheet',
                component: Songsheet,
            },
            // 搜索 
            {
                path: '/music/search',
                name: 'search',
                component: Search,
            },
            // 我的歌单 
            {
                path: '/music/ownlist',
                name: 'ownlist',
                component: Ownlist,
            },
            // 历史播放记录
            {
                path: '/music/historyPlay',
                name: 'historyPlay',
                component: HistoryPlay,
            },
            // 电台
            {
                path: '/music/transceiver',
                name: 'transceiver',
                component: Transceiver,
            },
            // 电台节目
            {
                path: '/music/transceiverParams/:id',
                name: 'transceiverParams',
                component: TransceiverParams,
            },
        ]
    },
    {
        path: '*',
        redirect: '/music',
    },

]

let router = new Router({
    mode: 'history',
    routes
})

export default router;

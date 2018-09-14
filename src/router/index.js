import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import musichall from '@/components/page/musicHall/musichall'
import mine from '@/components/page/mine/mine'
import songlist from '@/components/page/mine/songlist'
import find from '@/components/page/find/find'
import seekmusic from '@/components/page/seek/seekmusic'
import musicsort from '@/components/page/musicsort/musicsort'
import musiclist from '@/components/page/musicsort/musiclist'
import daymusiclist from '@/components/page/musicsort/daymusiclist'
import logintype from '@/components/page/login/logintype'
import login from '@/components/page/login/login'
import setlogin from '@/components/page/login/setlogin'
import singer from '@/components/page/singer/singer'
import playmusic from '@/components/play/playmusic'

export default new Router({
    routes: [
        { path: '/', component: musichall },
        { path: '/musichall', component: musichall, },
        { path: '/find', component: find },
        { path: '/mine', component: mine },
        { path: '/songlist', component: songlist },
        { path: '/playmusic', component: playmusic },
        {
            path: '/seekmusic',
            component: seekmusic,
            children: [
                { path: ':id', component: singer }
            ]
        },
        { path: '/musiclist', component: musiclist },
        { path: '/daymusiclist', component: daymusiclist },
        { path: '/logintype', component: logintype },
        { path: '/login', component: login },
        { path: '/setlogin', component: setlogin },
        { path: '/:id', component: musicsort },
    ]
})
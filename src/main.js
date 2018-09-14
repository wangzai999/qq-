// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/icon/iconfont.css'

//引入store文件夹
import store from './store'

//引入mint-ui的部分组件
import { Swipe, SwipeItem, Switch, Range, MessageBox, Popup } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Switch.name, Switch);
Vue.component(Range.name, Range);
Vue.component(Popup.name, Popup);
Vue.prototype.$Msg = MessageBox
    //引入样式
import 'mint-ui/lib/style.css'

//引入axios
import axios from 'axios'
Vue.prototype.$http = axios


//设置一个导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/' || to.path === '/find' || to.path === '/mine' || to.path === '/musichall') {
        store.state.headshow = true;
        store.state.footshow = true;
        store.state.seekno = false;
        if(to.path === '/' || to.path === '/musichall'){
            store.state.nav = 2
        }else if(to.path === '/mine'){
            store.state.nav = 1
        }else if(to.path === '/find'){
            store.state.nav = 3
        }
    } else if (to.path === '/playmusic' || to.path === '/logintype' || to.path === '/setlogin') {
        store.state.headshow = false
        store.state.footshow = false
    }
    next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
    el: '#app',
    data: {
        newtime: 0,
        sumtime: 0,
    },
    router,
    store,
    template: '<App/>',
    components: { App },
    // watch: {
    //     newtime: (val) => {
    //         store.state.newtime = val
    //     },
    //     sumtime: (val) => {
    //         store.state.sumtime = val
    //     }
    // }
})

//初始化设置html的font-size
var W = document.documentElement.clientWidth / 320 * 12
document.querySelector('html').style.fontSize = W + 'px'
    //监听浏览器窗口变化
window.onresize = function() {
    var W = document.documentElement.clientWidth / 320 * 12
    document.querySelector('html').style.fontSize = W + 'px'
}

// //获取audio的播放位置的变化
// var audio = document.querySelector('audio')
// console.log(audio)
// audio.ontimeupdate = function() {
//         vm.newtime = parseInt(audio.currentTime)
//         console.log(vm.newtime)
//     }
//     //获取audio的播放总时长的变化
// audio.ondurationchange = function() {
//         vm.sumtime = audio.duration
//         console.log(vm.sumtime)
// }
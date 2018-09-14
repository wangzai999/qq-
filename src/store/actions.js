import api from '@/api'
import http from 'axios'
import jsonp from 'jsonp'
import {MessageBox} from 'mint-ui'
import router from '@/router'
export default ({
    // 得到分类列表
    getmusiclist(store, num) {
        var obj = {}
        store.commit('EMPTY')
        var classify = [1, 21, 22, 11, 23, 24, 2, 12, 16, 25, 7, 8, 18, 20]
        for (var i = 0; i < classify.length; i++) {
            jsonp(api.musiclist(classify[i]), (err, data) => {
                if (err) {
                    console.error(err)
                } else {
                    store.commit('GET_MUSIC', data)
                }
            })
        }
    },
    //得到每日推荐
    getmusicdays(store) {
        jsonp(api.musicdays(), (err, data) => {
            if (err) {
                console.error(err)
            } else {
                store.commit('GET_MUSICDAYS', data.result.list)
            }
        })
    },
    //播放音乐
    playmusic(store, id) {
        //同步歌词
        jsonp(api.playlrc(id), (err, data) => {
            if (err) {
                console.error(err)
            } else {
                store.commit('PLAY_LRC', data)
            }
        })
        //获取音乐
        jsonp(api.palymusic(id), (err, data) => {
                if (err) {
                    console.error(err)
                } else {
                    //将歌曲添加到播放列表playlist
                    store.commit("ADD_PLAYLIST", data.songinfo)
                    //播放歌曲
                    store.commit('PLAY_MUSIC', data)
                }
            })
    },
    //通过关键字搜索时时的歌曲变化
    startseek(store, name) {
        jsonp(api.seekmusic(name), (err, data) => {
            if (err) {
                console.error(err)
            } else {
                store.commit('START_SEEK', data)
            }
        })
    },
    //确认搜索后的内容
    startseeks(store, name) {
        jsonp(api.seekmusic(name), (err, data) => {
            if (err) {
                console.error(err)
            } else {
                store.commit('START_SEEKS', data)
            }
        })
    },
    //获取歌手的信息
    getsinger(store, id) {
        jsonp(api.getsinger(name), (err, data) => {
            if (err) {
                console.error(err)
            } else {
                store.commit('GET_SINGER', data)
            }
        })
    },
    //获取歌手的音乐
    getsingermusic(store, id) {
        jsonp(api.getsingermusic(name), (err, data) => {
            if (err) {
                console.error(err)
            } else {
                store.commit('GET_SINGERMUSIC', data)
            }
        })
    },
    //获取已登录的用户
    getuser(store){
        http.get(api.localhost()+'user')
        .then(res=>{
            store.commit('GET_USER',res.data)
            store.dispatch("getusermusiclist",res.data[0])        
        })
    },
    //获取默认登录用户的列表
    getuserlist(store){
        http.get(api.localhost()+'userlist')
        .then(res=>{
            store.commit('GET_USERLIST',res.data)
            
        })
    },
    //获取用户的音乐列表
    getusermusiclist(store){
        if(store.state.user[0]){
            http.get(api.localhost()+'musiclist/'+store.state.user[0].qqid)
            .then(res=>{
                store.commit('GET_USERMUSICLIST',res.data)
            })
        }
    },
    //切换用户
    setuser(store,item){
        http.get(api.localhost()+'user')
        .then(res=>{
            item.id = 1
            http.post(api.localhost()+'user',item)
            store.dispatch('getuser')
            store.dispatch('getusermusiclist',item)
            router.push('/mine') 
        })
    },
    //验证是否QQ和密码是否正确
    login(store,obj) {
        console.log(store)
        var success = false
        http.get(api.localhost()+'alluser')
        .then(res=>{
            for(var i=0; i<res.data.length; i++){
                if(obj.name === res.data[i].qq+''){
                    if(obj.pwd === res.data[i].pwd+''){
                        console.log('登录成功')
                        success = true
                        //将账号添加进userlist                  
                        http.post(api.localhost()+'userlist',res.data[i])
                        store.dispatch('getuserlist')
                        //添加登录用户
                        http.post(api.localhost()+'user',res.data[i])
                            .then(res=>{
                                store.dispatch('getuser')
                            })
                        //添加用户的音乐列表
                        var musiclist = {id : res.data[i].qqid, list:['默认歌单'], '默认歌单': []}
                        http.post(api.localhost()+'musiclist',musiclist)
                        .then(res=>{
                            store.dispatch('getusermusiclist',res.data[i])
                        })
                        router.push('/mine')                       
                    }
                }
            }
            if(!success){
                MessageBox('提示','账号密码错误，请重新输入')
            }
        })
       
    },
    //退出登录账号
    exituser(store,obj) {
        http.delete(api.localhost()+'user/1')
        .then(res=>{
            store.dispatch('getuser')
        })
        router.push('/mine')
    },
    //点击添加音乐进默认歌单
    addmusic(store,name){
        var item = store.state.operatemusic
        if(store.state.user[0]){
            if(store.state.usermusiclist[name].length >0){
                for(var i=0; i<store.state.usermusiclist[name].length; i++){
                    if(store.state.usermusiclist[name][i] === item){
                        break
                    }else if(i === store.state.usermusiclist[name].length-1){
                        store.state.usermusiclist[name].push(item)
                        var all =  store.state.usermusiclist
                        console.log(all)
                       http.put(api.localhost()+'musiclist/'+store.state.user[0].qqid,all)
                       .then(res=>{
                           MessageBox('提示','添加成功')
                           store.dispatch('getusermusiclist')
                       })
                    }
                }
            }else{
                store.state.usermusiclist[name].push(item)
                var all =  store.state.usermusiclist
                console.log(all)
               http.put(api.localhost()+'musiclist/'+store.state.user[0].qqid,all)
               .then(res=>{
                   MessageBox('提示','添加成功')
                   store.dispatch('getusermusiclist')
               })
            }
        }
    },
    //移除播放列表的item音乐
    removemusic(store,item){
        var playlist = store.state.playlist
        var index = playlist.indexOf(item,0)
        playlist.splice(index,1)
        store.commit('SET_PLAYLIST',playlist)
        if(index <= playlist.length-1){
            store.dispatch('playmusic',playlist[index].song_id)
        }else {
            store.dispatch('playmusic',playlist[index-1].song_id)
        }

    }
})
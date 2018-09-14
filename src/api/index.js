export default ({
    host: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
    //获取歌单列表
    //参数：type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
    musiclist(num) {
        return `http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=${num}&size=50&offset=0`
    },
    // 搜索
    // 参数：query = '' //搜索关键字
    seekmusic(name) {
        return this.host + '?method=baidu.ting.search.catalogSug&query=' + name
    },
    //播放
    // 参数：songid = 877578 //歌曲id
    palymusic(id) {
        return this.host + '?method=baidu.ting.song.play&songid=' + id
    },
    //歌词
    playlrc(id) {
        return this.host + '?method=baidu.ting.song.lry&songid=' + id
    },
    //每日推荐
    musicdays() {
        return this.host + '?method=baidu.ting.song.getRecommandSongList&song_id=877578&num=30'
    },
    //根据id获取歌手信息
    getsinger(id) {
        return this.host + '?method=baidu.ting.artist.getInfo&tinguid=' + id
    },
    //根据歌手id获取歌手的音乐列表
    getsingermusic(id) {
        return this.host + '?method=baidu.ting.artist.getSongList&tinguid=' + id + '&limits=50&use_cluster=1&order=2'
    },
    //本地后台数据
    localhost() {
        return 'http://localhost:8082/'
    }
})
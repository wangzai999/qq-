export default ({
    //菜单
    nav : 2,
    //侧栏显示
    install: false,
    //显示head组件
    headshow: true,
    //显示foot组件
    footshow: true,
    //audio节点的dom
    music: '',
    //现在播放到的时间
    newtime: 0,
    //歌曲的总时间
    sumtime: 0,
    //是否暂停播放
    play_no: true,
    //音乐分类列表
    musiclist: [],
    //每日推荐的音乐
    musicdays: [],
    //播放的音乐
    playmusic: {},
    //播放的歌词
    playlrc: {},
    //歌词的top值
    t: 12,
    //播放歌曲的列表
    playlist: [],
    //这在播放歌曲在播放列表的id
    playid: 0,
    //是否在搜索页
    seekno: false,
    //搜索到的歌曲
    seekmusiclist: [],
    //确认搜索后的内容
    allseek: {},
    //要搜索的内容
    seek: '',
    //搜索页的搜索完成页面显示
    seekallshow: false,
    //歌手信息
    singer: {},
    //歌手的音乐列表
    singermusic: [],
    //播放列表
    popupVisible: false,
    //用户信息
    user : {},
    //默认登录用户列表
    userlist : [],
    //用户的音乐列表
    usermusiclist: {},
    //歌曲操作列表的显示与隐藏
    showoperate: false,
    //要操作的歌曲
    operatemusic: {},
    //旋转的角度
    rotate: 0
})
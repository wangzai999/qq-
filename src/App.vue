<template>
  <div id="app">
    <div @click="changeinstalls">
      <heads v-show="headshow"/>
      <router-view></router-view>
      <foot v-show="footshow" />
    </div>
    <!-- 左侧弹出 -->
    <mt-popup position="left" v-model="install" class="install">{{installs}}
      <div class="install">
        <div>
          <div class="install_top">
            <div>
              <i class="iconfont icon-VIP"></i>
              <p>VIP中心</p>
              <p>豪华绿钻即将到期</p>
            </div>
            <div>
              <i class="iconfont icon-gexingzhuti"></i>
              <p>个性化中心</p>
              <p>默认主题</p>
            </div>
            <div>
              <i class="iconfont icon-xiaoxi"></i>
              <p>消息中心</p>
              <p></p>
            </div>
          </div>
          <div class="install_content">
            <ul>
              <li>仅wifi下联网 <mt-switch class="on_off"></mt-switch></li>
              <li>定时关闭 <mt-switch class="on_off"></mt-switch></li>
              <li>免流量服务</li>
              <li>听歌偏好</li>
              <li>微云音乐网盘</li>
              <li>传歌到手机</li>
              <li>清理占用空间</li>
              <li>免费wifi</li>
              <li>帮助与反馈</li>
              <li>关于qq音乐</li>
            </ul>
          </div>
          <div class="install_foot">
            <span><i class="iconfont icon-shezhi"></i>设置</span>
            <p @click="exit"><span><i class="iconfont icon-fanhui"></i>退出登陆/关闭</span></p> 
          </div>
        </div>
      </div>
    </mt-popup>
    <!-- 弹出退出菜单 -->
    <mt-popup position="bottom" v-model="exitall" class="exitall">
        <div>
          <ul>
            <li @click="open">
              <i class="glyphicon glyphicon-off"></i>
              <div>
                <p>关闭QQ音乐</p>
                <p>关闭后，QQ音乐将会停止本次运行</p>
              </div>
            </li>
            <li @click="exituser" v-show="user">
              <i class="glyphicon glyphicon-user"></i>
              <div>
                <p>退出QQ账号</p>
                <p>推出后，QQ音乐将会保留改账号的历史数据</p>
              </div>
            </li>
          </ul>
          <p>取消</p>
        </div>
    </mt-popup>
    <!-- 播放列表下部弹出 -->
    <mt-popup position="bottom" v-model="popupVisible" class="allpopupVisible">{{popupVisibles}}
      <div class="popupVisible">
        <div>
          <mt-swipe :auto="0">
                  <mt-swipe-item>
                    <div class="list_1">
                      <div><i class="iconfont icon-bokongtailubozhuanzhibo202"></i>顺序播放<span>（{{playlist.length}}首）</span><p><i class="iconfont icon-xiazai"></i><i class="iconfont icon-plus"></i><i class="iconfont icon-shanchu"></i></p></div>
                      <ul>
                        <li v-for="(item,index) in playlist" :key="item.id" @click="playmusics(item)">
                          {{item.title}}<span>SQ</span>-  {{item.author}}<p><i class="iconfont icon-woxihuande"></i><i class="iconfont icon-guanbi" @click.stop="removemusic(item)"></i></p>
                        </li>
                        <p><i class="iconfont icon-plus"></i>添加音乐到队列</p>
                      </ul>
                    </div>
                  </mt-swipe-item>
                  <mt-swipe-item>
                    <div class="list_1">
                      <div><b></b>每日为你推荐·30首</div>
                      <ul>
                        <li v-for="(item,index) in musicdays" :key="item.id" @click="playmusics(item)">
                          {{item.title}}<span>SQ</span>-  {{item.author}}
                        </li>
                      </ul>
                    </div>
                  </mt-swipe-item>
          </mt-swipe>
        </div>
        <p @click="popupVisible = false">关闭</p>
      </div>
    </mt-popup>
    <!-- 歌曲的操作下部弹出 -->
    <mt-popup position="bottom" v-model="operate" class="operate">{{operateshow}}
        <div>
          <div>
            <p>{{operatemusic.title}}</p>
            <p>{{operatemusic.author}}</p>
          </div>
          <div>
            <ul class="clearfd">
              <li @click="nextplay"><i class="iconfont icon-xiayishoubofang32"></i>下一首播放</li>
              <li @click="showselect"><i class="iconfont icon-jia"></i>加到歌单</li>
              <li><i class="iconfont icon-xiazai"></i>下载</li>
              <li><i class="iconfont icon-fenxiang"></i>分享</li>
              <li><i class="iconfont icon-shanchu"></i>删除</li>
              <li><i class="iconfont icon-pinglun"></i>评论</li>
              <li><i class="iconfont icon-ziyuan"></i>相似歌曲</li>
              <li><i class="iconfont icon-geshou"></i>查看歌手</li>
              <li><i class="iconfont icon-zhuanji"></i>查看专辑</li>
              <li><i class="iconfont icon-haibao"></i>歌词海报</li>
              <li><i class="iconfont icon-xiuchang"></i>设置铃声</li>
              <li><i class="iconfont icon-weibiaoti-"></i>背景音乐</li>
            </ul>
          </div>
          <p @click="operate=false">取消</p>
        </div>
    </mt-popup>
    <!-- 选择添加到的歌单 -->
     <mt-popup position="bottom" v-model="selectsonglist" class="selectsonglist">
        <div>
          <div>已选定一首添加到<span @click="selectsonglist = false">取消</span></div>
          <ul>
            <li>
              <img src="" alt="">
              <div>
                <p>新建歌单</p>
              </div>
            </li>
            <li>
              <img src="" alt="">
              <div>
                <p>我喜欢</p>
                <p>0首</p>
              </div>
            </li>
            <li v-for="(item,index) in usermusiclist.list" :key="index" @click="addmusic(item)">
              <img :src="usermusiclist[item][0].pic_big || ''" alt="">
              <div>
                <p>{{item}}</p>
                <p>{{usermusiclist[item].length}}首</p>
              </div>
            </li>
          </ul>
        </div>
    </mt-popup>
    <audio :src=" playmusic.bitrate!=undefined ? playmusic.bitrate.file_link :'http://yinyueshiting.baidu.com/data2/music/f7b6dc2a5395385743bb4b4685818bf2/308405583/308405583.mp3?xcode=f51b4a75a392908dc9bf3d409e407d1c'" :ref="'music'" @ended="playend" @timeupdate="setnewtime" @durationchange="setsumtime"></audio>
  </div>
</template>

<script>
import heads from "./components/head/head";
import foot from "./components/foot/foot";
export default {
  mounted() {
    //得到所有音乐分类
    this.$store.dispatch("getmusiclist", 1);
    //获取每日推荐歌曲
    this.$store.dispatch("getmusicdays");
    //获取音乐播放节点
    this.$store.state.music = this.$refs["music"];
    //开始播放第一首歌
    this.$store.dispatch("playmusic", 74235472);
    //获取默认登录用户列表
    this.$store.dispatch("getuserlist");
    //获取登录用户
    this.$store.dispatch("getuser");
  },
  name: "app",
  data() {
    return {
      newtime: 0,
      sumtime: 0,
      actions: ["sgre", "asf"],
      popupVisible: false,
      install: false,
      exitall: false,
      operate: false,
      selectsonglist: false
    };
  },
  computed: {
    //判断是否显示左侧菜单
    installs() {
      const a = this.$store.state.install;
      if (!this.install) {
        this.$store.state.install = this.install;
      }
      if (a) {
        this.install = a;
      }
      return "";
    },
    //判断是否显示head
    headshow() {
      return this.$store.state.headshow;
    },
    //判断是否显示foot
    footshow() {
      return this.$store.state.footshow;
    },
    //返回playmusic
    playmusic() {
      return this.$store.state.playmusic;
    },
    //判断是否显示播放列表页
    popupVisibles() {
      const a = this.$store.state.popupVisible;
      if (!this.popupVisible) {
        this.$store.state.popupVisible = this.popupVisible;
      }
      if (a) {
        this.popupVisible = a;
      }
      return "";
    },
    //播放音乐列表
    playlist() {
      return this.$store.state.playlist;
    },
    //每日推荐的歌曲
    musicdays() {
      return this.$store.state.musicdays;
    },
    //判断是否已近登录
    user() {
      return this.$store.state.user.length > 0;
    },
    //判断是否显示操作歌曲菜单
    operateshow() {
      const a = this.$store.state.showoperate;
      if (!this.operate) {
        this.$store.state.showoperate = this.operate;
      }
      if (a) {
        this.operate = a;
      }
      return "";
    },
    //用户音乐列表
    usermusiclist() {
      return this.$store.state.usermusiclist;
    },
    //要操作的音乐
    operatemusic() {
      return this.$store.state.operatemusic
    }
  },
  methods: {
    //获取音乐播放的实时时间
    setnewtime(event) {
      
      this.$store.state.newtime = parseInt(event.target.currentTime)
      this.$store.state.rotate = Number(event.target.currentTime)*10
      if(event.target.currentTime === 0){
        this.$store.state.t = 12
      }
    },
    //获取音乐的总时间
    setsumtime(event) {
      this.$store.state.sumtime = event.target.duration
    },
    changeinstalls() {
      this.$store.state.install = false;
    },
    //播放完成调用
    playend() {
      var list = this.$store.state.playlist;
      if (this.$store.state.playid == list.length - 1) {
        this.$store.dispatch("playmusic", list[0].song_id);
      } else {
        this.$store.state.playid += 1;
        this.$store.dispatch(
          "playmusic",
          list[this.$store.state.playid].song_id
        );
      }
    },
    exit() {
      this.exitall = true;
    },
    //退出播放器
    open() {
      window.close();
    },
    //退出登录
    exituser() {
      this.$store.dispatch("exituser");
      this.exitall = false;
      this.install = false;
    },
    //播放音乐
    playmusics(item) {
      //切换音乐
      this.$store.dispatch("playmusic", Number(item.song_id));
    },
    // 点击显示选择歌单页
    showselect() {
      this.operate = false;
      this.selectsonglist = true;
    },
    //加入默认歌单
    addmusic(name) {
      this.$store.dispatch("addmusic",name);
    },
    //下一首播放
    nextplay() {
      this.$store.commit('ADD_PLAYLIST',this.$store.state.operatemusic)
      this.operate = false;
    },
    //移除播放列表音乐
    removemusic(item) {
      this.$store.dispatch('removemusic',item)
    },
  },
  components: {
    foot,
    heads
  }
};
</script>

<style lang="less">
@bgcolor : #31c27c;
@bianbg : #2caf70;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
li {
  list-style-type: none;
}
img {
  outline: none;
}
.clearfd::after {
  content: "";
  display: block;
  clear: both;
}
html,
body {
  width: 100%;
  height: 100%;
  i{
    display: inline-block;
  }
}
#app {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.install {
  position: absolute;
  left: 0;
  width: 22rem;
  height: 100%;
  background-color: white;
  overflow: hidden;
  transition: width 0.2s;
  padding: 0;
  .install_top {
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ccc;
    div {
      width: 33%;
      i {
        width: 100%;
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: center;
        font-size: 2rem;
        color: #31c27c;
      }
      p {
        text-align: center;
      }
      p:last-child {
        font-size: 0.7rem;
        color: #ccc;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .install_content {
    height: 36rem;
    width: 100%;
    ul {
      height: 100%;
      overflow: scroll;
      width: 100%;
      padding-bottom: 5rem;
      padding-left: 2rem;
      li {
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        font-size: 1rem;
        position: relative;
        .on_off {
          position: absolute;
          right: 1rem;
          top: 1.5rem;
        }
        .mint-switch {
          .mint-switch-core {
            background-color: white;
            width: 3rem;
            height: 1rem;
          }
          .mint-switch-core::before {
            width: 3rem;
            height: 1rem;
            background-color: #999;
          }
          .mint-switch-core::after {
            width: 1.5rem;
            height: 1.5rem;
            top: -0.25rem;
          }
        }
      }
    }
  }
  .install_foot {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    display: flex;
    flex-direction: row;
    border-top: 1px solid #ccc;
    > span {
      width: 30%;
      text-align: center;
      i {
        color: @bgcolor;
      }
    }
    p {
      width: 70%;
      text-align: right;
      padding-right: 1rem;
      margin: 0;
      span {
        height: 100%;
        display: inline-block;
        i {
          color: @bgcolor;
        }
      }
    }
  }
}
.width {
  width: 86%;
  padding: 0 1rem;
}
.listrank {
  width: 100%;
  li {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 6rem;
    margin-bottom: 0.5rem;
    img {
      display: inline-block;
      width: 20%;
      height: 100%;
      background-color: #0ff;
    }
    div {
      width: 67%;
      margin-left: 3%;
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 2rem;
        line-height: 2rem;
        margin-bottom: 0;
      }
      p:first-child {
        font-size: 1.2rem;
        font-weight: bold;
        margin-top: 1rem;
        span {
          font-size: 0.8px;
          font-weight: normal;
          border: 1px solid #0f0;
          border-radius: 3px;
          color: #0f0;
          margin-right: 0.5rem;
          padding: 0 2px;
        }
        span:first-child {
          margin-left: 1rem;
          border-color: orange;
          color: orange;
        }
      }
    }
    i {
      line-height: 6rem;
      width: 10%;
    }
  }
}
.musicsort_head {
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  background-color: #31c27c;
  position: relative;
  color: white;
  font-size: 1.2rem;
  i {
    width: 4rem;
    height: 4rem;
    font-size: 1.3rem;
    line-height: 4rem;
    top: 0;
    position: absolute;
  }
  i:first-child {
    left: 0;
  }
  i:last-child {
    right: 0;
  }
}
#musicsort {
  position: absolute;
  top: 0;
  width: 100%;
  height: 43.5rem;
  overflow: hidden;

  .musicsort_content {
    height: 39.5rem;
    overflow: scroll;
    background-color: white;
    img {
      display: inline-block;
      width: 100%;
      height: 15rem;
      background-color: red;
    }
    .musicsort_smollhead {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 4rem;
      border-bottom: 1px solid #ccc;
      i {
        color: #31c27c;
      }
      > i {
        width: 4rem;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        font-size: 1.3rem;
      }
      p {
        width: 10rem;
        height: 4rem;
        line-height: 4rem;
        color: #000;
        margin: 0;
        span {
          font-size: 0.8rem;
          color: #888;
          margin-left: 1rem;
        }
      }
      > span {
        width: 6rem;
        text-align: center;
        height: 4rem;
        line-height: 4rem;
        i {
          width: 3rem;
          font-size: 1.5rem;
        }
      }
    }
    ul {
      padding-left: 1rem;
      li {
        border-bottom: 1px solid #ccc;
        div {
          width: 85%;
        }
        i {
          text-align: center;
          color: #888;
        }
      }
    }
  }
}
.allpopupVisible {
  width: 100%;
  opacity: 0.85;
}
.popupVisible {
  width: 100%;
  height: 30rem;
  background-color: #000;
  color: white;
  > div {
    width: 100%;
    height: 27rem;
  }
  p {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    color: white;
  }
  .list_1 {
    div {
      height: 4rem;
      line-height: 4rem;
      border-bottom: 1px solid #ffe;
      display: flex;
      flex-direction: row;
      position: relative;
      i {
        width: 4rem;
        line-height: 4rem;
        font-size: 1.2rem;
        text-align: center;
      }
      p {
        text-align: right;
        width: 12rem;
        margin: 0;
        position: absolute;
        right: 0;
      }
      b {
        display: inline-block;
        width: 1.5rem;
      }
    }
    ul {
      margin: 0;
      height: 22rem;
      overflow: scroll;
      li {
        padding-left: 1.5rem;
        height: 4rem;
        line-height: 4rem;
        border-bottom: 1px solid #222;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
          height: 1.2rem;
          line-height: 1.2rem;
          width: 2.3rem;
          text-align: center;
          border-radius: 5px;
          border: 1px solid yellow;
          color: yellow;
          margin: 0 0.5rem;
        }
        p {
          float: right;
          margin: 0;
          i {
            height: 4rem;
            line-height: 4rem;
            font-size: 1.2rem;
            margin-right: 2rem;
          }
        }
      }
      p {
        height: 4rem;
        line-height: 4rem;
      }
    }
  }
}
.colorgreen {
  color: green;
}
.exitall {
  width: 100%;
  > div {
    ul {
      li {
        border-bottom: 1px solid #999;
        height: 4rem;
        display: flex;
        flex-direction: row;
        margin: 0;
        i {
          width: 4rem;
          height: 4rem;
          line-height: 4rem;
          text-align: center;
          font-size: 1.5rem;
        }
        div {
          p {
            margin: 0;
          }
          p:first-child {
            font-size: 1.1rem;
            margin-top: 0.5rem;
          }
          p:last-child {
            font-size: 0.9rem;
            margin-top: 0.2rem;
          }
        }
      }
    }
    > p {
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      margin: 0;
    }
  }
}
.operate {
  width: 100%;
  background-color: #efefef;
  > div {
    div:first-child {
      height: 4rem;
      border-bottom: 1px solid #ccc;
      padding-left: 1.5rem;
      p {
        margin: 0;
      }
      p:first-child {
        height: 2rem;
        line-height: 2rem;
        color: #000;
      }
      p:last-child {
        font-size: 0.8rem;
        color: #888;
        height: 2rem;
        line-height: 2rem;
      }
    }
    div:nth-child(2) {
      width: 100%;
      padding-top: 1rem;
      overflow: scroll;
      ul {
        width: 190%;
        padding-left: 1rem;
        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 7rem;
          height: 8rem;
          float: left;
          text-align: center;
          i {
            width: 4rem;
            height: 3.5rem;
            line-height: 3.5rem;
            font-size: 2rem;
            background-color: #fff;
            border-radius: 6px;
            margin: 0 auto;
            margin-bottom: 1rem;
          }
        }
      }
    }
    > p {
      border-top: 1px solid #ccc;
      text-align: center;
      height: 4rem;
      line-height: 4rem;
      margin: 0;
      font-size: 1.2rem;
      color: #000;
    }
  }
}
.selectsonglist {
  width: 100%;
  height: 100%;
  > div {
    > div {
      height: 4rem;
      line-height: 4rem;
      background-color: #31c27c;
      text-align: center;
      position: relative;
      color: white;
      font-size: 1.2rem;
      span {
        position: absolute;
        width: 6rem;
        height: 4rem;
        right: 0;
        font-size: 1rem;
      }
    }
    ul {
      li:first-child {
        div {
          p:first-child {
            height: 4rem;
            line-height: 4rem;
            font-size: 1rem;
            color: #000;
          }
        }
      }
      li {
        display: flex;
        flex-direction: row;
        height: 4rem;
        margin-bottom: 0.2rem;
        img {
          width: 4rem;
          height: 4rem;
          background-color: #0ff;
        }
        div {
          margin-left: 1rem;
          width: 22rem;
          border-bottom: 1px solid #ccc;
          p {
            margin: 0;
          }
          p:first-child {
            height: 2rem;
            line-height: 2rem;
          }
          p:last-child {
            font-size: 0.8rem;
            color: #666;
          }
        }
      }
    }
  }
}
</style>

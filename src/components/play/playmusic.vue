<template>
  <div id="playmusic">
    <img :src="playmusic.pic_big" alt="">
      <div>
        <div class="playmusic_head">
            <i class="iconfont icon-down2" @click="goindex"></i>
            {{playmusic.title}}
            <i class="iconfont icon-sandian" @click="showoperate(playmusic)"></i>
        </div>
        <div class="playmusic_rotate">
            <mt-swipe :auto="0" class="nomove" :defaultIndex='1'>
                <mt-swipe-item class="nomove_1">1</mt-swipe-item>
                <mt-swipe-item class="nomove_2">
                    <h4>——<span>{{playmusic.author}}</span>——</h4>
                    <p><span>MV</span><b></b><span>音效</span></p>
                    <div>
                      <img :src="playmusic.pic_big" alt="" :style="{transform: 'rotate('+rotate+'deg)'}">
                    </div>
                    <p>{{lrc}}{{playlrc}}</p>
                </mt-swipe-item>
                <mt-swipe-item class="nomove_3">
                  <ul>
                    <div :style="{top:t+'rem'}">
                      <p v-for="(item,index) in getalllrc" :key="index" v-show="item[1]!=''" :class="{green:getalllrctime===item[0]}">{{item[1]}}</p>
                    </div>
                  </ul>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="playmusic_click">
          <mt-range class="play_bar" v-model="newtimes" :bar-height='3' :max="sumtimes" :min="0">
            <div slot="start" class="showtime">{{newtime}}</div>
            <div slot="end" class="showtime">{{sumtime}}</div>
          </mt-range>
          <p><i class="iconfont icon-bokongtailubozhuanzhibo202"></i><i class="iconfont icon-shangyiqu" @click="playbefore"></i><i @click="play" :class="{'iconfont icon-zanting' : !play_no,'iconfont icon-bofang':play_no}"></i><i class="iconfont icon-nextc" @click="playafter"></i><i class="iconfont icon-yinleliebiao" @click="popupVisible"></i></p>
          <p><span class="iconfont icon-woxihuande"></span><span class="iconfont icon-xiazai"></span><span class="iconfont icon-iconfontfenxiang"></span><span class="iconfont icon-pinglun"></span></p>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newtimes: 0,
      lrc: ""
    };
  },
  methods: {
    goindex() {
      this.$router.push("/");
    },
    play() {
      if (this.$store.state.music.paused) {
        this.$store.state.music.play();
        this.$store.state.play_no = false;
      } else {
        this.$store.state.music.pause();
        this.$store.state.play_no = true;
      }
    },
    //根据秒数生成时间函数
    timejudge(sumtime) {
      var fen = parseInt(sumtime / 60);
      var miao = sumtime % 60;
      if (fen < 10) {
        if (miao < 10) {
          return "0" + fen + "：0" + miao;
        } else {
          return "0" + fen + "：" + miao;
        }
      } else {
        if (miao < 10) {
          return fen + "：0" + miao;
        } else {
          return "" + fen + "：" + miao;
        }
      }
    },
    //上一曲
    playbefore() {
      var list = this.$store.state.playlist;
      if (this.$store.state.playid == 0) {
        this.$store.dispatch("playmusic", list[0].song_id);
      } else {
        this.$store.state.playid  -= 1
        this.$store.dispatch("playmusic", list[this.$store.state.playid].song_id);
      }
    },
    //下一曲
    playafter() {
      var list = this.$store.state.playlist;
      if (this.$store.state.playid == list.length-1) {
        this.$store.dispatch("playmusic", list[0].song_id);
      } else {
        this.$store.state.playid += 1;
        this.$store.dispatch("playmusic", list[this.$store.state.playid].song_id);
      }
    },
     //点击显示菜单页
    popupVisible(){
      this.$store.state.popupVisible =true
    },
    //操作音乐页面
    showoperate(item) {
      this.$store.state.operatemusic = item;
      this.$store.state.showoperate = true;
    }
  },
  computed: {
    //返回总时间
    sumtime() {
      var sumtime = parseInt(this.$store.state.sumtime);
      return this.timejudge(sumtime);
    },
    //返回当前的时间
    newtime() {
      this.newtimes = this.$store.state.newtime;
      if (this.newtimes === 0) {
        this.$store.state.t = 12;
      }
      var sumtime = parseInt(this.$store.state.newtime);
      return this.timejudge(sumtime);
    },
    //返回总的时间的秒数
    sumtimes() {
      return this.$store.state.sumtime;
    },
    //是否播放
    play_no() {
      return this.$store.state.play_no;
    },
    //播放音乐的信息
    playmusic() {
      return this.$store.state.playmusic.songinfo;
    },
    //播放音乐的歌词信息
    playlrc() {
      var newtime = this.$store.state.newtime;
      var num = 0;
      var lrc = this.$store.state.playlrc;
      if (lrc.lrcContent) {
        if (lrc.lrcContent.length > 1) {
          for (var i = 0; i < lrc.lrcContent.length; i++) {
            if (lrc.lrcContent[i][0] !== NaN) {
              num = lrc.lrcContent[i][0];
              num = parseInt(num / 10000) * 60 + parseInt((num % 10000) / 100);
              if (num === newtime) {
                if (lrc.lrcContent[i][1] != "") {
                  this.$store.state.t -= 4;
                  this.lrc = lrc.lrcContent[i][1];
                }
              }
            }
          }
        } else {
          this.lrc = "歌词未找到";
        }
      } else {
          this.lrc = "歌词未找到";
      }
      return ''
    },
    //返回所有的歌词
    getalllrc() {
      console.log(this.$store.state.playlrc)
      if (this.$store.state.playlrc.lrcContent) {
        return this.$store.state.playlrc.lrcContent;
      }else {
        return [[0,'歌词未找到']]
      }
    },
    //返回歌词现在对应的时间
    getalllrctime() {
       var newtime = this.$store.state.newtime
       var alllrc = this.$store.state.playlrc.lrcContent
       if(alllrc){
         for(var i=alllrc.length-1; i>=0; i--){
           var time = parseInt(alllrc[i][0]/10000)*60+parseInt((alllrc[i][0]%10000)/100)
           if(newtime >= time){
             return alllrc[i][0]
           }
         }
       } else {
         return 0
       }
    },
    //判断播放到那句歌词
    playnew() {
      return this.lrc;
    },
    //返回歌词的top值
    t() {
      return this.$store.state.t;
    },
    //返回旋转的度数
    rotate() {
      return this.$store.state.rotate
    }
  }
};
</script>
<style lang="less">
#playmusic {
  width: 100%;
  height: 47.4rem;
  overflow: hidden;
  position: relative;
  >img{
    position: absolute;
    z-index: -1;
    width:200%;
    left: -25%;
    height: 100%;
    filter: blur(50px)
  }
  > div {
    height: 100%;
    background-repeat: no-repeat;
    background-size:200% 100%;
    .playmusic_head {
      height: 4rem;
      line-height: 4rem;
      text-align: center;
      font-size: 1.2rem;
      color: white;
      position: relative;
      i {
        width: 3rem;
        height: 3rem;
        font-size: 1.5rem;
        position: absolute;
      }
      i:first-child {
        left: 0;
      }
      i:last-child {
        right: 0;
      }
    }
    .playmusic_rotate {
      width: 100%;
      height: 31rem;
      text-align: center;
      .nomove {
        height: 100%;
        .nomove_2 {
          h4 {
            text-align: center;
            color: white;
            span {
              font-size: 1.1rem;
              margin: 0 1rem;
            }
          }
          p {
            text-align: center;
            span {
              display: inline-block;
              width: 3rem;
              border: 1px solid #fff;
              border-radius: 5px;
              color: white;
            }
            b {
              display: inline-block;
              width: 1rem;
            }
          }
          div{
            display: inline-block;
            width: 20rem;
            height: 20rem;
            overflow: hidden;
            position: relative;
            margin-top: 1rem;
            img {
              position: absolute;
              top: 0;
              left: 0;
              border-radius: 50%;
              width: 100%;
              height: 100%;
              transition: 1s;
            }
          }
          p:last-child {
            margin-top: 1.5rem;
            color: #0f0;
          }
        }
        .nomove_3 {
          ul {
            width: 100%;
            height: 80%;
            overflow: scroll;
            color: white;
            padding: 40% 0;
            margin-top: 5%;
            position: relative;
            div {
              position: absolute;
              width: 80%;
              left: 10%;
              p {
                width: 100%;
                height: 4rem;
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
    .playmusic_click {
      p {
        text-align: center;
        margin-top: 0.5rem;
        i {
          color: white;
          vertical-align: top;
          line-height: 4rem;
        }
        i:nth-child(1) {
          width: 4rem;
          height: 4rem;
          font-size: 1.5rem;
        }
        i:nth-child(2) {
          width: 4rem;
          height: 4rem;
          color: #31c27c;
          font-size: 1.5rem;
          margin-left: 1rem;
        }
        i:nth-child(3) {
          width: 6rem;
          height: 4rem;
          font-size: 3rem;
          color: #31c27c;
        }
        i:nth-child(4) {
          width: 4rem;
          height: 4rem;
          color: #31c27c;
          font-size: 1.5rem;
          margin-right: 1rem;
        }
        i:nth-child(5) {
          width: 4rem;
          height: 4rem;
          font-size: 1.5rem;
        }
        span {
          color: #ccc;
          display: inline-block;
          width: 6rem;
          height: 4rem;
          line-height: 4rem;
          font-size: 1.7rem;
        }
      }
    }
  }
}
.mt-range-content {
  margin-left: 1.5rem;
}
.play_bar {
  margin: 0 auto;
}
.mt-range-thumb {
  width: 1rem;
  height: 1rem;
  top: 0.5rem;
  background-color: #31c27c;
}
.mt-range-runway {
  width: 15rem;
}
.mt-range-progress {
  background-color: #31c27c;
}
.showtime {
  width: 4rem;
  color: white;
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
}
.mt-range {
  width: 26rem;
}
.green {
  color: #0f0;
}
</style>

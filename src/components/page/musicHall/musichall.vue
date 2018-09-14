<template>
  <div id="musichall">
      <div class="lun">
          <mt-swipe :auto="5000"> 
            <mt-swipe-item class="a" v-for="(item, index) in imgs" :key="item"><img :src="item" alt=""></mt-swipe-item>
          </mt-swipe>
      </div>
      <div class="musichall_list">
          <ul>
              <li @click="goseek"><i class="iconfont icon-geshou"></i>歌手</li>
              <li @click="showno"><i class="iconfont icon-paixing-copy"></i>排行</li>
              <li @click="showno"><i class="iconfont icon-ziyuan"></i>电台</li>
              <li @click="gomusiclist"><i class="iconfont icon-leimupinleifenleileibie2"></i>分类歌单</li>
              <li @click="showno"><i class="iconfont icon-shipin"></i>视频MV</li>
              <li @click="showno"><i class="iconfont icon-zhuanji"></i>数字专辑</li>
          </ul>
      </div>
      <!-- 列表为3列一行 -->
      <div class="musichall_content">
          <h3 @click="gomusiclist">歌单推荐<i class="iconfont icon-fanhui1"></i></h3>
          <ul class="clearfd">
              <li v-for="(item,index) in getmusiclist" :key="item.id" v-show="index<6" @click="gomusicsort(index)">
                  <img :src="item.billboard.pic_s260" alt="">
                  <p>{{item.billboard.name}}</p>
                  <p><i class="iconfont icon-woxihuande"></i>141万<i class="iconfont icon-bofang"></i></p>
              </li>
          </ul>
      </div>
      <!-- 为列排序的 -->
      <div class="musichall_recommend">
          <h3 @click="godaymusiclist">每日为你推荐·30首<i class="iconfont icon-fanhui1"></i></h3>
          <ul class="listrank">
              <li v-for="(item,index) in getmusicdays" :key="item.id" v-show="index<5" @click="playmusic(item)">
                  <img :src="item.pic_small" alt="">
                  <div>
                      <p>{{item.title}}<span>SQ</span><span>MV</span><span>独家</span></p>
                      <p>{{item.author}}·{{item.album_title}}</p>
                  </div>
                  <i class="iconfont icon-sandian" @click.stop="showoperate(item)"></i>
              </li>
          </ul>
      </div>
      <!-- 两列一行列表 -->
      <div class="musichall_tow">
          <h3>独家专区<i class="iconfont icon-fanhui1"></i></h3>
          <ul class="clearfd">
              <li>
                  <img src="" alt="">
                  <p>叶锦荣曾经是个王金，还是人性的扭曲</p>
                  <span><i class="iconfont icon-shipin"></i>4.272</span>
              </li>
              <li>
                  <img src="" alt="">
                  <p>叶锦荣曾经是个王者，现在是上还是人性的扭曲</p>
                  <span><i class="iconfont icon-shipin"></i>4.272</span>
              </li>
              <li>
                  <img src="" alt="">
                  <p>叶锦荣曾经是个王者，现德的轮上还是人性的扭曲</p>
                  <span><i class="iconfont icon-shipin"></i>4.272</span>
              </li>
              <li>
                  <img src="" alt="">
                  <p>叶锦荣曾经是个王者，现铂金，上的扭曲</p>
                  <span><i class="iconfont icon-shipin"></i>4.272</span>
              </li>
          </ul>
      </div>
      <!-- 圆图列 -->
      <div class="musichall_radius">
          <h3>精选电台<i class="iconfont icon-fanhui1"></i></h3>
          <ul class="clearfd">
              <li>
                  <img src="" alt="">
                  <p>开车听点啥</p>
                  <i class="iconfont icon-bofang"></i>
              </li>
              <li>
                  <img src="" alt="">
                  <p>开车听点啥</p>
                  <i class="iconfont icon-bofang"></i>
              </li>
              <li>
                  <img src="" alt="">
                  <p>开车听点啥</p>
                  <i class="iconfont icon-bofang"></i>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgs: [
        "http://dummyimage.com/375x180/79f0f2&text=banner",
        "http://dummyimage.com/375x180/f2d079&text=banner",
        "http://dummyimage.com/375x180/ad79f2&text=banner",
        "http://dummyimage.com/375x180/79f289&text=banner"
      ],
      classify: [1, 21, 22, 11, 23, 24]
    };
  },
  methods: {
    playmusic(item) {
      //切换音乐
      this.$store.dispatch("playmusic", Number(item.song_id));
    },
    gomusicsort(index) {
      this.$router.push("/" + index);
    },
    gomusiclist() {
      this.$router.push("/musiclist");
    },
    //去到datmusiclist页面
    godaymusiclist() {
      this.$router.push("/daymusiclist");
    },
    goseek() {
      this.$router.push("/seekmusic");
      this.$store.state.seekno = true;
    },
    //弹框信息
    showno() {
      this.$Msg("提示", "功能还为开放");
    },
    //操作音乐页面
    showoperate(item) {
      this.$store.state.operatemusic = item;
      this.$store.state.showoperate = true;
    }
  },
  computed: {
    //返回分类列表
    getmusiclist() {
      return this.$store.state.musiclist;
    },
    //返回每日推荐
    getmusicdays() {
      return this.$store.state.musicdays;
    }
  }
};
</script>
<style lang="less">
#musichall {
  position: absolute;
  top: 5.5rem;
  width: 100%;
  height: 38rem;
  overflow: scroll;
}
.musichall_list {
  width: 100%;
  ul {
    width: 100%;
    padding-left: 5%;
    height: 10rem;
    padding-top: 1rem;
    li {
      float: left;
      width: 30%;
      height: 4rem;
      line-height: 4rem;
      margin-right: 0.5rem;
      i {
        position: static;
        color: #31c27c;
        font-size: 1.7rem;
        margin-right: 10px;
        width: 2rem;
        height: 100%;
        line-height: 4rem;
      }
    }
  }
}
.musichall_content {
  width: 100%;
  ul {
    width: 100%;
    padding-left: 4px;
    li {
      width: 32.5%;
      float: left;
      margin-right: 2px;
      height: 11rem;
      position: relative;
      img {
        display: inline-block;
        background-color: #f0f;
        width: 100%;
        height: 7rem;
      }
      p {
        font-size: 0.8rem;
        margin-top: 0.5rem;
      }
      p:last-child {
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        position: absolute;
        top: 5rem;
        margin: 0;
        padding-left: 5px;
        i:last-child {
          position: absolute;
          width: 2rem;
          height: 2rem;
          line-height: 2rem;
          text-align: center;
          right: 0;
          font-size: 1.5rem;
        }
      }
    }
  }
}
.musichall_recommend {
  width: 100%;
}
.musichall_tow {
  width: 100%;
  ul {
    width: 100%;
    padding-left: 2%;
    li {
      float: left;
      width: 47.5%;
      margin-right: 2%;
      height: 11rem;
      position: relative;
      img {
        display: inline-block;
        width: 100%;
        height: 7rem;
        background-color: #ff0;
      }
      span {
        position: absolute;
        top: 5.5rem;
        left: 0.5rem;
      }
      p {
        margin-top: 0.5rem;
      }
    }
  }
}
.musichall_radius {
  width: 100%;
  padding-top: 4rem;
  height: 39.5rem;
  overflow: scroll;
  ul {
    width: 100%;
    padding-left: 2rem;
    li {
      width: 30%;
      float: left;
      text-align: center;
      position: relative;
      margin-bottom: 3rem;
      img {
        display: inline-block;
        width: 6rem;
        height: 6rem;
        background-color: #00f;
        border-radius: 50%;
      }
      p {
        margin-top: 0.5rem;
      }
      i {
        display: inline-block;
        width: 6rem;
        height: 6rem;
        font-size: 3rem;
        position: absolute;
        left: 0.7rem;
        top: 0;
        line-height: 6rem;
        opacity: 0.7;
        color: white;
      }
    }
  }
}
#musichall h3 {
  text-align: center;
  font-size: 1.5rem;
  position: relative;
  margin: 0;
  height: 3rem;
  line-height: 3rem;
  i {
    position: absolute;
    right: 1rem;
    color: #999;
    font-size: 1.5rem;
  }
}
.lun {
  width: 100%;
  height: 10rem;
  img {
    width: 100%;
    height: 10rem;
  }
}
</style>

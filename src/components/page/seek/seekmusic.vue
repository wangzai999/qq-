<template>
  <div id="seekmusic">
      <div class="seekmusic_hot"  v-show="needseek ===''">
          <p>热门搜索</p>
          <div class="clearfd">
              <span v-for="(item,index) in seekhot" :key="index" @click="seek(item)">{{item}}</span>
          </div>
      </div>
      <div class="seekmusic_newlist" v-show="!allshow&&needseek!==''">
          <p @click="seek(needseek)">搜索  "{{needseek}}"</p>
          <ul>
             <li v-for="(item,index) in newlist" :key="item.id" @click="playmusic(item,needseek)">
                 <i class="iconfont icon-headphones-copy"></i>
                 <p>{{item.songname}} <span>{{item.artistname}}</span></p>
             </li>
          </ul>
      </div>
      <div class="seekmusic_alllist" v-show="allshow">
        <div class="seekmusic_nav">
          <span :class="{navchange: nav == 0, navchange1: nav != 0}">单曲</span>
          <span :class="{navchange: nav == 1, navchange1: nav != 1}">M V</span>
          <span :class="{navchange: nav == 2, navchange1: nav != 2}">专辑</span>
          <span :class="{navchange: nav == 3, navchange1: nav != 3}">歌手</span>
          <span :class="{navchange: nav == 4, navchange1: nav != 4}">歌词</span>
        </div>
        <div class="seekmusic_content">
           <mt-swipe :auto="0" :show-indicators="false" @change="cutnav">
                <!-- 单曲页 -->
                <mt-swipe-item>
                  <div class="nav_0 seeknav">
                    <ul class="listrank">
                        <li v-for="(item,index) in allseek.song" :key="item.id" @click="playmusic(item,1)">
                            <div>
                                <p>{{item.songname}}<span>SQ</span><span>MV</span><span>独家</span></p>
                                <p>{{item.artistname}}</p>
                            </div>
                            <i class="iconfont icon-sandian" @click="showoperate(item)"></i>
                        </li>
                    </ul>
                  </div>
                </mt-swipe-item>
                <!-- M V页 -->
                <mt-swipe-item>
                  <div class="nav_1 seeknav" @click="showno">
                    <div>
                      <i class="glyphicon glyphicon-flash"></i>
                      <p>MV功能还为开放</p>
                    </div>
                  </div>
                </mt-swipe-item>
                <!-- 专辑 -->
                <mt-swipe-item>
                  <div class="nav_2 seeknav" @click="showno">
                    <ul class="listrank">
                        <li v-for="(item,index) in allseek.album" :key="item.id">
                            <img :src="item.artistpic" alt="">
                            <div>
                                <p>{{item.albumname}}</p>
                                <p>{{item.artistname}}</p>
                            </div>
                        </li>
                    </ul>
                  </div>
                </mt-swipe-item>
                <!-- 歌手 -->
                <mt-swipe-item>
                  <div class="nav_3 seeknav">
                    <ul class="listrank">
                        <li v-for="(item,index) in allseek.artist" :key="item.id" @click="gosinger(item.artistid)">
                            <img :src="item.artistpic" alt="">
                            <div>
                                <p>{{item.artistname}}</p>
                            </div>
                        </li>
                    </ul>
                  </div>
                </mt-swipe-item>
                <!-- 歌词 -->
                <mt-swipe-item>
                  <div class="nav_1 seeknav" @click="showno">
                    <div>
                      <i class="glyphicon glyphicon-flash"></i>
                      <p>歌词功能还为开放</p>
                    </div>
                  </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
      </div>
      <!-- 歌手信息页 -->
      <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seekhot: ["春风吹", "中国有嘻哈", "毛不易", "C哩C哩", "我们不一样", "再也没有", "消愁", "差不多先生"],
      nav: 0
    };
  },
  computed: {
    newlist() {
      console.log(this.$store.state.seekmusiclist);
      return this.$store.state.seekmusiclist;
    },
    needseek() {
      return this.$store.state.seek;
    },
    allshow() {
      return this.$store.state.seekallshow;
    },
    //确认搜索后
    allseek() {
      console.log(this.$store.state.allseek);
      return this.$store.state.allseek;
    }
  },
  methods: {
    //切换音乐
    playmusic(item,name) {
      this.$store.state.seek = 0;
      this.$store.dispatch("playmusic", Number(item.songid))
      if(name!==1){
        this.$store.dispatch('startseeks',name)
      }
    },
    //页面切换
    cutnav(index) {
      this.nav = index;
    },
    //搜索
    seek(name){
       this.$store.dispatch('startseeks',name)
    },
    //弹框信息
    showno(){
      this.$Msg('提示', '功能还为开放');
    },
    gosinger(id){
      this.$router.push('/seekmusic/'+id)
    },
    showoperate(item) {
      this.$store.state.operatemusic = item
      this.$store.state.showoperate = true
    }
  }
};
</script>
<style lang="less">
.seeknav {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.navchange {
  color: green;
  border-bottom: 4px solid green;
}
.navchange1 {
  border-bottom: 4px solid #ddd;
}
#seekmusic {
  width: 100%;
  position: absolute;
  top: 4rem;
  height: 39.5rem;
  background-color: #ddd;
}
.seekmusic_hot {
  background-color: white;
  padding-left: 1.5rem;
  padding-top: 2rem;
  p {
    color: #999;
    font-size: 0.9rem;
  }
  div {
    span {
      float: left;
      border: 1px solid #666;
      padding: 0.2rem 0.5rem;
      border-radius: 0.8rem;
      margin: 1rem 0.5rem;
    }
  }
}
.seekmusic_newlist {
  position: absolute;
  top: 0;
  background-color: white;
  width: 100%;
  > p {
    width: 100%;
    padding-left: 1rem;
    color: #31c27c;
    height: 3rem;
    line-height: 3rem;
    margin: 0;
  }
  ul {
    width: 100%;
    height: 100%;
    overflow: scroll;
    li {
      width: 100%;
      display: flex;
      flex-direction: row;
      height: 4rem;
      i {
        width: 3rem;
        line-height: 4rem;
        color: #ccc;
        text-align: center;
      }
      p {
        border-bottom: 1px solid #ccc;
        margin: 0;
        line-height: 4rem;
        width: 24rem;
        span {
          margin-left: 1rem;
        }
      }
    }
  }
}
.seekmusic_alllist {
  position: absolute;
  top: 0;
  background-color: white;
  width: 100%;
  height: 39.5rem;
  .seekmusic_nav {
    padding-left: 0.3rem;
    width: 100%;
    background-color: #ddd;
    span {
      display: inline-block;
      width: 5rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
    }
  }
  .seekmusic_content {
    width: 100%;
    height: 36.5rem;
  }
}
.nav_0 {
  ul {
    li {
      border-bottom: 1px solid #ccc;
      div {
        width: 25rem;
      }
    }
  }
}
.nav_1 {
  div {
    width: 100%;
    height: 15rem;
    text-align: center;
    margin-top: 8rem;
    i {
      font-size: 10rem;
      color: green;
    }
    p {
      color: white;
      height: 2.5rem;
      line-height: 2.5rem;
      width: 10rem;
      margin: 2rem auto;
      background-color: green;
      border-radius: 10px;
    }
  }
}
.nav_2 {
  ul {
    li {
      div {
        width: 77%;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
.nav_3{
  ul{
    padding-left: 1rem;
    li{
      img{
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        margin-top: 1rem;
      }
      div {
        padding-top: 1rem;
      }
    }
  }
}
</style>

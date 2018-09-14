<template>
    <div id="heads">
        <div class="heads_top" v-show="!seekno">
            <i class="iconfont icon-liebiao" @click.stop="changeinstall"></i>
            <div>
                <router-link class="nav" to="/mine" :class="{navs:nav === 1}">我的</router-link>
                <router-link class="nav" to="/musichall" :class="{navs:nav === 2}">音乐馆</router-link>
                <router-link class="nav" to="find" :class="{navs:nav === 3}">发现</router-link>
            </div>
            <i class="iconfont icon-plus"></i>
        </div>
        <div :class="{heads_bottom : !seekno, heads_bottom_seek : seekno}">
            <i class="iconfont icon-jiantou4" v-show="seekno" @click="gomusichall"></i>
            <input type="text" @click="goseek" placeholder="搜索音乐、专辑、歌手" v-model="seekcontent" @change="startseek" @blur="hidallseek" @focus="showallseek">
            <span v-show="!seekno"><i class="iconfont icon-sousuo"></i> 搜索</span>
            <i class="iconfont icon-xiuchang" v-show="seekno"></i>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      seekcontent: ""
    };
  },
  methods: {
    //失去焦点的时候
    hidallseek(){
      this.seekcontent = '';
      this.$store.state.seekallshow = true
    },
    //获取焦点的时候
    showallseek(){
      this.$store.state.seekallshow = false
    },
    changeinstall() {
      this.$store.state.install = true;
    },
    changeinstalls() {
      this.$store.state.install = false;
    },
    goseek() {
      this.$router.push("/seekmusic");
      this.$store.state.seekno = true;
    },
    gomusichall() {
      this.$router.push("/musichall");
    },
    // 确定搜索
    startseek(){
        console.log(this.seekcontent)
        this.$store.dispatch('startseeks',this.seekcontent)
    }
  },
  computed: {
    //菜单
    nav() {
      return this.$store.state.nav
    },
    seekno() {
      return this.$store.state.seekno;
    },
    //搜索栏变化而变化歌曲
    seekchange(){
      this.$store.state.seek = this.seekcontent
        this.$store.dispatch('startseek',this.seekcontent)
        return ''
    }
  }
};
</script>
<style lang="less">
#heads {
  position: absolute;
  top: 0;
  width: 100%;
  padding-bottom: 0.5rem;
  background-color: #31c27c;
}
::-webkit-input-placeholder{
  color: #2caf70
}
.heads_top {
  display: flex;
  flex-direction: row;
  height: 3rem;
  line-height: 3rem;
  width: 100%;
  div {
    display: flex;
    flex-direction: row;
    width: 80%;
    font-size: 1.3rem;
    padding-left: 10%;
    .nav {
      width: 30%;
      text-align: center;
      color: #efefef;
    }
    .navs {
      color: #ffffff;
      font-size: 1.4rem;
    }
  }
  i {
    width: 10%;
    text-align: center;
    line-height: 3rem;
    font-size: 1.3rem;
    color: white;
    border-radius: 5px;
  }
}
.heads_bottom {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  position: relative;
  text-align: center;
  input {
    width: 90%;
    border: 0;
    border-radius: 5px;
    background-color: #2caf70;
    outline: none;
    height: 2rem;
  }
  span {
    position: absolute;
    left: 45%;
    color: white;
    opacity: 0.6;
  }
}
.heads_bottom_seek {
  margin-top: 0.5rem;
  height: 3rem;
  i {
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    color: white;
    font-size: 1.2rem;
  }
  input {
    width: 20rem;
    background-color: #31c27c;
    color: #fff;
    border: 0;
    height: 3rem;
    outline: none;
  }
}
</style>

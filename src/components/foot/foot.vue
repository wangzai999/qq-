<template>
    <div id="foot">
        <div class="foot_img">
          <img :src="playmusic.pic_small" alt=""  @click="goplaymusic" :style="{transform: 'rotate('+rotate+'deg)'}">
        </div>
        <div class="foot_content" @click="goplaymusic">
            <p><b>{{playmusic.title}}</b></p>
            <p>{{playmusic.author}}</p>
        </div>
        <i :class="{'iconfont icon-bofang':play_no,'iconfont icon-zanting':!play_no}" @click="play"></i>
        <i class="iconfont icon-yinleliebiao" @click="popupVisible"></i>
    </div>
</template>
<script>
export default {
  methods: {
    goplaymusic() {
      this.$router.push("/playmusic");
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
    //点击显示菜单页
    popupVisible(){
      this.$store.state.popupVisible =true
    }
  },
  computed: {
    play_no() {
      return this.$store.state.play_no;
    },
    playmusic() {
      console.log(this.$store.state.playmusic.songinfo);
      if (this.$store.state.playmusic.songinfo) {
        return this.$store.state.playmusic.songinfo;
      }else{
       return  {pic_small:'', title : '',author:''}
      }
    },
    rotate() {
      return this.$store.state.rotate.toFixed(2)
    }
  }
};
</script>
<style lang="less">
#foot {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1rem;
  border-top: 1px solid #ccc;
  background-color: white;
  div {
    width: 14rem;
    margin-left: 1rem;
    line-height: 1.7rem;
    p {
      margin: 0;
      font-size: 1.1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .foot_img {
    width: 3rem;
    height: 3rem;
    overflow: hidden;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: absolute;
      transition:2s;
    }
  }
  i {
    width: 3.5rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    font-size: 2rem;
    color: #31c27c;
  }
}
</style>

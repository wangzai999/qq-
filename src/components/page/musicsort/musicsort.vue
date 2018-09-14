<template>
  <div id="musicsort">
      <div class="musicsort_head">
          <i class="iconfont icon-jiantou4" @click="gomusichall"></i>
          {{musicclassify.billboard.name}}
          <i class="iconfont icon-sandian"></i>
      </div>
      <div class="musicsort_content">
        <img :src="musicclassify.billboard.pic_s260" alt="">
        <div class="musicsort_smollhead">
            <i class="iconfont icon-bofang"></i>
            <p>随机播放<span>共{{musicclassify.song_list.length}}首</span></p>
            <span><i class="iconfont icon-xiazai"></i>下载</span>
            <span><i class="iconfont icon-liebiao1"></i>多选</span>
        </div>
        <ul class="listrank">
           <li v-for="(item,index) in musicclassify.song_list" :key="item.id" @click="playmusic(item)">
                <div>
                    <p>{{item.title}}<span>SQ</span><span>MV</span><span>独家</span></p>
                    <p>{{item.author}}·{{item.album_title}}</p>
                </div>
                <i class="iconfont icon-sandian" @click.stop="showoperate(item)"></i>
            </li>
        </ul>
      </div>

  </div>
</template>
<script>
export default {
  created() {
    this.id = this.$route.params.id;
  },
  data() {
    return {
      id: 0
    };
  },
  computed: {
    musicclassify() {
      console.log(this.$store.state.musiclist[this.id]);
      return this.$store.state.musiclist[this.id];
    }
  },
  methods: {
      //返回音乐馆页
    gomusichall() {
      this.$router.push("/musichall");
    },
    //切换音乐
    playmusic(item) {
      //切换音乐
      this.$store.dispatch("playmusic", Number(item.song_id))
    },
    showoperate(item) {
      this.$store.state.operatemusic = item
      this.$store.state.showoperate = true
    }
  }
};
</script>
<style lang="less">
</style>

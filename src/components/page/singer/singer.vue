<template>
<div id="singer">
  <div id="musicsort">
      <div class="musicsort_head">
          <i class="glyphicon glyphicon-arrow-left" @click="gomusichall"></i>
          未找到
          <i class="glyphicon glyphicon-option-vertical"></i>
      </div>
      <div class="musicsort_content">
        <img src="" alt="">
        <div class="musicsort_smollhead">
            <i class="glyphicon glyphicon-play-circle"></i>
            <p>随机播放<span>共877首</span></p>
            <span><i class="glyphicon glyphicon-save"></i>下载</span>
            <span><i class="glyphicon glyphicon-list"></i>多选</span>
        </div>
        <ul class="listrank">
           <li>
                <div>
                    <p>费劲儿<span>SQ</span><span>MV</span><span>独家</span></p>
                    <p>iu人·iu都是</p>
                </div>
                <i class="glyphicon glyphicon-option-vertical"></i>
            </li>
        </ul>
      </div>
  </div>
</div>
</template>
<script>
export default {
  created() {
      console.log(this.$route.params.id)
    this.$store.dispatch('getsinger',this.$route.params.id)
    this.$store.dispatch('getsingermusic',this.$route.params.id)
  },
  computed: {
  },
  methods: {
    //返回搜索页
    gomusichall() {
      this.$router.push("/seekmusic");
    },
    //切换音乐
    playmusic(item) {
      this.$store.dispatch("playmusic", Number(item.song_id));
    }
  }
};
</script>
<style lang="less">
#singer {
  position: fixed;
  top: 0;
  width: 100%;
  height: 43.5rem;
  background-color: white;
}
</style>

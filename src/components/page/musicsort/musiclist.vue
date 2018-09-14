<template>
  <div id="musiclist">
      <div class="musicsort_head">
          <i class="iconfont icon-jiantou4" @click="gomusichall"></i>
          所有分类
          <i class="iconfont icon-sandian"></i>
      </div>
      <div class="musichall_radius">
          <ul class="clearfd">
              <li v-for="(item,index) in musiclist" :key="item.id" @click="gomusicsort(index)">
                  <img :src="item.billboard.pic_s260" alt="">
                  <i class="iconfont icon-bofang"></i>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
export default {
  methods: {
    gomusicsort(index) {
      this.$router.push("/" + index);
    },
      //返回音乐馆页
    gomusichall() {
      this.$router.push("/musichall");
    },
  },
  computed: {
    musiclist() {
      return this.$store.state.musiclist;
    }
  }
};
</script>
<style lang="less">
#musiclist {
  position: absolute;
  top: 0;
  width: 100%;
  height: 43.5rem;
  overflow: hidden;
  background-color: white;
}
</style>

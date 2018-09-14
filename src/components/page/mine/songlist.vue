<template>
  <div id="musicsort">
      <div class="musicsort_head">
          <i class="iconfont icon-jiantou4" @click="gomine"></i>
          {{usermusiclist.list[0]}}
          <i class="iconfont icon-sandian"></i>
      </div>
      <div class="musicsort_content">
        <img :src="usermusiclist[usermusiclist.list[0]][0].pic_big" alt="">
        <div class="musicsort_smollhead">
            <i class="iconfont icon-bofang" @click="allplaylist(usermusiclist.list[0])"></i>
            <p>{{usermusiclist.list[0]}}<span>共{{usermusiclist[usermusiclist.list[0]].length}}首</span></p>
            <span><i class="iconfont icon-xiazai"></i>下载</span>
            <span><i class="iconfont icon-liebiao1"></i>多选</span>
        </div>
        <ul class="listrank">
           <li v-for="(item,index) in usermusiclist[usermusiclist.list[0]]" :key="item.id" @click="playmusic(item)">
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
  computed: {
      usermusiclist(){
          console.log(this.$store.state.usermusiclist)
          return this.$store.state.usermusiclist
      }
  },
  methods: {
      //返回音乐馆页
    gomine() {
      this.$router.push("/mine");
    },
    //切换音乐
    playmusic(item) {
      //切换音乐
      this.$store.dispatch("playmusic", Number(item.song_id))
    },
     showoperate(item) {
      this.$store.state.operatemusic = item
      this.$store.state.showoperate = true
    },
    allplaylist(name){
        this.$Msg.confirm('将会覆盖播放列表内容','提示')
        .then(action=>{
            this.$store.state.playlist = this.$store.state.usermusiclist[name]
            this.$store.dispatch("playmusic",this.$store.state.playlist[0].song_id)
        })
    },
  }
};
</script>
<style lang="less">
</style>

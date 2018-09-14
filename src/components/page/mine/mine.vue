<template>
  <div id="mine" v-show="mineshow">
      <!-- 登陆后的显示信息 -->
     <div class="mine_content" v-show="user[0].name !== ''">
         <p><img :src="user[0].headimg" alt=""></p>
         <p>——<span>{{user[0].name}}</span>——</p>
         <p><i></i><i></i></p>
     </div>
     <!-- 未登录的显示 -->
     <div class="mine_content" v-show="user[0].name === ''">
         <p class="mine_login">登陆听歌，加速qq等级</p>
         <p class="mine_login" @click="gologintype"><span>立即登录</span></p>
     </div>
     <div class="mine_list">
         <ul class="clearfd">
             <li>
                 <i class="iconfont icon-yinle"></i>
                 <p>本地歌曲</p>
                 <p>18</p>
             </li>
             <li>
                 <i class="iconfont icon-xiazai"></i>
                 <p>下载音乐</p>
                 <p></p>
             </li>
             <li>
                 <i class="iconfont icon-zuijinbofang"></i>
                 <p>最近播放</p>
                 <p></p>
             </li>
             <li>
                 <i class="iconfont icon-woxihuande"></i>
                 <p>我喜欢</p>
                 <p></p>
             </li>
             <li>
                 <i class="iconfont icon-mv"></i>
                 <p>下载MV</p>
                 <p></p>
             </li>
             <li>
                 <i class="iconfont icon-lijigoumai"></i>
                 <p>已购音乐</p>
                 <p></p>
             </li>
         </ul>
     </div>
     <div class="mine_station">
         <ul>
             <li>
                 <img src="" alt="">
                 <p>
                     <b>开启个性电台</b>
                     <span>点我选择音乐偏好，马上听起来</span>
                 </p>
             </li>
             <li>
                 <img src="" alt="">
                 <p>
                     <b>开启个性电台</b>
                     <span>点我选择音乐偏好，马上听起来</span>
                 </p>
             </li>
         </ul>
     </div>
     <div class="mine_songlist mine_station">
         <p><span>自建歌单</span><b></b><span>收藏歌单</span><span><i class="iconfont icon-plus"></i><i class="iconfont icon-liebiao"></i></span></p>
         <ul v-show="usermusiclist != 0">
             <li v-for="(item,index) in usermusiclist.list" :key="index" @click="gosonglist">
                 <img :src="usermusiclist[usermusiclist.list[0]][0].pic_big" alt="">
                 <p>
                     <b>{{item}}</b>
                     <span>{{usermusiclist[item].length}}首</span>
                     <i class="iconfont icon-fanhui1"></i>
                 </p>
             </li>
         </ul>
     </div>
  </div>
</template>
<script>
export default {
    mounted(){
        console.log('hsgk')
    //获取默认登录用户列表
    this.$store.dispatch("getuserlist")
    .then(res=>{
        return this.$store.dispatch("getuser")
    })
    .then(res=>{
        this.mineshow = true;
    })
    //获取登录用户
    },
    data(){
        return {
            mineshow: false
        }
    },
    methods: {
        gologintype(){
            this.$router.push('/logintype')
        },
        gosonglist(){
            this.$router.push('/songlist')
        }
    },
    computed: {
        //用户列表
        user(){
            if(this.$store.state.user.length>0){
            console.log(this.$store.state.user)
                return this.$store.state.user
            }else{
                return [{name : '',headimg : ''}]
            }
        },
        //用户音乐列表
        usermusiclist(){
            console.log(this.$store.state.usermusiclist)
            if(this.$store.state.usermusiclist.list){
                return this.$store.state.usermusiclist
            } else {
                return 0
            }
        }
    }
};
</script>
<style lang="less">
#mine {
  position: absolute;
  top: 5.5rem;
  width: 100%;
  height: 38rem;
  overflow: scroll;
  .mine_content {
    margin-top: 1rem;
    height: 8rem;
    p:nth-child(1) {
      span {
        padding-right: 0.5rem;
        border: 1px solid #ccc;
        width: 6rem;
        font-size: 0.8rem;
        text-align: right;
        height: 2rem;
        line-height: 2rem;
        border-radius: 10px;
      }
    }
    p:nth-child(3) {
      height: 2rem;
    }
    p {
      text-align: center;
      img {
        display: inline-block;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background-color: #f0f;
        margin: 0 1rem;
      }
      span {
        display: inline-block;
        margin: 0 1rem;
        width: 5rem;
        font-size: 1.2rem;
      }
    }
    .mine_login{
        height: 3rem;
        line-height: 3rem;
        font-size: 1.2rem;
        margin: 0;
        span{
            display: inline-block;
            width: 8rem;
            height: 2rem;
            line-height: 2rem;
            border:1px solid green;
            font-size: 1rem;
            color: green;
        }
    }
  }
  .mine_list {
    width: 100%;
    ul {
      width: 100%;
      li {
        width: 33%;
        float: left;
        text-align: center;
        height: 7rem;
        margin-bottom: 0.5rem;
        i {
          width: 3rem;
          height: 3rem;
          font-size: 3rem;
          color: #31c27c;
        }
        p {
          margin: 0;
        }
        p:first-of-type {
          margin-top: 0.5rem;
        }
      }
    }
  }
  .mine_station {
    border-top: 5px solid #eee;
    border-bottom: 5px solid #eee;
    ul {
      margin: 0;
      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 5rem;
        margin-bottom: 0.1rem;
        img {
          display: inline-block;
          width: 5rem;
          height: 5rem;
          background-color: #0f0;
        }
        p {
          margin-left: 0.5rem;
          border-bottom: 1px solid #ccc;
          height: 5rem;
          margin-bottom: 0;
          width: 21rem;
          b {
            display: block;
            margin-top: 1rem;
            font-size: 1.1rem;
          }
        }
      }
    }
  }
  .mine_songlist {
      >p{
          height: 4rem;
          line-height: 4rem;
          margin: 0;
          text-align: center;
          position: relative;
          b{
              display: inline-block;
              width: 0.2rem;
              height: 1rem;
              background-color: #ccc;
              margin: 0 0.5rem;
          }
          span:last-child{
              position: absolute;
              width: 6rem;
              right: 0;
              line-height: 0;
              i{
                  width: 3rem;
                  height: 4rem;
                  line-height: 4rem;
                  text-align: center;
                  color: #31c27c;
                  font-size: 1.2rem;
              }
          }
      }
    ul li p {
      position: relative;
      i {
        position: absolute;
        width: 2rem;
        height: 2rem;
        font-size: 1.5rem;
        top: 2rem;
        right: 0;
        color: #666;
      }
    }
  }
}
</style>

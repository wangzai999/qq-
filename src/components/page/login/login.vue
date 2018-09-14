<template>
  <div id="login">
    <div class="login_head">
      <span @click="gologintype"><i class="glyphicon glyphicon-chevron-left"></i>返回</span>
      QQ登录
    </div>
    <div class="login_content">
        <div>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510067322375&di=88701f6930b174db34331487f979c288&imgtype=0&src=http%3A%2F%2Fsrc.onlinedown.net%2Fd%2Ffile%2Fp%2F2016-10-31%2F678d93f91199f68b563bab89a04252ea.jpg" alt="">
          <div>
            <div class="userlist"  v-show="userlist[0].name !== '没有账号'">
              <div>
                <p>{{userlist[0].name}}</p>
                <p>{{userlist[0].qq}}</p>
              </div>
              <img :src="userlist[0].headimg" alt="" v-show="!showuserlist">
              <i :class="[!showuserlist ?'iconfont icon-down2': 'iconfont icon-guanbi']" @click="showuserlist = !showuserlist"></i>
            </div>
            <ul :class="{height:!showuserlist}">
              <li class="userlist" v-for="(item,index) in userlist" :key="item.qqid">
                <div @click="login(item)">
                  <p>{{item.name}}</p>
                  <p>{{item.qq}}</p>
                </div>
                <img :src="item.headimg" alt="">
                <i class="glyphicon glyphicon-remove"></i>
              </li>
            </ul>
            <p @click="gosetlogin">添加账号</p>
          </div>
        </div>
    </div>
    <div class="login_bottom">
      <button>登录</button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      showuserlist : false
    }
  },
  methods: {
    gologintype() {
      this.$router.push("/logintype");
    },
    gosetlogin(){
      this.$router.push("/setlogin")
    },
    //登录
    login(item){
      console.log(item)
      this.$store.dispatch('setuser',item)
    }
  },
  computed: {
    
    userlist(){
      console.log(this.$store.state.userlist)
      if(this.$store.state.userlist.length>0){
        return this.$store.state.userlist
      }else{
        return [{name:'没有账号',qq:'',headimg:''}]
      }
    }
  }
};
</script>
<style lang="less">
#login {
  width: 100%;
  height: 47.4rem;
  overflow: hidden;
  .login_head{
    height: 4rem;
    line-height: 4rem;
    background-color: #0099ff;
    text-align: center;
    color: white;
    font-size: 1.2rem;
    position: relative;
    span{
      position: absolute;
      left: 0;
      width: 5rem;
    }
  }
  .login_content{
    height: 39.5rem;
    width: 100%;
    background-color: #efefef;
    overflow: scroll;
    >div{
      width: 94%;
      margin: 1rem auto;
      background-color: white;
      >img{
        width: 100%;
        height: 15rem;
      }
      >div{
        padding: 0 1.5rem;
        overflow: scroll;
        ul{
          overflow: hidden;
        }
        >p{
          height: 4rem;
          font-size: 1.4rem;
          line-height: 3rem;
          margin: 0;
          color: #0099ff;
        }
      }
    }
  }
  .login_bottom{
    height: 4rem;
    width: 100%;
    border-top: 1px solid #ccc;
    background-color: #efefef;
    text-align: center;
    button{
      width: 95%;
      height: 3rem;
      background-color: #00aaff;
      border: 0;
      margin-top: 0.5rem;
      border-radius: 5px;
      color: white;
      font-size: 1.2rem;
    } 
  }
}
.userlist{
  display: flex;
  flex-direction: row;
  height: 5rem;
  border-bottom: 1px solid #eee;
  position: relative;
  div{
    width: 16rem;
    p{
      margin: 0;
    }
    p:first-child{
      font-size: 1.4rem;
      margin-top: 0.75rem;
    }
  }
  img{
    display: inline-block;
    margin-top: 0.75rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background-color: #0f0;
  }
  i{
    position: absolute;
    right: 0;
    font-size: 1.3rem;
    width: 3rem;
    text-align: right;
    color: #999;
    line-height: 5rem;
  }
}
.height{
  height: 0;
}
</style>

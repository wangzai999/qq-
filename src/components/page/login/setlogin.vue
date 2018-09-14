<template>
  <div id="setlogin">
      <div class="setlogin_head"><span @click="gologin"><i class="glyphicon glyphicon-chevron-left"></i>返回</span></div>
      <div class="setlogin_content">
          <h2>添加账号</h2>
          <p>添加用于QQ一键登录的QQ账号</p>
          <input type="text" placeholder="QQ号" v-model="name">
          <input type="text" placeholder="密码" v-model="pwd">
          <button @click="login">登录</button>
          <span>无法登录？</span>
      </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            name: '',
            pwd: ''
        }
    },
    methods: {
        gologin() {
           
            this.$router.push('/login')
        },
        //登录
        login() {
            var obj = {name: this.name, pwd: this.pwd}
            this.name = ''
            this.pwd = ''
            this.$store.dispatch('login',obj)
        }
    }
};
</script>
<style lang="less">
#setlogin {
  width: 100%;
  height: 47.4rem;
  overflow: hidden;
  .setlogin_head{
      height: 4rem;
      line-height: 4rem;
      span{
          display: inline-block;
          height: 100%;
          width: 5rem;
          i{
              width: 2rem;
              text-align: right;
              font-size: 1.3rem;
              color: #888;
          }
      }
  }
  .setlogin_content{
      padding: 0 2rem;
      p{
          color: #999;
      }
      input{
          width: 100%;
          height: 4rem;
          border: 0;
          border-bottom: 1px solid #ddd;
          font-size: 1.5rem;
          outline: none;
          margin-top: 0.2rem;
      }
      button{
          width: 100%;
          margin-top: 2rem;
          height: 3rem;
          background-color: #0099ff;
          border: 0;
          border-radius: 5px;
          outline: none;
      }
      span{
          display: inline-block;
          margin-top: 1rem;
          color: #0099ff;
      }
  }
}
</style>

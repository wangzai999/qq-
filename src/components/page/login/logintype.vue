<template>
  <div id="logintype">
    <span @click="gomine">取消</span>
    <div class="logintype_button">
      <p @click="gologin"><i></i>微信登陆</p>
      <p @click="gologin"><i></i>QQ登录</p>
    </div>
    <div class="logintype_content">
      <p>QQ与微信账号的资产和权限不互通</p>
      <p><input type="checkbox">同意《用户许可协议》《隐私政策》</p>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    gomine() {
      this.$router.push("/mine");
    },
    gologin(){
      this.$router.push("/login")
    }
  }
};
</script>
<style lang="less">
#logintype {
  width: 100%;
  height: 47.4rem;
  overflow: hidden;
  background: url("http://a4.att.hudong.com/18/83/01300001024098139743838687925.jpg")
    no-repeat;
  background-size: 100% 100%;
  position: absolute;
  > span {
    display: inline-block;
    color: #bbb;
    width: 4rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
    text-align: center;
  }
  .logintype_button {
    position: absolute;
    width: 60%;
    left: 20%;
    bottom: 6rem;
    p {
      width: 100%;
      height: 2.8rem;
      line-height: 2.8rem;
      text-align: center;
      margin: 0;
      color: white;
      background-color: #0af;
      border-radius: 1rem;
    }
    p:first-child {
      background-color: #31c27c;
      margin-bottom: 1rem;
    }
  }
  .logintype_content {
    position: absolute;
    bottom: 1rem;
    left: 20%;
    width: 60%;
    p {
      text-align: center;
      color: white;
      margin: 0;
      width: 100%;
      font-size: 0.9rem;
      input{
        width: 0.9rem;
        height: 0.9rem;
      }
    }
  }
}
</style>

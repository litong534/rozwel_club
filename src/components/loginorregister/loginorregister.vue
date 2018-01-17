<template>
  <div class="lor-container">
      <div class="panel">
        <div class="header">罗兹威尔前端俱乐部</div>
        <div class="routerlink">
          <router-link to="register" replace><div class="reg">注册</div></router-link>
          <router-link to="login" replace><div class="login">登录</div></router-link>
        </div>
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name: "LoginORregister",
  components: {
  }
};
</script>

<style lang="scss" scoped>
@import "~common/style/variable.scss";

.lor-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../assets/img/login_bg/login_bg.png") repeat;
  background-size: cover;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .panel {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    .header {
      font-size: 35px;
      padding: 5px 10px;
      top: 0;
      border-radius: 5px;
      // border: 1px solid;
      color: black;
      margin-bottom: 50px;
      position: relative;
      @include neonlamp;
    }
    .routerlink {
      font-size: 20px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      font-family: "PT Sans", Helvetica, Arial, sans-serif;
      align-items: center;
      div {
        box-sizing: border-box;
      }

      & > a {
        padding: 10px 20px;
      }
      .reg {
        color: #00be99;
        border-bottom: 0px solid #00be99;
      }
      .login {
        color: #ef4300;
        border-bottom: 0px solid #ef4300;
      }

      .router-link-active > div {
        border-bottom-width: 2px;
      }
    }
  }
}
</style>

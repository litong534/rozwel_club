<template>
<div class="container">
  <div class="user_block" v-if="isLogined">
    <img :src="user.image" v-if="user.image" alt="">
    <span v-else class="fa fa-user-circle"></span>
    <div class="username">{{user.nickname}}</div>
    <div class="user_menu">
      <ul>
        <li @click="toUserProfile">用户中心</li>
        <li @click="logout">退出</li>
      </ul>
    </div>
  </div>
  <div class="loginorregister" v-else>
    <div class="login" @click="login">登录</div>
    <div class="register" @click="register">注册</div>
  </div>
</div>  
</template>

<script>
export default {
  data() {
    return {
      isLogined: false,
      user: undefined
    };
  },
  methods: {
    login() {
      this.$router.push("/loginORregister/login");
    },
    register() {
      this.$router.push("/loginORregister/register");
    },
    logout() {
      location.reload();
      this.$nextTick(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
    },
    toUserProfile() {
      this.$router.push("/user");
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.user = user;
      this.isLogined = !!user;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~common/style/variable.scss";
.container {
  background-color: $defaultBlue;
  height: 70px;
  display: flex;
  padding: 0 50px;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  .user_block {
    @extend .loginorregister;
    border: 2px solid $defaultWeakYellow;
    border-radius: 25px;
    padding: 3px 14px;
    position: relative;
    box-sizing: border-box;
    z-index: 1;
    span {
      font-size: 35px;
      margin-right: 20px;
      color: #fff;
    }
    &:hover {
      cursor: default;
      .user_menu {
        padding-top: 50px;
        border: 2px solid $defaultWeakYellow;
        li {
          display: block;
        }
      }
    }

    & img {
      height: 100%;
      border-radius: 50%;
      margin-right: 20px;
    }
    .username {
      font-size: 14px;
      color: #e1e1e1;
    }
    .user_menu {
      position: absolute;
      top: -2px;
      left: -2px;
      width: 105%;
      background-color: $defaultBlue;
      padding-top: 0px;
      box-sizing: border-box;
      z-index: -1;
      li {
        color: #fff;
        display: none;
        text-align: center;
        padding: 5px 0;
        &:hover {
          background-color: $defaultWeakYellow;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
  .loginorregister {
    height: 65%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    .login {
      @include default_header_btn(#ef4300);
      margin-right: 20px;
      &:hover {
        @include default_header_btn_hover(#ef4300);
      }
    }
    .register {
      @include default_header_btn(#00be99);
      &:hover {
        @include default_header_btn_hover(#00be99);
      }
    }
  }
}
</style>

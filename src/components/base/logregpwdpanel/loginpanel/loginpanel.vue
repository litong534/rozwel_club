<template>
    <div class="login loorreg_custom_height">
        <div ref="warning" :class="{'warning':true,'warning_show':checkValidate}">{{notice}}</div>
        <input type="text" name="username" class="username" v-model="email" placeholder="邮箱">
        <input type="password" name="password" class="password" v-model="password" placeholder="密码">
        <button class="login_btn" @click="userlogin()" :disabled="disabled_btn">登录</button>
        <div class="find_pwd">
            <router-link to="sendemail"><div>忘记密码?</div></router-link>
        </div>
    </div>  
</template>

<script>
import { login } from "@/api/user/user";
import {
  checkPasswordReg,
  checkEmailReg,
  checkNickName
} from "@/common/js/common";
export default {
  name: "loginpanel",
  data() {
    return {
      email: "",
      password: "",
      notice:'',
      disabled_btn: true
    };
  },
  methods: {
    userlogin() {
      login(this.email, this.password)
        .then(result => {
          if (result.data.code === 200) {
            this.$snotify.success("登录成功");
            localStorage.setItem('token',result.data.token);
            localStorage.setItem('user',result.data.user);
            setTimeout(() => this.$router.push("/"), 1700);
          } else {
            this.$snotify.error(result.data.errText);
          }
        }).catch(e => this.$snotify.error(e));
    }
  },
  mounted() {
    window.history.forward(1);
  },
  computed: {
    checkValidate() {
      if (this.email === "" && this.password === "") {
        return false;
      }
      this.disabled_btn = true;
      

      if (!checkEmailReg(this.email)) {
        this.notice = "请输入合法的email地址";
        return true;
      }

      if (!checkPasswordReg(this.password)) {
        this.notice = "请输入合法的密码";
        return true;
      }

      this.disabled_btn = false;
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~common/style/variable.scss";

.login {
  width: 300px;
  position: relative;
  top: 0px;
  @include loregmove;
  & > input {
    @include default_input;

    &:focus {
      @include default_input_focus;
    }
  }

  & > .login_btn {
    @include default_btn(#ef4300,1px solid #ff730e);

    &:hover {
      @include default_btn_hover;
    }

    &:active {
      @include default_btn_active(#ef4300);
    }
  }
  .find_pwd {
    div {
      font-size: 14px;
      margin-top: 5px;
      font-family: "PT Sans", Helvetica, Arial, sans-serif;
      color: #8fcd00;
    }
  }
}
</style>

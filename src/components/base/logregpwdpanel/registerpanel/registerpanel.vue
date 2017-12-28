<template>
    <div class="register loorreg_custom_height">
        <div ref="warning" :class="{'warning':true,'warning_show':checkValidate}">{{notice}}</div>
        <input type="text" name="email" class="email" v-model="email" placeholder="邮箱">
        <input type="password" name="password" class="password" v-model="password" placeholder="密码(不少于8位)">
        <input type="text" name="nickname" class="nickname" v-model="nickname" placeholder="昵称">
        <button class="reg_btn" @click="register()" :disabled="disabled_btn">注册</button>
        <div class="tip">提示：请输入两次8~20位字母数字组合的密码;昵称不超过10位且不能包含特殊字符</div>

    </div>    
</template>

<script>
import { register } from "@/api/user/user";
import {
  checkPasswordReg,
  checkEmailReg,
  checkNickName
} from "@/common/js/common";
export default {
  name: "registerpanel",
  data() {
    return {
      email: "",
      password: "",
      nickname: "",
      disabled_btn: true,
      notice: ""
    };
  },
  methods: {
    register() {
      this.disabled_btn = true;
      register(this.email, this.password, this.nickname).then(res => {
        console.log(res);
        if(res.data.code === 401) {
          this.$snotify.error(res.data.errText);
          this.disabled_btn = false;
        }else if (res.data.code === 200) {
          this.$snotify.success("注册成功");
          window.localStorage.setItem('token',res.data.token);
          window.localStorage.setItem('user',JSON.stringify({email:this.email,nickname:this.nickname,image:''}));
          setTimeout(() => this.$router.push("/"), 1700);
        } else {
          this.$snotify.error(res.data.errText);
          this.disabled_btn = false;}
      }).catch(e => this.$snotify.error(e));
    }
  },
  computed: {
    checkValidate() {
      if (this.email === "" && this.password === "" && this.nickname === "") {
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

      if (!checkNickName(this.nickname)) {
        this.notice = "请输入合法的昵称";
        return true;
      }

      this.disabled_btn = false;
      return false;
    }
  },
  mounted() {
    window.history.forward(1);
  }
};
</script>

<style lang="scss" scoped>
@import "~common/style/variable.scss";

.register {
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
  & > .reg_btn {
    @include default_btn(#00be99,1px solid #2bd5d5);

    &:hover {
      @include default_btn_hover;
    }

    &:active {
      @include default_btn_active(#00be99);
    }
  }
}
</style>

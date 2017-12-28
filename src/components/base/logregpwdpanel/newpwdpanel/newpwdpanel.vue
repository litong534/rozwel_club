<template>
    <div class="sendcode loorreg_custom_height">
        <div ref="warning" :class="{'warning':true,'warning_show':checkPwd}">{{notice}}</div>
        <input type="password" name="pwd" v-model="pwd" placeholder="新密码">
        <input type="password" name="pwd2" v-model="pwd2" placeholder="再次输入新密码">
        <button class="code_btn" @click="sendCode()">确定</button>
        <div class="tip">提示：请输入两次8~20位字母数字组合的新密码</div>
    </div>  
</template>

<script>
// import { sendCode } from "@/api/user/user";
import { checkPasswordReg } from "@/common/js/common";
export default {
  name: "newpwdpanel",
  data() {
    return {
      pwd: "",
      pwd2: "",
      notice: ""
    };
  },
  components: {},
  methods: {
    sendCode() {
      // if (!checkCode) {
      //   return false;
      // }
      // sendCode(this.code)
      //   .then(res => {
      //     this.$snotify.success("邮件已发送至" + res.data.code, "邮件发送成功");
      //   })
      //   .catch(() => {
      //     this.$snotify.error("邮件发送失败", "操作失败");
      //   });
      this.$router.push("/");
    }
  },
  computed: {
    checkPwd() {
      if (this.pwd === "") {
        return false;
      }

      if (this.pwd.length < 8 || this.pwd.length > 20) {
        this.notice = "密码长度不符合要求";
        return true;
      }

      if (this.pwd2 !== "" && this.pwd !== this.pwd2) {
        this.notice = "两次输入的密码不一致";
        return true;
      }

      return !checkPasswordReg(this.code);
    }
  },
  mounted() {
    window.history.forward(1);
  }
};
</script>

<style lang="scss" scoped>
@import "~common/style/variable.scss";

.sendcode {
  width: 300px;
  position: relative;
  top: 0px;
  @include loregmove;
  & > input {
    @include default_input;
    transition: all 0.5s;
    &:focus {
      @include default_input_focus;
    }
  }

  & > .code_btn {
    @include default_btn(#ca00cc,1px solid #d973da);
    &:hover {
      @include default_btn_hover;
    }

    &:active {
      @include default_btn_active(0px solid #ca00cc);
    }
  }
}
</style>

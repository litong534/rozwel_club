<template>
    <div class="sendcode loorreg_custom_height">
        <div ref="warning" :class="{'warning':true,'warning_show':!checkCode}">您输入的验证码有误=v=</div>
        <input type="text" name="code" v-model="code" placeholder="验证码">
        <button class="code_btn" @click="sendCode()" :disabled="disabled_btn">确定</button>
        <div class="tip">提示：请输入邮箱发送的8位验证码,30分钟内有效,请耐心等待。若长时间未收到请重试或在垃圾箱中查看</div>
    </div>  
</template>

<script>
import { sendVCode } from "@/api/user/user";
export default {
  name: "sendvcodepanel",
  data() {
    return {
      code: "",
      disabled_btn: false
    };
  },
  components: {},
  methods: {
    sendCode() {
      if (!this.checkCode) {
        return false;
      }
      this.disabled_btn = true;
      sendVCode(this.$route.query.email, this.code)
        .then(res => {
          if (res.data) {
            this.$snotify.success("验证码验证成功", "");
            this.$router.push("newpwd");
          } else {
            this.$snotify.error("验证码输入错误", "");
          }
          this.disabled_btn = false;
        })
        .catch(() => {
          this.$snotify.error("验证码发送失败", "操作失败");
          this.disabled_btn = false;
        });
    }
  },
  computed: {
    checkCode() {
      if (this.code === "") {
        return true;
      }

      if (this.code.length >= 8) {
        this.code = this.code.slice(0, 8);
      }

      var reg = /^\d{8}$/;
      return reg.test(this.code);
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
    @include default_btn(#007acc,1px solid #72afe2);
    &:hover {
      @include default_btn_hover;
    }

    &:active {
      @include default_btn_active(0px solid #007acc);
    }
  }
}
</style>

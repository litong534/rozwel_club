<template>
    <div class="sendemail loorreg_custom_height">
        <div ref="warning" :class="{'warning':true,'warning_show':!checkEmail}">您输入的邮箱有误=v=</div>
        <input type="text" name="email" v-model="email" placeholder="邮箱">
        <button class="email_btn" @click="sendEmailClick()" :disabled="disabled_btn">发送邮件</button>
        <div class="tip">提示：系统会为您输入的邮箱发送一封邮件,若长时间未收到请重试或在垃圾箱中查看</div>
    </div>  
</template>

<script>
import { sendEmail } from "@/api/user/user";
import {checkEmailReg} from '@/common/js/common';
export default {
  name: "sendemailpanel",
  data() {
    return {
      email: "",
      disabled_btn:false
    };
  },
  components: {},
  methods: {
    sendEmailClick() {
      if (!this.checkEmail || !this.email) {
        return false;
      }
      this.disabled_btn = true;

      sendEmail(this.email)
        .then(res => {
          console.log(res);
          this.$snotify.success("邮件已发送至" + res.data.email, "邮件发送成功");
          this.disabled_btn = false;
          this.$router.push({path:'sendvcode', query:{email:res.data.email}});
        })
        .catch(() => {
          this.$snotify.error("邮件发送失败", "操作失败");
          this.disabled_btn = false;
        });
    }
  },
  computed: {
    checkEmail() {
      if (this.email === "") {
        return true;
      }
      return checkEmailReg(this.email);
    }
  },
  mounted() {
    window.history.forward(1);
  }
};
</script>

<style lang="scss" scoped>
@import "~common/style/variable.scss";

.sendemail {
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

  & > .email_btn {
    @include default_btn(#8fcd00,1px solid #d0f184);
    &:hover {
      @include default_btn_hover;
    }

    &:active {
      @include default_btn_active(0px solid #8fcd00);
    }
  }
  .warning {
    width: inherit;
    padding: 5px 0;
    border-radius: 5px;
    background-color: #f22647;
    color: #fff;
    font-size: 10px;
    text-indent: 14px;
    margin-top: 8px;
    opacity: 0;
    cursor: default;
    transition: 0.5s ease;
  }
  .warning_show {
    opacity: 1;
  }
  .tip {
    font-size: 12px;
    margin-top: 20px;
    color: #fff;
    border-radius: 5px;
    background-color: rgba(42, 42, 42, 0.5);
    padding: 10px;
  }
}
</style>

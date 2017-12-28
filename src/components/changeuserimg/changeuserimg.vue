<template>
<div class="center">
  <div class="img_group">
    <img class="pre-img img_120" :src="src" alt="">
    <img class="pre-img img_35" :src="src" alt="">
  </div>
  <vue-core-image-upload
    class="primary"
    crop="local"
    text="上传头像"
    @imageuploaded="imageuploaded"
    extensions="png,gif,jpeg,jpg"
    @errorhandle="handleError"
    :url="url" >
  </vue-core-image-upload>
  <button class="upload" @click="upload" v-show="!disabledBtn" :disabled="disabledBtn">确定</button>
</div>
</template>

<script>
import VueCoreImageUpload from "vue-core-image-upload";
import { SERVER_UPLOADS, setImageToLS, getUserEmail } from "@/common/js/common";
import { setUserImage } from "@/api/user/user";
export default {
  components: {
    "vue-core-image-upload": VueCoreImageUpload
  },
  data() {
    return {
      src: "http://placehold.it/120x120",
      url: SERVER_UPLOADS,
      email: "",
      disabledBtn: true
    };
  },
  methods: {
    imageuploaded(res) {
      this.src = res.url;
      this.disabledBtn = false;
    },
    handleError() {
      this.$snotify.error("上传失败");
    },
    upload() {
      const userData = { email: this.email, image: this.src };
      setUserImage(userData).then(res => {
        if (res.data.code === 200) {
          setImageToLS(res.data.image);
          this.$snotify.success("上传成功");
          setTimeout(() => {
            location.reload();
          },1700);
        }
      });
    }
  },
  created() {
    this.email = getUserEmail();
  }
};
</script>

<style lang="scss" scoped>
@import "~common/style/variable";
.center {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  .primary {
    @include default_btn($defaultBlue,$defaultBlue);
    text-align: center;
    line-height: 40px;
    width: 80px;
    cursor: pointer;
  }
  .upload {
    @include default_btn($defaultOrange,$defaultOrange);
    text-align: center;
    line-height: 40px;
    width: 80px;
    cursor: pointer;
  }
  .img_group {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    .pre-img {
      border-radius: 50%;
      &.img_120 {
        width: 120px;
        height: 120px;
        margin-right: 20px;
      }
      &.img_35 {
        width: 35px;
        height: 35px;
      }
    }
  }
}
</style>

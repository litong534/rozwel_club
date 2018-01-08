<template>
  <div class="blog-main" @click="showDetail">
    <div class="heading-blog">{{data.title}}</div>
    <div class="img_container">
      <img :src="data.src" alt="">
    </div>
    <div class="blog-info">
      <type :props="data.type" fontsize="lg">{{data.type | typeFormat}}</type>
    </div>
    <div class="blog-status">
      <div>作者:{{data.author}}</div>
      <div>{{data.create_dt | timeFormat}}</div>
    </div>
  </div>
</template>

<script>
import Type from "@/components/base/type/type";
import { mongoTimeFormat, typeFormat } from "@/common/js/common";
import * as moment from "moment";
import { mapMutations } from "vuex";

export default {
  components: {
    Type
  },
  props: ["data"],
  filters: {
    timeFormat(time) {
      return moment(time).format("YYYY年MM月DD日");
    },
    typeFormat
  },
  created() {},
  methods: {
    showDetail() {
      this.$router.push(`article/${this.data._id}`);
      this.setArticle(this.formatDataTime(this.data));
    },
    formatDataTime(data) {
      let fData = data;
      fData.create_dt = mongoTimeFormat(fData.create_dt);
      return fData;
    },
    ...mapMutations({
      setArticle: "SET_ARTICLE"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "~common/style/variable";
.blog-main {
  width: 85%;
  display: flex;
  flex-flow: column nowrap;
  padding: 0 30px 20px 30px;
  margin: 0 0 20px 0;
  background-color: #fafafa;
  box-shadow: 1px 1px 3px #999;
  cursor: pointer;
  .img_container {
    width: 100%;
    height: 0;
    padding-top: 420px;
    position: relative;
    overflow: hidden;
    & img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
  .heading-blog {
    font-size: 30px;
    color: #065883;
    font-weight: 800;
    padding: 30px 5px;
    line-height: 40px;
  }
  .blog-info {
    padding: 20px 5px;
    font-size: 20px;
    font-weight: normal;
  }
  .blog-status {
    padding: 0 0 0 5px;
    font-family: Andalus;
    font-size: 20px;
    font-weight: normal;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
}
</style>

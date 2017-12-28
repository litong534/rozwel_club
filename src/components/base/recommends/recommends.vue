<template>
  <div class="container">
    <div class="container-recommend">
      <div  class="recommend" v-for="d in rec" :key="d.key">
        <recommend :data="d"></recommend>
      </div>
      <loading v-if="!isLoading"></loading>
    </div>
    <div class="container-category">
      <category :category="category" @setCategory="selectCategory"></category>
    </div>
  </div>
</template>

<script>
import Recommend from "@/components/base/recommend/recommend";
import Loading from "@/components/base/loading/loading";
import {
  getRecommends,
  getRecommendByTypes,
  getRecommendTypesCount
} from "@/api/recommend/recommend";
import Category from "@/components/base/category/category";
export default {
  components: {
    Recommend,
    Category,
    Loading
  },
  data() {
    return {
      rec: [],
      category: [],
      isLogined: false,
      isLoading: false
    };
  },
  created() {
    this._getRecommends();
    this._getCategory();
  },
  mounted() {
    // window.history.forward(1);
  },
  methods: {
    selectCategory(index) {
      this.isLoading = false;
      if (index === -1) {
        this._getRecommends();
      } else {
        getRecommendByTypes(index).then(res => {
          this.rec = res.data;
          this.isLoading = true;
        });
      }
    },
    _getRecommends() {
      getRecommends().then(res => {
        this.rec = res.data;
        this.isLoading = true;
      });
    },
    _getCategory() {
      getRecommendTypesCount().then(res => {
        this.category = res.data;
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~common/style/variable";

.container {
  width: 1170px;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  padding-top: 30px;
  .container-recommend {
    width: 75%;
  }
  .container-category {
    width: 24%;
  }
}
</style>

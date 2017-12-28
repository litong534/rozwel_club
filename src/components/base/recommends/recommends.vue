<template>
  <div class="container">
    <div class="container-recommend">
      <div  class="recommend" v-if="isLoaded" v-for="d in rec" :key="d.key">
        <recommend :data="d"></recommend>
      </div>
      <loading v-else></loading>
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
      isLoaded: false,
      currentIndex: -1
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
      if(index === this.currentIndex) {
        return;
      }
      this.currentIndex = index;
      this.isLoaded = false;
      if (index === -1) {
        this._getRecommends();
      } else {
        getRecommendByTypes(index).then(res => {
          this.rec = res.data;
          this.isLoaded = true;
        });
      }
    },
    _getRecommends() {
      getRecommends().then(res => {
        this.rec = res.data;
        this.isLoaded = true;
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

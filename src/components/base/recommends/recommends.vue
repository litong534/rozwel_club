<template>
  <div class="main-container">
    <div class="container-recommend">
      <div class="recommend" v-if="isLoaded" v-for="d in rec" :key="d.key">
        <recommend :data="d"></recommend>
      </div>
      <loading v-else></loading>
      <div class="isfull">{{isFullTxt}}</div>
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
  getRecommendByTypes,
  getRecommendTypesCount,
  getRecommendsCount
} from "@/api/recommend/recommend";
import Category from "@/components/base/category/category";
import { isBottom, once } from "@/common/js/common";
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
      currentIndex: -1,
      currentPage: 1,
      recommendsCount: 0,
      onceFn: undefined
    };
  },
  created() {
    this._getRecommendByTypes(-1, this.currentPage);
    this._getCategory();
    this._getRecommendsCount();
  },
  methods: {
    selectCategory(c) {
      if (c.cid === this.currentIndex) {
        return;
      }
      this.currentIndex = c.cid;
      this.isLoaded = false;
      this.currentPage = 1;
      this.rec = [];
      if (c.cid === -1) {
        this._getRecommendByTypes(-1, this.currentPage);
      } else {
        this.recommendsCount = c.count;
        this._getRecommendByTypes(c.cid, this.currentPage);
      }
    },
    _getRecommendByTypes(type, page) {
      if (this._checkIsFull()) {
        return;
      }
      getRecommendByTypes(type, page).then(res => {
        this.rec.push(...res.data);
        this.isLoaded = true;
        this.currentPage++;
        this.onceFn = once(() => {
          this._getRecommendByTypes(type, this.currentPage);
        });
      });
    },
    _getCategory() {
      getRecommendTypesCount().then(res => {
        this.category = res.data;
      });
    },
    _getRecommendsCount() {
      getRecommendsCount().then(res => {
        this.recommendsCount = res.data;
      });
    },
    _checkIsFull() {
      if (this.rec.length === this.recommendsCount && this.rec.length !== 0) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (isBottom()) {
        this.onceFn();
      }
    });
  },
  computed: {
    isFullTxt() {
      return this._checkIsFull() ? '已经到底了，别扯了' : '加载中...';
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~common/style/variable";

.main-container {
  margin: 0 auto;
  display: flex;
  max-width: 1170px;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding-top: 30px;
  .container-recommend {
    width: 75%;
    .isfull {
      width: 92%;
      text-align: center;
    }
  }
  .container-category {
    width: 24%;
  }
}
</style>

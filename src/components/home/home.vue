<template>
  <div>
    <main-header></main-header>
    <tech></tech>
    <router-view></router-view>
  </div>
</template>

<script>
import MainHeader from "@/components/base/header/header";
import Tech from "@/components/base/technique/technique";
export default {
  name: "Home",
  components: {
    MainHeader,
    Tech
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/style/variable";

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: $contentTextColor;
}

</style>

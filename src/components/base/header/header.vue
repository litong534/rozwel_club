<template>
<div>
  <l-header></l-header>
  <c-header v-if="showauthor"></c-header>
</div>
</template>

<script>
import CHeader from "@/components/base/header/c-Header/c-Header";
import LHeader from "@/components/base/header/l-Header/l-Header";
export default {
  components: {
    CHeader,
    LHeader
  },
  props: {
    showauthor: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

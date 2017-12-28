<template>
  <div id="app" ref="app">
    <transition 
      name="fade"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
      :duration="500"
      mode="out-in"
    >
    <router-view/>
    </transition>
    <vue-snotify :class="style"></vue-snotify>

  </div>
</template>

<script>
import { SnotifyPosition } from "vue-snotify";
export default {
  data() {
    return {
      style: "material",
      timeout: 1700,
      position: SnotifyPosition.rightBottom,
      progressBar: true,
      closeClick: true,
      newTop: true,
      backdrop: -1,
      dockMax: 6,
      blockMax: 3,
      pauseHover: true,
      maxHeight: 300,
      titleMaxLength: 15,
      bodyMaxLength: 80
    };
  },
  methods: {
    setGlobal() {
      this.$snotify.setConfig(
        {
          bodyMaxLength: this.bodyMaxLength,
          titleMaxLength: this.titleMaxLength,
          backdrop: this.backdrop
        },
        {
          newOnTop: this.newTop,
          position: this.position,
          maxOnScreen: this.dockMax,
          maxAtPosition: this.blockMax,
          maxHeight: this.maxHeight
        },
        {
          timeout: this.timeout,
          showProgressBar: this.progressBar,
          closeOnClick: this.closeClick,
          pauseOnHover: this.pauseHover
        }
      );
    }
  },
  mounted() {
    this.setGlobal();
  }
};
</script>

<style lang="scss">
@import "~common/style/index";
@import "~common/style/variable";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-width: 1170px;
  font-size: 16px;
  height:100%;
  .material {
    @import "~vue-snotify/styles/material";
  }
}
</style>

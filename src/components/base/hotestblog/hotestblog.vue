<template>
  <div class="box">
    <div class="box_image">
      <img src="http://placehold.it/210x118" alt="">
    </div>
    <div class="title">
      title
      <type :type="data.dataType"></type>
    </div>
    <div class="content">content</div>
    <div class="info">
      <div class="posttime">XX天前发布</div>
      <div class="comments">XX条评论</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
};
</script>

<style lang="scss" scoped>

.box {
  width: 230px;
  height: 310px;
  box-sizing: border-box;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  padding: 10px;
  position: relative;

  .box_image {
    width: 100%;
    height: 118px;
    img {
      width: 100%;
      height: 118px;
    }
  }

  .title {
    position: relative;
    width: 100%;
    height: 50px;
    margin-top: 10px;
    font-weight: bold;
    visibility: visible;
    color: #323333;
    .label_container {
      right: 0;
      bottom: 10px;
    }
  }

  .content {
    width: 100%;
    height: 57px;
    font-size: 14px;
    margin-top: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: #7b7b7c;
  }

  .info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 12px;
    margin-top: 27px;
    visibility: visible;
    color: black;
  }
}

.box:last-child {
  margin-right: 0px;
}

.box:hover {
  box-shadow: 3px 3px 1px #999;
  cursor: pointer;
}

.box_sp {
  height: 230px;
}

.info_sp {
  margin-top: 17px !important;
}

.box_sp:hover {
  > .box_sp_masklayer {
    top: 0;
    opacity: 1;
  }

  > .title {
    opacity: 0;
  }

  > .info {
    opacity: 0;
  }
}
</style>

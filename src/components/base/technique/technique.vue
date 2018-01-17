<template>
    <div class="t-container">
        <div>涉猎技术：</div>
        <img src="~assets/img/html.jpg" alt="">
        <img src="~assets/img/css.jpg" alt="">
        <img src="~assets/img/js.jpg" alt="">
        <img src="~assets/img/vue.jpg" alt="">
        <img src="~assets/img/angularjs.jpg" alt="">
        <img src="~assets/img/jquery.jpg" alt="">
    </div>
</template>

<script>
export default {
    mounted(){
    }
}
</script>

<style lang="scss" scoped>
.t-container {
    margin: 0 auto;
    max-width: 1170px;
    padding-top: 20px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    & > div {
        font-size: 18px;
    }
    & > img {
        width: 85px;
        height: 85px;
    }
}
</style>

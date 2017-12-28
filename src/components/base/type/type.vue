<template>
    <div class="label_container">
        <div class="label label_blue" v-if="props === 1"><slot></slot></div>
        <div class="label label_green" v-if="props === 2"><slot></slot></div>
        <div class="label label_purple" v-if="props === 3"><slot></slot></div>
        <div class="label label_orange" v-if="props === 4"><slot></slot></div>
        <div class="label label_pink" v-if="props === 5"><slot></slot></div>
        <div class="label label_nodejs" v-if="props === 6"><slot></slot></div>
        <div class="label label_webpack" v-if="props === 7"><slot></slot></div>
        <div class="label label_leafgreen" v-if="props === 8"><slot></slot></div>
        <div class="label label_other" v-if="props === 999"><slot></slot></div>
        <div class="label label_blue" v-if="!props"><slot></slot></div>
    </div>
</template>

<script>
export default {
    props: ['props']
}
</script>

<style lang="scss" scoped>
.label_container {
    display: inline-block;
    display: flex;
    .label {
        padding: 2px 5px;
        border-radius: 3px;
        color: #FFF;
        font-size: 12px;
        text-align: center;
        line-height: 14px;
        margin-right: 5px;
    }

    .label_default {
        background-color: #a9a1a1;
    }

    .label_blue {
        background-color: #57acfb;
    }

    .label_green {
        background-color: #32d482;
    }

    .label_purple {
        background-color: #d981f6;
    }

    .label_orange {
        background-color: #ff8d3a;
    }

    .label_pink {
        background-color: #fd87b1;
    }

    .label_leafgreen {
        background-color: #0ac6d7;
    }

    .label_nodejs {
        background-color: #026e00;
    }

    .label_webpack {
        background-color: #2b3a42;
    }
    .label_other {
        background-color: #1a1a1a;
    }
}
</style>




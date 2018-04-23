<template>
    <div class="label_container">
        <TypeRenderer :typeClass="switchCateToClass(cate)"><slot></slot></TypeRenderer>
    </div>
</template>

<script>
import TypeRenderer from './typeRenderer';
export default {
    components: {
        TypeRenderer
    },
    props: {
        cate: {
            type: Number,
            default: undefined
        }
    },
    methods: {
        switchCateToClass(type) {
            switch (type) {
                case 1:
                    return 'label_blue';
                    break;
                case 2:
                    return 'label_green';
                    break;
                case 3:
                    return 'label_purple';
                    break;
                case 4:
                    return 'label_orange';
                    break;
                case 5:
                    return 'label_pink';
                    break;
                case 6:
                    return 'label_nodejs';
                    break; 
                case 7:
                    return 'label_webpack';
                    break;
                case 8:
                    return 'label_leafgreen';
                    break;
                case 9:
                    return 'label_nginx';
                    break; 
                case 10:
                    return 'label_koa';
                    break;
                case 19:
                    return 'label_other';
                    break;
                default:
                    return 'label_blue';
                    break;
            }
        }
    }
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

    .label_nginx {
        background-color: #9a0089;
    }

    .label_koa {
        background-color: #bb0313;
    }
    .label_other {
        background-color: #1a1a1a;
    }
}
</style>




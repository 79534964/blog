<template>
    <div class="slot-tab-top">
        <slot></slot>
    </div>
</template>

<script>
  class Vue {
  };
  export default new Vue();
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .slot-tab-top
        position: relative
        height: 100%
        .el-tabs
            .el-tabs__nav-wrap
                .el-tabs__item
                    &:nth-child(2)
                        padding-left: 0 !important
                    &:last-child
                        padding-right: 0 !important
                .el-badge
                    .is-fixed
                        font-size: xx-small
                        top: 5px
                        right: 3px
                        height: 16px
                        line-height: 16px
                        padding: 0 5px
        .el-tabs__content
            position: absolute
            top: 55px
            bottom: 0
            left: 0
            right: 0
            .el-tab-pane
                position: relative
                height: 100%
                padding: 0 !important
</style>

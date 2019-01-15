<template>
    <div class="slot-dialog-table">
        <slot></slot>
    </div>
</template>

<script>
  class Vue {
  };
  export default new Vue();
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .slot-dialog-table
        .el-dialog
            height: 88%
            display: flex
            flex-direction: column
            .el-dialog__header
                flex: 0 0 45px
                height: 45px
            .el-dialog__body
                flex: 1
                overflow: hidden
                padding-top: 0 !important
</style>

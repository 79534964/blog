<template>
    <div class="slot-input-title">
        <slot></slot>
    </div>
</template>

<script>
  class Vue {
  };
  export default new Vue();
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .slot-input-title
        text-align: center
        .el-input
            width: 460px
        .el-button
            margin-top: -1px
            padding: 9px 20px
            margin-left: 10px
</style>

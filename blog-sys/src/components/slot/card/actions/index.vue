<template>
  <el-card class="slot-card-actions" shadow="hover" :body-style="{ padding: '0px' }">
    <slot name="body" class="body">
    </slot>
    <slot name="actions" class="actions">
    </slot>
  </el-card>
</template>

<script>
  class Vue {
  };
  export default new Vue();
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slot-card-actions
    .actions
      display: flex
      background: #f7f9fa
      border-top: 1px solid #e8e8e8
      height 48px
      box-sizing: border-box
      > div
        display: flex
        align-items: center
        margin: 12px 0
        flex: 1
        justify-content: space-around
        border-right: 1px solid #e8e8e8
        &:last-child
          border-right: none
        button
          border-color: none !important
          background-color: none !important
          background: none !important
          border: none !important
</style>

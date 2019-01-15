<template>
  <div class="slot-tab-tabs">
    <slot></slot>
  </div>
</template>

<script>
  class Vue {
  };
  export default new Vue();
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slot-tab-tabs
    position: relative
    padding: 0 !important
    height: 100%
    width: 100%
    > .el-dropdown
      button
        position: absolute
        z-index: 12
        right: 3px
        top: 0
        font-size: 13px
    > button
      position: absolute
      z-index: 12
      right: 20px
      top: 4px
      font-size: 13px
    > .el-tabs
      height: 100%
      position: relative
      > .el-tabs__header
        position: relative
        background-color: #fff
        z-index: 10
        margin: 0
        .el-tabs__nav-wrap::after
          display: none
        .el-tabs__nav
          line-height: 44px
          height 44px
          width: 100%
          .el-tabs__item
            font-weight: 600
            color: rgb(72, 87, 106)
            font-size: 15px
            padding-left: 20px
            padding-right: 16px
            &:hover
              color: #409eff
          .el-tabs__active-bar
            display: none
          .is-disabled
            display: none
            font-weight: 400
            color: #5a5e66 !important
            padding: 0
            margin-left: -10px
            font-size: 14px
            &:before
              content: "/ "
              font-weight: 700
              color: #b4bccc
          .is-active
            display: inline !important
            cursor: default
      > .el-tabs__content
        overflow-y: auto
        position: absolute
        top: 44px
        bottom: 0
        left: 0
        right: 0
        .el-tab-pane
          padding: 20px
          padding-top: 0
          height: 100%
          box-sizing: border-box
          > div:first-child
            position: relative
            width: 100%
            height: 100%
</style>

<template>
  <div class="slot-button-sumbit">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'slot-button-sumbit'
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slot-button-sumbit
    button
      font-size: 13px
      width: 85px
      letter-spacing: 4px
      padding: 10px
      padding-left: 13px
</style>

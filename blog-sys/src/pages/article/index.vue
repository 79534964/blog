<template>
  <transition name="fade-in">
    <router-view class="_wrapper fade-in"></router-view>
  </transition>
</template>

<script>
  class Vue {
  };
  export default new Vue();
</script>

<style lang="stylus" scoped>
  ._wrapper
    position absolute
    top: 0
    bottom: 0
    right: 0
    left: 0
</style>

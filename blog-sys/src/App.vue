<template>
  <div class="wrapper">
    <app-header></app-header>
    <app-lock></app-lock>
    <div class="content">
      <transition name="fade-in">
        <app-content v-if="$route.path !== '/login' && $route.path !== ''" class="fade-in"></app-content>
        <router-view v-else></router-view>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    height: 100%
    position: relative
    .content
      position: absolute
      top: 45px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      min-height: 600px
      min-width: 1200px
</style>

<template>
  <div class="app-header-logo" :style="`width:${$VmenuFlag?'185px':'0'}`">
    <p>博客管理系统</p>
  </div>
</template>

<script>
  import {Vuex, Translate} from '@/decorator';

  @Vuex([{
    type: 'get',
    name: '$VmenuFlag',
    action: 'common/get/MENUFLAG'
  }])
  class Vue {
    constructor() {
      Translate(Vue, this);
    }
  };
  export default new Vue();
</script>

<style lang="stylus" scoped>
  .app-header-logo
    text-align: center
    overflow: hidden
    margin-left: 1%
    font-weight: 600
    font-size: 17px
    width: 185px
    transition: width .3s cubic-bezier(.25, 0, .15, 1), translate .2s cubic-bezier(.25, 0, .15, 1)
    p
      white-space: nowrap
</style>

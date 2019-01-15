<template>
  <el-button @click="$V_menuFlag" class="app-header-shrink" type="text">
    <img src="./left.png" :style="`transform: rotate(${$VmenuFlag?'0deg':'180deg'})`"/>
  </el-button>
</template>

<script>
  import {Vuex, Translate} from '@/decorator';

  @Vuex([{
    type: 'act',
    name: '$V_menuFlag',
    action: 'common/act/MENUFLAG'
  }, {
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
  .app-header-shrink
    position: relative
    top: 2px
    color: #fff
    padding: 0px 9px
    &:hover
      background-color: rgba(255, 255, 255, .2)
    img
      width: 25px
</style>

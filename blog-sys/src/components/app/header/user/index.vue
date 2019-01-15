<template>
  <div class="app-header-user"><img src="./user.png"/><span>{{$VuserInfo.loginName}} </span></div>
</template>

<script>
  import {Vuex, Translate} from '@/decorator';

  @Vuex([{
    type: 'get',
    name: '$VuserInfo',
    action: 'login/get/USERINFO'
  }])
  class Vue {
    constructor() {
      Translate(Vue, this);
    }
  };
  export default new Vue();
</script>

<style lang="stylus" scoped>
  .app-header-user
    display: flex
    align-items: center
    img
      width: 20px
    span
      position: relative
      top: 2px
      margin-left: 2px
</style>

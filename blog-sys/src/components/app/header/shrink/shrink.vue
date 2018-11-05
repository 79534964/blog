<template>
  <el-button @click="changeFlag" class="app-header-shrink" type="text">
    <img src="./left.png" :style="`transform: rotate(${menuFlag?'0deg':'180deg'})`"/>
  </el-button>
</template>

<script type="text/ecmascript-6">

  export default {
    methods: {
      changeFlag() {
        this.$store.dispatch('common/act/MENUFLAG');
      }
    },
    computed: {
      menuFlag() {
        return this.$store.getters['common/get/MENUFLAG'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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

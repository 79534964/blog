<template>
  <div class="app-content">
    <v-menu></v-menu>
    <v-tab></v-tab>
  </div>
</template>

<script type="text/ecmascript-6">

  import menu from './menu/menu';
  import tab from './tab/tab';

  export default {
    name: 'app-content',
    components: {
      'v-menu': menu,
      'v-tab': tab
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .app-content
    position: relative
    height: 100%
</style>

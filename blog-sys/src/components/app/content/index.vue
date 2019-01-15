<template>
  <div class="app-content">
    <v-menu></v-menu>
    <v-tab></v-tab>
  </div>
</template>

<script>
  import menu from './menu';
  import tab from './tab';

  class Vue {
    components = {
      'v-menu': menu,
      'v-tab': tab
    };
  };
  export default new Vue();
</script>

<style lang="stylus" scoped>
  .app-content
    position: relative
    height: 100%
</style>

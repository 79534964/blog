<template>
  <el-dialog :visible.sync="showFlag">
    <img width="100%" :src="src">
  </el-dialog>
</template>

<script>
  class Vue {
    props = {
      src: {
        type: String,
        default: ''
      }
    };
    data = () => {
      return {
        showFlag: false
      };
    };
    methods = {
      open() {
        this.showFlag = true;
        document.body.appendChild(this.$el);
      }
    };
  };
  export default new Vue();
</script>

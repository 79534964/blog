<template>
  <div class="___wrapper articleArrange_refer_detail" :style="`left: ${flag ? '0' : '100%'}`"
       v-loading="$store.state.loading.btnLoading">
    <el-button type="primary" class="btn" icon="el-icon-back" circle @click="$emit('close')"></el-button>
    <el-input type="textarea" v-model="value" :readonly="true" resize="false"></el-input>
  </div>
</template>

<script>
  import {Vuex, Axios, Translate} from '@/decorator';

  @Vuex([{
    type: 'get',
    name: '$Vdetails',
    action: 'articleArrange/get/DETAILS'
  }])
  @Axios([{
    name: '$Adetails',
    action: 'articleArrange/act/DETAILS',
    params: {btnLoading: true}
  }])
  class Vue {
    constructor() {
      Translate(Vue, this);
    }

    props = {
      flag: {
        type: Boolean
      }
    };
    data = () => {
      return {
        value: ''
      };
    };
    methods = {
      query(file) {
        this.$Adetails({body: {file}}).then(() => {
          this.init(this.$Vdetails);
        });
      },
      init(details) {
        this.value = details;
      }
    };
  };
  export default new Vue();
</script>

<style lang="stylus" scoped>
  .___wrapper
    position: absolute
    width: 100%
    height: 100%
    .btn
      transform: rotateY(180deg)
      position: absolute
      bottom: 40px
      right: 40px
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15)
      font-size: 18px
</style>

<style lang="stylus">
  .articleArrange_refer_detail
    .el-textarea
      height: 100%
      textarea
        height: 100%
        border-radius: 0
</style>

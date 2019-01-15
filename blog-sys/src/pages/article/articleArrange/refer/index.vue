<template>
  <div :style="`width: ${listFlag ? '50%' : '300px'}; right: ${listFlag ? '-50%' : '-300px'}`"
       :class="showFlag ? '__wrapper active' : '__wrapper'">
    <list @close="showFlag=!showFlag" :flag="listFlag" @open="open"></list>
    <detail ref="detailNode" :flag="listFlag" @close="listFlag = !listFlag"></detail>
    <btn :style="`top: ${top}px`" :flag="showFlag" class="btn" ref="btnNode" @finish="finish"
         @open="showFlag=!showFlag"></btn>
  </div>
</template>

<script>

  import btn from './btn';
  import list from './list';
  import detail from './detail';
  import {Vuex, Translate} from '@/decorator';

  @Vuex([{
    type: 'set',
    name: '$VreferList',
    action: ['common/get/REFERLIST', 'common/set/REFERLIST']
  }])
  class Vue {
    constructor() {
      Translate(Vue, this);
    }

    props = {
      top: {
        type: Number
      }
    };
    data = () => {
      return {
        file: '',
        showFlag: false,
        listFlag: false
      };
    };
    methods = {
      add({file, event}) {
        this.file = file;
        this.$refs.btnNode.drop(event.target);
      },
      finish() {
        if (!this.$VreferList.includes(this.file)) {
          let list = this.$VreferList.slice(0);
          list.push(this.file);
          this.$VreferList = list;
        }
      },
      open(file) {
        this.listFlag = !this.listFlag;
        this.$refs.detailNode.query(file);
      }
    };
    components = {
      btn,
      list,
      detail
    };
  };

  export default new Vue();
</script>

<style lang="stylus" scoped>
  .active
    right: 0 !important
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15) !important

  .__wrapper
    transition: all 0.3s cubic-bezier(.7, .3, .1, 1)
    position: absolute
    background-color #fff
    z-index: 99
    top: 0
    bottom: 17px
    .btn
      transition: all 0.3s cubic-bezier(.7, .3, .1, 1)
      position: absolute
      left: -47px
      border-radius: 4px 0 0 4px
</style>

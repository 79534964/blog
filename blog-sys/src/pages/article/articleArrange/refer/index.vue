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

  export default {
    props: {
      top: {
        type: Number
      }
    },
    data() {
      return {
        file: '',
        showFlag: false,
        listFlag: false
      };
    },
    methods: {
      add({file, event}) {
        this.file = file;
        this.$refs.btnNode.drop(event.target);
      },
      finish() {
        if (!this.referList.includes(this.file)) {
          let list = this.referList.slice(0);
          list.push(this.file);
          this.referList = list;
        }
      },
      open(file) {
        this.listFlag = !this.listFlag;
        this.$refs.detailNode.query(file);
      }
    },
    computed: {
      referList: {
        get() {
          return this.$store.getters['common/get/REFERLIST'];
        },
        set(value) {
          this.$store.commit('common/set/REFERLIST', value);
        }
      }
    },
    components: {
      btn,
      list,
      detail
    }
  };
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
    bottom: 20px
    .btn
      transition: all 0.3s cubic-bezier(.7, .3, .1, 1)
      position: absolute
      left: -47px
      border-radius: 4px 0 0 4px
</style>

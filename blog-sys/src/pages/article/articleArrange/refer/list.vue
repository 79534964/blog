<template>
  <div class="___wrapper" :style="`margin-left: ${!flag ? '0' : '100%'}`">
    <div class="header">
      <el-button class="btn" @click="$emit('close')" type="text" icon="el-icon-close"></el-button>
    </div>
    <div class="content">
      <el-card shadow="hover" v-for="e in referList" :key="e">
        <div class="item">
          <el-button class="file" @click="$emit('open',e)" type="text">{{e}}</el-button>
          <el-button @click="del(e)" type="danger" icon="el-icon-delete" circle size="small"></el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      flag: {
        type: Boolean
      }
    },
    methods: {
      del(file) {
        let list = this.referList.slice(0);
        list.every((e, i) => {
          if (e === file) {
            list.splice(i, 1);
            return false;
          }
          return true;
        });
        if (list.length === 0) {
          this.$emit('close');
        }
        this.referList = list;
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
    }
  };
</script>

<style lang="stylus" scoped>
  .___wrapper
    position: absolute
    transition: all 0.3s cubic-bezier(.7, .3, .1, 1)
    display: flex
    flex-direction: column
    width: 300px
    height 100%
    .header
      position: relative
      height: 20px
      flex: 0 0 20px
      .btn
        position: absolute
        right: 10px
        font-size: 22px
        top: -5px
    .content
      flex: 1
      overflow-y: auto
      .el-card
        margin-top: -1px
        border-radius: 0
        border-right: none
        border-left: none
      .item
        display: flex
        justify-content: space-between
        align-items: center
        .file
          font-size: 18px
</style>

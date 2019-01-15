<template>
  <slot-tab-tabs>
    <el-button size="small" type="primary" @click="add" v-if="active === 'list'">
      新增文章
    </el-button>
    <refer ref="referNode" :top="active === 'list'? 38 : 0"></refer>
    <el-tabs v-model="active">
      <el-tab-pane label="文章列表" name="list">
        <list ref="listNode" @update="update" @refer="refer"></list>
      </el-tab-pane>
      <el-tab-pane :label="label" name="update" :disabled="true">
        <update ref="updateNode" @success="success"></update>
      </el-tab-pane>
    </el-tabs>
  </slot-tab-tabs>
</template>

<script>
  import list from './list';
  import update from './update';
  import refer from './refer';

  class Vue {
    data = () => {
      return {
        active: 'list',
        label: ''
      };
    };
    methods = {
      update(file) {
        this.active = 'update';
        this.label = file;
        this.$refs.updateNode.update(file);
      },
      add() {
        this.active = 'update';
        this.label = '新增文章';
        this.$refs.updateNode.add();
      },
      refer({file, event}) {
        this.$refs.referNode.add({file, event});
      },
      success() {
        this.active = 'list';
        this.$refs.listNode.query();
      }
    };
    components = {
      list,
      update,
      refer
    };
  };
  export default new Vue();
</script>

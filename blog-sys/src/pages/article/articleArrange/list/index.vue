<template>
  <div class="___wrapper">
    <slot-input-title>
      <div class="header">
        <el-button class="backups" type="text" @click="backups">一键备份</el-button>
        <el-select v-model="form.name" filterable clearable placeholder="文件名称搜索">
          <el-option v-for="item in queryList" :key="item" :label="item"
                     :value="item">
          </el-option>
        </el-select>
        <el-button class="btn" icon="el-icon-search" type="primary" @click="query">搜索</el-button>
      </div>
    </slot-input-title>
    <div class="tab">
      <slot-tab-top>
        <el-tabs v-model="form.year">
          <el-tab-pane v-for="e in ['全部',2018,2019,2020,2021]" :label="String(e)" :name="String(e)"
                       :key="e"></el-tab-pane>
        </el-tabs>
      </slot-tab-top>
    </div>
    <div class="content">
      <div class="base-moiddle el-table__empty-text" v-show="list.length === 0">
        暂无数据
      </div>
      <div class="item" v-for="e in list" :key="e">
        <slot-card-actions>
          <div slot="body" class="body">
            <base-button-img class="btn" @success="success" :file="e.split('.')[0]"></base-button-img>
            <p>{{e}}</p>
          </div>
          <div slot="actions" class="actions">
            <div>
              <el-button icon="el-icon-edit" @click="update(e)">修改</el-button>
            </div>
            <div>
              <el-button :disabled="$VreferList.includes(e)" style="padding: 0; margin: 10px 20px;" icon="el-icon-view"
                         @click="refer($event, e)">参考
              </el-button>
            </div>
            <div>
              <el-button icon="el-icon-delete" @click="del(e)">删除</el-button>
            </div>
          </div>
        </slot-card-actions>
      </div>
    </div>
    <p class="footer">共 {{list.length}} 条</P>
  </div>
</template>

<script>
  import {Vuex, Axios, Translate} from '@/decorator';

  @Vuex([{
    type: 'get',
    name: '$Vlist',
    action: 'articleArrange/get/LIST'
  }, {
    type: 'get',
    name: '$VreferList',
    action: 'common/get/REFERLIST'
  }])
  @Axios([{
    name: '$Alist',
    action: 'articleArrange/act/LIST'
  }, {
    name: '$Adel',
    action: 'articleArrange/act/DEL'
  }, {
    name: '$Abackups',
    action: 'articleArrange/act/BACKUPS'
  }])
  class Vue {
    constructor() {
      Translate(Vue, this);
    }

    data = () => {
      return {
        form: {
          name: '',
          year: '全部'
        }
      };
    };
    methods = {
      update(file) {
        this.$emit('update', file);
      },
      del(file) {
        if (this.list.length < 2) {
          this.$message.info('最少剩余1个日志');
          return;
        }
        this.$ele.confirm.init.call(this, {
          point: `是否删除 ${file}?`,
          success: () => {
            this.$Adel({body: {file, img: file}}).then(() => {
              this.query();
            });
          }
        });
      },
      refer(event, file) {
        this.$emit('refer', {file, event});
      },
      success() {
        this.$message.success('上传成功！');
      },
      backups() {
        this.$ele.confirm.init.call(this, {
          point: '备份期间无法操作，是否继续?',
          success: () => {
            this.$Abackups();
          }
        });
      },
      query() {
        this.$Alist();
      }
    };
    created = function () {
      this.query();
    };
    computed = {
      list() {
        return this.$Vlist.filter((e) => {
          return e.indexOf('md') !== -1 && (e === this.form.name || this.form.name === '') && (e.indexOf(this.form.year) !== -1 || this.form.year === '全部');
        });
      },
      queryList() {
        return this.$Vlist.filter((e) => {
          return e.indexOf('md') !== -1;
        });
      }
    };
  };
  export default new Vue();
</script>

<style lang="stylus" scoped>
  .___wrapper
    .header
      .backups
        position: absolute
        left: -20px
        top: 0
        margin-left: 0
    .tab
      margin-top: 15px
    .content
      position: absolute
      top: 110px
      left: 0
      right: 0
      bottom: 20px
      overflow-x: hidden
      overflow-y: auto
      .el-table__empty-text
        height: 100%
      .item
        width: 33.33%
        float: left
        height: 156px
        padding: 10px
        box-sizing: border-box
        .body
          position: relative
          padding: 15px
          height: 54px
          p
            text-align: center
            font-size: 25px
            margin-top: 20px
          .btn
            position: absolute
            right: 1px
            top: 0px
    .footer
      position: absolute
      bottom: -6px
      left: 0
      right: 0
      text-align: center
</style>

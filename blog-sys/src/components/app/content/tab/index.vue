<template>
  <div class="app-content-tab" :style="{left:$VmenuFlag? '201px' : '0px'}">
    <el-button class="refresh" icon="el-icon-refresh" type="text" @click="refresh">
      刷新
    </el-button>
    <el-tabs v-model="active" type="card" :closable="list.length > 1" @tab-remove="remove">
      <el-tab-pane v-for="path in list" :key="path" :name="path" v-loading="$store.state.loading.loading"
                   element-loading-text="拼命加载中...">
                <span slot="label">
                    {{getName(path)}}
                </span>
        <keep-alive>
          <router-view v-if="path === active"></router-view>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {Vuex, Translate} from '@/decorator';

  @Vuex([{
    type: 'get',
    name: '$VuserInfo',
    action: 'login/get/USERINFO'
  }, {
    type: 'get',
    name: '$VmenuFlag',
    action: 'common/get/MENUFLAG'
  }])
  class Vue {
    constructor() {
      Translate(Vue, this);
    }

    watch = {
      active(val) {
        this.$router.push({path: val, query: this.query});
        if (JSON.stringify(this.query) !== '{}') {
          this.refresh();
        }
        this.query = {};
      },
      $route(to, form) {
        if (this.pathArr.includes(this.$route.path)) {
          this.query = to.query;
          this.add();
        }
      }
    };
    data = () => {
      return {
        query: {},
        list: [],
        active: '',
        pathArr: [],
        nameMap: null,
        refreshFlag: true
      };
    };
    methods = {
      add() {
        this.active = this.$route.path;
        if (!this.list.includes(this.active)) {
          this.list.push(this.active);
        }
      },
      getName(path) {
        if (this.nameMap === null && this.$VuserInfo) {
          this.nameMap = {};
          this.$VuserInfo.menu.forEach(({childList}) => {
            childList.forEach(({href, name}) => {
              this.nameMap[href] = name;
            });
          });
        }
        return this.nameMap[path] || '刷新中...';
      },
      remove(path) {
        if (this.list.length > 1) {
          let tabs = this.list;
          if (this.active === path) {
            tabs.forEach((e, index) => {
              if (e === path) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  this.active = nextTab;
                }
              }
            });
          }
          this.list = tabs.filter(e => e !== path);
        }
      },
      refresh() {
        this.refreshFlag = false;
        let index;
        let list = this.list.slice(0);
        let active = this.active;
        this.list.every((path, i) => {
          if (path === active) {
            index = i;
            list[i] = '';
            this.list = list;
            return false;
          }
          return true;
        });
        window.setTimeout(() => {
          this.$router.push({path: active, query: this.$route.query});
          list = this.list.slice(0);
          list[index] = active;
          this.list = list;
          this.refreshFlag = true;
        }, 100);
      },
      getPathArr() {
        this.$router.options.routes.forEach((e) => {
          this.pathArr.push(e.path);
          if (e.children) {
            e.children.forEach((item) => {
              this.pathArr.push(`${e.path}/${item.path}`);
            });
          }
        });
      }
    };
    created = function () {
      this.getPathArr();
      this.add();
    };
  };
  export default new Vue();
</script>

<style lang="stylus" scoped>
  .app-content-tab
    position: absolute
    left: 201px
    right: 0
    bottom: 0
    top: 0
    transition: all .3s cubic-bezier(.25, 0, .15, 1), translate .2s cubic-bezier(.25, 0, .15, 1)
    .refresh
      position: absolute
      right: 25px
      top: 3px
      z-index: 2
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .app-content-tab
    > .el-tabs
      height: 100%
      > .el-tabs__header
        margin: 0
        padding-right: 100px
        .el-tabs__nav-prev
          left: 4px
        .el-tabs__nav-next
          right: 4px
      > .el-tabs__content
        position: absolute
        top: 42px
        bottom: 0
        left: 0
        right: 0
        overflow: hidden
        > div
          height 100%
      > .el-tabs__nav-wrap
        margin-right: 92px
        > .el-tabs__item
          font-size: 13px
          > .el-icon-close
            top: -2px
</style>

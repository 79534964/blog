<template>
  <slot-dialog-table>
    <el-dialog title="图片列表" :visible.sync="showFlag" width="80%" :close-on-click-modal="false">
      <el-table :data="$Vlist" border>
        <el-table-column label="图片" width="300">
          <template slot-scope="scope">
            <base-dialog-img :img="getPath(scope.row)"></base-dialog-img>
          </template>
        </el-table-column>
        <el-table-column label="链接">
          <template slot-scope="scope">
            <P>{{getPath(scope.row)}}</P>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" round type="danger" icon="el-icon-delete"
                       @click="del(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </slot-dialog-table>
</template>

<script>
  import {Vuex, Axios, Translate} from '@/decorator';

  @Vuex([{
    type: 'get',
    name: '$Vlist',
    action: 'articleArrange/get/IMGS'
  }])
  @Axios([{
    name: '$Adel',
    action: 'articleArrange/act/IMGDEL',
    params: {btnLoading: true}
  }, {
    name: '$Alist',
    action: 'articleArrange/act/IMGS'
  }])
  class Vue {
    constructor() {
      Translate(Vue, this);
    }

    data = () => {
      return {
        showFlag: false,
        form: {
          file: ''
        }
      };
    };
    methods = {
      open() {
        this.$Alist({body: this.form}).then(() => {
          this.showFlag = true;
        });
      },
      setFile(file) {
        this.form.file = file;
      },
      getPath(img) {
        return `${this.$store.state.config.host}/blog/img/${this.form.file.split('.')[0]}/${img}`;
      },
      del(img) {
        this.$ele.confirm.init.call(this, {
          point: `是否删除 ${img}?`,
          success: () => {
            this.$Adel({
              body: {img: `${this.form.file.split('.')[0]}/${img}`}
            }).then(() => {
              this.$Alist({body: this.form});
            });
          }
        });
      }
    };
  };
  export default new Vue();
</script>

<template>
  <el-popover class="app-header-lock" placement="bottom" width="200" v-model="showFlag">
    <div :class="`el-form-item ${errorFlag ? 'is-error' : ''} is-required`">
      <label class="el-form-item__label">锁屏密码：</label>
      <div class="el-form-item__content">
        <el-input :style="inputStyle" v-model="form.password" type="text" :maxlength="8" @keyup.enter.native="submit"
                  ref="inputNode">
          <img slot="prefix" :style="imgStyle" src="./password.png"/>
        </el-input>
        <div v-show="errorFlag" class="el-form-item__error">
          请输入锁屏密码
        </div>
      </div>
    </div>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="showFlag = false">取消</el-button>
      <el-button type="primary" size="mini" @click="submit">确定</el-button>
    </div>
    <el-button slot="reference" class="btn" type="text">
      <img src="./lock.png"/>
    </el-button>
  </el-popover>
</template>

<script>

  import storage from '@/common/js/storage';
  import {Vuex, Translate} from '@/decorator';

  @Vuex([{
    type: 'act',
    name: '$V_lockFlag',
    action: 'common/act/LOCKFLAG'
  }])
  class Vue {
    constructor() {
      Translate(Vue, this);
    }

    watch = {
      showFlag() {
        this.$nextTick(() => {
          this.$utils.object.mapping({entity: this.form});
          this.errorFlag = false;
          this.showFlag && this.$refs.inputNode.focus();
        });
      }
    };
    data = () => {
      return {
        showFlag: false,
        errorFlag: false,
        form: {
          password: ''
        },
        imgStyle: {
          position: 'relative',
          top: '9px',
          left: '2px',
          width: '21px',
          marginBottom: '22px'
        },
        inputStyle: {
          fontSize: '18px'
        }
      };
    };
    methods = {
      submit() {
        if (this.form.password === '') {
          this.errorFlag = true;
          return;
        }
        this.errorFlag = false;
        storage.setLocal({key: 'lockPassword', value: this.form.password});
        this.$V_lockFlag(true);
      }
    };
  };
  export default new Vue();
</script>

<style lang="stylus" scoped>
  .app-header-lock
    .btn
      color: #fff
      padding: 1px 9px
      margin-left: 0
      &:hover
        background-color: rgba(255, 255, 255, .2)
      img
        width: 22px
</style>

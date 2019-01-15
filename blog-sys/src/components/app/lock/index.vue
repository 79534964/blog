<template>
  <div class="app_lock" v-show="$VlockFlag">
    <div :class="backgroundClass">
      <div class="form">
        <div class="title">
          <img src="./icon.png"/>
        </div>
        <p class="text">输入密码后按回车键解锁屏幕。</p>
        <div :class="`el-form-item ${errorFlag ? 'is-error' : ''} is-required ${inputClass}`">
          <div class="el-form-item__content">
            <el-input v-model="form.value" type="text" :maxlength="10"
                      @keyup.enter.native="close">
              <img slot="prefix" src="./password.png"/>
            </el-input>
            <div v-show="errorFlag" class="el-form-item__error">
              解锁密码密码错误
            </div>
          </div>
        </div>
        <div class="close" @click="clear">
          <el-button type="text">重新登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import storage from '@/common/js/storage';
  import {Vuex, Translate} from '@/decorator';

  @Vuex([{
    type: 'get',
    name: '$VlockFlag',
    action: 'common/get/LOCKFLAG'
  }, {
    type: 'act',
    name: '$V_lockFlag',
    action: 'common/act/LOCKFLAG'
  }])
  class Vue {
    constructor() {
      Translate(Vue, this);
    }

    data = () => {
      return {
        backgroundClass: 'background',
        errorFlag: false,
        inputClass: 'input',
        form: {
          value: '',
          password: ''
        }
      };
    };
    watch = {
      $VlockFlag() {
        this.change();
      }
    };
    methods = {
      init() {
        if (this.form.password) {
          this.$V_lockFlag(true);
        }
      },
      getPassword() {
        this.form.password = storage.getLocal({key: 'lockPassword'});
      },
      change() {
        window.setTimeout(() => {
          this.errorFlag = false;
          this.backgroundClass = this.$VlockFlag ? 'background block' : 'background';
          this.$VlockFlag && this.$utils.object.mapping.call(this, {entity: this.form});
          this.getPassword();
        }, 100);
      },
      clear() {
        storage.clearLocal('lockPassword');
        storage.clearSession('userInfo');
        storage.clearLocal('userInfo');
        window.location.reload();
      },
      close() {
        if (this.form.value === '' || this.form.value !== this.form.password) {
          this.setInputClass();
          this.errorFlag = true;
          return;
        }
        this.errorFlag = false;
        storage.clearLocal('lockPassword');
        this.backgroundClass = 'background';
        window.setTimeout(() => {
          this.$V_lockFlag(false);
        }, 300);
      },
      setInputClass() {
        this.inputClass = 'input inputAni';
        window.setTimeout(() => {
          this.inputClass = 'input';
        }, 300);
      }
    };
    created = function () {
      this.getPassword();
      this.init();
    };
  };
  export default new Vue();
</script>

<style lang="stylus" scoped>
  .app_lock
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 99999
    overflow: hidden
    .block
      width: 100% !important
    .background
      width: 0
      height: 100%
      overflow: hidden
      transition: all .3s cubic-bezier(.25, 0, .15, 1), translate .2s cubic-bezier(.25, 0, .15, 1)
      transform: translate(-50%, -50%)
      position: absolute
      top: 50%
      left: 50%
      background-color: #f5f7fa
      .form
        position: absolute
        left: 50%
        top: 45%
        z-index: 1
        transform: translate(-50%, -80%)
        width: 400px
        height 400px
        .title
          width: 110px;
          margin-left: 135.5px
          margin-bottom: 40px
          padding: 10px
          border-radius: 50%
          box-shadow: 0 1px 10px rgba(0, 0, 0, .2)
        .text
          font-size: 16px
          color: rgba(0, 0, 0, .65)
          margin-bottom: 15px
        .input
          position: relative
          img
            width: 21px
            margin-top: 9px
            margin-left: 2px
      .close
        position: absolute
        right: 0
        top: 235px
        z-index: 1

    .inputAni
      animation-name: shake
      animation-duration: 100ms
      animation-timing-function: ease-in-out
      animation-iteration-count: infinite
    @keyframes shake
      2%
        transform: translate(.5px, 1.5px) rotate(1.5deg)
      4%
        transform: translate(.5px, 1.5px) rotate(1.5deg)
      6%
        transform: translate(-1.5px, -1.5px) rotate(-.5deg)
      8%
        transform: translate(.5px, -.5px) rotate(.5deg)
      10%
        transform: translate(.5px, 2.5px) rotate(.5deg)
      12%
        transform: translate(2.5px, 1.5px) rotate(-.5deg)
      14%
        transform: translate(-1.5px, 2.5px) rotate(-.5deg)
      16%
        transform: translate(-.5px, .5px) rotate(.5deg)
      18%
        transform: translate(.5px, 2.5px) rotate(1.5deg)
      20%
        transform: translate(-.5px, -.5px) rotate(.5deg)
      22%
        transform: translate(2.5px, .5px) rotate(-.5deg)
      24%
        transform: translate(-1.5px, -1.5px) rotate(.5deg)
      26%
        transform: translate(2.5px, -.5px) rotate(-.5deg)
      28%
        transform: translate(1.5px, -.5px) rotate(.5deg)
      30%
        transform: translate(.5px, .5px) rotate(-.5deg)
      32%
        transform: translate(-1.5px, .5px) rotate(-.5deg)
      34%
        transform: translate(.5px, 2.5px) rotate(-.5deg)
      36%
        transform: translate(-.5px, -.5px) rotate(1.5deg)
      38%
        transform: translate(-1.5px, -1.5px) rotate(.5deg)
      40%
        transform: translate(-1.5px, 1.5px) rotate(1.5deg)
      42%
        transform: translate(.5px, -1.5px) rotate(1.5deg)
      44%
        transform: translate(.5px, .5px) rotate(.5deg)
      46%
        transform: translate(-1.5px, -1.5px) rotate(1.5deg)
      48%
        transform: translate(.5px, -1.5px) rotate(.5deg)
      50%
        transform: translate(2.5px, .5px) rotate(-.5deg)
      52%
        transform: translate(-.5px, 2.5px) rotate(-.5deg)
      54%
        transform: translate(.5px, .5px) rotate(.5deg)
      56%
        transform: translate(-1.5px, 2.5px) rotate(.5deg)
      58%
        transform: translate(2.5px, .5px) rotate(.5deg)
      60%
        transform: translate(-1.5px, 2.5px) rotate(.5deg)
      62%
        transform: translate(1.5px, -.5px) rotate(-.5deg)
      64%
        transform: translate(1.5px, -1.5px) rotate(1.5deg)
      66%
        transform: translate(1.5px, -1.5px) rotate(-.5deg)
      68%
        transform: translate(.5px, 2.5px) rotate(-.5deg)
      70%
        transform: translate(1.5px, -1.5px) rotate(1.5deg)
      72%
        transform: translate(1.5px, 1.5px) rotate(-.5deg)
      74%
        transform: translate(-.5px, 1.5px) rotate(1.5deg)
      76%
        transform: translate(1.5px, 2.5px) rotate(.5deg)
      78%
        transform: translate(-.5px, .5px) rotate(.5deg)
      80%
        transform: translate(-1.5px, 2.5px) rotate(.5deg)
      82%
        transform: translate(.5px, 2.5px) rotate(-.5deg)
      84%
        transform: translate(2.5px, -.5px) rotate(.5deg)
      86%
        transform: translate(1.5px, .5px) rotate(.5deg)
      88%
        transform: translate(-.5px, -1.5px) rotate(-.5deg)
      90%
        transform: translate(1.5px, -.5px) rotate(1.5deg)
      92%
        transform: translate(.5px, 2.5px) rotate(.5deg)
      94%
        transform: translate(2.5px, .5px) rotate(-.5deg)
      96%
        transform: translate(.5px, 2.5px) rotate(.5deg)
      98%
        transform: translate(2.5px, -1.5px) rotate(1.5deg)
      0%, 100%
        transform: translate(0, 0) rotate(0)
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .app_lock
    .input
      input
        padding-left: 34px
        letter-spacing: 6px
        font-size: 18px
</style>

<template>
  <div class="___wrapper articleArrange_refer_btn">
    <el-badge :value="$VreferList.length" v-if="!flag" :hidden="!$VreferList.length">
      <el-button @click="open" :class="cartFlag ? 'cart-ani btn' : 'btn'" type="primary"
                 icon="el-icon-tickets"
                 :disabled="!$VreferList.length"></el-button>
    </el-badge>
    <el-button v-else @click="open" class="btn" type="primary" icon="el-icon-close"></el-button>
    <div class="ball-container">
      <div v-for="(ball,index) in balls" :key="index">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import {Vuex, Translate} from '@/decorator';

  @Vuex([{
    type: 'get',
    name: '$VreferList',
    action: 'common/get/REFERLIST'
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
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        dropBalls: [],
        fold: true,
        cartFlag: false
      };
    };
    methods = {
      open() {
        this.$emit('open');
      },
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            // 计算比例
            let proportion = document.documentElement.getBoundingClientRect().width;
            let rect = ball.el.getBoundingClientRect();
            let x = -(proportion - rect.left - 50);
            let y = rect.top - 140;
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
        this.cartAni();
      },
      cartAni() {
        this.cartFlag = true;
        window.setTimeout(() => {
          this.$emit('finish');
          this.cartFlag = false;
        }, 200);
      }
    };
  };
  export default new Vue();
</script>

<style lang="stylus" scoped>
  .___wrapper
    position: relative
    .btn
      border-radius: 4px 0 0 4px
      width: 48px
      height: 43px
      padding: 0
    .cart-ani
      animation: cart_ani 0.2s
    @keyframes cart_ani
      0%
        width: 48px
        height: 43px
        margin-left: 0%
        margin-top: 0%
      50%
        margin-left: -4.8px
        margin-top: -4.3px
        width: 56px
        height: 50px
      100%
        width: 48px
        height: 43px
        margin-left: 0%
        margin-top: 0%
    .ball-container
      .ball
        position: fixed
        top: 138px
        right: 17px
        z-index: 200
        transition: all 0.4s cubic-bezier(.25, .1, .3, 1.5)
        .inner
          width: 17px
          height: 17px
          border-radius: 50%
          background: #1D8CE0
          transition: all 0.4s linear
    img
      width: 100%
</style>
<style lang="stylus">
  .articleArrange_refer_btn
    .el-badge
      .el-badge__content
        top: 9px !important
        right: 60px !important
</style>

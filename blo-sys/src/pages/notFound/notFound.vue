<template>
  <transition name="fade-in">
    <div class="index_notFound fade-in">
      <div class="content">
        <div class="box">
          <div class="left">
            <img src="./404.png"/>
          </div>
          <div class="right">
            <p class="title">你所访问的页面不存在！</p>
            <p class="text">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</p>
            <div class="btn">
              <el-button @click="goLogin" type="primary" icon="el-icon-arrow-left">返回首页</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'notFound',
    methods: {
      goLogin() {
        window.location.href = `http://${window.location.host}/system/index.html`;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .index_notFound
    position: fixed !important
    top: 0
    left: 0
    z-index: 99
    width: 100%
    height: 100% !important
    margin-top: 0 !important
    background-color: #f5f5f5
    text-align: center
    .content
      position: absolute
      left: 50%
      top: 40%
      z-index: 1
      transform: translate(-50%, -50%)
      .box
        display: flex
        .left
          img
            width: 600px
        .right
          margin-left: -110px
          margin-top: 50px
          margin-bottom: 20px
          width: 340px
          display: flex
          flex-direction: column
          justify-content: space-around
          align-items: end
          .title
            font-size: 27px
            line-height: 24px
            color: #1d8ce0
            margin-bottom: 10px
          .text
            text-align: left
            font-size: 16px
            line-height: 23px
            color: grey
            margin-bottom: 30px
</style>

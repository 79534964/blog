<template>
  <div class="app-header-set">
    <el-dropdown @command="operate" trigger="click">
      <el-button class="el-dropdown-link btn" icon="el-icon-caret-bottom" type="text"></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :style="dropdownStyle" command="full"><img :style="imgStyle"
                                                                     src="./full.png"/>全屏
        </el-dropdown-item>
        <el-dropdown-item :style="dropdownStyle" command="clear"><img :style="imgStyle"
                                                                      src="./clear.png"/>清空缓存
        </el-dropdown-item>
        <el-dropdown-item :style="dropdownStyle" command="quit"><img :style="imgStyle"
                                                                     src="./close.png"/>退出
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import storage from '@/common/js/storage';

  class Vue {
    data = () => {
      return {
        dropdownStyle: {
          textAlign: 'left',
          fontSize: '12px',
          width: '80px'
        },
        imgStyle: {
          width: '18px',
          marginRight: '8px',
          position: 'relative',
          top: '5px'
        },
        fullFlag: false
      };
    };
    methods = {
      operate(type) {
        this[type]();
      },
      full(element = document.body) {
        if (this.fullFlag) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else {
            window.parent.showTopBottom();
          }
        } else {
          let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
          if (requestMethod) {
            requestMethod.call(element);
          } else if (typeof window.ActiveXObject !== 'undefined') {
            let wscript = new window.ActiveXObject('WScript.Shell');
            if (wscript !== null) {
              wscript.SendKeys('{F11}');
            }
          }
        }
        this.fullFlag = !this.fullFlag;
      },
      quit() {
        storage.clearSession('userInfo');
        storage.clearLocal('userInfo');
        window.location.reload();
      },
      clear() {
        this.$confirm('此操作将永久缓存数据, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          storage.clearLocal();
          storage.clearSession();
          this.$message.success('清除成功!');
          window.location.reload();
        });
      }
    };
  };
  export default new Vue();
</script>

<style lang="stylus" scoped>
  .app-header-set
    .btn
      color: #fff
      font-size: 15px
      margin-right: 8px
      margin-left: 2px
</style>

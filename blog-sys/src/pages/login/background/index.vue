<template>
  <slot-tab-tabs class="__wrapper">
    <canvas ref="canvasNode"></canvas>
  </slot-tab-tabs>
</template>

<script>

  class Vue {
    data = () => {
      return {
        config: {
          width: window.innerWidth,
          height: window.innerHeight,
          point: 35
        },
        timer: -1,
        canvas: null,
        context: null,
        circleArr: []
      };
    };
    methods = {
      setConfig() {
        this.canvas = this.$refs.canvasNode;
        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;
        this.context = this.canvas.getContext('2d');
        this.context.strokeStyle = 'rgba(0,0,0,0.02)';
        this.context.strokeWidth = 1;
        this.context.fillStyle = 'rgba(0,0,0,0.05)';
      },
      // 生成max和min之间的随机数
      num(max, _min) {
        let min = _min || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      init() {
        let {width, height, point} = this.config;
        this.circleArr = [];
        for (var i = 0; i < point; i++) {
          this.circleArr.push(this.drawCricle(this.context, this.num(width), this.num(height), this.num(15, 2), this.num(10, -10) / 40, this.num(10, -10) / 40));
        }
        this.draw();
      },
      run() {
        let {width, height, point} = this.config;
        this.timer = window.setInterval(() => {
          for (var i = 0; i < point; i++) {
            var cir = this.circleArr[i];
            cir.x += cir.moveX;
            cir.y += cir.moveY;
            if (cir.x > width) {
              cir.x = 0;
            } else if (cir.x < 0) cir.x = width;
            if (cir.y > height) {
              cir.y = 0;
            } else if (cir.y < 0) cir.y = height;
          }
          this.draw();
        }, 10);
      },
      drawCricle(cxt, x, y, r, moveX, moveY) {
        function Circle(x, y, r, moveX, moveY) {
          this.x = x;
          this.y = y;
          this.r = r;
          this.moveX = moveX;
          this.moveY = moveY;
        }

        let circle = new Circle(x, y, r, moveX, moveY);
        cxt.beginPath();
        cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        cxt.closePath();
        cxt.fill();
        return circle;
      },
      drawLine(cxt, x, y, _x, _y, o) {
        function Line(x, y, _x, _y, o) {
          this.beginX = x;
          this.beginY = y;
          this.closeX = _x;
          this.closeY = _y;
          this.o = o;
        }

        var line = new Line(x, y, _x, _y, o);
        cxt.beginPath();
        cxt.strokeStyle = 'rgba(0,0,0,' + o + ')';
        cxt.moveTo(line.beginX, line.beginY);
        cxt.lineTo(line.closeX, line.closeY);
        cxt.closePath();
        cxt.stroke();
      },
      draw() {
        let {point} = this.config;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < point; i++) {
          this.drawCricle(this.context, this.circleArr[i].x, this.circleArr[i].y, this.circleArr[i].r);
        }
        for (let i = 0; i < point; i++) {
          for (let j = 0; j < point; j++) {
            if (i + j < point) {
              let A = Math.abs(this.circleArr[i + j].x - this.circleArr[i].x);
              let B = Math.abs(this.circleArr[i + j].y - this.circleArr[i].y);
              let lineLength = Math.sqrt(A * A + B * B);
              let C = 1 / lineLength * 7 - 0.009;
              let lineOpacity = C > 0.03 ? 0.03 : C;
              if (lineOpacity > 0) {
                this.drawLine(this.context, this.circleArr[i].x, this.circleArr[i].y, this.circleArr[i + j].x, this.circleArr[i + j].y, lineOpacity);
              }
            }
          }
        }
      }
    };
    mounted = function () {
      this.setConfig();
      this.init();
      this.run();
    };
    beforeDestroy = function () {
      if (this.timer === -1) {
        window.clearInterval(this.timer);
      }
    };
  };

  export default new Vue();
</script>

<style lang="stylus" scoped>
  .__wrapper
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: -1
</style>

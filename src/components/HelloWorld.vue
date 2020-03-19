<template>
  <div>
    <canvas id="c" ref="c">
    </canvas>
  </div>
</template>

<script>
const circleW = 50,
      // circleH = 50,
      circleBoxW = 100,
      circleBoxH = 100;

var rAF;
const FRAME = 15;
/* x = null;
* t = currentTime;
* b = begin; / startvalue
* c = end; / change in value
* d = distance
*/
function easeInCubic(x,t,b,c,d){
    return -c *(t/=d)*(t-2) + b;
}
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    this.$refs.c.width = window.innerWidth;
    this.$refs.c.height = window.innerHeight;
    this.start();
  },
  destroyed() {
    cancelAnimationFrame(rAF);
  },
  methods: {
    start: function() {
      // var row = window.innerHeight / circleW;
      // var col = window.innerWidth / circleH;
      var row = 50;
      var col = 50;
      var ctx = this.$refs.c.getContext('2d');
      function CircleItem(x, y, bx, by, r, w) {
        this.oriX = x;
        this.oriY = y;
        this.bx = bx;
        this.by = by;
        this.w = w;
        this.r = r;
        this.way = -1;
        this.first = {
          x: x,
          y: y,
        };
        this.second = {
          x: x,
          y: y,
        };
        // first circle update
        this.update = function(currentTime) {
          this.firstUpdate(currentTime);
          this.secondUpdate(currentTime);
        }

        this.firstUpdate = function(c) {
          if (this.way < 0) {
            this.first.x = easeInCubic(c/FRAME, c, this.oriX, -10, FRAME);
            this.first.y = easeInCubic(c/FRAME, c, this.oriY, -10, FRAME);
            (this.first.x <= this.oriX-10 ? this.way = 1 : null);
          } else {
            this.first.x = easeInCubic(c/FRAME, c, this.oriX-10, 10, FRAME);
            this.first.y = easeInCubic(c/FRAME, c, this.oriY-10, 10, FRAME);
            (this.first.x >= this.oriX ? this.way = -1 : null);
          }
        }

        this.secondUpdate = function() {
            this.second.x = this.oriX + this.oriX - this.first.x;
            this.second.y = this.oriY + this.oriY - this.first.y;
        }
      }

      var circlePosition = [];
      for(var i = 0 ; i < col; i++) {
        circlePosition[i] = [];
        for(var j =0; j < row; j++) {
          circlePosition[i].push(new CircleItem(
                              j*circleBoxW + circleBoxW/2,
                              i*circleBoxH + circleBoxW/2,
                              j*circleBoxW,
                              i*circleBoxH,
                              circleW / 2,
                              circleBoxW));
        }
      }
      // console.log(circlePosition);
      // var then = Date.now(),
      //     elapsed,
      //     now,
      //     fpsInterval = 10,
      var frame = 0;
      function draw() {
        // now = Date.now();
        // elapsed = now - then;
        // if (elapsed < fpsInterval) {
        //   rAF = requestAnimationFrame(draw);
        //   return;
        // }
        // then = now;

        // ctx.fillStyle = "#81c9c8";
        // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for(var i = 0 ; i < col; i++) {
          for(var j =0; j < row; j++) {
            ctx.beginPath();
            ctx.arc(circlePosition[i][j].second.x, circlePosition[i][j].second.y, circlePosition[i][j].r-1, 0, 2*Math.PI);
            ctx.fillStyle = "#369098";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(circlePosition[i][j].first.x, circlePosition[i][j].first.y, circlePosition[i][j].r, 0, 2*Math.PI);
            ctx.fillStyle = "#e44d42";
            ctx.fill();
            // ctx.rect(j*circleBoxW, i*circleBoxH, circleBoxW, circleBoxH);
            // ctx.stroke();
            circlePosition[i][j].update(frame);
          }
        }
        // console.log(frame);
        frame++;
        if (frame > FRAME) frame = 0;
        rAF = requestAnimationFrame(draw);
      }
      rAF = requestAnimationFrame(draw);
      

    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#c {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

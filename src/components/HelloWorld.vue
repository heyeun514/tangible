<template>
  <div>
    <canvas id="c" ref="c">
    </canvas>
  </div>
</template>

<script>
const circleW = 50,
      circleH = 50,
      circleBoxW = 100,
      circleBoxH = 100;
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
  methods: {
    start: function() {
      var row = window.innerHeight / circleW;
      var col = window.innerWidth / circleH;
      var ctx = this.$refs.c.getContext('2d');

      // const moveUpRange = 10;

      function CircleItem(x, y, bx, by, r, w) {
        this.oriX = x;
        this.oriY = y;
        this.bx = bx;
        this.by = by;
        this.w = w;
        this.r = r;
        this.first = {
          x: x,
          y: y,
          dx: -1,
          dy: -1,
        };
        // first circle update
        this.update = function() {
          this.first.x += this.first.dx;
          this.first.y += this.first.dy;
          if ((this.first.dx < 0 && this.first.x - r <= this.bx) || // check edge
             (this.first.dx > 0 && this.first.x >= this.oriX)) {
              this.first.dx *= -1;
              this.first.dy *= -1;
          }
        }
      }

      var circlePosition = [];
      for(var i = 0 ; i <= col; i++) {
        circlePosition[i] = [];
        for(var j =0; j <= row; j++) {
          circlePosition[i].push(new CircleItem(
                              j*circleBoxW + circleBoxW/2,
                              i*circleBoxH - circleBoxW/2,
                              j*circleBoxW,
                              i*circleBoxH,
                              circleW / 2,
                              circleBoxW));
        }
      }

      console.log(circlePosition);

      function draw() {

        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        for(var i = 0 ; i <= col; i++) {
          for(var j =0; j <= row; j++) {
            ctx.beginPath();
            ctx.arc(circlePosition[i][j].first.x, circlePosition[i][j].first.y, circlePosition[i][j].r, 0, 2*Math.PI);



            ctx.rect(j*circleBoxW, i*circleBoxH, circleBoxW, circleBoxH);


            ctx.strokeStyle = "white";
            ctx.stroke();
            circlePosition[i][j].update();
          }
        }
        requestAnimationFrame(draw);
      }

      requestAnimationFrame(draw);
      

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

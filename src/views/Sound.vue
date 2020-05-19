<template>
  <div>
    <canvas id="c" ref="c">
    </canvas>
    <audio ref="music" src="../assets/audio/don'tstop.mp3" controls></audio>
    <button v-on:click="playMusic">play</button>
  </div>
</template>
<script>
const circleW = 50,
      circleH = 50,
      circleBoxW = 100,
      circleBoxH = 100;
var rAF;
const FRAME = 256;
var audioCtx,
  analyser,
  dataArray,
  parseArray,
  orderArray;

import easing from "@/utils/easing.js";
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
function shuffle(a) { 
  var j, x, i;
  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i); 
    x = a[i - 1]; 
    a[i - 1] = a[j]; 
    a[j] = x;
  }
 }

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    this.$refs.c.width = window.innerWidth;
    this.$refs.c.height = window.innerHeight;
  },
  destroyed() {
    cancelAnimationFrame(rAF);
  },
  methods: {
    playMusic: function() {
      var audio = this.$refs.music;
      audio.play();
      audioCtx = new AudioContext();
      var src = audioCtx.createMediaElementSource(audio);
      analyser = audioCtx.createAnalyser();
      src.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = FRAME;

      var bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);

      dataArray = new Uint8Array(bufferLength);
      orderArray = new Array(bufferLength);
      parseArray = new Array(bufferLength);

      for(var i=0; i<bufferLength; i++) {
        orderArray[i] = i;
      }
      shuffle(orderArray);
      console.log('orderArray', orderArray);

      for (var i=0; i<bufferLength; i++) {
        parseArray[i] = 0;
      }
      this.start();

    },
    start: function() {
      // var row = window.innerHeight / circleW;
      // var col = window.innerWidth / circleH;
      var row = 11;
      var col = 11;
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
            this.first.color = easing.linear(c/FRAME, c, 70, -32, FRAME);
            this.first.x = easing.linear(c/FRAME, c, this.oriX, -15, FRAME);
            this.first.y = easing.linear(c/FRAME, c, this.oriY, -15, FRAME);
            (this.first.x <= this.oriX-15 ? this.way = 1 : null);
          } else {
            this.first.x = easing.linear(c/FRAME, c, this.oriX-15, 15, FRAME);
            this.first.y = easing.linear(c/FRAME, c, this.oriY-15, 15, FRAME);
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
      // var frame = 0;
      function draw() {
        if (analyser) {
          analyser.getByteFrequencyData(dataArray);
        }

        ctx.fillStyle = "#81c9c8";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        for(var i = 0 ; i < col; i++) {
          for(var j =0; j < row; j++) {
            var index = i*(row-1)+ j;
            // shadow
            ctx.beginPath();
            ctx.arc(circlePosition[i][j].second.x,
                  circlePosition[i][j].second.y,
                  circlePosition[i][j].r-1,
                  0, 2*Math.PI);
            ctx.fillStyle = "#369098";
            ctx.fill();

            // object
            ctx.beginPath();
            ctx.arc(circlePosition[i][j].first.x,
                    circlePosition[i][j].first.y,
                    circlePosition[i][j].r,
                    0, 2*Math.PI);
            ctx.fillStyle = "hsl(4, 75%, " + circlePosition[i][j].first.color + "%)";
            ctx.fill();
            var d;
            // d = (analyser ? dataArray[index] : 0);
            // console.log(dataArray[orderArray[index]], parseArray[0]);
            if (dataArray[orderArray[index]] > (parseArray[index] + 1) * 1.2) {
              parseArray[index] = dataArray[orderArray[index]];
            }
            d = parseArray[index];
            circlePosition[i][j].update(d);

            parseArray[index] -= 2; 
            // // console.log(d);
            if (parseArray[index] < 0) parseArray[index] = 0;
          }
        }
        rAF = requestAnimationFrame(draw);
      }
      this.$refs.music.play();
      draw();
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
  /* background-color: "#81c9c8"; */
}

button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background-color: white;
}
</style>

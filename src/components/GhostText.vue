<template>
    <div class='ghost'>
        <canvas id="stage" ref="stage"></canvas>
    </div>
</template>
<script>
import '../utils/create.js';
var stage;
var text = [];
function getRandomChar() {
	var c = String.fromCharCode(Math.floor(Math.random()*(90-65+1)) + 65);
	return c;

}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export default {
    props: ['text'],
    watch: {
        text(newVal) {
            console.log(newVal);
            this.updateText(newVal)
        }
    },
    methods: {
        init() {
            stage = new createjs.Stage("stage");// document.getElementById("canvas"));
            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", stage);
        },
        updateText(text) {
            var char = text[text.length-1];
            var t = new createjs.Text(char, "bold 80px Futura", "white" );
            t.x = text.length*40; 
            t.y = 100;
            t.alpha = 1;
            stage.addChild(t);
            const aph = 0.8;
            const dur = 30;
            createjs.Tween.get(t, { loop: false }) //, bounce: true
            .to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: 1 ,text: char, color: "white"}, dur, createjs.Ease.getPowInOut(4))
            stage.update();
        }
    },
    mounted() {
        var canvas = this.$refs.stage;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        this.init();
    },
}
</script>
<style>
.ghost {
    position: relative;
    color: white;
    font-family: Futura;
    width: 100%;
    height: 100%;
}

.ghost > canvas {
    width: 100%;
    height: 100%;
}
</style>
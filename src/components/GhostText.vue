<template>
    <div class='ghost'>
        <canvas id="stage" ref="stage"></canvas>
    </div>
</template>
<script>
import '../utils/create.js';
var stage;
var text = [];
const FONTS = ['CooperBlack', 'BodoniSvtyTwoITCTT', 'AndaleMono'];
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
    data() {
        return {
            textLeft: 50,
            textHeight: 100,
            wrap: false,
            lineNumber: 0,
            charIndex: [],
            font: 'CooperBlack',
            sideMargin: 30,
        }
    },
    watch: {
        text(newVal) {
            // console.log(newVal);
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
            let totalHeight = (this.lineNumber+1) * this.textHeight;
            let startY = this.$refs.stage.clientHeight/2 - totalHeight/2;
            if (this.wrap) {
                // 다시 그리고 줄넘김
                this.charIndex.push(text.length-2);
                console.log('index', this.charIndex);
                stage.removeAllChildren();
                for(var i =0; i<this.lineNumber; i++) {
                    var all = new createjs.Text(text.substring(this.charIndex[i-1] ? this.charIndex[i-1]+1 : 0, this.charIndex[i]+1), "bold " + this.textHeight + "px " + this.font, "white");
                    all.x = this.sideMargin;
                    all.y = startY + this.textHeight * i;
                    // console.log('ally', all.y);
                    stage.addChild(all);
                }
                stage.update();
                this.wrap = false;
                this.textLeft = this.sideMargin;
            }
            var char = text[text.length-1];
            var t = new createjs.Text(char, "bold " + this.textHeight + "px " + this.font, "white" );
            t.x = this.textLeft;
            t.y = startY + this.textHeight * this.lineNumber;
            t.alpha = 1;
            this.textLeft += t.getMeasuredWidth() + 1;

            stage.addChild(t);
            const aph = 0.8;
            const dur = 30;
            createjs.Tween.get(t, { loop: false }) //, bounce: true
            .to({alpha: aph, text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph, text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph, text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph, text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph, text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph, text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph, text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph, text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: aph, text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
            .to({alpha: 1, text: char, color: "white"}, dur, createjs.Ease.getPowInOut(4))
            stage.update();

            this.wrap = (this.textLeft > this.$refs.stage.width - this.sideMargin ? true : false)
            if (this.wrap) this.lineNumber++;
            if (this.lineNumber >= 4) {
                this.textHeight = (this.lineNumber >= 7 ? 70 : 86);
                this.sideMargin = (this.lineNumber >= 7 ? 180 : 120);
            } 
        },
        arrangeTextIndex() {
            // for(var i =0; i<this.charIndex-1; i++) {
            //     if (this.charIndex[i+1] > this.charIndex[i] + 2) {
            //         this.charIndex[i] += 2;
            //     }
            // }
            // console.log('rearrange', this.charIndex);
        }
    },
    mounted() {
        var canvas = this.$refs.stage;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        this.font = FONTS[Math.floor(Math.random() * 3)];
        // console.log(this.font);
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
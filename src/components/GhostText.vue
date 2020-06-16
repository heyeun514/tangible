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
    data() {
        return {
            textLeft: 30,
            textHeight: 100,
            textTop: 0,
            wrap: false,
            lineNumber: 0,
            charIndex: [],
        }
    },
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

            if (this.wrap) {
                // 다시 그리고 줄넘김
                this.charIndex.push(text.length-2);
                console.log('index', this.charIndex);
                this.lineNumber++;
                stage.removeAllChildren();
                for(var i =0; i<this.lineNumber; i++) {
                    console.log(this.charIndex[i-1] ? this.charIndex[i-1]+1 : 0, this.charIndex[i]+1);
                    console.log(text.substring(this.charIndex[i-1] ? this.charIndex[i-1]+1 : 0,
                        this.charIndex[i]+1));
                    var all = new createjs.Text(
                        text.substring(this.charIndex[i-1] ? this.charIndex[i-1]+1 : 0,
                        this.charIndex[i]+1), "bold 144px CooperBlack", "white");
                    all.x = 30;
                    all.y = this.firstCenter - (this.lineNumber-i) * 144;
                    this.textTop = this.firstCenter + 144 * (this.lineNumber-1);
                    stage.addChild(all);
                }
                
                stage.update();
                this.wrap = false;
                this.textLeft = 30;
            }

            var char = text[text.length-1];
            var t = new createjs.Text(char, "bold 144px CooperBlack", "white" );
            console.log('tl', t.x, t.getMeasuredWidth());
            
            
            
            t.x = this.textLeft;
            t.y = this.textTop;
            t.alpha = 1;
            // if (this.textLeft == 30 && this.lineNumber == 0) this.textLeft += 30;
            this.textLeft += t.getMeasuredWidth() + 1;
            this.wrap = (this.textLeft > this.$refs.stage.width - 100 ? true : false)


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
        this.textTop = this.firstCenter = canvas.height / 2 - 144/2;
        
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
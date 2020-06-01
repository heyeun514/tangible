<template>
    <div class="sound2-bg">
        <div v-for="(item, index) in 128"
            ref="soundItem"
            v-bind:key="index"
            v-on:click="push"
            class="sound-item">
        </div>
        <audio ref="music" src="../assets/audio/needed.mp3" controls></audio>
        <button class="playBtn" v-on:click="readyPlay">play</button>
    </div>
</template>
<script>
import Vue from 'vue'
import gsap from 'gsap'
import easing from "@/utils/easing";
import { clearTimeout } from 'timers';

var items = [];
var analyser,
    dataArray,
    orderArray,
    parseArray,
    audioCtx,
    timeOut;
const FRAME = 256;
var rAF;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
export default Vue.extend({
    methods: {
            shuffle: function(a) {
                var j, x, i;
                for (i = a.length; i; i -= 1) {
                    j = Math.floor(Math.random() * i); 
                    x = a[i - 1]; 
                    a[i - 1] = a[j]; 
                    a[j] = x;
                }
            },
            readyPlay: function() {
                console.log('ready');
                var ready = [];
                var cnt;
                for(var i =0; i<128; i++) {
                    ready[i] = FRAME/3.5;
                }
                var soundItems = this.$refs.soundItem;
                function animation() {
                    for(var i =0; i<ready.length; i++) {
                        if (ready[i] < FRAME/2) {
                            ready[i] += 1;
                        } else {
                            cancelAnimationFrame(rAF);
                            rAF = null;
                        }
                        var c = ready[i];
                        var shadowVal = Math.round(easing.linear(c/FRAME, c, -8, 28, FRAME));
                        if (shadowVal > 0) {
                            soundItems[i].style.boxShadow = `${shadowVal}px ${shadowVal}px ${shadowVal+5}px #cbced1,
                                    -${shadowVal}px -${shadowVal}px ${shadowVal+5}px #ffffff`;
                        } else {
                            shadowVal = Math.abs(shadowVal);
                            soundItems[i].style.boxShadow = `inset ${shadowVal}px ${shadowVal}px ${shadowVal}px #cbced1,
                                    inset -${shadowVal}px -${shadowVal}px ${shadowVal}px #ffffff`
                        }
                    }
                    rAF = requestAnimationFrame(animation);
                }
                animation();
                timeOut = setTimeout(() => {
                    this.playMusic();
                }, 1000);
            },
            playMusic: function() {
                if (rAF) cancelAnimationFrame(rAF);
                // event.target.style.visibility = "hidden";
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
                this.shuffle(orderArray);
                for (var i=0; i<bufferLength; i++) {
                    parseArray[i] = 0;
                }
                this.start();
            },
            push: function(event) {
                console.log('el', event.target.key);
            },
            start: function() {
                var soundItems = this.$refs.soundItem;
                console.log('soundItem', soundItems.length);
                var fr = 0;
                var shadowVal = [];
                for(var i =0; i<dataArray.length; i++) {
                    shadowVal[i] = -8;
                }
                function animation() {
                    if (analyser) {
                        analyser.getByteFrequencyData(dataArray);
                    }
                    for(var i =0; i<dataArray.length; i++) {
                        var c = dataArray[orderArray[i]];
                        var shadowVal = Math.round(easing.linear(c/FRAME, c, -8, 28, FRAME));

                        if (shadowVal > 0) {
                            soundItems[i].style.boxShadow = `${shadowVal}px ${shadowVal}px ${shadowVal+5}px #cbced1,
                                    -${shadowVal}px -${shadowVal}px ${shadowVal+5}px #ffffff`;
                        } else {
                            shadowVal = Math.abs(shadowVal);
                            soundItems[i].style.boxShadow = `inset ${shadowVal}px ${shadowVal}px ${shadowVal}px #cbced1,
                                    inset -${shadowVal}px -${shadowVal}px ${shadowVal}px #ffffff`
                        }
                    }
                    rAF = requestAnimationFrame(animation);
                }
                animation();
            }
    },
    mounted() {
    },
    beforeDestroy() {
        cancelAnimationFrame(rAF);
        if (timeOut) clearTimeout(timeOut);
    }
});
</script>
<style>
.sound2-bg {
    background: #ecf0f3;
    justify-content: center;
    flex-wrap: wrap;
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
}

.sound2-bg > audio {
    /* visibility: hidden; */
}

.sound-item {
    margin: 20px;
    width: 70px;
    height: 70px;
    /* padding: 60px 35px 35px 35px; */
    border-radius: 50%;
    background: #ecf0f3;
    /* box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff; */
    /* box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff; */
}

.playBtn {
    position: absolute;
    /* position: fixed; */
    /* top: 0; */
    /* left: 0; */
}
</style>

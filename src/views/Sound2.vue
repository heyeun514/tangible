<template>
    <div class="sound2-bg">
        <div v-for="(item, index) in 128"
            ref="soundItem"
            v-bind:key="index"
            v-on:click="push"
            class="sound-item">
        </div>
        <audio ref="music" src="../assets/needed.mp3" controls></audio>
        <button class="playBtn" v-on:click="playMusic">play</button>
    </div>
</template>
<script>
import Vue from 'vue'
import gsap from 'gsap'
import easing from "@/utils/easing";

var items = [];
var analyser,
    dataArray,
    orderArray,
    parseArray,
    audioCtx;
const FRAME = 256;
var rAF;


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
            playMusic: function(event) {
            event.target.style.visibility = "hidden";
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
    }
});
</script>
<style>
.sound2-bg {
    width: 100%;
    height: 1080px;
    background: #ecf0f3;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.sound2-bg > audio {
    visibility: hidden;
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

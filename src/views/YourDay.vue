<template>
    <div class="yourday">
        <span>"How was your day?"</span>
        <div class='img-container' ref="imgContainer">
            <div class="emotion angry"
                id="emotion0"
                @click="click"
                @mouseover="hover"
                @mouseout="mouseOut">
                <img src="@/assets/congal1/angry.png"/>
                <span>angry</span>
            </div>
             <div class="emotion sad"
                id="emotion4"
                @click="click"
                @mouseover="hover"
                @mouseout="mouseOut">
                <img src="@/assets/congal1/sad.png"/>
                <span>sad</span>
            </div>
            <div class="emotion comf"
                id="emotion3"
                @click="click"
                @mouseover="hover"
                @mouseout="mouseOut">
                <img src="@/assets/congal1/comfortable.png"/>
                <span>comfortable</span>
            </div>
            <div class="emotion worry"
                id="emotion2"
                @click="click"
                @mouseover="hover"
                @mouseout="mouseOut">
                <img src="@/assets/congal1/worry.png"/>
                <span>worry</span>
            </div>
            <div class="emotion happy"
                id="emotion1"
                @click="click"
                @mouseover="hover"
                @mouseout="mouseOut">
                <img src="@/assets/congal1/happy.png"/>
                <span>happy</span>
            </div>
        </div>
    </div>
</template>
<script>
// import { TweenLite } from 'gsap';
import Vue from 'vue'
import { TweenLite } from '../utils/gsap';
import '../utils/CustomEase.min.js';

const EMOTION = {
    'angry': 0,
    'happy': 1,
    'sad': 2,
    'comf': 3,
    'worry': 4,
};

export default {
    data() {
        return {
            tweenReturns: [],
            move: 100,
            clickEventOccur: false,
        }
    },
    mounted() {
        // this.$emit('updateBgStyle', 'white');
    },
    methods: {
        hover: function(e) {
            var t = (e.target.tagName !== 'DIV' ? e.target.parentNode : e.target);
            const id = t.id;
            const number = parseInt(String(id).charAt(id.length-1));
            const distance = 100;
            var that = this;

            var r = 72 * (number) * (Math.PI*2 / 360);
            TweenLite.to(t, 1, {
                transform: 'translate(' + Math.cos(r) * distance + 'px, '
                    + Math.sin(r) * distance + 'px)'
            });
            var title;
            for(var i =0; i<t.children.length; i++) {
                if (t.children[i].tagName == 'SPAN') {
                    title = t.children[i];
                    break;
                }
            }
            TweenLite.to(title, 1, {
                opacity: 1
            });
            this.dimOthers(number, true);
        },
        dimOthers: function(num, dim) {
            var emotions = this.$refs.imgContainer.children;
            // console.log(emotions);
            for(var i=0; i<emotions.length; i++) {
                if (dim && (emotions[i].id !== 'emotion' + num)) {
                    emotions[i].style.opacity = 0.3;
                } else {
                    emotions[i].style.opacity = 1;
                }
            }
        },
        mouseOut: function(e) {
            if (this.clickEventOccur) return;
            var t = (e.target.tagName !== 'DIV' ? e.target.parentNode : e.target);
            TweenLite.to(t, 1, {
                transform: 'translate(0, 0)'
            });
            var title;
            for(var i =0; i<t.children.length; i++) {
                if (t.children[i].tagName == 'SPAN') {
                    title = t.children[i];
                    break;
                }
            }
            TweenLite.to(title, 1, {
                opacity: 0
            });
            this.dimOthers(null, false);
        },
        click: function(e) {
            this.clickEventOccur = true;
            var router = this.$router;
            var t = (e.target.tagName !== 'DIV' ? e.target.parentNode : e.target);
            var em = t.className.split(' ')[1];
            console.log(em);
            TweenLite.to(t, 1, {
                scale: 0,
                opacity: 0,
                ease: CustomEase.create("custom", "M0,0 C0.132,0.592 0.824,0.076 1,1 "),
                onComplete: function() {
                    router.push({name: 'emotions', params: {select: EMOTION[em]}});
                }
            });
        }
    }
}
</script>
<style>
.yourday {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.yourday > span {
    flex: 0;
    font-size: 72px;
    margin-top: 159px;
    height: 94px;
    font-family: Futura;
    font-size: 72px;
    font-weight: 500;
    text-align: center;
    color: #000000;
}

.yourday > .img-container {
    flex: 1;
    width: 100%;
}

.emotion > span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: Futura;
    font-size: 24px;
    opacity: 0;
}

.comf {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200px;
    height: 196px;
    
}

.sad {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 291px;
    height: 191px;
}

.angry {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 265px;
    height: 313px;
}

.worry {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 277px;
    height: 254px;
}

.happy {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 227px;
    height: 269px;
}
</style>


<template>
    <div class="yourday">
        <span>"How was your day?"</span>
        <div class='img-container'>
            <img src="@/assets/congal1/angry.png" class="angry"
                ref="emotion" id="emotion0"
                @click="click"
                @mouseover="hover"
                @mouseout="mouseOut"/>
            <img src="@/assets/congal1/sad.png" class="sad"
                ref="emotion" id="emotion4"
                @click="click"
                @mouseover="hover"
                @mouseout="mouseOut"/>
            <img src="@/assets/congal1/comfortable.png" class="comfortable"
                ref="emotion" id="emotion3"
                @click="click"
                @mouseover="hover"
                @mouseout="mouseOut"/>
            <img src="@/assets/congal1/worry.png" class="worry"
                ref="emotion" id="emotion2"
                @click="click"
                @mouseover="hover"
                @mouseout="mouseOut"/>
            <img src="@/assets/congal1/happy.png" class="happy"
                ref="emotion" id="emotion1"
                @click="click"
                @mouseover="hover"
                @mouseout="mouseOut"/>
        </div>
    </div>
</template>
<script>
// import { TweenLite } from 'gsap';
import { TweenLite } from '../utils/gsap';
export default {
    data() {
        return {
            tweenReturns: [],
            move: 100,
            clickEventOccur: false,
        }
    },
    methods: {
        hover: function(e) {
            const id = e.target.id;
            const number = parseInt(String(id).charAt(id.length-1));
            const distance = 100;
            var that = this;
            var r = 72 * (number) * (Math.PI*2 / 360);
            TweenLite.to(e.target, 1, {
                transform: 'translate(' + Math.cos(r) * distance + 'px, '
                    + Math.sin(r) * distance + 'px)',
                onComplete: function() {
                    that.dimOthers(number);
                }
            });
        },
        dimOthers: function(num) {
            var emotions = this.$refs.emotion;
        },
        mouseOut: function(e) {
            if (this.clickEventOccur) return;
            TweenLite.to(e.target, 1, {
                transform: 'translate(0, 0)'
            });
        },
        click: function(e) {
            this.clickEventOccur = true;
            var router = this.$router;
            TweenLite.to(e.target, 1, {
                scale: 0,
                onComplete: function() {
                    router.push({name: 'emotions', params: {select: e.target.className}});
                }
            });
        }
    }
}
</script>
<style>
.yourday {
    position: relative;
    width: 1440px;
    display: flex;
    flex-direction: column;
    flex: 8;
    align-items: center;
}

.yourday > span {
    flex: 1;
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
    flex: 9;
    width: 1440px;
}

.comfortable {
    position: absolute;
    left: 476px;
    top: 393px;
}

.sad {
    position: absolute;
    left: 618px;
    top: 347px;
}

.angry {
    position: absolute;
    left: 731px;
    top: 381px;
}

.worry {
    position: absolute;
    left: 436px;
    top: 559px;
}

.happy {
    position: absolute;
    left: 650px;
    top: 589px;
}
</style>


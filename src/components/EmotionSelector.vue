<template>
    <div class="emotionSelector" @mouseover="startLoop" @mouseout="stopLoop">
        <!-- <div v-for="(item, index) in imgList"
            v-bind:key="index"
            class="emotionItem">
            <img v-bind:src="item.img"/>
            <span>{{item.text}}</span>
        </div> -->
        <img class="eImg" ref="eImg" v-bind:src="imgSrc"/>
        <span>{{text}}</span>
    </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers';
var timer;
export default {
    props: ['start',
            'imgList',
            'textList',
            'colorList',
            'defaultText',
            'imgCanvas',
            'colors'
            ],
    data() {
        return {
            text: this.defaultText,
            imgSrc: '',
        }
    },
    watch: {
        start(newVal) {
            if (newVal) {
                this.changeImageColor(this.colorList[0]);
            }
        }
    },
    mounted() {
        if (this.start) {
            this.imgSrc = this.changeImageColor(this.colorList[0]);
        }
    },
    methods: {
        changeImageColor(color) {
            console.log('color', color);
            var item = this.imgCanvas;
            var canvas = item.canvas;
            var ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = 'source-in';
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // this.$refs.icon.width = canvas.width;
            // this.$refs.icon.height = canvas.height;
            // var iconCtx = this.$refs.icon.getContext('2d');
            // iconCtx.drawImage(canvas, 0, 0);
            this.imgSrc = canvas.toDataURL();
        },
        startLoop() {
            console.log('start loop');
            var that = this;
            var count = 1;
            timer = setInterval(() => {
                that.text = that.textList[count];
                // that.imgSrc = that.imgList[count];
                console.log(that.text, that.textList);
                count++;
                if (count >= that.textList.length) {
                    count = 1;
                }
                // that.imgSrc = that.changeImageColor(this.colorList[count-1]);
                that.changeImageColor(that.colorList[count-1]);
            }, 1000);
        },
        stopLoop() {
            clearInterval(timer);
            this.text = this.defaultText;
            this.changeImageColor(this.colorList[0]);
        }
    },
    beforeDestroy() {
        this.stopLoop();
    },
}
</script>
<style>
.emotionSelector {
    display: flex;
    /* position: absolute; */
    /* width: 150px; */
    /* height: 150px; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* outline: 1px solid red; */
}

.emotionSelector > span {
    font-size: 15px;
}

.eImg {
    width: 100px;
    height: 100px;
    margin: 124px 53px 74px 53px;
}
</style>

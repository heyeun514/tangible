<template>
    <div class="yourday">
        <span>"How was your day?"</span>
        <div class="iconContainer">
            <EmotionSelector 
                v-for="(item, index) in emotionTextList"
                v-bind:clickItem="clickEmotion"
                v-bind:start="start"
                v-bind:key="index"
                v-bind:textList="item"
                v-bind:defaultText="item[0]"
                v-bind:colorList="emotionColors[index]"
                v-bind:imgCanvas="imgCanvas[index]"></EmotionSelector>
        </div>
        <Emotion class="emotion"
                v-if="showEmotion"
                v-bind:start="start"
                v-bind:imgCanvas="imgCanvas"></Emotion>
    </div>
</template>
<script>
import Emotion from '@/components/Emotion';
import EmotionSelector from '@/components/EmotionSelector'
export default {
    components: {
        Emotion,
        EmotionSelector
    },
    data() {
        return {
            iconImgs: [
                'happy.png',
                'circle.png',
                'anger.png',
                'calm.png',
                'complex.png',
            ],
            imgCanvas: [],
            loadingCount: 0,
            start: false,
            emotionTextList: [
                ['Happy', 'Enthusiastic', 'Exciting', 'Contented', 'Joyful'],
                ['Sad', 'Sick', 'Lonely', 'Gloomy', 'Depressed'],
                ['Angry', 'Mad', 'Annoying', 'Irritating', 'Unsatisfactory'],
                ['Comfortable', 'Calm', 'Peaceful', 'Boring', 'Serene'],
                ['Worried', 'Nervous', 'Thoughtful', 'Restless', 'Anxious']
            ],
            emotionColors: [
                ['#FB927E', '#FCA383', '#FCB387', '#FEC68D', '#FFD592'],
                ['#C8ABDB', '#BCB3E4', '#B1BAEC', '#A7C1F3', '#9BC9FC'],
                ['#650E02', '#731003', '#821303', '#901503', '#9E1704'],
                ['#8EE3CA', '#9CE4C2', '#AAE4BA', '#BAE5B1', '#C8E6A9'],
                ['#3A2F45', '#3D384F', '#41425B', '#454C67', '#485672']
            ],
            showEmotion: false,
        }
    },
    watch: {
        loadingCount(newVal) {
            // console.log('loadingCount ', newVal);
            if (newVal >= this.iconImgs.length) {
                this.start = true;
            }
        }
    },
    methods: {
        imgLoading() {
            for(var i =0; i<this.iconImgs.length; i++) {
                this.getImageSrc(this.iconImgs[i]);
            }
        },
        getImageSrc(fileName) {
            this.imgCanvas.push({
                fileName,
                canvas: document.createElement('canvas')
            });
            var idx = this.imgCanvas.length-1;
            var img = document.createElement('img');
            var tempCanvas = this.imgCanvas[idx].canvas;
            var ctx = tempCanvas.getContext('2d');
            var that = this;
            img.onload = function() {
                // console.log('image load', img.width, img.height, img);
                tempCanvas.width = img.width;
                tempCanvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                that.loadingCount++;
            }
            img.src = require(`@/assets/${fileName}`);
        },
        clickEmotion() {
            console.log('click emotion');
            this.showEmotion = !this.showEmotion;
            // console.log(this.showEmotion);
            // animation
            
        }
    },
    mounted() {
        console.log('mounted');
        this.imgLoading();
    },
}
</script>
<style>
.yourday {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.yourday > span {
    font-size: 72px;
    /* flex: 1; */
}

.iconContainer {
    /* position: absolute; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}

@media (min-width: 800px)
{
    .iconContainer {
        width: 800px;
    }
}


.emotion {
    position: absolute;
    top: 1000px;
    /* flex: 4; */
}
</style>


<template>
    <div class="card-container" ref="container">
        <span>Your {{emotion}} days are {{count}}days {{emoti}}</span>
        <img v-if="whiteImg.length > 0"
            v-for="(val, index) in count"
            v-bind:key="index + 'icon'"
            v-bind:style="randomPosition()"
            v-bind:src="whiteImg"/>
    </div>
</template>
<script>
const colors = [
    '#d12525', // angry
    '#ffb000', // hapypy
    '#007fff', // sad
    '#1cc9a9', // comf
    '#7c1fc7' // worry
];

const emotionText = [
    'angry', 'happy', 'sad', 'comfortable', 'worried'
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
export default {
    props: {
        'type': {
            type: Number,
            default: 0,
        },
        'count': {
            type: Number,
            default: 1,
        },
        'imgSrc': {
            type: String,
        }
    },
    data() {
        return {
            emotion:  '',
            emoti: '',
            temp: null,
            whiteImg: '',
            tempImg: '',
        }
    },
    methods: {
        randomPosition() {
            var c = this.$refs.container;
            return {
                position: 'absolute',
                top: getRandomInt(100, c.clientHeight-200) + 'px',
                left: getRandomInt(100, c.clientWidth-200) + 'px'
            }
        },
        changeColorImg() {
            if (!this.canvas) {
                this.tempImg = document.createElement('img');
                this.canvas = document.createElement('canvas');
                // var c = this.canvas;
                // c.width = 
            }
            this.tempImg.onload = (() => {
                this.canvas.width = this.tempImg.width;
                this.canvas.height = this.tempImg.height;
                var ctx = this.canvas.getContext('2d');
                ctx.drawImage(this.tempImg, 0, 0);
                ctx.globalCompositeOperation = 'source-in';
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                this.whiteImg = this.canvas.toDataURL();
                // console.log(this.whiteImg);
            }).bind(this);
            this.tempImg.src = this.imgSrc;


            

        },
        

    },
    mounted() {
        console.log(this.type, this.count, this.imgSrc);
        this.changeColorImg();
        this.emotion = emotionText[this.type];
        this.$refs.container.style.background = colors[this.type];


    }
}
</script>
<style>
.card-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-content: center;
    align-items: center;
}

.card-container > span {
    margin-top: 109px;
    font-size: 72px;
    color: white;
}

.card-container > img {
    color: white;
}
</style>
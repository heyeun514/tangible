<template>
    <div class="card-container" ref="container">
        <span>Your {{emotion}} days are {{count}}days {{emoti}}</span>
        <img v-for="(val, index) in count"
            v-bind:key="index + 'icon'"
            v-bind:style="randomPosition()"
            v-bind:src="imgSrc"/>
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
    props: [
        'type',
        'count',
        'imgSrc'
    ],
    data() {
        return {
            emotion:  '',
            emoti: '',
        }
    },
    methods: {
        randomPosition() {
            return {
                position: 'absolute',
                top: getRandomInt(0, innerHeight),
                left: getRandomInt(0, innerWidth)
            }
        }
    },
    mounted() {
        console.log(this.type, this.count, this.imgSrc);
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
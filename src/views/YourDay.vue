<template>
    <div class="yourday">
        <span>"How was your day?"</span>
        <!-- <div class="emotionContainer"> -->
            <!-- <img v-for="(item, index) in iconImgs"/> -->
        <!-- </div> -->
        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 217.61 217.61">
            <path class="cls-1"
                d="M217.61,108.8a28.05,28.05,0,0,0-15.39-25,28,28,0,0,0-25-43.35,28.05,28.05,0,0,0-43.36-25,28,28,0,0,0-50.06,0,28,28,0,0,0-43.35,25,28,28,0,0,0-25,43.35,28,28,0,0,0,0,50.06,28.05,28.05,0,0,0,25,43.36,28,28,0,0,0,43.35,25,28,28,0,0,0,50.06,0,28.05,28.05,0,0,0,43.36-25,28.05,28.05,0,0,0,25-43.36A28,28,0,0,0,217.61,108.8Z"/>
        </svg> -->
        <Emotion class="emotion"></Emotion>
    </div>
</template>
<script>
import Emotion from '@/components/Emotion';

export default {
    components: {
        Emotion
    },
    data() {
        return {
            iconImgs: [],
        }
    },
    mounted() {
        console.log('mounted');
    },
}
</script>
<style>
.emotionContainer {
    display: flex;
}

.yourday > span {
    font-size: 80px;
}

.emotion {
    position: absolute;
    top: 200px;
}
</style>


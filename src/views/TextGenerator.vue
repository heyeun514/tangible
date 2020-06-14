<template>
    <div class="gen-container">
        <div v-if="!start" class="guide">Just type it in! Something funny will popup</div>
         <GhostText class="stage" v-bind:text="inputText"></GhostText>
    </div>
</template>
<script>
// import '../utils/createjs.js';
import GhostText from '@/components/GhostText';


export default {
    props: ['type'],
    data() {
        return {
            start: false,
            inputText: '',
        }
    },
    components: {
        GhostText,
    },
    methods: {
        keyHandler(e) {
            console.log(e.keyCode);
            this.inputChar = e.key;
            this.inputText += e.key;
            this.start = true;

            
        }
    },
    mounted() {
        console.log(this.type);
        document.addEventListener('keydown', this.keyHandler);
    }
}
</script>
<style>
.gen-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
}


.guide {
    font-family: futura;
    color: white;
    font-size: 36px;
    color: #1cc9a9;
    opacity: 0.3;
}

.stage {
    position: absolute;
    left: 0;
    top: 0;
}
</style>


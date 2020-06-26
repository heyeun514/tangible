<template>
    <div class="gen-container">
        <div v-if="!start" class="guide">Just type it in! Something funny will popup</div>
         <GhostText v-if="showCompo(0)" class="stage" v-bind:text="inputText"></GhostText>
         <MoveText v-if="showCompo(1)" class="stage" v-bind:text="inputText"></MoveText>
    </div>
</template>
<script>
// import '../utils/createjs.js';
import GhostText from '@/components/GhostText';
import MoveText from '@/components/MoveText';

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
        MoveText
    },
    methods: {
        keyHandler(e) {
            console.log(e.keyCode);
            if (e.keyCode >= 65 && e.keyCode <= 95) {
                this.inputChar = e.key;
                this.inputText += e.key;
                this.start = true;
            }
        },
        showCompo(type) {
            return (this.type == type);
        }
    },
    mounted() {
        console.log('type?', this.type, typeof this.type);
        document.addEventListener('keydown', this.keyHandler);
        this.$emit('updateBgStyle', 'black');
    },
    beforeDestroy() {
        this.$emit('updateBgStyle', 'white');
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


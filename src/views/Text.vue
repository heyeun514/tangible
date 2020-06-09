<template>
    <div class="text-container">
        <GhostText v-bind:text="inputText"></GhostText>
        <div class="input-box">
            <div class="input-text">{{inputText}}</div>
            <div class="line"></div>
        </div>
    </div>
</template>
<script>
import GhostText from '@/components/GhostText';

var defaultText = "Just type it in! Something funny will pop up.";
export default {
    components: {
        GhostText,
    },
    data() {
        return {
            inputText: defaultText,
            inputChar: '',
            typeStart: false,
        }
    },
    methods: {
        keyHandler(e) {
            console.log(e.keyCode);
            if (e.key == 'Enter') {
                this.inputText = defaultText;
                this.typeStart = false;
                return;
            }
            if (!this.typeStart) {
                this.typeStart = true;
                this.inputText = '';
            } 
            this.inputChar = e.key;
            this.inputText += e.key;
        }
    },
    mounted() {
        document.addEventListener('keydown', this.keyHandler);
    },

}
</script>
<style>
.text-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: black;
    
}

.input-box {
    position: absolute;
    width: 100%;
    height: 120px;
    bottom: 0;
    background-color: #007fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.input-text {
    width: 90%;
    height: 46px;
    font-family: Futura;
    font-size: 36px;
    color: white;
    opacity: 0.4;
    margin-bottom: 11px;
}

.line {
    background-color: white;
    width: 90%;
    height: 2px;
}
</style>
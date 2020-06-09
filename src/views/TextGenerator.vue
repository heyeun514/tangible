<template>
    <div class="container">
        <div class="text-input">
            <div class="line"></div>
        </div>
    </div>
</template>
<script>
import '../utils/createjs.js';

export default {
    props: ['type'],
    mounted() {
        console.log(this.type);
    }
}
</script>
<style>
.container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: black;
}

.text-input {
    position: absolute;
    height: 120px;
    width: 100%;
    bottom: 0;
    background-color: #007fff;
    display: flex;
    justify-content: center;
}

.line {
    margin-top: 88px;
    width: 1200px;
}
</style>


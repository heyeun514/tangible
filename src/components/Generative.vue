<template>
    <div class="generative-container">
        <span class="text-main">{{mainText}}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mainText: "helloWorld"
        }
    },
}
</script>
<style>
.main-text {
    -webkit-text-stroke: 1px black;
    -webkit-text-fill-color: white;
}
</style>

<template>
    <div class='text-container'>
        <div class="text-item"
            v-on:click="onClick(0)"></div>
        <div class="text-item"
            v-on:click="onClick(1)"></div>
        <div class="text-item"
            v-on:click="onClick(2)"></div>
    </div>
</template>
<script>
export default {
    methods: {
        onClick(num) {
            console.log('onClick', num);
            this.$router.push({name: 'textGenerator', param: {type: num}});
        }
    }
}
</script>
<style>
.text-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.text-item {
    width: 98%;
    height: 200px;
    outline: 1px solid black;
    margin: 10px;
}
</style>

<template>
    <div class="cong" v-on:click="movePath">
        <!-- <img class="thumb" src=""/> -->
        <div class="thumb"></div>
        <span class="title">{{title}}</span>
    </div>
</template>
<script>
export default {
    props: ['title', 'path'],
    methods: {
        movePath() {
            console.log('path', this.path);
            this.$router.push({
                name: this.path
            });
        }
    },
}
</script>
<style>
.cong {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 300px;
    outline: 1px solid red;
}

.cong > .thumb {
    flex-grow: 5;
}

.cong > .title {
    font-size: 30px;
    flex-grow: 1;
    text-align: center;
}
</style>

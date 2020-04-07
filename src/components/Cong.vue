<template>
    <div class="cong" v-on:click="movePath">
        <img src=""/>
        <span>{{title}}</span>
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
    width: 500px;
    height: 500px;
    outline: 1px solid red;
}

.cong > img {
    width: 500px;
    height: 450px;
    outline: 1px solid blue;
}

.cong > span {
}
</style>

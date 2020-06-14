<template>
    <div v-bind:class="'cong ' + containerType" v-on:click="movePath">
        <!-- <img class="thumb" src=""/> -->
        <div class="thumb"></div>
        <span class="title">{{title}}</span>
    </div>
</template>
<script>
export default {
    props: ['title', 'path', 'type'],
    data() {
        return {
            containerType: this.type == 0 ? 'wide' : 'normal'
        }
    },
    methods: {
        movePath() {
            console.log('path', this.path);
            this.$router.push({
                name: this.path
            });
        }
    },
    mounted() {
        
    },
}
</script>
<style>
.cong {
    
    display: flex;
    flex-direction: column;
    height: 276px;
    outline: 1px solid black;
    margin: 15px;
}

.wide {
    width: 582px;
}

.normal {
    width: 276px;
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

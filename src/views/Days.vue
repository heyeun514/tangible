<template>
    <div class="days-container">
        <div class="box-container">
            <div class="box" v-bind:id="`${index}box`"  v-for="(item, index) in boxCount" v-bind:key="index">
                <div v-bind:key="index + 'text'" class="text">{{text}}</div>
                <div v-bind:key="index + 'cover'" v-bind:ref="`${index}cover`" v-bind:class="getCoverClass(index)"></div>
            </div>
        </div>
    </div>
</template>
<script>
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
export default {
    data() {
        return {
            boxCount: 120,
            text: '',
            select: -1,
        }
    },
    methods: {
        getCoverClass(index) {
            if (index == this.select) {
                return 'cover move-left';
            }
            return 'cover';
        }
    },
    mounted() {
        this.select = randomInt(0, this.boxCount);
        console.log(this.select);
        // this.$refs[`${this.select}text`].style = {animation : 'to-left 3s ease-in-out forwards'};
    },
}
</script>
<style>
.days-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #b0aba5;
}

.box-container {
    display: flex;
    flex-wrap: wrap;
}

.box {
    outline: 1px solid black;
    /* position: absolute; */
    width: 100px;
    height: 100px;
    margin: 3px;
    overflow: hidden;
    /* background-color: #b0aba5; */
    /* box-shadow: 8px 9px 5px -10px rgba(0,0,0,1); */
    /* transform: translateX(-10px); */
}

.box > .text {
    width: 100%;
    height: 100%;
    background-color: black;
    color: white;
    font-size: 100px;
    text-align: center;
    /* vertical-align: middle; */
    line-height: 100px;
}

.box > .cover {
    position: relative;
    width: 100px;
    height: 100px;
    background-color: #b0aba5;
    transform: translateY(-100%);
    /* animation: to-left 3s ease-in-out forwards; */
}

.move-left {
    animation: to-left 3s ease-in-out forwards;
}

@keyframes to-left {
    from {
        transform: translateY(-100%) translateX(0);
    }

    to {
        transform: translateY(-100%) translateX(-100%);
    }
}
</style>


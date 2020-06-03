<template>
    <div class="card-container" ref="container">
        <span></span>
    </div>
</template>
<script>
const colors = [
    '#d12525',
    '#ffb000',
    '#007fff',
    '#1cc9a9',
    '7c1fc7'
];
export default {
    props: [
        'type', 'count'
    ],
    data: [

    ],
    methods: {
    },
    mounted() {
        console.log(this.type, this.count);
        this.$refs.container.style.background = colors[this.type];
    }
}
</script>
<style>
.card-container {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
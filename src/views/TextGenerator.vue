<template>
    <div class="generator-container">
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

</style>


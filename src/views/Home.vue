<template>
  <div class="home">
    <span class="title">21F</span>
    <div class="cong-container">
      <Cong title="How was your day?" path="yourDay"></Cong>
      <Cong title="Sound" path="sound"></Cong>
      <Cong title="Sound2" path="sound2"></Cong>
      <Cong title="Fractal" path="fractal"></Cong>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Cong from '@/components/Cong.vue'

export default {
  name: 'Home',
  components: {
    Cong
  }
}
</script>
<style>
.cong-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.title {
  font-size: 100px;
}
</style>


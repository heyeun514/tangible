<template>
  <div class="home-container">
    <Cong title="how was your day" path="yourDay"></Cong>
    <Cong title="neumorphism" path="sound2"></Cong>
    <Cong title="fractal" path="fractal"></Cong>
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
  },
}
</script>
<style>
.home-container {
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
  /* width: 1024px; */
  flex: 1;
}

.select {
  text-decoration: underline;
}

@media (max-width: 1024px) { /*1024이하*/
  .home-container {
    width: 100%;
  }
}

@media (max-width: 767px) { /*767이하*/
  .home-container {
    width: 100%;
  }
}

.title {
  font-size: 100px;
}



</style>


<template>
  <div class="home-container">
    <Cong title="how was your day" path="yourDay" type="0"></Cong>
    <Cong title="neumorphism" path="sound2" type="0" ></Cong>
    <Cong title="fractal" path="fractal" type="0"></Cong>
    <Cong title="textHome" path="textHome" type="1"></Cong>
    <Cong title="textHome" path="textHome" type="1"></Cong>
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
  justify-content: space-between;
  /* flex-direction: column; */
  /* width: 1024px; */
  flex: 1;
  flex-wrap: wrap;
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


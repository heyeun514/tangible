<template>
  <div class="home-container">
    <Cong title="how was your day" path="yourDay"></Cong>
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
  flex-direction: column;
  width: 1024px;
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

.cong-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.title {
  font-size: 100px;
}



</style>


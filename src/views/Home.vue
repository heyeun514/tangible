<template>
  <div class="home">
    <span class="title">21F</span>
    <Cong title="How was your day?" path="yourDay"></Cong>
    <Cong title="Sound" path="sound"></Cong>
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
.home {
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 50px;
}
</style>


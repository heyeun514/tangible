<template>
  <div id="app">
    <!-- <HelloWorld msg="Project 21F"/> -->
    <Today></Today>
  </div>
</template>

<script>
// import Sound from './components/Sound.vue'
import Today from './components/Today.vue'
import decomp from 'poly-decomp';

export default {
  name: 'App',
  components: {
    // Sound
    Today
  },
  created() {
    window.decomp = decomp;
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

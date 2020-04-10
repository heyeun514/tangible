<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './views/Home.vue'
import decomp from 'poly-decomp';
import 'pathseg';

export default {
  name: 'App',
  components: {
    Home
  },
  created() {
    window.decomp = decomp;
  },
}
</script>

<style>
#app {
  font-family: NotoSans_Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}

@font-face {
  font-family: 'NotoSans_Regular';
  src: url('./assets/Noto_Sans/NotoSans-Regular.ttf');
}
</style>

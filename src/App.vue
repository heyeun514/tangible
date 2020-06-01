<template>
  <div id="app">
    <header class="item">
      <router-link
        v-bind:class="`project ${select == 0 ? 'select': ''}`"
        :to="{path: 'project'}"
      >PROJECTS</router-link>
      <router-link
        v-bind:class="`about ${select == 1 ? 'select': ''}`"
        :to="{path: 'about'}"
      >ABOUT</router-link>
    </header>
    <span class="item">NINE FLOOR</span>
    <div class="item container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import Project from './views/Home.vue'
import decomp from 'poly-decomp';
import 'pathseg';

export default {
  name: 'App',
  components: {
    // Home
  },
  created() {
    window.decomp = decomp;
    // this.$router.
  },
  data() {
    return {
      select: 0,
    }
  },
}
</script>

<style>
body {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
}
#app {
  font-family: NotoSans_Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1440px;
  height: 100%;
  /* height: 1000px; */
  /* justify-content: center; */
  /* text-align: center; */
  /* color: #2c3e50; */
}

@font-face {
  font-family: 'NotoSans_Regular';
  src: url('./assets/fonts/NotoSans-Regular.ttf');
}

@font-face {
  font-family: 'Futura';
  src: url('./assets/fonts/Futura Medium.otf');
}

.item {
  width: 100%;
}

header {
  flex: 0;
  display: flex;
  justify-content: flex-end;
}

header > a {
  margin: 0 10px 10px;
}

#app > span {
  flex-grow: 0;
  font-size: 30px;
  text-align: center;
}

#app > .container {
  flex-grow: 1;
}

</style>

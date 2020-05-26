<template>
  <div id="app">
    <header>
      <router-link
        v-bind:class="`project ${select == 0 ? 'select': ''}`"
        :to="{path: 'project'}"
      >PROJECTS</router-link>
      <router-link
        v-bind:class="`about ${select == 1 ? 'select': ''}`"
        :to="{path: 'about'}"
      >ABOUT</router-link>
    </header>
    <span>NINE FLOOR</span>
    <router-view></router-view>
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
#app {
  font-family: NotoSans_Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
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

header {
  flex: 1;
  display: flex;
  width: 1024px;
  justify-content: flex-end;
}

header > a {
  margin: 0 10px 10px;
}

#app > span {
  flex: 1;
}

</style>

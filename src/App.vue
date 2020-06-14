<template>
  <div id="app">
    <header>
      <span>9th Floor</span>
      <div class="links">
        <router-link to="project" tag="div" active-class="active">PROJECTS</router-link>
        <router-link to="about" tag="div" active-class="active">ABOUT</router-link>
      </div>
    </header>
    
    <div class="app-container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
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
  src: url('./assets/fonts/Futura Medium.ttf');
}

@font-face {
  font-family: 'CooperBlack';
  src: url('./assets/fonts/CooperBlack.ttf');
}


header {
  width: 100%;
  flex: 0;
  display: flex;
  font-family: Futura;
  margin: 93px 0;
  justify-content: space-between;
  height: 46px;
  align-items: flex-end;
}

.links {
  display: flex;
}

.links > div {
  margin: 2px 45px;
  font-size: 12px;
  width: 96px;
  text-align: center;
}

/*div:active {
  box-shadow: inset 0 0px 0 white, inset 0 -1px 0 black
} */

div.active {
  box-shadow: inset 0 0px 0 white, inset 0 -1px 0 black
}

header > span {
  flex-grow: 0;
  font-size: 36px;
  text-align: left;
  font-family: Futura;
  line-height: 46px;
  vertical-align: middle;
}

.app-container {
  width: 100%;
  height: 100%;
}

</style>

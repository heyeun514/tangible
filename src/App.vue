<template>
  <div id="app">
    <header>
      <span v-bind:class="titleStyle">9th Floor</span>
      <div class="links">
        <router-link to="project" tag="div" v-bind:class="titleStyle" v-bind:active-class="activeStyle">PROJECTS</router-link>
        <router-link to="about" tag="div"  v-bind:class="titleStyle" v-bind:active-class="activeStyle">ABOUT</router-link>
      </div>
    </header>
    
    <div class="app-container">
      <router-view v-on:updateBgStyle="updateBgStyle"></router-view>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import decomp from 'poly-decomp';
import 'pathseg';
import NotoSans from './assets/fonts/NotoSans-Regular.ttf';
import Futura from './assets/fonts/Futura.ttf';
import CooperBlack from './assets/fonts/CooperBlack.ttf';
import AndaleMono from './assets/fonts/AndaleMono.ttf';
import Bodoni from './assets/fonts/Bodoni.ttf'
console.log(Futura)

export default {
  name: 'App',
  components: {
    // Home
  },
  data() {
    return {
      titleStyle: 'title-white',
      activeStyle: 'active-white',
      select: 0,
      update: null,
    }
  },
  created() {
    window.decomp = decomp;
    this.update = this.updateBgStyle.bind(this);
  },
  methods: {
    updateBgStyle(mode, bgColor) {
      this.titleStyle = (mode == 'black') ? 'title-black' : 'title-white';
      this.activeStyle = (mode == 'black') ? 'active-black' : 'active-white';
      document.body.style.backgroundColor = bgColor || mode;
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
  width: 1200px;
  height: 100%;
  /* height: 1000px; */
  /* justify-content: center; */
  /* text-align: center; */
  /* color: #2c3e50; */
}

@font-face {
  font-family: 'NotoSans_Regular';
  src: url('assets/fonts/NotoSans-Regular.ttf');
}

@font-face {
  font-family: 'Futura';
  src: url('assets/fonts/Futura.ttf');
}

@font-face {
  font-family: 'CooperBlack';
  src: url('assets/fonts/CooperBlack.ttf');
}

@font-face {
  font-family: 'AndaleMono';
  src: url('assets/fonts/AndaleMono.ttf');
}

@font-face {
  font-family: 'BodoniSvtyTwoITCTT';
  src: url('assets/fonts/Bodoni.ttf');
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

.title-black {
  color: white;
}

.title-white {
  color: black;
}

div.active-white{
  box-shadow: inset 0 0px 0 white, inset 0 -1px 0 black
}

div.active-black{
  box-shadow: inset 0 0px 0 black, inset 0 -1px 0 white
}

.app-container {
  width: 100%;
  height: 100%;
}

</style>

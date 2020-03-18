<template>
  <div class="container">
    <div v-for="item in 196" class="circleBox" v-bind:key="item">
      <div class="shadow"></div>
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
// import gsap from "gsap";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    move: function() {
      // gsap.to()
    }
  },
  mounted() {
    this.move();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background: #81c9c8;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.circleBox {
  /* display: flex; */
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  /* justify-content: center; */
}
.circle {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 80px;
  height: 80px;
  border-radius:50%;
  /* background: #e44d42; */
  border: 1px solid red;
  animation: moveUp 2s infinite;
  animation-timing-function: ease-in;
}
.shadow {
  position: absolute;
  left: 12px;
  top: 12px;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  /* background: #369098; */
  border: 1px solid;
  /* animation: moveDown 2s infinite; */
  /* animation-timing-function: ease-in; */
}

.up {
  transform: translate(-10px);
}

@keyframes moveUp {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-10px, -10px)
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes moveDown {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(10px, 10px)
  }
  100% {
    transform: translate(0, 0);
  }
}



</style>

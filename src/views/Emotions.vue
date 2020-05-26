<template>
    <div class="emotions-container">
    </div>
</template>
<script>
import Matter from "matter-js";
const EMOTION = {
    ANGRY: 0,
    HAPPY: 1,
    WORRY: 2,
    COMF: 3,
    WORRY: 4,
};

const PATH = [
    '@/assets/congal1/angry.png',
    '@/assets/congal1/happy.png',
    '@/assets/congal1/worry.png',
    '@/assets/congal1/comfortable.png',
    '@/assets/congal1/worry.png',
]
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
export default {
    props: ['select'],
    data() {
        return {
            float: [
                EMOTION.ANGRY,
                EMOTION.HAPPY,
                EMOTION.ANGRY,
                EMOTION.CONF,
                EMOTION.CONF,
                EMOTION.CONF,
                EMOTION.HAPPY,
                EMOTION.HAPPY,
                EMOTION.SORRY,
                EMOTION.SORRY,
                EMOTION.SORRY,
                EMOTION.WORRY,
                EMOTION.WORRY,
                EMOTION.HAPPY,
                EMOTION.HAPPY,
                EMOTION.HAPPY
            ],
        }
    },
    methods: {
        init: function(parent, engine, runner) {
            parent.width = innerWidth;
            parent.height = innerHeight;
            // const ctx = canvas.getContext('2d');
            const Bodies = Matter.Bodies;
            const World = Matter.World;
            const render = Matter.Render.create({
                element: parent,
                engine,
                options: {
                    width: innerWidth, 
                    height: innerHeight,
                    wireframes: false,
                    bakcground: 'transparent'
                }
            });

            this.float.map((value) => {
                console.log(value);
                // getRandomInt(0, innerWidth)
                this.createItem(getRandomInt(0, innerWidth),
                                getRandomInt(0, innerHeight),
                                random);
            });
        },
        createItem: function(x, y, type) {
            const shape = shape || 'circle';
            Bodies.circle(x, y, )
        }
    },
    mounted() {
        console.log(this.select);
        this.init(this.$refs.emotions,
            Matter.Engine.create(),
            Matter.Runner.create(),
        );
    },
}
</script>
<style>

</style>
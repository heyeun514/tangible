<template>
    <div class="emotions-container" ref="emotions"></div>
</template>
<script>
import Matter from "matter-js";
const EMOTION = {
    ANGRY: 0,
    HAPPY: 1,
    SAD: 2,
    COMF: 3,
    WORRY: 4,
};

const PATH = [
    'angry',
    'happy',
    'worry',
    'comfortable',
    'worry',
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
            imgResource: [],
            finishLoad: false,
            float: [
                EMOTION.ANGRY,
                EMOTION.HAPPY,
                EMOTION.ANGRY,
                EMOTION.COMF,
                EMOTION.COMF,
                EMOTION.COMF,
                EMOTION.HAPPY,
                EMOTION.HAPPY,
                EMOTION.SAD,
                EMOTION.SAD,
                EMOTION.SAD,
                EMOTION.WORRY,
                EMOTION.WORRY,
                EMOTION.HAPPY,
                EMOTION.HAPPY,
                EMOTION.HAPPY
            ],
        }
    },
    watch: {
        finishLoad(newVal) {
            console.log('newVal', newVal);
            if (newVal) {
                this.init(this.$refs.emotions,
                    Matter.Engine.create(),
                    Matter.Runner.create(),
                );
            }
            
        }
    },
    methods: {
        init: function(parent, engine, runner) {
            var Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies;
     
 
            var render = Render.create({
                            element: parent,
                            engine: engine,
                            options: {
                                width: innerWidth,
                                height: innerHeight,
                                wireframes: false
                            }
                        });

            var items = [];
            this.float.map((val) => {
                console.log('v', val);
                items.push(this.createItem(getRandomInt(0, innerWidth), getRandomInt(0, innerHeight), val));
            });
 
            World.add(engine.world, items);
            
            Engine.run(engine);
            Render.run(render);
        
        },
        createItem: function(x, y, type) {
            // console.log(type);
            console.log(this.imgResource[type]);
            const Bodies = Matter.Bodies;
            const shape = shape || 'circle';
            return Bodies.circle(x, y, 10, {
                render: {
                    sprite: {
                        // texture: this.imgResource[type],
                    }
                }
            })
        },
        imageLoad: function() {
            console.log('imgLoad');
            var that = this;
            PATH.map((p) => {
                var img = new Image();
                img.onload = function() {
                    that.imgResource.push(img);
                    that.finishLoad = true;
                }
                img.src = require(`../assets/congal1/${p}.png`);
            });
        }
    },
    mounted() {
        console.log(this.select);
        this.imageLoad();
        
    },
}
</script>
<style>

</style>
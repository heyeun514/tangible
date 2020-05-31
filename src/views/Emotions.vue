<template>
    <div class="emotions-container" ref="emotions">
    </div>
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
    'sad',
    'comfortable',
    'worry',
];

const bgColor = [

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
            Body = Matter.Body,
            Bodies = Matter.Bodies,
            Events = Matter.Events,
            Common = Matter.Common,
            Composite = Matter.Composite,
            Composites = Matter.Composites,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse;
    
            var render = Render.create({
                            element: parent,
                            engine: engine,
                            options: {
                                width: innerWidth,
                                height: innerHeight,
                                wireframes: false,
                                background: 'transparent',
                            }
                        });
            var bodyOptions = {
                frictionAir: 0.01, 
                friction: 0.1,
                restitution: 1
            };
            var items = [],
            showNewItem = false,
            newItemScale = 0.01,
            newItem,
            clickedItem;

            this.float.map((val) => {
                items.push(this.createItem(getRandomInt(0, innerWidth), getRandomInt(0, innerHeight), val, bodyOptions));
            });

            engine.world.gravity.y = 0;
            var explosion = function(engine) {
                var bodies = Composite.allBodies(engine.world);

                for (var i = 0; i < bodies.length; i++) {
                    var body = bodies[i];
                    
                    if (!body.isStatic) {
                        var forceMagnitude = 0.05 * body.mass;
                        Body.applyForce(body, body.position, {
                            x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]) * 0.3, 
                            y: (forceMagnitude + Common.random() * -forceMagnitude) * Common.choose([1, -1]) * 0.3
                        });
                        
                    }

                }
            };

            var timeScaleTarget = 1,
            counter = 0;
            
            engine.timing.timeScale = 0.3;
            var that = this;
            //// Frame
            Events.on(engine, 'afterUpdate', function(event) {
                counter += 1;
                // every 6 sec
                if (counter >= 60 * 3) {
                    explosion(engine);
                    counter = 0;
                }
                if (counter >= 30 && showNewItem == false) {
                    showNewItem = true;
                    console.log(that.select);
                    newItem = that.createItem(innerWidth/2, innerHeight/2,
                        that.select, bodyOptions, 0.1);
                    // Body.scale(newItem, 0.5, 0.5);
                    that.float.push(that.select);
                    World.add(engine.world, newItem);
                }
                if (newItem && newItem.render.sprite.xScale < 1) {
                    newItem.render.sprite.xScale += newItemScale;
                    newItem.render.sprite.yScale += newItemScale;
                }
                if (clickedItem) {
                    clickedItem.render.sprite.xScale += newItemScale;
                    clickedItem.render.sprite.yScale += newItemScale;
                }
                
            });

            World.add(engine.world, [
                Bodies.rectangle(innerWidth/2, 0, innerWidth, 50, {isStatic: true}),
                Bodies.rectangle(innerWidth/2, innerHeight, innerWidth, 50, {isStatic: true}),
                Bodies.rectangle(innerWidth, innerHeight/2, 50, innerHeight, {isStatic: true}),
                Bodies.rectangle(0, innerHeight/2, 50, innerHeight, {isStatic: true}),
            ]);
            
            World.add(engine.world, items);
            explosion(engine);
            Engine.run(engine);
            Render.run(render);


            // add mouse control
            var mouse = Mouse.create(render.canvas),
                mouseConstraint = MouseConstraint.create(engine, {
                    mouse: mouse,
                    constraint: {
                        stiffness: 0.2,
                        render: {
                            visible: false
                        }
                    }
                });
            
            Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
                var bodies = Composite.allBodies(engine.world);
                var foundPhysics = Matter.Query.point(bodies, event.mouse.position);
                console.log(foundPhysics);
                clickedItem = foundPhysics.length > 0 ? foundPhysics[0] : null
                bodies.map((body) => {
                    if ((foundPhysics.length) > 0 &&
                        (body.dataType !== foundPhysics[0].dataType)) {
                        body.render.opacity = 0.5;
                    }
                });
            });

            Matter.Events.on(mouseConstraint, 'mouseup', function(event) {
                var bodies = Composite.allBodies(engine.world);
                bodies.map((body) => {
                    body.render.opacity = 1;
                    body.render.sprite.xScale = 1;
                    body.render.sprite.yScale = 1;
                });
                clickedItem = null;
            });

            World.add(engine.world, mouseConstraint);

            // keep the mouse in sync with rendering
            render.mouse = mouse;
        },
        createItem: function(x, y, type, opt, scale) {
            // console.log(type);
            // console.log(this.imgResource[type]);
            const Bodies = Matter.Bodies;
            const shape = shape || 'circle';
            var option = {...opt, ...{
                render: {
                    sprite: {
                        texture: require(`../assets/congal1/${PATH[type]}.png`),
                        xScale: scale || 1,
                        yScale: scale || 1
                    }
                },
                dataType: type,
            }};
            // console.log(option);
            return Bodies.circle(x, y, 50, option)
        },
        imageLoad: function() {
            console.log('imgLoad');
            var that = this;
            PATH.map((p) => {
                var img = new Image();
                img.onload = function() {
                    that.imgResource.push(img.src);
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
.emotions-container > canvas {
    width: 100%;
    height: 100%;
}
</style>
<template>
    <div class="emotions-container" ref="emotions">
        <canvas ref="canvas"></canvas>
        <div class="detail" v-if="showDetail">
            <img v-bind:src="selectGif"
                v-on:click="exitDetail" />
            <div class="inform">
                {{selectTime}}<br>
                {{selectDate}}
            </div>
        </div>
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
export default {
    props: ['select'],
    data() {
        return {
            selectTime: "10:31 PM",
            selectDate: "May 13th 2020",
            imgResource: [],
            finishLoad: false,
            // cardPage: false,
            showDetail: false,
            selectGif: "",
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
                this.engine = Matter.Engine.create();
                this.init(this.$refs.emotions,
                    this.engine,
                    Matter.Runner.create(),
                );
            }
        },
        // cardPage(newVal) {
        //     if (newVal) {
        //         this.$router.push({
        //             name: 'card',
        //         });
        //     }
        // }
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
                            // element: parent,
                            canvas: this.$refs.canvas,
                            engine: engine,
                            options: {
                                width: this.$refs.emotions.clientWidth,
                                height: this.$refs.emotions.clientHeight,
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
                items.push(this.createItem(getRandomInt(0, this.clientWidth), getRandomInt(0, this.clientHeight), val, bodyOptions));
            });

            engine.world.gravity.y = 0;
            var explosion = function(engine) { // explosion
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
            //// Frame /////
            Events.on(engine, 'afterUpdate', function(event) {
                counter += 1;
                // every 3 sec
                if (counter >= 60 * 3) {
                    explosion(engine);
                    counter = 0;
                }
                if (counter >= 30 && showNewItem == false) {
                    showNewItem = true;
                    console.log(that.select);
                    newItem = that.createItem(that.clientWidth/2, innerHeight/2,
                        that.select, bodyOptions, 0.1);
                    that.float.push(that.select);
                    World.add(engine.world, newItem);
                }
                if (newItem && newItem.render.sprite.xScale < 1) {
                    newItem.render.sprite.xScale += newItemScale;
                    newItem.render.sprite.yScale += newItemScale;
                }
                //// long press /////
                if (clickedItem) {
                    clickedItem.render.sprite.xScale += newItemScale;
                    clickedItem.render.sprite.yScale += newItemScale;
                };
            });

            //sides
            World.add(engine.world, [
                Bodies.rectangle(this.clientWidth/2, 0, this.clientWidth, 50,
                    {isStatic: true, render: {fillStyle: 'transparent'}}),
                Bodies.rectangle(this.clientWidth/2, this.clientHeight, this.clientWidth, 50,
                    {isStatic: true, render: {fillStyle: 'transparent'}}),
                Bodies.rectangle(this.clientWidth, this.clientHeight/2, 50, this.clientHeight,
                    {isStatic: true, render: {fillStyle: 'transparent'}}),
                Bodies.rectangle(0, this.clientHeight/2, 50, this.clientHeight,
                    {isStatic: true, render: {fillStyle: 'transparent'}}),
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
            
            var timeOut;
            Matter.Events.on(mouseConstraint, 'mousedown', function(event) {

                // make dim
                var bodies = Composite.allBodies(engine.world);

                var foundPhysics = Matter.Query.point(bodies, event.mouse.position);
                clickedItem = (foundPhysics.length > 0 ? foundPhysics[0] : null);
                that.makeDim(bodies, (body) => {
                    return (body.dataType == foundPhysics[0].dataType);
                })
                timeOut = setTimeout(() => {
                    if (timeOut) {
                        clearTimeout(timeOut);
                        timeOut = null;
                    }
                    that.$router.push({name: 'card',
                        params: {
                            type: clickedItem.dataType,
                            count: that.getTypeCount(clickedItem.dataType, that.float),
                            imgSrc: require(`../assets/congal1/${PATH[clickedItem.dataType]}.png`),
                        }});
                }, 1000);
            });

            Matter.Events.on(mouseConstraint, 'mousemove', function() {
                // if (timeOut) {
                //     clearTimeout(timeOut);
                //     timeOut = null;
                // }
            });

            Matter.Events.on(mouseConstraint, 'mouseup', function(event) {
                var bodies = Composite.allBodies(engine.world);
                bodies.map((body) => {
                    body.render.opacity = 1;
                    body.render.sprite.xScale = 1;
                    body.render.sprite.yScale = 1;
                });
                if (clickedItem) {
                    // click, show Card
                    // make dim
                    that.makeDim(Composite.allBodies(engine.world));
                    that.selectGif = require(`@/assets/gif/${PATH[clickedItem.dataType]}/${getRandomInt(1, 4)}.gif`);
                    that.showDetail = true;
                    
                }
                clickedItem = null;
                if (timeOut) {
                    clearTimeout(timeOut);
                    timeOut = null;
                }
            });

            World.add(engine.world, mouseConstraint);
            // keep the mouse in sync with rendering
            render.mouse = mouse;
        },
        makeDim: function(bodies, exception) {
            bodies.map((body) => {
                if (exception ? exception(body) : false) return;
                body.render.opacity = 0.5;
            });
        },
        createItem: function(x, y, type, opt, scale) {
            console.log(type);
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
            return Bodies.circle(x, y, 80, option)
        },
        getTypeCount(type, data) {
            var c = 0;
            data.map((val) => {
                if (val == type) {
                    c++;
                }
            });
            return c;
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
        },
        exitDetail: function() {
            this.showDetail = false;
            var bodies = Matter.Composite.allBodies(this.engine.world);
            bodies.map((body) => {
                body.render.opacity = 1;
            });
        }
    },
    mounted() {
        this.imageLoad();
        this.clientWidth = this.$refs.emotions.clientWidth;
        this.clientHeight = this.$refs.emotions.clientHeight;
        console.log(this.select, this.clientWidth, this.clientHeight);
    },
    beforeDestroy() {
        console.log('before destroy');
    }
}
</script>
<style>
.emotions-container {
    position: relative;
    height: 100%;
    width: 100%;
    /* display: flex; */
    /* justify-content: center; */
}
.emotions-container > canvas {
    /* width: 100%; */
    /* height: 100%; */
}
.detail {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 640px;
    height: 520px;
}

.detail > img{
    width: 640px;
    height: 480px;
}
</style>
<template>
    <div ref="emotion" class="emotion">
        <canvas id="gradation" ref="gradation"></canvas>
        <canvas id="backgroundBody" ref="bg"></canvas>
    </div>
</template>
<script>
import Matter from "matter-js";
var Engine, Render, World, Bodies, Runner;
var Composites, Common, MouseConstraint, Mouse, Svg, Vertices;
var engine, render, world;
var bgCanvas, gdCanvas;
var myBodies = [];
const EMOTION = {
    HAPPY: 0,
    SAD: 1,
    ANGRY: 2,
    COMFORTABLE: 3,
    WORRY: 4
};

export default {
    name: 'Emotion',
    props: ['start',
            'imgCanvas',
            'emotionColors'],
    data() {
        return {
            tempCanvas: null, // temp canvas element
            itemData: [],
        }
    },
    watch: {
        start(newVal) {
            this.load();
        }
    },
    methods: {
        init() {
            this.itemData =[];
            myBodies = [];
        },
        getImage(fileName, color) {
            // search canvas
            var i;
            for(i =0; i<this.imgCanvas.length; i++){
                if (this.imgCanvas[i].fileName == fileName)
                    break;
            }
            if (i == this.imgCanvas.length) {
                console.log('Error: no file');
                return;
            }
            var item = this.imgCanvas[i];
            var canvas = item.canvas;
            var ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = 'source-in';
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            return canvas.toDataURL();
        },
        load() {
            console.log('load emotion', innerHeight, innerWidth);
            const screenWidth = innerWidth;
            const screenHeight = innerHeight;
            this.init();
            // background
            bgCanvas = this.$refs.bg;
            gdCanvas = this.$refs.gradation;

            bgCanvas.width = innerWidth;
            bgCanvas.height = innerHeight;
            gdCanvas.width = innerWidth;
            gdCanvas.height = innerHeight;

            var bgCtx = bgCanvas.getContext('2d');
            bgCtx.beginPath();
            bgCtx.moveTo(screenWidth * 0.12, 0);
            bgCtx.lineTo(screenWidth * 0.24, screenHeight/2);
            bgCtx.lineTo(screenWidth * 0.12, screenHeight);
            bgCtx.lineTo(screenWidth * (1-0.12), screenHeight);
            bgCtx.lineTo(screenWidth * (1-0.24), screenHeight/2);
            bgCtx.lineTo(screenWidth * (1-0.12), 0);
            bgCtx.fillStyle = "white";
            bgCtx.fill();

            Engine = Matter.Engine;
            Render = Matter.Render;
            World = Matter.World;
            Bodies = Matter.Bodies;
            Runner = Matter.Runner;
            Composites = Matter.Composites;
            Common = Matter.Common;
            Mouse = Matter.Mouse;
            MouseConstraint = Matter.MouseConstraint;
            Svg = Matter.Svg;
            Vertices = Matter.Vertices;

            
            engine = Engine.create();
            render = Render.create({
                element: this.$refs.emotion,
                engine: engine,
                options: {
                    width: screenWidth,
                    height: screenHeight,
                    wireframes: false,
                    background: 'transparent',
                }
            });
            world = engine.world;
            var leftWallBody = Matter.Body.create();
            var rightWallBody = Matter.Body.create();
            let vertices = Matter.Vertices.create([{x: 0, y: 0},
                                                {x: 0, y: screenHeight},
                                                {x: screenWidth * 0.12, y: screenHeight},
                                                {x: screenWidth * 0.24, y: screenHeight/2},
                                                {x: screenWidth * 0.12, y: 0},
                                                {x: 0, y: 0}], leftWallBody);
            let vertices2 = Matter.Vertices.create([
                {x: screenWidth, y: 0},
                {x: screenWidth, y: screenHeight},
                {x: screenWidth*(1-0.12), y: screenHeight},
                {x: screenWidth*(1-0.24), y: screenHeight/2},
                {x: screenWidth*(1-0.12), y: 0},
                {x: screenWidth, y: 0},
            ], rightWallBody);
            // var happyPath = "M217.61,108.8a28.05,28.05,0,0,0-15.39-25,28,28,0,0,0-25-43.35,28.05,28.05,0,0,0-43.36-25,28,28,0,0,0-50.06,0,28,28,0,0,0-43.35,25,28,28,0,0,0-25,43.35,28,28,0,0,0,0,50.06,28.05,28.05,0,0,0,25,43.36,28,28,0,0,0,43.35,25,28,28,0,0,0,50.06,0,28.05,28.05,0,0,0,43.36-25,28.05,28.05,0,0,0,25-43.36A28,28,0,0,0,217.61,108.8Z";
            let vertices3 = Matter.Vertices.create([ { "x":26, "y":42.5 }, { "x":15.5, "y":52 }, { "x":12.5, "y":57 }, { "x":14.5, "y":82 }, { "x":40, "y":39.5 } ]);
            var ground = Bodies.rectangle(screenWidth/2, screenHeight, screenWidth, 60, { isStatic: true });
            var leftWall = Bodies.fromVertices(screenWidth * 0.1, screenHeight/2, vertices, {
                    isStatic: true,
                    render: {
                        fillStyle: 'transparent'
                    },
                    });
            var rightWall = Bodies.fromVertices(screenWidth * (1-0.1), screenHeight/2, vertices2, {
                isStatic: true,
                render: {
                    fillStyle: 'transparent'
                },
                });


            World.add(engine.world, [leftWall, rightWall, ground]);

            // create runner
            var runner = Runner.create();
            Runner.run(runner, engine);

            // add bodies
            var that = this;

            
            // temp items
            var stack = Composites.stack(250, 0, 10, 20, 0, 0, function(x, y) {
                var num = Math.round(Common.random(0, 4));

                var item = that.createItem(num, x, y);
                myBodies.push(item);
                that.itemData.push({
                    id: item.id,
                    emotion: num,
                });
                return item;
                
            });

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

            World.add(world, mouseConstraint);

            Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
                var foundPhysics = Matter.Query.point(myBodies, event.mouse.position);
                console.log(foundPhysics);
                if (foundPhysics.length > 0) {
                    var item;
                    for(var i=0; i<that.itemData.length; i++) {
                        if (that.itemData[i].id == foundPhysics[0].id) {
                            item = that.itemData[i];
                            break;
                        }
                    }
                    that.setGradation(item.emotion);
                }
                
            })

            // keep the mouse in sync with rendering
            render.mouse = mouse;
            // // fit the render viewport to the scene
            // Render.lookAt(render, {
            //     min: { x: 0, y: 0 },
            //     max: { x: 800, y: 600 }
            // });
            World.add(world, stack);

            Engine.run(engine);
            Render.run(render);

            this.setGradation(this.itemData[this.itemData.length-1].emotion);
        },
        createItem(num, x, y, color) {

            var col = color ? color : this.emotionColors[num][Math.round(Common.random(0, 4))];
            switch (num) {
                    case EMOTION.HAPPY: // happy
                            return Bodies.circle(x, y, 106*0.3, {
                                render: {
                                    sprite: {
                                        texture: this.getImage('happy.png', col),
                                        xScale: 0.3,
                                        yScale: 0.3,
                                    }
                                }
                            });
                    case EMOTION.SAD: // sad
                        return Bodies.circle(x, y, 106*0.3, {
                                render: {
                                    fillStyle: col,
                                }
                            });
                    case EMOTION.ANGRY: // anger
                        return Bodies.circle(x, y, 218/2*0.3, {
                            render: {
                                sprite: {
                                    texture: this.getImage('anger.png', col),
                                    xScale: 0.3,
                                    yScale: 0.3,
                                }
                            }
                        });
                    
                    case EMOTION.COMFORTABLE: // comfortable
                        return Bodies.circle(x, y, 231/2*0.3, {
                            render: {
                                sprite: {
                                    texture: this.getImage('calm.png', col),
                                    xScale: 0.3,
                                    yScale: 0.3,
                                }
                            }
                        });
                    case EMOTION.WORRY: // worry
                        return Bodies.circle(x, y, 106*0.3, {
                            render: {
                                fillStyle: 'red',
                                sprite: {
                                    texture: this.getImage('complex.png', col),
                                    xScale: 0.3,
                                    yScale: 0.3,
                                }
                            }
                        });
                    
                }
        },
        addItem(num, color) {
            var item = this.createItem(num, Common.random(0, innerWidth), 0, color);
            // Matter.Body.applyForce(item, {x: item.position.x, y:item.position.y}, {x: -0.05, y: 0})
            myBodies.push(item);
            this.itemData.push({
                    id: item.id,
                    emotion: num,
                });
            World.add(world, item);
            Engine.run(engine);
            Render.run(render);
        },
        setGradation(num) {
            var colors = this.emotionColors[num];
            var gdCtx = gdCanvas.getContext('2d');
            var grd = gdCtx.createLinearGradient(innerWidth/2, 0, innerWidth/2, innerHeight);
            grd.addColorStop(0, colors[0]);
            grd.addColorStop(1, colors[colors.length-1]);
            gdCtx.fillStyle = grd;
            gdCtx.fillRect(0, 0, innerWidth, innerHeight);
        }
    },
    mounted() {
        console.log('emotion mounted', this.start);
        if (this.start) {
            this.load();
            var location = this.$refs.emotion.offsetTop;
            
            window.scrollTo({top: location, behavior: 'smooth'});
            // console.log(this.showEmotion);
            // animation
        }
    },
}
</script>
<style>
/* canvas {
    outline: 1px solid red;
    position: absolute;
    top: 0;
    left: 0;
} */
/*
.emotion {
    background-color: red;
}*/


.emotion > canvas {
    position: absolute;
    left: 0;
    top: 0;
}
</style>

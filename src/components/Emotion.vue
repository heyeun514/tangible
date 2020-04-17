<template>
    <div ref="emotion" class="emotion">
        <path ref="happyPath" d="M217.61,108.8a28.05,28.05,0,0,0-15.39-25,28,28,0,0,0-25-43.35,28.05,28.05,0,0,0-43.36-25,28,28,0,0,0-50.06,0,28,28,0,0,0-43.35,25,28,28,0,0,0-25,43.35,28,28,0,0,0,0,50.06,28.05,28.05,0,0,0,25,43.36,28,28,0,0,0,43.35,25,28,28,0,0,0,50.06,0,28.05,28.05,0,0,0,43.36-25,28.05,28.05,0,0,0,25-43.36A28,28,0,0,0,217.61,108.8Z"/>

    </div>
</template>
<script>
import Matter from "matter-js";
var Engine, Render, World, Bodies, Runner;
var Composites, Common, MouseConstraint, Mouse, Svg, Vertices;

export default {
    name: 'Emotion',
    props: ['start', 'imgCanvas'],
    data() {
        return {
            tempCanvas: null, // temp canvas element
        }
    },
    watch: {
        start(newVal) {
            this.load();
        }
    },
    methods: {
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

            const screenWidth = innerWidth;
            const screenHeight = innerHeight*0.8;
            var engine = Engine.create();
            var render = Render.create({
                element: this.$refs.emotion,
                engine: engine,
                options: {
                    width: screenWidth,
                    height: screenHeight,
                    wireframes: false,
                    background: 'white',
                }
            });
            var world = engine.world;
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
            var leftWall = Bodies.fromVertices(0, screenHeight/2, vertices, {isStatic: true});
            var rightWall = Bodies.fromVertices(screenWidth, screenHeight/2, vertices2, {isStatic: true});
            // var test = Bodies.fromVertices(700, 300, vertices3, {isStatic: true});
            // var points = Svg.pathToVertices(this.$refs.happyPath, 1);
            // var vertexSets = [];
            // vertexSets.push(Vertices.scale(points, 0.4, 0.4));
            // var vs = Bodies.fromVertices(700, 100, points, {
            //     render: {
            //         fillStyle: 'red'
            //     }
            // });

            World.add(engine.world, [leftWall, rightWall, ground]);

            // create runner
            var runner = Runner.create();
            Runner.run(runner, engine);

            // add bodies
            var that = this;
            var stack = Composites.stack(250, 0, 10, 5, 0, 0, function(x, y) {
                var sides = Math.round(Common.random(1, 8));

                // triangles can be a little unstable, so avoid until fixed
                sides = (sides === 3) ? 4 : sides;

                // round the edges of some bodies
                var chamfer = null;
                if (sides > 2 && Common.random() > 0.7) {
                    chamfer = {
                        radius: 10
                    };
                }

                switch (Math.round(Common.random(0, 4))) {
                case 0:
                    // if (Common.random() < 0.8) {
                    //     return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { chamfer: chamfer });
                    // } else {
                    //     return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), { chamfer: chamfer });
                    // }
                    return Bodies.circle(x, y, 106*0.3, {
                        render: {
                            fillStyle: '#8be3cb',
                        }
                    });
                case 1:
                    // var points = Svg.pathToVertices(that.$refs.happyPath, 30);
                    // var vertexSets = [];
                    // vertexSets.push(Vertices.scale(points, 0.4, 0.4));
                    // return Bodies.fromVertices(x, y, points);
                    // return Bodies.polygon(x, y, sides, Common.random(25, 50), { chamfer: chamfer });
                    var b = Bodies.circle(x, y, 106*0.3, {
                        render: {
                            fillStyle: 'red',
                            sprite: {
                                texture: that.getImage('complex.png', 'red'),
                                xScale: 0.3,
                                yScale: 0.3,
                            }
                        }
                    });
                    return b;
                case 2:
                    return Bodies.circle(x, y, 106*0.3, {
                        render: {
                            sprite: {
                                texture: require('@/assets/happy.png'),
                                xScale: 0.3,
                                yScale: 0.3,
                            }
                        }
                    });
                case 3:
                    return Bodies.circle(x, y, 218/2*0.3, {
                        render: {
                            sprite: {
                                texture: require('@/assets/anger.png'),
                                xScale: 0.3,
                                yScale: 0.3,
                            }
                        }
                    });
                case 4:
                    return Bodies.circle(x, y, 231/2*0.3, {
                        render: {
                            sprite: {
                                texture: require('@/assets/calm.png'),
                                xScale: 0.3,
                                yScale: 0.3,
                            }
                        }
                    });
                }
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
        }
    },
    mounted() {
        console.log('emotion mounted', this.start);
        if (this.start) {
            this.load();
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
</style>

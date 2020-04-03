<template>
    <div ref="today" class="today"></div>
</template>
<script>
import Matter from "matter-js";
var Engine, Render, World, Bodies, Runner;
var Composites, Common, MouseConstraint, Mouse;

export default {
    methods: {
        
    },
    mounted() {
        console.log('load today');
        Engine = Matter.Engine;
        Render = Matter.Render;
        World = Matter.World;
        Bodies = Matter.Bodies;
        Runner = Matter.Runner;
        Composites = Matter.Composites;
        Common = Matter.Common;
        Mouse = Matter.Mouse;
        MouseConstraint = Matter.MouseConstraint;


        var engine = Engine.create();
        var render = Render.create({
            element: this.$refs.today,
            engine: engine,
            options: {
                width: 1000,
                height: 1000,
                wireframes: false,
            }
        });
        var world = engine.world;

        var leftWallBody = Matter.Body.create();
        var rightWallBody = Matter.Body.create();
        let vertices = Matter.Vertices.create([{x: 0, y: 0},
                                              {x: 0, y: 1000},
                                              {x: 120, y: 1000},
                                              {x: 240, y: 500},
                                              {x: 120, y: 0},
                                              {x: 0, y: 0}], leftWallBody);
        let vertices2 = Matter.Vertices.create([
            {x: 1000, y: 0},
            {x: 1000, y: 1000},
            {x: 1000-120, y: 1000},
            {x: 1000-240, y: 500},
            {x: 1000-120, y: 0},
            {x: 1000, y: 0},
        ], rightWallBody);

        var ground = Bodies.rectangle(500, 1060, 1000, 60, { isStatic: true });
        var leftWall = Bodies.fromVertices(0, 500, vertices, {isStatic: true});
        var rightWall = Bodies.fromVertices(1000, 500, vertices2, {isStatic: true});
        World.add(engine.world, [leftWall, rightWall, ground]);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);

        // add bodies
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

            switch (Math.round(Common.random(0, 1))) {
            case 0:
                if (Common.random() < 0.8) {
                    return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { chamfer: chamfer });
                } else {
                    return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), { chamfer: chamfer });
                }
            case 1:
                return Bodies.polygon(x, y, sides, Common.random(25, 50), { chamfer: chamfer });
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
    },
}
</script>
<style>
canvas {
    outline: 1px solid red;
    position: absolute;
    top: 0;
    left: 0;

}
</style>

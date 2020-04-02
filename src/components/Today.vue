<template>
    <div ref="today" class="today"></div>
</template>
<script>
import Matter from "matter-js";
var Engine, Render, World, Bodies;
var Composites, Common, MouseConstraint, Mouse;

export default {
    mounted() {
        console.log('load today');
        Engine = Matter.Engine;
        Render = Matter.Render;
        World = Matter.World;
        Bodies = Matter.Bodies;

        var engine = Engine.create();
        var render = Render.create({
            element: this.$refs.today,
            engine: engine
        });
        
        var boxA = Bodies.rectangle(400, 200, 80, 80);
        var boxB = Bodies.rectangle(450, 50, 80, 80);
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        World.add(engine.world, [boxA, boxB, ground]);
        Engine.run(engine);
        Render.run(render);
    },
}
</script>
<style>

</style>

<template>
  <div class="fractal" ref="container">
    <canvas class="temp" ref="temp"></canvas> <!-- draw branches !-->
    <canvas class="treeCanvas" ref="treeCanvas"></canvas>
    <img id="gradientImg" ref="gradientImg" src="../assets/greenery_BG.png" />
    <canvas id="gradient" ref="gradient"></canvas>
    <canvas id="cropGradient" ref="cropGradient"></canvas>
  </div>
</template>
<script>
var fadeInOut;
var branches = [];
var rAF;
var ADD = 1;
const IMAGE_SIZE = {w: 8680, h: 2160};
var radians = a => a * Math.PI/180;
function Tree(x, y, len, angle, depth, parent) {
    this.x = x;
    this.y = y;
    this.x0 = x;
    this.y0 = y;
    this.len = len;
    this.angle = angle;
    this.depth = depth;
    this.parent = parent;
    this.done = false;
    this.right = null;
    this.left = null;
    this.v = 0;
    this.x1 = x - (len * Math.sin(radians(angle)));
    this.y1 = y - (len * Math.cos(radians(angle)));
    this.update = function() {
        // update
        this.v += 0.1;
        this.px = this.x;
        this.py = this.y;
        this.x = this.x0 - (this.len * this.v) * Math.sin(radians(angle));
        this.y = this.y0 - (this.len * this.v) * Math.cos(radians(angle));
        if (this.v > 1) this.done = true;
    }
}

function getRandom(depth) {
    var r;
    if (depth < 3)
        r = Math.random() * (1.1 - 0.4) + 0.4;
    else if (depth < 10)
        r = Math.random(0.2, 0.7) + 0.3;
    else 
        r = Math.random() * (1.0 - 0.5) + 0.5;
    return r.toFixed(1);
}

function selectReversed(query) {   
    var nodes = document.querySelectorAll(query);  
    nodes = Array.prototype.slice.call(nodes, 0);
    return nodes.reverse();
}

export default {
  name: 'Tree',
  props: {
    msg: String,
  },
  methods: {
    restart: function() {
        if (fadeInOut) {
        for(var i =0; i<fadeInOut.length; i++) {
            fadeInOut[i].reverse();
            console.log('reverse');
        }
        }
        this.init();
        this.draw();
    },
    init: function() {
        branches = [];
        var tempCtx = this.$refs.temp.getContext('2d'),
            treeCtx = this.$refs.treeCanvas.getContext('2d');
        tempCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        treeCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        cancelAnimationFrame(rAF);
    },
    draw: function() {
        console.log('draw');
        var ret = this.createTree();

        branches.push(ret.root);
        var that = this;
        // start animate first 
        var fpsInterval = 10,
            then = Date.now(),
            now, elapsed;

        var gradientStartPoint = 0;
        var gradientOffset = 1;
        var tempCtx = this.$refs.temp.getContext('2d'),
            treeCtx = this.$refs.treeCanvas.getContext('2d'),
            gradientCtx = this.$refs.gradient.getContext('2d'),
            cropCtx = this.$refs.cropGradient.getContext('2d');

        function animate() {
        now = Date.now();
        elapsed = now - then;
        if (elapsed < fpsInterval) {
            rAF = requestAnimationFrame(animate);
            return;
        }
        then = now;

        for(var i =0; i<branches.length; i++) {
            tempCtx.beginPath();
            tempCtx.moveTo(branches[i].px, branches[i].py);
            tempCtx.lineTo(branches[i].x, branches[i].y);
            tempCtx.lineWidth = 1;
            tempCtx.strokeStyle = 'white';
            tempCtx.stroke();
            branches[i].update();
        }

        var treeData = tempCtx.getImageData(0, 0, window.innerWidth, window.innerHeight);
        treeCtx.putImageData(treeData, 0, 0);
        treeCtx.globalCompositeOperation = 'source-in';
        // ready canvas 
        if (gradientOffset > 0) {
            gradientStartPoint += 50;
            if (gradientStartPoint + window.innerWidth >= IMAGE_SIZE.w)
            gradientOffset = -1;
        } else {
            gradientStartPoint -= 50;
            if (gradientStartPoint <= 0) gradientOffset = 1;
        }
        var imgData = gradientCtx.getImageData(gradientStartPoint, 0, window.innerWidth, window.innerHeight)
        cropCtx.putImageData(imgData, 0, 0);
        var colorData = treeCtx.drawImage(that.$refs.cropGradient, 0, 0,
            window.innerWidth, window.innerHeight);

        for(var j=0; j<branches.length; j++) {
            if (branches[j].done == true) {
                var out = branches.shift();
                (out.left ? branches.push(out.left) : null);
                (out.right ?  branches.push(out.right) : null);
                }
            }
        rAF = requestAnimationFrame(animate);
        }
        animate();
    },
    createTree: function() {
        var trees = [];
        const x0 = window.innerWidth/2,
        y0 = window.innerHeight + 130,
        len = 120,
        angle = 0;
        var first = new Tree(x0, y0, len, angle, 0, null);
        var depth = 1;
        function makeTree(item) {
            if (item.len < 10) return;
            item.right = new Tree(item.x1, item.y1, item.len * getRandom(item.depth), item.angle+10,  item.depth+1, item);
            item.left = new Tree(item.x1, item.y1, item.len * getRandom(item.depth), item.angle-10, item.depth+1, item);
            depth += 2;
            makeTree(item.right);
            makeTree(item.left);
        }
        makeTree(first);
        console.log(first, depth);
        return {root: first, depth};
    }
    },
    mounted() {
        this.$emit('updateBgStyle', 'black');
        var tempCanvas = this.$refs.temp;
        var treeCanvas = this.$refs.treeCanvas;
        var partCanvas = this.$refs.cropGradient;
        // set canvas size
        tempCanvas.width = treeCanvas.width = partCanvas.width = this.$refs.container.clientWidth;
        tempCanvas.height = treeCanvas.height = partCanvas.height = this.$refs.container.clientHeight;

        var gradientCtx = this.$refs.gradient.getContext('2d'),
            cropCtx = partCanvas.getContext('2d');

        this.$refs.gradient.width = IMAGE_SIZE.w;
        this.$refs.gradient.height = IMAGE_SIZE.h;

        var that = this;
        this.$refs.gradientImg.onload = () => {
        gradientCtx.drawImage(that.$refs.gradientImg, 0, 0);
        var part = gradientCtx.getImageData(0, 0, window.innerWidth, window.innerHeight);
        cropCtx.putImageData(part, 0, 0);
        }
        this.draw();
    },
    beforeDestroy() {
        this.$emit('updateBgStyle', 'white');
        this.init();
    }
}
</script>

<style scoped>
.fractal {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: black;
}

.fractal > img {
    position: fixed;
    left: 0;
    top: 0;
}
.fractal > canvas {
    position: absolute;
    top: 0;
    left: 0;
}

.temp {
  visibility: hidden;
}

#gradient {
  visibility: hidden;
}

#gradientImage {
  visibility: hidden;
}

#gradientImg {
  visibility: hidden;
}

#cropGradient {
  visibility: hidden;
}
</style>

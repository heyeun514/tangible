navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

// Aatish Bhatia
// webcam controller
// using Kyle McDonald's optical flow p5 demo as a starting point

var capture;
var previousPixels;
var myNumBins = 50;

var hist = [];
var previousHist = [];

var flow;
var w = 640,
    h = 480;
var step = 8;
var x,y;
var vx=0,vy=0;

var smoothing = 0.1;
var cutoff = 0.1;

function setup() {
    createCanvas(w, h);
    capture = createCapture(VIDEO);
    capture.hide();
    flow = new FlowCalculator(step);

  	x=w/2;
  	y = h/2
}

function draw() {
    capture.loadPixels();
    if (capture.pixels.length > 0) {
        if (previousPixels) {

            // cheap way to ignore duplicate frames
            if (same(previousPixels, capture.pixels, 4, width)) {
                return;
            }

            flow.calculate(previousPixels, capture.pixels, capture.width, capture.height);
        }
        previousPixels = copyImage(capture.pixels, previousPixels);
        //image(capture, 0, 0, w, h);
      	background(40,100);

      	var histWasNotUpdated = true;
        if (flow.flow && (abs(flow.flow.u) > cutoff || abs(flow.flow.v) > cutoff)) {

          	ax = -5*flow.flow.u;
          	ay = 5*flow.flow.v;

            strokeWeight(2);

          	var yo = [];

            flow.flow.zones.forEach(function (zone) {
                stroke(map(zone.u, -step, +step, 0, 255),
                       map(zone.v, -step, +step, 0, 255), 128);
                line(width-zone.x, zone.y, width-(zone.x + zone.u), zone.y + zone.v);
              	var angle = atan2(zone.v,zone.u) + PI;
              	var magnitude = sqrt(zone.v*zone.v + zone.u*zone.u);
              	yo.push([angle,magnitude]);
            })


					if(hist.length>0){
	          histWasNotUpdated = false;
            previousHist = hist.slice();
            hist = makeHistogram(yo,myNumBins);

            for(var i=0; i<hist.length; i++){
              hist[i] += 0.9*(previousHist[i]-hist[i]);
              //hist[i] = previousHist[i];
            }
          }
          else{
	          hist = makeHistogram(yo,myNumBins);
          }

        }
      	else{
          ax = 0;
          ay = 0;
      	}

      	if(histWasNotUpdated){
          previousHist = hist.slice();
            for(var i=0; i<hist.length; i++){
              hist[i] = 0.9*(previousHist[i]);
            }
        }
        noFill();
        stroke('white');
        beginShape();
        var i =0;
          for(var myAngle=0;myAngle<2*PI;myAngle+= 2*PI/myNumBins){
            var myRadius = 500*hist[i]*myNumBins/12;
            vertex(width/2 + myRadius*cos(myAngle),height/2 - myRadius*sin(myAngle));
            i++;
          }
        endShape(CLOSE);

        vx += smoothing*(ax-vx);
        vy += smoothing*(ay-vy);

      	if(x> width){
          vx *= -1;
          x = width
        }
      else if(x < 0){
        vx *= -1;
        x = 0;
      }

      if(y> height){
        vy *= -1;
        y = height;
      }
      else if(y<0){
        vy *= -1;
        y = 0;
      }

        x += 5*vx;
        y += 5*vy;


      	noStroke();
				fill('yellow');
				ellipse(x,y,30);

	}
}

// copy an array, creating a new array if necessary
// usage: dst = copyImage(src, dst)
// based on http://jsperf.com/new-array-vs-splice-vs-slice/113
function copyImage(src, dst) {
    var n = src.length;
    if (!dst || dst.length != n) {
        dst = new src.constructor(n);
    }
    while (n--) {
        dst[n] = src[n];
    }
    return dst;
}


function same(a1, a2, stride, n) {
    for (var i = 0; i < n; i += stride) {
        if (a1[i] != a2[i]) {
            return false;
        }
    }
    return true;
}


function makeHistogram(arr,numBins){

  var binSize = 2*PI/numBins;
  var bigSum = 0;
  var myHist = [];
  for(var i=0;i<2*PI; i+=binSize){
    var sum = 0;
		for(var j=0;j<arr.length;j++){
      if(arr[j][0] >= i && arr[j][0] < i+binSize){
        sum += arr[j][1];
      }
    }
    myHist.push(sum);
    bigSum += sum;
  }

  // normalize the historgram (total sum is 1)
  for(var i=0;i<myHist.length;i++){
    myHist[i] = myHist[i]/bigSum;
  }


  return myHist;
}
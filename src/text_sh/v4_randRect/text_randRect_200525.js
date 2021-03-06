window.onkeydown = keydown;
var stage;
var text = [];
var font = "bold 250px Arial"
var char_space = 200;
var text_posy = 100

function init() {	
	stage = new createjs.Stage("canvas");// document.getElementById("canvas"));
	canvas.style.backgroundColor = "black";

	var rect = new createjs.Shape();
	rect.graphics.beginFill("#63AAD0").drawRect(0, 0, 530,300);
	rect.x = 100;
	rect.y = 80;
	rect.alpha = 1;
	
	text.push(new createjs.Text("", font, "black"));
 	text[0].x = text[0].y = 100;
	stage.addChild(text[0]);
  	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", handleTick);
}

function handleTick() {
    stage.update();
}

var KEYCODE_LEFT = 37,
   KEYCODE_RIGHT = 39,
   KEYCODE_UP = 38,
   KEYCODE_DOWN = 40;

function getRandomChar() {
	var c = String.fromCharCode(Math.floor(Math.random()*(90-65+1)) + 65);
	return c;

}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function keydown(e) {
	if ((e.keyCode >= 65) && (e.keyCode <=90)){
		char =  String.fromCharCode(e.keyCode).toUpperCase();
		rects = [] ;
		for (var i = 0; i < 5; i++){

			rect_min = char_space * 0.4;
			rand_x = getRandom((text.length-1)*char_space, text.length*char_space);
			rand_y = getRandom(text_posy, text_posy+(char_space-rect_min) );
			rand_w = getRandom(rect_min, (text.length*char_space) - rand_x);
			rand_h = getRandom(rect_min, text_posy+char_space  - rand_y);
			console.log(rand_y, rand_h);

			var rect = new createjs.Shape();
			rect.graphics.beginFill(getRandomColor()).drawRect(rand_x, rand_y, rand_w, rand_h );
			rect.alpha = 0;
			stage.addChild(rect);
			rects.push(rect);
		}
		ts = [];
		for (var i = 0; i <5; i++){
			t = new createjs.Text(char, font, "white" ); //e.key
	 		t.x = (text.length-1)*char_space-10; 
	 		t.y = text_posy;
	 		t.alpha = 0;
	 		t.mask = rects[i];
	 		ts.push(t);
			stage.addChild(t);
		}
		text.push(t);
		createjs.Tween.get(rects[0], { loop: false }) //, bounce: true	
		.to({ alpha: 1 }, 200, createjs.Ease.getPowInOut(4))
		createjs.Tween.get(ts[0], { loop: false }) //, bounce: true	
		.to({ alpha: 1 }, 200, createjs.Ease.getPowInOut(4))
		createjs.Tween.get(rects[1], { loop: false }) //, bounce: true	
		.wait(100)
		.to({ alpha: 1 }, 200, createjs.Ease.getPowInOut(4))
		createjs.Tween.get(ts[1], { loop: false }) //, bounce: true	
		.wait(100)
		.to({ alpha: 1 }, 200, createjs.Ease.getPowInOut(4))
		createjs.Tween.get(rects[2], { loop: false }) //, bounce: true	
		.wait(100)
		.to({ alpha: 1 }, 200, createjs.Ease.getPowInOut(4))
		createjs.Tween.get(ts[2], { loop: false }) //, bounce: true	
		.wait(100)
		.to({ alpha: 1 }, 200, createjs.Ease.getPowInOut(4))
		createjs.Tween.get(rects[3], { loop: false }) //, bounce: true	
		.wait(100)
		.to({ alpha: 1 }, 200, createjs.Ease.getPowInOut(4))
		createjs.Tween.get(ts[3], { loop: false }) //, bounce: true	
		.wait(100)
		.to({ alpha: 1 }, 200, createjs.Ease.getPowInOut(4))
		createjs.Tween.get(rects[4], { loop: false }) //, bounce: true	
		.wait(100)
		.to({ alpha: 1 }, 200, createjs.Ease.getPowInOut(4))
		createjs.Tween.get(ts[4], { loop: false }) //, bounce: true	
		.wait(100)
		.to({ alpha: 1 }, 200, createjs.Ease.getPowInOut(4))
		aph = 0.8;
		dur = 30;
	}
	else if(e.keyCode == 32){
		t = new createjs.Text(e.key, font, "  " );
		text.push(t);
	}
}

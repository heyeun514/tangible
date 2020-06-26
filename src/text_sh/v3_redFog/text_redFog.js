window.onkeydown = keydown;
var stage;
var text = [];
var font = "bold 30px Arial"
var char_space = 20;

function init() {	
	stage = new createjs.Stage("canvas");
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

function keydown(e) {
	if ((e.keyCode >= 65) && (e.keyCode <=90)){
		char =  String.fromCharCode(e.keyCode).toUpperCase();
		
		var rect = new createjs.Shape();
		rect.graphics.beginFill("red").drawRect(0, 0, char_space*3,300);
		rect.x = text.length*char_space; 
		rect.y = 80;
		rect.alpha = 0.1;
		stage.addChild(rect);
		
		t = new createjs.Text(e.key, font, "white" );
 		t.x = text.length*char_space; 
 		t.y = 100;
 		t.alpha = 1;
 		text.push(t);
		stage.addChild(t);

		createjs.Tween.get(rect, { loop: false, bounce: true})
  		.to({ scaleX:-char_space }, 1000, createjs.Ease.getPowInOut(4))

		aph = 0.8;
		dur = 30;

		createjs.Tween.get(t, { loop: false })
		.to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
  		.to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
  		.to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
  		.to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
		.to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
  		.to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
  		.to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
  		.to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
  		.to({alpha: aph ,text: getRandomChar(), color: getRandomColor()}, dur, createjs.Ease.getPowInOut(4))
  		.to({alpha: 1 ,text: char, color: "white"}, dur, createjs.Ease.getPowInOut(4))
  		stage.update();
	}

	else if(e.keyCode == 32){
		t = new createjs.Text(e.key, font, "  " );
		text.push(t);
	}
}
window.onkeydown = keydown;
var stage;
var text = [];
var font = " 30px Arial"
var char_space = 20;

function init() {	
	stage = new createjs.Stage("canvas");// document.getElementById("canvas"));
	canvas.style.backgroundColor = "black";


	var rect = new createjs.Shape();
	rect.graphics.beginFill("#63AAD0").drawRect(0, 0, 530,300);
	rect.x = 100;
	rect.y = 80;
	rect.alpha = 1;
	//stage.addChild(rect);
	
	text.push(new createjs.Text("", font, "black"));
	//var text = new createjs.Text("Hello World", "100px Arial", "#ff7700");
 	text[0].x = text[0].y = 100;
 	//text.alpha = .8;
 	//text.rotation = 10;
 	//text.skewX = 10;
 	//text.mask = rect;
 	//text.maxWidth = 100;
 	//text.scaleX = 10;

	stage.addChild(text[0]);

	
  	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", handleTick);
}


function handleTick() {
    stage.update();
}


//setTimeout(() => {
//  svg.insertAdjacentHTML(`beforebegin`, text);
//}, 1000);

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
		

	//if(e.key == "Enter")
	//	text.y += 10;
	if ((e.keyCode >= 65) && (e.keyCode <=90)){
		char =  String.fromCharCode(e.keyCode).toUpperCase();


		
		var rect = new createjs.Shape();
		rect.graphics.beginStroke(getRandomColor()).drawRect(0, 0, char_space,char_space*1.5);
		rect.x = text.length*char_space + char_space*2.5; 
		rect.y = 100 + char_space;
		rect.alpha = 0;
		stage.addChild(rect);
		

		t = new createjs.Text(e.key, font, "white" );
 		t.x = text.length*char_space; 
 		t.y = 100;
 		t.alpha = 1;
 		//t.mask = rect;
 		text.push(t);

		stage.addChild(t);

		createjs.Tween.get(rect, { loop: false, bounce: true})
		.to({ scaleX:3, scaleY:3, alpha:0.5 }, 1000, createjs.Ease.getPowInOut(4))
  		.to({ scaleX:5, scaleY:5, alpha:0 }, 3000, createjs.Ease.getPowInOut(4))
  		//.to({ scaleX:3, scaleY:3, x:(text.length-2)*char_space , y:100-char_space/2, alpha:0.5 }, 1000, createjs.Ease.getPowInOut(4))
  		//.to({ scaleX:3.5, scaleY:3.5, x:(text.length-2)*char_space , y:100-char_space/2, alpha:0.5 }, 2000, createjs.Ease.getPowInOut(4))
  		//.to({ alpha:0}, 1000, createjs.Ease.getPowInOut(4))


		
		aph = 0.8;
		dur = 1000;

		createjs.Tween.get(t, { loop: false }) //, bounce: true
		.to({alpha: aph ,scaleX:3, scaleY:3, x:(text.length+2)*(char_space), y: 120}, dur, createjs.Ease.getPowInOut(4))
		.wait(1000)
		//.to({alpha: 0 ,scaleX:1, scaleY:1, x:text.length*char_space, y: 100}, dur, createjs.Ease.getPowInOut(4))
		.to({alpha: 0 ,scaleX:1, scaleY:1, x:(text.length+4)*char_space, y: 150}, dur, createjs.Ease.getPowInOut(4))
  		stage.update();


  		
  		
	}

	else if(e.keyCode == 32){
		//console.log(e.)
		t = new createjs.Text(e.key, font, "  " );
		text.push(t);
	}
		

}

	/*
	var circle = new createjs.Shape();
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
	circle.x = 100;
	circle.y = 100;


	createjs.Tween.get(circle, { loop: true })
  	.to({ x: 300, alpha: 0.2 }, 300, createjs.Ease.getPowInOut(4))
  	.to({ alpha: 1 }, 100, createjs.Ease.getPowInOut(4))
  	.to({ x: 100, alpha: 0.2 }, 300, createjs.Ease.getPowInOut(4))
  	.to({ alpha: 1 }, 100, createjs.Ease.getPowInOut(4))

  	*/
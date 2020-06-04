
var stage;

window.onkeydown = keydown;


function init() {

	stage = new createjs.Stage("canvas");// document.getElementById("canvas"));
	var rect = new createjs.Shape();
	rect.graphics.beginFill("#63AAD0").drawRect(0, 0, 500,300);
	rect.x = 100;
	rect.y = 80;
	rect.alpha = 1;
	stage.addChild(rect);
	
	var text = new createjs.Text();
	//var text = new createjs.Text("Hello World", "100px Arial", "#ff7700");
	text.text = "안절부절"
	text.color = "white"
	text.font = "bold 300px Arial"
 	text.x = text.y = 100;
 	//text.alpha = .8;
 	//text.rotation = 10;
 	//text.skewX = 10;
 	text.mask = rect;
 	//text.maxWidth = 100;
 	//text.scaleX = 10;


	stage.addChild(text);

	//stage.update();

	
	
	createjs.Tween.get(rect, { loop: true }) //, bounce: true
  	.to({ x:700, alpha: 1 }, 400, createjs.Ease.getPowInOut(4))
  	//.to({ alpha: 0.5 }, 100, createjs.Ease.getPowInOut(4))
  	.to({ x:100, alpha: 1 }, 400, createjs.Ease.getPowInOut(4))

  	//.to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
  	//.to({ alpha: 0, y: 225 }, 100)
  	//.to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
  	//.to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));
	

  	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", handleTick);
}


 createjs.Ticker.addEventListener("tick", handleTick);
 function handleTick(event) {
	stage.update();
 }

//function handleTick() {
//    stage.update();
//}

//setTimeout(() => {
//  svg.insertAdjacentHTML(`beforebegin`, text);
//}, 1000);

var KEYCODE_LEFT = 37,
   KEYCODE_RIGHT = 39,
   KEYCODE_UP = 38,
   KEYCODE_DOWN = 40;

function keydown(e) {
	console.log(e);
	//svg.insertAdjacentHTML(`beforebegin`, e.key);


	switch(e.keyCode)
	{
    	case KEYCODE_LEFT:  
    		console.log("left");
    		break;
    	case KEYCODE_RIGHT:
    		console.log("right");
    		break;
    	case KEYCODE_UP:
    		console.log("up");
    		break;
    	case KEYCODE_DOWN:
    		console.log("down");
    		break;
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
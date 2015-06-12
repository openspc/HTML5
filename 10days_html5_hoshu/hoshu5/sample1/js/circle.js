window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	var context = canvasObj.getContext("2d");
	if (!context){ return; }
	context.strokeStyle = "red";
	context.fillStyle = "black";
	context.fillRect(0,0,640,480);
	context.translate(320,240);	// 中央に移動
	context.beginPath();
	var r = 100;	// 半径
	for(var d=0; d<360; d++){
		var rad = d * Math.PI / 180;
		var x = r * Math.cos(rad);
		var y = r * Math.sin(rad);
		if (d==0){
			context.moveTo(x, y);
		}else{
			context.lineTo(x,y);
		}
	}
	context.closePath();
	context.stroke();
}, true);

window.addEventListener("load", function(){
	var ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
	ctx.strokeStyle = "blue";
	ctx.globalAlpha = 0.25;
	for(var y=0; y<150; y+=10){
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(350, 150-y);
		ctx.closePath();
		ctx.stroke();
	}
	for(var x=0; x<350; x+=5){
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(350-x, 150);
		ctx.closePath();
		ctx.stroke();
	}
}, true);

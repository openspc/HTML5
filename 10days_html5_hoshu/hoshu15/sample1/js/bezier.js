window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	var context = canvasObj.getContext("2d");
	if (!context){ return; }
	context.strokeStyle = "red";
	context.lineWidth = 2;
	bezier(context, 0,0, 20,80, 90,170, 190,0);

	// 指定された座標にベジエ曲線を描く
	function bezier(context, x1,y1,x2,y2,x3,y3,x4,y4){
		context.beginPath();
		var step = 0.04;	// 分割数
		for(var t=0; t<=1+step; t+=step){
			var b1 = Math.pow((1-t), 3);
			var b2 = 3*t*(Math.pow((1-t), 2));
			var b3 = 3*Math.pow(t,2)*(1-t);
			var b4 = Math.pow(t, 3);
			var bx2 = b1*x1 + b2*x2 + b3*x3 + b4*x4;
			var by2 = b1*y1 + b2*y2 + b3*y3 + b4*y4;
			if (t == 0){
				var bx1 = bx2;
				var by1 = by2;
			}
			context.moveTo(bx1, by1);
			context.lineTo(bx2, by2);
			bx1 = bx2;
			by1 = by2;
		}
		context.closePath();
		context.stroke();
	}
}, true);

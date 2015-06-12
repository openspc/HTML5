window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	var context = canvasObj.getContext("2d");
	if (!context){ return; }
	context.fillStyle = "black";
	context.fillRect(0,0,640,480);
	// 反時計回りで描画
	context.fillStyle = "red";
	context.arc(320,240,100, 0, Math.PI*2, true);
	//context.fill();	// 重なって描画されるかどうか試す場合は、この行頭の//を削除してください。
	// 時計回りで描画
	//context.beginPath();	// 重なって描画されるかどうか試す場合は、この行頭の//を削除してください。
	//context.fillStyle = "blue";	// 重なって描画されるかどうか試す場合は、この行頭の//を削除してください。
	context.arc(320,240,80, 0, Math.PI*2, false);
	context.fill();
}, true);

window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	var context = canvasObj.getContext("2d");
	if (!context){ return; }
	var img = new Image();
	img.src = "images/photo.jpg";
	img.onload = function(){
		context.drawImage(img, 0, 0);
	}
}, true);
// スクロール処理
setInterval(function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	var context = canvasObj.getContext("2d");
	var canvasW = canvasObj.width;
	var canvasH = canvasObj.height;
	var scrollMount = 2;
	var imgData = context.getImageData(0, canvasH-scrollMount, canvasW, scrollMount);	// 最下段をGet
	var imgDataAll = context.getImageData(0, 0, canvasW, canvasH-scrollMount);	// 最下段以外のピクセルをGet
	context.putImageData(imgDataAll, 0, scrollMount);	// 上から1ピクセルの所に描画
	context.putImageData(imgData, 0, 0);	// 一番上に描画
}, 50);

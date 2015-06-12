// ページの読み込みが完了したら処理をする
window.addEventListener("load", function(){
	var ele = document.getElementById("status");
	// Canvasが使えるか調べる
	if (!window.HTMLCanvasElement){
		ele.innerHTML = "Canvasが使用できません";
		return;
	}
	// Canvasの要素
	var canvasObj = document.getElementById("myCanvas");
	// 2Dコンテキストの取得
	var context = canvasObj.getContext("2d");
	if (!context){
		alert("2Dコンテキストが取得できません");
		return;
	}
	// Canvasを塗りつぶす
	context.fillStyle = "black";
	context.fillRect(0, 0, canvasObj.width, canvasObj.height);
	// ★画像をCanvasに描画
	var imgObj = new Image();
	imgObj.src = "images/flower.png";
	imgObj.onload = function(){
		context.drawImage(imgObj, 0, 0);
	}
	// ★ペンカラーを入れる変数
	var penColor = "cyan";
	var penColorHue = 180;	// Hue(色相)の値
	// 描画
	canvasObj.drawFlag = false;
	canvasObj.addEventListener("mousemove", function(evt){
		if (!canvasObj.drawFlag){
			return;
		}
		var x = evt.offsetX || evt.layerX;
		var y = evt.offsetY || evt.layerY;
		context.strokeStyle = penColor;	// ★変更箇所
		drawPen(x, y);					// ★変更箇所
	}, false);
	canvasObj.addEventListener("mousedown", function(evt){
		canvasObj.drawFlag = true;
	}, false);
	canvasObj.addEventListener("mouseup", function(evt){
		canvasObj.drawFlag = false;
	}, false);
	// ★ペンのカラーを設定
	document.getElementById("red").addEventListener("click", function(evt){
		penColor = "red";
		penColorHue = 0;	// 赤の色相の角度は0度
	}, false);
	document.getElementById("green").addEventListener("click", function(evt){
		penColor = "green";
		penColorHue = 120;	// 緑の色相の角度は120度
	}, false);
	document.getElementById("blue").addEventListener("click", function(evt){
		penColor = "blue";
		penColorHue = 240;	// 青の色相の角度は240度
	}, false);
	// ★ペンで描画
	function drawPen(px, py){
		var w = 20;	// ペンの横幅
		var h = 20;	// ペンの縦幅
		var pixelData = context.getImageData(px,py, w, h).data;
		for(var y=0; y<h; y++){
			for(var x=0; x<w; x++){
				var pointer = (y * w + x) * 4;
				var red = pixelData[pointer+0];
				var green = pixelData[pointer+1];
				var blue = pixelData[pointer+2];
				var alpha = pixelData[pointer+3];
				var hsl = RGBtoHSL(red, green, blue);
				var rgb = HSLtoRGB(penColorHue, 0.5, hsl.L);	// ★ここがポイント
				pixelData[pointer+0] = Math.floor(rgb.R*255);
				pixelData[pointer+1] = Math.floor(rgb.G*255);
				pixelData[pointer+2] = Math.floor(rgb.B*255);
			}
		}
		var output = context.createImageData(w, h);
		for(var i=0; i<pixelData.length; i++){
			output.data[i] = pixelData[i];
		}
		context.putImageData(output, px, py);
	}
}, true);



















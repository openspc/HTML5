// ページの読み込みが完了したら処理をする
window.addEventListener("load", function(){
	// Canvasが使えるか調べる
	if (!window.HTMLCanvasElement){
		alert("Canvasが使用できません");
		return;
	}
	// Canvasの要素
	var canvasObj = document.getElementById("myCanvas");	// 前面のCanvs
	var canvasObj2 = document.getElementById("myCanvas2");	// ★実際に塗るCanvas
	// 2Dコンテキストの取得
	var context = canvasObj.getContext("2d");
	var context2 = canvasObj2.getContext("2d");				// ★実際に塗るCanvasのコンテキストも取得
	if (!context){
		alert("2Dコンテキストが取得できません");
		return;
	}
	// ★線画を前面のCanvasに描画する
	var imgObj = new Image();
	imgObj.src = "images/lineart.png";
	imgObj.onload = function(){
		context.drawImage(imgObj, 0, 0);
	}
	// ★ペンの色を入れる
	canvasObj.penColor = "red";
	// Canvasを塗りつぶす
	context2.fillStyle = "#f0f8f8";
	context2.fillRect(0, 0, canvasObj.width, canvasObj.height);
	// 描画
	canvasObj.oldX = 0;
	canvasObj.oldY = 0;
	canvasObj.drawFlag = false;
	canvasObj.addEventListener("mousemove", function(evt){
		if (!canvasObj.drawFlag){
			return;
		}
		var x = evt.offsetX || evt.layerX;
		var y = evt.offsetY || evt.layerY;
		// ★ここでCanvas2に描くようにします
		context2.strokeStyle = canvasObj.penColor;
		context2.lineWidth = 20;
		context2.lineCap = "round";
		context2.beginPath();
		context2.moveTo(canvasObj.oldX, canvasObj.oldY);
		context2.lineTo(x, y);
		context2.stroke();
		context2.closePath();
		// ここまで
		canvasObj.oldX = x;
		canvasObj.oldY = y;
	}, false);
	canvasObj.addEventListener("mousedown", function(evt){
		canvasObj.oldX = evt.offsetX || evt.layerX;
		canvasObj.oldY = evt.offsetY || evt.layerY;
		canvasObj.drawFlag = true;
	}, false);
	canvasObj.addEventListener("mouseup", function(evt){
		canvasObj.drawFlag = false;
	}, false);
	// ★ペンのカラーを設定
	document.getElementById("red").addEventListener("click", function(evt){
		canvasObj.penColor = "red";
	}, false);
	document.getElementById("green").addEventListener("click", function(evt){
		canvasObj.penColor = "green";
	}, false);
	document.getElementById("blue").addEventListener("click", function(evt){
		canvasObj.penColor = "blue";
	}, false);
}, true);



















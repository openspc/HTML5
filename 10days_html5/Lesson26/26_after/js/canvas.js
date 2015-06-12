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
		ele.innerHTML = "2Dコンテキストが取得できません";
		return;
	}

	// グラデーションを描画する
	var gradObj = context.createLinearGradient(0, 0, 0, canvasObj.height);
	gradObj.addColorStop(0, "white");
	gradObj.addColorStop(0.75, "blue");
	gradObj.addColorStop(1, "red");
	context.fillStyle = gradObj;
	context.fillRect(0, 0, canvasObj.width, canvasObj.height);
	// 図形を回転させて描画する
	var imageObj = new Image();
	imageObj.src = "images/sample.jpg";
	imageObj.onload = function(){
		context.save();
		var deg = 45 * Math.PI / 180;
		context.translate(300, 0);
		context.rotate(deg);
		context.drawImage(this, 0, 0);
		context.restore();
	}
	// 文字を描画する
	context.fillStyle = "white";
	context.font = "normal bold 64pt 'ＭＳ Ｐ明朝'";
	context.fillText("翔泳社", 360, 320);
	// 影付きの袋文字を描画する
	context.textAlign = "left";
	context.globalAlpha = 0.75;
	context.shadowColor = "orange";
	context.shadowBlur = 4;
	context.shadowOffsetX = 5;
	context.shadowOffsetY = 10;
	context.font = "italic 48pt 'Palatine'"
	context.lineWidth = 2;
	context.strokeStyle = "black";
	context.strokeText("Canvas", 10, 60);
}, true);









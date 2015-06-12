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
	// 画像を描画する
	var imageObj = new Image();
	imageObj.src = "images/sample.jpg";
	imageObj.onload = function(){
		// オリジナルサイズで描画
		context.drawImage(imageObj, 10, 0);
	}
	// 画像の表示幅を指定して描画
　	document.getElementById("draw1").addEventListener("click", function(){
		context.drawImage(imageObj, 250, 20, 100, 180);
	}, true);
	// 画像の一部を指定して描画
　	document.getElementById("draw2").addEventListener("click", function(){
		context.drawImage(imageObj, 30, 20, 15, 25, 300, 40, 150, 250);
	}, true);
	// クリッピング領域内に画像を描画する
　	document.getElementById("draw3").addEventListener("click", function(){
		context.save();
		context.beginPath();
		context.strokeStyle = "orange";
		context.arc(360, 270, 60, 0, Math.PI*2, false);	// クリッピング領域を設定
		context.clip();
		context.drawImage(imageObj, 300, 20);
		context.restore();
	}, true);
	// 映像を描画する
　	document.getElementById("draw4").addEventListener("click", function(){
		var videoObj = document.getElementById("myVideo");
		context.drawImage(videoObj, 220, 10);
	}, true);
	// Canvasを半分のサイズで描画する
　	document.getElementById("draw5").addEventListener("click", function(){
		context.drawImage(canvasObj, 20, 10);
	}, true);
}, true);

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
	var gradObj = context.createRadialGradient(320, 320, 150, 320, 320, 300);
	gradObj.addColorStop(0, "yellow");
	gradObj.addColorStop(1, "green");
	context.fillStyle = gradObj;
	context.fillRect(0, 0, canvasObj.width, canvasObj.height);
}, true);









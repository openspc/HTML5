// グラフィック画面にランダムに四角形を描画
function randomLine(){
	var canvasObj = document.getElementById("screen2");
	var context = canvasObj.getContext("2d");
	context.globalAlpha = 0.25;
	var col = ["red", "green", "yellow", "blue"];
	context.fillStyle = ["red", "green", "yellow", "blue"][Math.floor(Math.random()* 4)];
	var x1 = Math.random()* 320;
	var y1 = Math.random()* 200;
	var w = Math.random()* 320;
	var h = Math.random()* 200;
	context.fillRect(x1, y1, w, h);
}
// テキスト画面に文字を表示
function drawText(){
	var canvasObj = document.getElementById("screen2");
	var context = canvasObj.getContext("2d");
	context.fillStyle = "white";
	context.fillText("Basic Sample", 0, 20);
}
drawText();
setInterval("randomLine()", 100);

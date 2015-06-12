// パーティクルの粒子を配列に用意
var p = new Array();
window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	// パーティクルの粒子の座標と落下速度を設定
	for(var i=0; i<1000; i++){
		var x = Math.random() * canvasObj.width;
		var y = Math.random() * canvasObj.height / 10;
		var n = Math.random() * 6 + 1;	// 落下速度
		p[i] = { x : x, y : y, speed : n };	// データを入れる
	}
	setInterval(function(){
		var canvasObj = document.getElementsByTagName("canvas")[0];
		var context = canvasObj.getContext("2d");
		context.fillStyle = "black";
		context.fillRect(0, 0, canvasObj.width, canvasObj.height);
		context.fillStyle = "white";
		for(var i=0; i<p.length; i++){	// パーティクルの数だけ繰り返す
			p[i].y = p[i].y + p[i].speed;
			if (p[i].y > canvasObj.height){
				p[i].y = canvasObj.height - 1;
			}
			context.fillRect(p[i].x, p[i].y, 1, 1);
		}
	}, 50);
}, true);

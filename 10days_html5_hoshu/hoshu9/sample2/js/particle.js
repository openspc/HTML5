// パーティクルの粒子（雪）を配列に用意
var p = new Array();
var snowHeight = new Array();	// 降り積もった雪の高さ
window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	var context = canvasObj.getContext("2d");
	context.fillStyle = "black";
	context.fillRect(0,0, canvasObj.width, canvasObj.height);
	for(var i=0; i<canvasObj.width; i++){
		snowHeight[i] = 0;	// 積もった高さを0にする
	}
		
	setInterval(function(){
		var canvasObj = document.getElementsByTagName("canvas")[0];
		var context = canvasObj.getContext("2d");
		for(var i=0; i<p.length; i++){	// パーティクルの数だけ繰り返す
			if (p[i] ==null) { continue; }	// パーティクルがなかったら繰り返しの先頭へ
			context.fillStyle = "black";
			context.fillRect(p[i].x, p[i].y-1, 1, 2);	// 雪を消す
			p[i].y = p[i].y + p[i].speed;
			context.fillStyle = "white";
			if (p[i].y > (canvasObj.height-snowHeight[p[i].x])){
				snowHeight[p[i].x]++;	// 積もった量を1つ増やす
				if (snowHeight[p[i].x] < 0) { snowHeight[p[i].x] = 0; }	// 上まで来たらそれ以上にならないようにする
				context.fillRect(p[i].x, canvasObj.height-snowHeight[p[i].x], 1, snowHeight[p[i].x]);
				p[i] = null;	// 雪の存在を消す
			}else{
				context.fillRect(p[i].x, p[i].y, 1, 1);
			}
		}
		// パーティクルの粒子の座標と落下速度を設定
		var x = Math.floor(Math.random() * canvasObj.width);
		var y = Math.floor(Math.random() * -10);
		var n = Math.random() * 1;	// 落下速度
		p[i] = { x : x, y : y, speed : n };	// データを入れる
	}, 25);
}, true);

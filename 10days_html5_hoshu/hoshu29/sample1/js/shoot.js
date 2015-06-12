// 背景画像付きシューティングゲーム
// Game用の変数
var context = null;
var timerID = null;
var mapImage = new Image();	// マップの画像を入れるためのもの
var game = {
	fighterX : 130,	// 自機のマップX座標からのオフセット
	fighterY : 420,	// 自機のマップY座標からのオフセット
	mouseX : 0,	// マウスのX座標
	mouseY : 0,	// マウスのY座標
	score : 0,	// ゲームのスコア
	charSize : 32,	// 画像の幅（32×32）
	mapY : -4800+480,	// マップの初期位置(Y座標)
	beamMax : 3,	// ビームの最大数
	beamData : [null, null, null],	// ビームの座標などを入れる配列（3連射）
	ikaCount : 0,	// 敵の出現頻度制御
	ikaMax : 6,	// 敵の最大出現数
	ikaData : [null, null, null, null, null, null ]	,// 敵の座標などを入れる配列（最大6）
	tamaMax : 4,	// 弾の最大出現数
	tamaData : [null, null, null, null ]// 弾の座標などを入れる配列（最大4）
};
// ページが読み込まれた時の処理
window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	context = canvasObj.getContext("2d");
	window.document.addEventListener("mousemove", moveMyFighter, false);
	window.document.addEventListener("mousedown", startBeam, false);
	mapImage.src = "images/map.jpg";
	mapImage.onload = function(){
		timerID = setInterval("gameProc()", 50);
	}
}, true);
// 移動＆表示処理
function gameProc(){
	context.drawImage(mapImage, 0, game.mapY);	// マップを描画
	game.mapY = game.mapY + 2;	// マップを移動
	// マップの最後まで到達したら元に戻す
	if (game.mapY > -10) { game.mapY = -4800+480; }

	// 自機の移動処理
	if ((game.mouseX < game.fighterX) && (game.fighterX > 4)){ game.fighterX = game.fighterX - 8; }
	if ((game.mouseX > game.fighterX) && (game.fighterX < 288)){ game.fighterX = game.fighterX + 8; }
	if ((game.mouseY < game.fighterY) && (game.fighterY > 160)){ game.fighterY = game.fighterY - 8; }
	if ((game.mouseY > game.fighterY) && (game.fighterY < 440)){ game.fighterY = game.fighterY + 8; }

	startIka();	// 敵を出現させる
	moveIka();	// 敵を移動させる
	moveBeam();	// ビームを移動
	moveTama();	// 敵弾を移動させる

	drawTama();	// 敵弾を描画する
	drawBeam();	// ビームを描画
	drawIka();	// 敵を描画する

	// 自機の表示
	var img = document.getElementById("figter");
	context.drawImage(img, game.fighterX, game.fighterY);

	// スコアの表示
	context.fillStyle = "red";
	context.font = "normal bold 14px Tahoma";
	context.fillText("SCORE "+game.score, 5, 20);

	hitCheck_beam_ika();	// ビームと敵の当たり判定
	// 自機と敵、弾の当たり判定
	if ((hitCheck_fighter_tama() == true) || (hitCheck_fighter_ika() == true)){
		clearInterval(timerID);	// タイマー解除
		context.fillStyle = "red";
		context.font = "normal bold 24px Tahoma";
		context.fillText("GAME OVER", 100, 220);
	}

}
// 自分の移動処理
function moveMyFighter(evt){
	game.mouseX = evt.clientX-20;
	game.mouseY = evt.clientY-20;
}
// ビームを発射
function startBeam(){
	for(var i=0; i<game.beamMax; i++){	// 三連射
		if (game.beamData[i] == null){
			game.beamData[i] = { x : game.fighterX + 16, y : game.fighterY };
			return;
		}
	}
}
// ビームの移動処理
function moveBeam(){
	for(var i=0; i<game.beamMax; i++){	// 三連射
		if (game.beamData[i] == null){ continue; }
		game.beamData[i].y = game.beamData[i].y - 16;
		if (game.beamData[i].y < -20){
			game.beamData[i] = null;	// 画面外に消えたらnullにする
		}
	}
}
// ビームを描画
function drawBeam(){
	var beam = document.getElementById("beam");
	for(var i=0; i<game.beamMax; i++){	// 三連射
		if (game.beamData[i] == null){ continue; }
		context.drawImage(beam, game.beamData[i].x, game.beamData[i].y);
	}
}
// 敵を出現させる
function startIka(){
	game.ikaCount = game.ikaCount + 1;
	if (game.ikaCount < 32){ return; }	// 32回に1回の割合で敵を出す
	game.ikaCount = 0;
	if (game.mapY > -1000){ game.ikaCount = 8; }	// 途中から難易度を上げる
	if (game.mapY > -2400){ game.ikaCount = 16; }	// 途中から難易度を上げる
	if (game.mapY > -4000){ game.ikaCount = 24; }	// 途中から難易度を上げる

	for(var i=0; i<game.ikaMax; i++){	// 最大6つまで
		if (game.ikaData[i] == null){
			var x = Math.random() * 200 + 60;	// 出現X座標
			var dy = Math.random()* 8 + 8;	// 移動速度
			var dx = 0;
			if (game.fighterX < 100){ dx = -2; }
			if (game.fighterX > 200){ dx = 2; }
			game.ikaData[i] = { x : x, y : -30, dx : dx, dy : dy };
			return;
		}
	}
}
// 敵の移動処理
function moveIka(){
	for(var i=0; i<game.ikaMax; i++){	// 最大6つまで
		if (game.ikaData[i] == null){ continue; }
		game.ikaData[i].x = game.ikaData[i].x + game.ikaData[i].dx;
		game.ikaData[i].y = game.ikaData[i].y + game.ikaData[i].dy;
		var n = Math.floor(Math.random() * 8);
		if ((n == 0) && (game.mapY > -2200)){	// ある程度マップが進んだら弾を撃つ
			startTama(game.ikaData[i].x+16, game.ikaData[i].y+32);
		}
		if (game.ikaData[i].y > 480){ game.ikaData[i] = null; }
	}
}
// 敵の描画処理
function drawIka(){
	var ika = document.getElementById("ika");
	for(var i=0; i<game.ikaMax; i++){	// 最大6つまで
		if (game.ikaData[i] == null){ continue; }
		context.drawImage(ika, game.ikaData[i].x, game.ikaData[i].y);
	}
}
// 弾を発射
function startTama(x, y){
	for(var i=0; i<game.tamaMax; i++){	// 最大4つ
		if (game.tamaData[i] == null){
			var dx = 2;	// 縦方向の移動量
			if (game.fighterX < x){ dx = -2; }
			var dy = 4;	// 縦方向の移動量
			if (game.fighterY < y){ dy = -4; }
			game.tamaData[i] = { x : x , y : y, dx : dx, dy : dy };
			return;
		}
	}
}
// 弾の移動処理
function moveTama(){
	for(var i=0; i<game.tamaMax; i++){	// 最大4つ
		if (game.tamaData[i] == null){ continue; }
		game.tamaData[i].x = game.tamaData[i].x + game.tamaData[i].dx;
		game.tamaData[i].y = game.tamaData[i].y + game.tamaData[i].dy;
		if ((game.tamaData[i].y < -20) || (game.tamaData[i].y > 480)){
			game.tamaData[i] = null;	// 画面外に消えたらnullにする
		}
	}
}
// 弾を描画
function drawTama(){
	var tama = document.getElementById("tama");
	for(var i=0; i<game.tamaMax; i++){	// 最大4つ
		if (game.tamaData[i] == null){ continue; }
		context.drawImage(tama, game.tamaData[i].x, game.tamaData[i].y);
	}
}
// ビームと敵の当たり判定
function hitCheck_beam_ika(){
	for(var i=0; i<game.beamMax; i++){	// 3連射
		if (game.beamData[i] == null){ continue; }	// ビームが存在していない場合はループの先頭へ
		var bx = game.beamData[i].x;
		var by = game.beamData[i].y;
		for(var j=0; j<game.ikaMax; j++){	// 敵は最大6つなので6
			if (game.ikaData[j] == null){ continue; }
			var tx = game.ikaData[j].x;	// X座標
			var ty = game.ikaData[j].y;	// Y座標
			if ((bx > tx) && (bx < (tx+game.charSize)) && (by > ty) && (by < (ty+game.charSize))){
				game.beamData[i] = null;	// ビームを消す
				game.ikaData[j] = null;	// 敵を消す
				game.score = game.score + 10;	// 敵を倒すと10点
				break;	// ループから抜ける
			}
		}
	}
}
// 弾と自機の当たり判定（厳密な判定）
/*
function hitCheck_fighter_tama(){
	var fx = game.fighterX;
	var fy = game.fighterY;
	for(var i=0; i<game.tamaMax; i++){	// 弾は最大4つ
		if (game.tamaData[i] == null){ continue; }	// 弾が存在していない場合はループの先頭へ
		var tx = game.tamaData[i].x;
		var ty = game.tamaData[i].y;
		if ( (fx > (tx+8)) || ((fx+32) < tx) || (fy > (ty+8)) || ((fy+32) < ty) ){ continue; }
		return true;	// 接触した事を知らせる
	}
	return false;	// 当たっていない事を知らせる
}
*/
// 弾と自機の当たり判定（緩く判定）
function hitCheck_fighter_tama(){
	var fx = game.fighterX + 8;
	var fy = game.fighterY + 8;
	for(var i=0; i<game.tamaMax; i++){	// 弾は最大4つ
		if (game.tamaData[i] == null){ continue; }	// 弾が存在していない場合はループの先頭へ
		var tx = game.tamaData[i].x;
		var ty = game.tamaData[i].y;
		if ( (fx > (tx+8)) || ((fx+16) < tx) || (fy > (ty+8)) || ((fy+16) < ty) ){ continue; }
		return true;	// 接触した事を知らせる
	}
	return false;	// 当たっていない事を知らせる
}
// 敵と自機の当たり判定（緩く判定）
function hitCheck_fighter_ika(){
	var fx = game.fighterX + 4;
	var fy = game.fighterY + 4; 
	for(var i=0; i<game.ikaMax; i++){	// 弾は最大6つ
		if (game.ikaData[i] == null){ continue; }	// 弾が存在していない場合はループの先頭へ
		var tx = game.ikaData[i].x;
		var ty = game.ikaData[i].y;
		if ( (fx > (tx+28)) || ((fx+24) < tx) || (fy > (ty+28)) || ((fy+24) < ty) ){ continue; }
		return true;	// 接触した事を知らせる
	}
	return false;	// 当たっていない事を知らせる
}


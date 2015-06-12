// 横スクロールシューティングゲーム
// Game用の変数
var context = null;
var contextMap = null;	// 地形用のCanvasのコンテキストマップ
var timerID = null;
var mapImage = new Image();
var game = {
	fighterX : 10,	// 自機のX座標
	fighterY : 160,	// 自機のY座標
	mouseX : 0,	// マウスのX座標
	mouseY : 0,	// マウスのY座標
	score : 0,	// ゲームのスコア
	charSize : 32,	// 画像の幅（32×32）
	beamMax : 1,	// ビームの最大数
	beamData : [null, null, null,null, null, null,null, null, null,null, null, null],	// ビームの座標などを入れる配列（最大12連射）
	ikaCount : 0,	// 敵の出現頻度制御
	ikaMax : 6,	// 敵の最大出現数
	ikaData : [null, null, null, null, null, null ]	,// 敵の座標などを入れる配列（最大6）
	tamaMax : 4,	// 弾の最大出現数
	tamaData : [null, null, null, null ],// 弾の座標などを入れる配列（最大4）
	mapX : 0,
	mapWidth : -2400 + 480,	// 最大値
	mapCounter : 0,	// マップカウンタ
	mapSpeed : 2,	// マップがスクロールする速度
	bakData : [null, null, null, null, null, null ],	// 爆発データを入れる配列
	bakMax : 6,	// 爆発の最大数
	powerMax : 6,	// 同時に6つまでしかでない
	powerCount : 8,	// 10匹に1匹の割合でオレンジ色の敵を出すためのカウンタ
	powerData : [null, null, null, null, null, null ]	// パワーアップアイテム
};
// ページが読み込まれた時の処理
window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	context = canvasObj.getContext("2d");
	contextMap = document.getElementsByTagName("canvas")[1].getContext("2d");	// 前面の地形
	window.document.addEventListener("mousemove", moveMyFighter, false);
	window.document.addEventListener("mousedown", startBeam, false);
	mapImage.src = "images/map.png";
	mapImage.onload = function(){
		timerID = setInterval("gameProc()", 50);
	}
}, true);
// 移動＆表示処理
function gameProc(){
	context.clearRect(0,0,480,320);
	contextMap.clearRect(0,0,480,320);

	// マップの移動処理
	game.mapCounter = game.mapCounter + 1;
	document.getElementById("stat").innerHTML = game.mapCounter;
	game.mapX = game.mapX - game.mapSpeed;
	if (game.mapX < game.mapWidth) { game.mapX = 0; game.mapCounter = 0; }

	// 自機の移動処理
	if ((game.mouseX < game.fighterX) && (game.fighterX > 4)){ game.fighterX = game.fighterX - 8; }
	if ((game.mouseX > game.fighterX) && (game.fighterX < 400)){ game.fighterX = game.fighterX + 8; }
	if ((game.mouseY < game.fighterY) && (game.fighterY > 4)){ game.fighterY = game.fighterY - 8; }
	if ((game.mouseY > game.fighterY) && (game.fighterY < 300)){ game.fighterY = game.fighterY + 8; }

	startIka();	// 敵を出現させる
	moveIka();	// 敵を移動させる
	moveBeam();	// ビームを移動
	moveTama();	// 敵弾を移動させる
	movePowerupItem();	// パワーアップアイテムを移動させる

	drawTama();	// 敵弾を描画する
	drawBeam();	// ビームを描画
	drawPowerupItem();	// パワーアップアイテムを描画する
	drawIka();	// 敵を描画する
	drawBak();	// 爆発パターンを描画する

	// マップの描画
	contextMap.drawImage(mapImage, game.mapX, 0);

	// 自機の表示
	var img = document.getElementById("figter");
	context.drawImage(img, game.fighterX, game.fighterY);

	// スコアの表示
	contextMap.fillStyle = "red";
	contextMap.font = "normal bold 14px Tahoma";
	contextMap.fillText("SCORE "+game.score, 5, 20);

	// ビームと地形の当たり判定
	hitCheck_beam_ground();
	hitCheck_beam_ika();	// ビームと敵の当たり判定

	// 自機とパワーアップアイテムの当たり判定
	hitCheck_fighter_power();

	// 自機と敵、弾、地形の当たり判定
	if ((hitCheck_fighter_tama() == true) || (hitCheck_fighter_ika() == true) ||
				hitCheck(contextMap, game.fighterX, game.fighterY+5, 32, 10)){
		clearInterval(timerID);	// タイマー解除
		contextMap.fillStyle = "red";
		contextMap.font = "normal bold 24px Tahoma";
		contextMap.fillText("GAME OVER", 180, 160);
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
			game.beamData[i] = { x : game.fighterX, y : game.fighterY+10 };
			return;
		}
	}
}
// ビームの移動処理
function moveBeam(){
	for(var i=0; i<game.beamMax; i++){	// 三連射
		if (game.beamData[i] == null){ continue; }
		game.beamData[i].x = game.beamData[i].x + 16;
		if (game.beamData[i].x > 480){
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
	if (game.mapCounter > 300){ game.ikaCount = 8; }	// 途中から難易度を上げる
	if (game.mapCounter > 500){ game.ikaCount = 20; }	// 途中から難易度を上げる
	if (game.mapCounter > 700){ game.ikaCount = 24; }	// 途中から難易度を上げる
	var ikaType = "normal";
	var ikaID = "ika";	// 表示する敵のID
	game.powerCount = game.powerCount + 1;
	if (game.powerCount > 10){
		game.powerCount = 0;
		ikaType = "power";	// パワーアップアイテムを持った敵
		ikaID = "ika2";
	}

	for(var i=0; i<game.ikaMax; i++){	// 最大6つまで
		if (game.ikaData[i] == null){
			var y = Math.random() * 240 + 40;	// 出現Y座標
			var dx = Math.random()* 5 + 4;	// 移動速度
			var dy = 0;
			if (game.fighterY < 120){ dy = -2; }
			if (game.fighterY > 180){ dy = 2; }
			if (game.mapCounter > 700){ dx = dx * 2; }	// ある程度マップが進んだら速度を2倍にする
			game.ikaData[i] = { type: ikaType, id : ikaID, x : 480, y : y, dx : -dx, dy : dy };
			return;
		}
	}
}
// 敵の移動処理（横に移動するように変更してあります）
function moveIka(){
	for(var i=0; i<game.ikaMax; i++){	// 最大6つまで
		if (game.ikaData[i] == null){ continue; }
		game.ikaData[i].x = game.ikaData[i].x + game.ikaData[i].dx;
		game.ikaData[i].y = game.ikaData[i].y + game.ikaData[i].dy;
		var n = Math.floor(Math.random() * 8);
		if ((n == 0) && (game.mapCounter > 750)){	// ある程度マップが進んだら弾を撃つ
			startTama(game.ikaData[i].x, game.ikaData[i].y+16);
		}
		if (game.ikaData[i].x < -40){ game.ikaData[i] = null; }
	}
}
// 敵の描画処理
function drawIka(){
	for(var i=0; i<game.ikaMax; i++){	// 最大6つまで
		if (game.ikaData[i] == null){ continue; }
		var ika = document.getElementById(game.ikaData[i].id);
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
				game.score = game.score + 10;	// 敵を倒すと10点
				startBak(tx, ty);	// 爆発パターンを設定
				// パワーアップアイテムの処理
				if(game.ikaData[j].type == "power"){	// 敵の種類がパワーアップアイテムを持ったものだった！
					startPowerupItem(tx, ty);
				}
				game.ikaData[j] = null;	// 敵を消す
				break;	// ループから抜ける
			}
		}
	}
}
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
		if ( (fx > (tx+28)) || ((fx+24) < tx) || (fy > (ty+28)) || ((fy+8) < ty) ){ continue; }
		return true;	// 接触した事を知らせる
	}
	return false;	// 当たっていない事を知らせる
}
// 爆発パターンを開始
function startBak(x, y){
	for(var i=0; i<game.bakMax; i++){	// 最大6つまで
		if (game.bakData[i] == null){
			game.bakData[i] = { x : x+16, y : y+16, size : 5 };	// 中心から爆発するようにする
			return;
		}
	}
}
// 爆発パターンを描画＆サイズ処理
function drawBak(){
	context.fillStyle = "yellow";	// 爆発色を黄色に
	context.globalAlpha = 0.75;	// 不透明度を75%に
	for(var i=0; i<game.bakMax; i++){	// 最大6つまで
		if (game.bakData[i] == null){ continue; }
		var x = game.bakData[i].x;
		var y = game.bakData[i].y;
		var r = game.bakData[i].size;
		context.beginPath();	// 新規にパスを作成
		context.arc(x, y, r, 0, Math.PI*2, false);		// 円を描く
		context.fill();	// 塗り潰す
		game.bakData[i].size = game.bakData[i].size + 2;
		if (game.bakData[i].size > 30){ game.bakData[i] = null; }	// 爆発の半径が一定数を超えたら消す
	}
	context.globalAlpha = 1;	// 不透明度を100%に戻す
}
// ------------------------------------------------------------------------------------------
// 接触判定。指定されたコンテキスト内のアルファチャネル値を読み出し（レッスン40参照）
function hitCheck(ctx, x,y,w,h){
	var pixel = ctx.getImageData(x, y, w, h);
	var count = 0;
	for(var i=0; i<w*h; i++){
		count = count + pixel.data[i*4+3];	// αチャネルの値を加算する
	}
	if (count > 0){ return true; }
	return false;
}
// ビームと地形の当たり判定
function hitCheck_beam_ground(){
	for(var i=0; i<game.beamMax; i++){	// 3連射
		if (game.beamData[i] == null){ continue; }	// ビームが存在していない場合はループの先頭へ
		var bx = game.beamData[i].x;
		var by = game.beamData[i].y;
		var flag = hitCheck(contextMap, bx, by, 32, 2);
		if (flag == true){	// 地面と接触した
			game.beamData[i] = null;
		}
	}
}
// ------------------------------------------------------------------------------------------
// パワーアップアイテムの処理関係
// ------------------------------------------------------------------------------------------
// パワーアップアイテムを出す
function startPowerupItem(x, y){
	for(var i=0; i<game.powerMax; i++){	// 最大6つ
		if (game.powerData[i] == null){
			game.powerData[i] = { x : x , y : y };
			return;
		}
	}
}
// パワーアップアイテムの移動処理（マップの移動速度と同じ）
function movePowerupItem(){
	for(var i=0; i<game.powerMax; i++){	// 最大6つ
		if (game.powerData[i] == null){ continue; }
		game.powerData[i].x = game.powerData[i].x - game.mapSpeed;
		if (game.powerData[i].x < -40){
			game.powerData[i] = null;	// 画面外に消えたらnullにする
		}
	}
}
// パワーアップアイテムを描画
function drawPowerupItem(){
	var power = document.getElementById("pow");
	for(var i=0; i<game.powerMax; i++){	// 最大6つ
		if (game.powerData[i] == null){ continue; }
		context.drawImage(power, game.powerData[i].x, game.powerData[i].y);
	}
}

// 自機とパワーアップアイテムの当たり判定
function hitCheck_fighter_power(){
	var fx = game.fighterX;
	var fy = game.fighterY; 
	for(var i=0; i<game.powerMax; i++){	// パワーアップアイテムは最大6つ
		if (game.powerData[i] == null){ continue; }	// パワーアップアイテムが存在していない場合はループの先頭へ
		var px = game.powerData[i].x;
		var py = game.powerData[i].y;
		if ( (fx > (px+32)) || ((fx+32) < px) || (fy > (py+32)) || ((fy+20) < py) ){ continue; }
		if (game.beamMax < 12){
			game.beamMax = game.beamMax + 1;	//  連射可能数を増やす
		}
		game.powerData[i] = null;	// パワーアップアイテムを消す
	}
}


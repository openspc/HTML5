// 背景画像付きシューティングゲーム2
// Game用の変数
var context = null;
var timerID = null;
var game = {
	stage : 1,	// ステージ番号
	fighterX : 130,	// 自機のマップX座標からのオフセット
	fighterY : 420,	// 自機のマップY座標からのオフセット
	mouseX : 0,	// マウスのX座標
	mouseY : 0,	// マウスのY座標
	score : 0,	// ゲームのスコア
	charSize : 32,	// 画像の幅（32×32）
	beamMax : 3,	// ビームの最大数
	beamData : [null, null, null],	// ビームの座標などを入れる配列（3連射）
	ikaCount : 0,	// 敵の出現頻度制御
	ikaMax : 6,	// 敵の最大出現数
	ikaData : [null, null, null, null, null, null ]	,// 敵の座標などを入れる配列（最大6）
	tamaMax : 4,	// 弾の最大出現数
	tamaData : [null, null, null, null ],// 弾の座標などを入れる配列（最大4）
	mapData : new Array(),	// マップデータ（ブロックの座標値が入る）
	mapSize : 32,	// マップブロック画像の幅（32×32）
	mapCounter : 0,	// マップカウンタ
	mapSpeed : 2,	// マップがスクロールする速度
	bakData : [null, null, null, null, null, null ],	// 爆発データを入れる配列
	bakMax : 6	// 爆発の最大数
};
// ページが読み込まれた時の処理
window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	context = canvasObj.getContext("2d");
	window.document.addEventListener("mousemove", moveMyFighter, false);
	window.document.addEventListener("mousedown", startBeam, false);
	setMap();	// マップを初期化
	timerID = setInterval("gameProc()", 50);
}, true);
// 移動＆表示処理
function gameProc(){
	context.clearRect(0,0,320,480);

	// マップの移動処理
	moveMap();

	// 自機の移動処理
	if ((game.mouseX < game.fighterX) && (game.fighterX > 4)){ game.fighterX = game.fighterX - 8; }
	if ((game.mouseX > game.fighterX) && (game.fighterX < 288)){ game.fighterX = game.fighterX + 8; }
	if ((game.mouseY < game.fighterY) && (game.fighterY > 160)){ game.fighterY = game.fighterY - 8; }
	if ((game.mouseY > game.fighterY) && (game.fighterY < 440)){ game.fighterY = game.fighterY + 8; }

	startIka();	// 敵を出現させる
	moveIka();	// 敵を移動させる
	moveBeam();	// ビームを移動
	moveTama();	// 敵弾を移動させる

	drawMap();	// マップを描画する
	drawTama();	// 敵弾を描画する
	drawBeam();	// ビームを描画
	drawIka();	// 敵を描画する
	drawBak();	// 爆発パターンを描画する

	// 自機の表示
	var img = document.getElementById("figter");
	context.drawImage(img, game.fighterX, game.fighterY);

	// スコアの表示
	context.fillStyle = "red";
	context.font = "normal bold 14px Tahoma";
	context.fillText("SCORE "+game.score, 5, 20);

	hitCheck_beam_ika();	// ビームと敵の当たり判定
	hitCheck_beam_block();	// ビームと地上物の当たり判定

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
	if (game.mapCounter > 400){ game.ikaCount = 8; }	// 途中から難易度を上げる
	if (game.mapCounter > 600){ game.ikaCount = 20; }	// 途中から難易度を上げる
	if (game.mapCounter > 900){ game.ikaCount = 24; }	// 途中から難易度を上げる

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
		if ((n == 0) && (game.mapCounter > 1000)){	// ある程度マップが進んだら弾を撃つ
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
				startBak(tx, ty);	// 爆発パターンを設定
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
		if ( (fx > (tx+28)) || ((fx+24) < tx) || (fy > (ty+28)) || ((fy+24) < ty) ){ continue; }
		return true;	// 接触した事を知らせる
	}
	return false;	// 当たっていない事を知らせる
}
// ------------- マップ処理 ---------------
// 開始前にステージに出てくるブロックを設定
function setMap(){
	var startY = -stage[game.stage].length * game.mapSize;
	game.mapData = new Array();
	for(var i=0; i<stage[game.stage].length; i++){
		var lineData = stage[game.stage][i];
		for(var j=0; j<lineData.length; j++){
			var c = lineData.charAt(j);
			if (c == "0"){ continue; }	// ブロックを出さない場合は内側のループの先頭へ
			var x = j*game.mapSize;
			var y = i*game.mapSize + startY;
			var power = 1;
			if (c == "3"){ power = 5; }	// 5発で破壊
			game.mapData.push({ type : c, x:x, y:y, power:power });
		}
	}
}
// マップを移動
function moveMap(){
	for(var i=0; i<game.mapData.length; i++){
		if (game.mapData[i] == null){ continue; }
		game.mapData[i].y = game.mapData[i].y + game.mapSpeed;	// マップを移動
		if (game.mapData[i].y > 480){ game.mapData[i] = null; }
	}
	game.mapCounter = game.mapCounter + 1;	// マップカウンタ
	document.getElementById("result").innerHTML = game.mapCounter;
	var n = stage[game.stage].length * game.mapSize / game.mapSpeed + 480;	// マップカウント値の最大値を求める
	if (game.mapCounter > n ){
		game.mapCounter = 0;
		// 次のステージに進む。3面しかないので3面を超えたら1面に戻す
		game.stage = game.stage + 1;
		if (game.stage > 3){ game.stage = 1; }
		setMap();
	}
}
// マップを表示
function drawMap(){
	// 描画するブロックをあらかじめ配列に入れる
	var block = [ "",
		document.getElementById("block1"),
		document.getElementById("block2"),
		document.getElementById("block3"),
		document.getElementById("block4")
	];
	// var offsetX = (-game.fighterX / 10) + 32;	// 左右に少し動いて浮遊感を出す場合
	for(var i=0; i<game.mapData.length; i++){
		if (game.mapData[i] == null){ continue; }
		var blockType = game.mapData[i].type;
		var x = game.mapData[i].x;
		var y = game.mapData[i].y;
		// context.drawImage(block[blockType], x+offsetX, y);
		context.drawImage(block[blockType], x, y);
	}
}
// ビームとマップ上のブロックの当たり判定
function hitCheck_beam_block(){
	for(var i=0; i<game.beamMax; i++){	// 3連射
		if (game.beamData[i] == null){ continue; }	// ビームが存在していない場合はループの先頭へ
		var bx = game.beamData[i].x;
		var by = game.beamData[i].y;
		for(var j=0; j<game.mapData.length; j++){	// マップブロックの数だけ判定する
			if (game.mapData[j] == null){ continue; }
			if ((game.mapData[j].type < 2) || (game.mapData[j].type == 4)){ continue; }	// 通常ブロックか破壊済みの場合は判定しない
			var mx = game.mapData[j].x;	// X座標
			var my = game.mapData[j].y;	// Y座標
			if ((bx > mx) && (bx < (mx+game.mapSize)) && (by > my) && (by < (my+game.mapSize))){
				game.beamData[i] = null;	// ビームを消す
				game.mapData[j].power = game.mapData[j].power - 1;
				if (game.mapData[j].power > 0){ break; }	// 破壊できなかった場合はループから抜ける
				game.score = game.score + game.mapData[j].type*20;	// ブロックの番号に応じて得点を加算
				game.mapData[j].type = "4";	// 破壊されたブロックの番号にする(4にする)
				startBak(mx, my);	// 爆発パターンを設定
				break;	// ループから抜ける
			}
		}
	}
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



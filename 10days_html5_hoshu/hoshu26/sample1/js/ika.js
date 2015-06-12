// 侵略イカゲーム（スペースシューティングゲーム）
// Game用の変数
var context = null;
var timerID = null;
var game = {
	beamX : 0,	// 自機のビームのX座標
	beamY : 0,	// 自機のビームのY座標
	beamFlag : false,	// 自機のビームが発射され移動しているかどうかのフラグ
	fighterX : 310,	// 自機のX座標
	fighterY : 440,	// 自機のY座標
	tempX : 0,	// マウスのX座標を一時的に入れる
	ikaXY : new Array(),	// イカの座標
	ikaCount : 0,	// イカの総数
	ikaSize : 32,	// イカの画像の幅（32×32）
	ikaMargin : 16,	// イカとイカとの間隔
	ikaDX : 8,		// イカの移動方向
	ikaPointer : 0	// 移動させるイカの番号（1つずつ増える）
};
// ページが読み込まれた時の処理
window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	context = canvasObj.getContext("2d");
	initIka();	// イカの位置を初期化
	timerID = setInterval("moveIka()", 25);
	canvasObj.addEventListener("mousemove", moveFighter, false);
	canvasObj.addEventListener("mousedown", startBeam, false);	// マウスボタンが押されたらビーム発射
}, true);
// イカの移動＆表示処理
function moveIka(){
	context.clearRect(0,0, 640, 480);	// Canvas全体を消去（別々に消すのが面倒だから）

	// 自機の移動処理
	if (game.tempX < game.fighterX){ game.fighterX = game.fighterX - 4; }
	if (game.tempX > game.fighterX){ game.fighterX = game.fighterX + 4; }
	// ビームの移動処理
	if (game.beamFlag == true){
		game.beamY = game.beamY - 16;
		if (game.beamY < -40){ game.beamFlag = false; }
	}
	// イカの移動処理（1つずつ移動させる）
	while(true){
		if (game.ikaXY[game.ikaPointer] == null){
			game.ikaPointer = game.ikaPointer + 1;
			if (game.ikaPointer > 49) { game.ikaPointer = 0; }	// 最大50しかでないので0に戻す
			continue;	// ループの先頭へ
		}
		game.ikaXY[game.ikaPointer].x = game.ikaXY[game.ikaPointer].x + game.ikaDX;
		if ((game.ikaXY[game.ikaPointer].x > 608) || (game.ikaXY[game.ikaPointer].x < 0)){
			game.ikaDX = -game.ikaDX;	// 端まで来たので方向を反転させて全体を下に移動
			for(var i=0; i<game.ikaXY.length; i++){
				if (game.ikaXY[i] == null){ continue; }	// 処理済みのイカの場合は即座にループの先頭へ
				game.ikaXY[i].y = game.ikaXY[i].y + 16;
				if (game.ikaXY[i].y > 442){	// 侵略されたと思われるY座標を442にする
					clearInterval(timerID);
					alert("イカに侵略されました。ゲームオーバー");
					return;
				}
			}
		}
		game.ikaPointer = game.ikaPointer + 1;
		if (game.ikaPointer > 49) { game.ikaPointer = 0; }	// 最大50しかでないので0に戻す
		break;
	}

	// イカとビームの接触判定
	if (game.beamFlag == true){	// ビームが発射され移動している場合のみ判定する
		for(var i=0; i<game.ikaXY.length; i++){
			if (game.ikaXY[i] == null){ continue; }	// 処理済みのイカの場合は即座にループの先頭へ
			if (	(game.beamX >= game.ikaXY[i].x) && 
				(game.beamX <= game.ikaXY[i].x+game.ikaSize) &&
				(game.beamY >= game.ikaXY[i].y) &&
				(game.beamY <= game.ikaXY[i].y+game.ikaSize)){
				game.ikaXY[i] = null;	// nullにすることでイカを倒したことを示す
				game.beamFlag = false;	// ビームを消す
				game.ikaCount = game.ikaCount - 1;	// ブロックの数を減らす
				if (game.ikaCount < 1){	// 全部倒したらゲームクリア
					clearInterval(timerID);
					alert("ゲームクリア！地球は救われました");
					return;
				}
			}
		}
	}

	// ビームを描画
	if (game.beamFlag == true){	// ビームが移動している時だけ描画する
		var beam = document.getElementById("beam");
		context.drawImage(beam, game.beamX, game.beamY);
	}
	// イカを描画
	var img = document.getElementById("ika");
	for(var i=0; i<game.ikaXY.length; i++){
		if (game.ikaXY[i] == null){ continue; }	// 処理済みのイカの場合は即座にループの先頭へ
		var ix = game.ikaXY[i].x;
		var iy = game.ikaXY[i].y;
		context.drawImage(img, ix, iy, game.ikaSize, game.ikaSize);
	}
	// 自機を描画
	var fighter = document.getElementById("fighter");
	context.drawImage(fighter, game.fighterX, game.fighterY);
}
// 自機の移動処理
function moveFighter(evt){
	game.tempX = evt.clientX - 16;	// マウスの座標を入れる。16は自機の画像の半分の値
}
// ビームの発射処理
function startBeam(evt){
	if (game.beamFlag == true){ return; }	// すでに発射済みの場合は何もしない
	game.beamFlag = true;	// 発射した事にする
	game.beamX = game.fighterX + 16;	// ビームのX座標を設定
	game.beamY = game.fighterY;	// ビームのY座標を設定
}
// ゲーム開始時のイカの位置を初期化（10匹×5段）
function initIka(){
	for(var y=0; y<5; y++){
		for(var x=0; x<10; x++){
			var ix = 20 + x*(game.ikaSize+game.ikaMargin) + 10;	// 20は全体のマージン、10はイカとの間隔
			var iy = 40 + y*(game.ikaSize+game.ikaMargin) + 10;	// 20は全体のマージン、10はイカとの間隔
			game.ikaXY.push({ x : ix, y : iy});	// 配列にイカの座標を入れる
			game.ikaCount = game.ikaCount + 1;	// 作ったイカの数をカウントする
		}
	}
}


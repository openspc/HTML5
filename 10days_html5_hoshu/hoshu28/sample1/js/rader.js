// 集金ゲーム2（レーダー画面タイプのゲーム）
// Game用の変数
var context = null;
var raderContext = null;
var timerID = null;
var game = {
	round : 1,	// ゲームの面（ラウンド）
	carX : 6,	// 自車のマップX座標からのオフセット
	carY : 8,	// 自車のマップY座標からのオフセット
	key : 38,	// 押されたキーのコード（最初は↑キーと同じにする。つまり上方向に走行）
	roundData : new Array(),	// ラウンドマップのデータを格納する配列
	moneyCount : 0,	// 金の総数
	charSize : 32,	// 画像の幅（32×32）
	mapX : 1,	// マップの描画位置(X座標)
	mapY : 30,	// マップの描画位置(Y座標)
	mapWidth : 30,	// マップの横幅(roundMap[0][0].length)
	mapHeight : 47	// マップの縦幅(roundMap[0].length)
};
// ページが読み込まれた時の処理
window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	context = canvasObj.getContext("2d");
	raderContext = document.getElementById("rader").getContext("2d");	// レーダー画面用Canvas
	window.document.addEventListener("keydown", moveMyChar, false);
	initMapData(game.round);	// 最初はラウンド1
	timerID = setInterval("moveCar()", 100);
}, true);
// 移動＆表示処理
function moveCar(){
	var tx = game.mapX, ty = game.mapY;	// 自分の座標（一時的に利用する）
	raderContext.clearRect((game.mapX+game.carX)*5, (game.mapY+game.carY)*5, 5, 5);

	// 自車の移動処理（マップ内で移動させる。自車は常に画面の中央なので）
	if (game.key == 37){ tx = tx - 1; }
	if (game.key == 39){ tx = tx + 1; }
	if (game.key == 38){ ty = ty - 1; }
	if (game.key == 40){ ty = ty + 1; }
	document.getElementById("car").className = "key"+game.key;	// クラス名で車の回転方向を決める
	var mp = (tx+game.carX)+(ty+game.carY)*game.mapWidth;	// マップ上での自分の位置を算出。30はマップ内での横幅
	if (game.roundData[mp] != "1"){
		game.mapX = tx;
		game.mapY = ty;
		if (game.roundData[mp] == "2"){
			game.roundData[mp] = "0";	// お金を集金したので0にして空にしておく
			game.moneyCount = game.moneyCount - 1;
			if (game.moneyCount < 1){
				alert("ラウンドクリア");
				game.round = game.round + 1;	// ラウンド数に1を足す
				if (game.round >= roundMap.length){	// 最終面をクリアした
					clearInterval(timerID);	// タイマーをクリア
					alert("全面クリアしました");
					return;
				}
				// 次にラウンドデータを表示する
				initMapData(game.round);
				game.mapX = 1;	// キャラクタの位置を再度設定する
				game.mapY = 30;
				game.key = 38;	// 最初は上方向に移動（走行）
				return;
			}
		}
	}else{
		// ブロックで進めない時の処理
		game.key = game.key + 1;
		if (game.key > 40){ game.key = 37; }
	}
	drawMapData();
	// レーダー画面に自車を表示
	raderContext.fillStyle = "red";
	raderContext.fillRect((game.mapX+game.carX)*5, (game.mapY+game.carY)*5, 5, 5);
}
// 自分の移動処理
function moveMyChar(evt){
	game.key = evt.keyCode;
}
// ラウンドマップを初期化
function initMapData(n){
	game.moneyCount = 0;	// お金の合計
	for(var y=0; y<game.mapHeight; y++){
		for(var x=0; x<game.mapWidth; x++){
			var mp = x+y*game.mapWidth;	//  設定するマップの位置を算出
			var c = game.roundData[mp] = roundMap[n][y].charAt(x);
			if (c == "2"){ game.moneyCount = game.moneyCount + 1; }
		}
	}
	drawRader();
}
// ラウンドマップを描画
function drawMapData(){
	var n = game.round;
	var type = ["road", "block", "money" ];
	context.clearRect(0,0, 320, 480);	// Canvasを消去
	for(var y=0; y<15; y++){
		for(var x=0; x<10; x++){
			var mp = (x+game.mapX) + (y+game.mapY)*game.mapWidth;	//  設定するマップの位置を算出
			var c = game.roundData[mp];
			var imageObj = document.getElementById(type[c]);
			context.drawImage(imageObj, x*game.charSize, y*game.charSize, game.charSize, game.charSize);
		}
	}
	// 画面の左下にラウンド数を表示する
	context.font = "normal bold 20px Tahoma";
	context.lineWidth = 4;
	context.strokeStyle = "black";
	context.strokeText("Round "+n, 5, 470);
	context.fillStyle = "red";
	context.fillText("Round "+n, 5, 470);
}
// レーダーを描画
function drawRader(){
	raderContext.fillStyle = "yellow";
	for(var y=0; y<game.mapHeight; y++){
		for(var x=0; x<game.mapWidth; x++){
			var mp = x+y*game.mapWidth;	//  設定するマップの位置を算出
			var c = game.roundData[mp];
			if (c == "2"){	// お金の場合だけレーダー画面に描画
				raderContext.fillRect(x*5, y*5, 5, 5);	// 5×5ピクセルサイズの四角で表示
			}
		}
	}
}

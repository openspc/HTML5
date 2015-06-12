// 迷路脱出ゲーム
// Game用の変数
var context = null;
var timerID = null;
var game = {
	round : 1,	// ゲームの面（ラウンド）
	charX : 8,	// キャラのマップ内の位置(X座標)
	charY : 8,	// キャラのマップ内の位置(Y座標)
	key : 38,	// 押されたキーのコード（最初は↑キーと同じにする。つまり上方向に走行）
	roundData : new Array(),	// ラウンドマップのデータを格納する配列
	charSize : 32,	// 画像の幅（32×32）
	mapWidth : 60,	// マップの横幅(roundMap[0][0].length)
	mapHeight : 36,	// マップの縦幅(roundMap[0].length)
	fadeCount : 0	// フェードアウト処理のためのカウンタ=不透明度(0〜0.75)
};
// ページが読み込まれた時の処理
window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	context = canvasObj.getContext("2d");
	window.document.addEventListener("keydown", moveMyChar, false);
	initMapData(game.round);	// 最初はラウンド1
	timerID = setInterval("moveChar()", 150);
}, true);
// 移動＆表示処理
function moveChar(){
	var tx = game.charX, ty = game.charY;	// 自分の座標（一時的に利用する）
	var temp = tx+(ty+1)*game.mapWidth;	// マップ上での自分の下の位置を算出
	if (game.roundData[temp] == "0"){	// 何もない空間の場合は落下させる
		game.charY = game.charY + 1;	// Y座標を1つ下に移動
		drawMapData();	// 迷宮を描く
		return;	// 落下中は何もできない
	}
	// 自分のキャラの移動処理（マップ内で移動させる。キャラは常に画面の中央なので）
	if (game.key == 37){ tx = tx - 1; }
	if (game.key == 39){ tx = tx + 1; }
	if (game.key == 38){ ty = ty - 1; }
	if (game.key == 40){ ty = ty + 1; }
	game.key = 0;	// オートリピートなし
	var mp = tx+ty*game.mapWidth;	// マップ上での自分の位置を算出
	if (game.roundData[mp] != "1"){
		game.charX = tx;
		game.charY = ty;
		if (game.roundData[mp] == "3"){
			alert("脱出しました。ラウンドクリアです");
			game.round = game.round + 1;	// ラウンド数に1を足す
			if (game.round >= roundMap.length){	// 最終面をクリアした
				clearInterval(timerID);	// タイマーをクリア
				alert("全面クリアしました");
				game.round = game.round - 1;
				drawMapData();	// 最後に迷宮を描く（表示されているキャラとの位置を合わせるため）
				game.fadeCount = 20;	// フェードアウト処理
				fadeout();	// フェードアウト処理
				return;
			}
			// 次にラウンドデータを表示する
			initMapData(game.round);
			return;
		}
	}
	drawMapData();
}
// 自分の移動処理
function moveMyChar(evt){
	game.key = evt.keyCode;
}
// マップを初期化
function initMapData(n){
	for(var y=0; y<game.mapHeight; y++){
		for(var x=0; x<game.mapWidth; x++){
			var mp = x+y*game.mapWidth;	//  設定するマップの位置を算出
			var c = roundMap[n][y].charAt(x);
			if (c == "9"){	// キャラのスタート位置
				c = "0";	// 自分のキャラがいるところは"0"、つまり何もないようにしておく
				game.charX = x;	// キャラのX座標（マップ内の位置）を設定
				game.charY = y;	// キャラのX座標（マップ内の位置）を設定
			}
			game.roundData[mp] = c;
		}
	}
}
// マップを描画
function drawMapData(){
	var n = game.round;
	var type = ["none", "block", "hashigo", "door", "ice", "block2" ];
	context.clearRect(0,0, 480, 320);	// Canvasを消去
	for(var y=0; y<10; y++){
		for(var x=0; x<15; x++){
			var mp = (x+game.charX-8) + (y+game.charY-5)*game.mapWidth;	//  設定するマップの位置を算出
			var c = parseInt(game.roundData[mp]);
			var imageObj = document.getElementById(type[c]);
			context.drawImage(imageObj, x*game.charSize, y*game.charSize, game.charSize, game.charSize);
		}
	}
	// 画面の左下にラウンド数を表示する
	context.font = "normal bold 14px Tahoma";
	context.lineWidth = 4;
	context.strokeStyle = "black";
	context.strokeText("Round "+n, 5, 310);
	context.fillStyle = "red";
	context.fillText("Round "+n, 5, 310);
}
// フェードアウトの処理
function fadeout(){
	context.save();	// Canvasの状態を保存
	context.globalAlpha = 0.05;	// 不透明度を5%にする
	context.fillStyle = "black";	// 黒でフェード
	context.fillRect(0,0, 480, 320);	// 全面を黒で塗り潰す
	context.restore();	// Canvasの状態を戻す
	game.fadeCount = game.fadeCount - 1;
	if (game.fadeCount > 0){ setTimeout("fadeout()", 150); }
}


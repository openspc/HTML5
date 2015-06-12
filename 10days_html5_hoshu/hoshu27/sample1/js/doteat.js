// 集金ゲーム（ドットイートタイプのゲーム）
// Game用の変数
var context = null;
var timerID = null;
var game = {
	round : 1,	// ゲームの面（ラウンド）
	manX : 1,	// 自分のX座標
	manY : 13,	// 自分のY座標
	key : 0,	// 押されたキーのコード
	roundData : new Array(),	// ラウンドマップのデータを格納する配列
	moneyCount : 0,	// 金の総数
	charSize : 32	// 画像の幅（32×32）
};
// ページが読み込まれた時の処理
window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	context = canvasObj.getContext("2d");
	window.document.addEventListener("keydown", moveMyChar, false);
	setRoundData(game.round);	// 最初はステージ1
	timerID = setInterval("moveChar()", 100);
}, true);
// 移動＆表示処理
function moveChar(){
	context.clearRect(game.manX*game.charSize, game.manY*game.charSize, game.charSize, game.charSize);	// 自分のキャラを消去
	var tx = game.manX, ty = game.manY;	// 自分の座標（一時的に利用する）

	// 自機の移動処理（マップ内で移動させる）
	if (game.key == 37){ tx = tx - 1; }
	if (game.key == 39){ tx = tx + 1; }
	if (game.key == 38){ ty = ty - 1; }
	if (game.key == 40){ ty = ty + 1; }
	var mp = tx+ty*10;	// マップ上での自分の位置を算出。10はマップ内での横幅
	if (game.roundData[mp] != "1"){
		game.manX = tx;
		game.manY = ty;
		game.key = 0;	// オートリピートを禁止
		if (game.roundData[mp] == "2"){
			game.roundData[mp] = "0";	// お金を集金したので0にして空にしておく
			game.moneyCount = game.moneyCount - 1;
			if (game.moneyCount < 1){
				context.clearRect(game.manX*game.charSize, game.manY*game.charSize, game.charSize, game.charSize);	// 自分のキャラを消去
				alert("ラウンドクリア");
				game.round = game.round + 1;	// ラウンド数に1を足す
				if (game.round >= roundMap.length){	// 最終面をクリアした
					clearInterval(timerID);	// タイマーをクリア
					alert("全面クリアしました");
					return;
				}
				// 次にラウンドデータを表示する
				setRoundData(game.round);
				game.manX = 1;	// キャラクタの位置を再度設定する
				game.manY = 13;
				return;
			}
		}
	}

	// 自分のキャラクタを描画
	var man = document.getElementById("man");
	context.drawImage(man, game.manX*game.charSize, game.manY*game.charSize);
}
// 自分の移動処理
function moveMyChar(evt){
	game.key = evt.keyCode;
}
// ラウンドマップを読み込み
function setRoundData(n){
	game.moneyCount = 0;	// お金の合計
	var type = ["", "block", "money" ];
	context.clearRect(0,0, 320, 480);	// Canvasを消去
	for(var y=0; y<15; y++){
		for(var x=0; x<10; x++){
			var mp = x+y*10;	//  設定するマップの位置を算出。10はマップ内での横幅
			var c = game.roundData[mp] = roundMap[n][y].charAt(x);
			if (c > 0){
				var imageObj = document.getElementById(type[c]);
				context.drawImage(imageObj, x*game.charSize, y*game.charSize, 32, 32);
				if (c == "2"){ game.moneyCount = game.moneyCount + 1; }
			}
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


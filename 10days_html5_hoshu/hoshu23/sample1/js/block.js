// ブロック崩し
// Game用の変数
var context = null;
var timerID = null;
var game = {
	ballX : 0,
	ballY : 250,
	ballDX : 4.3,
	ballDY : 3.9,
	padX : 10,
	padY : 440,
	padWidth : 50,
	padHeight : 10,
	blockWidth : 40,	// ブロックの横幅
	blockHeight : 10,	// ブロックの縦幅
	blockMarginW : 60,	// ブロックとブロックの横の間隔
	blockMarginH : 40,	// ブロックとブロックの縦の間隔
	blockXY : new Array(),	// ブロックの座標
	blockCount : 0	// ブロックの総数
};
// ページが読み込まれた時の処理
window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	context = canvasObj.getContext("2d");
	drawBlock();	// ブロックを描画
	timerID = setInterval("moveBall()", 25);
	canvasObj.addEventListener("mousemove", movePaddle, false);
}, true);
// ボールの移動＆表示処理
function moveBall(){
	context.fillStyle = "black";
	context.fillRect(game.ballX-1, game.ballY-1, 4, 4);
	context.fillRect(0, game.padY, 640, 10);	// パドルも消す
	game.ballX = game.ballX + game.ballDX;
	game.ballY = game.ballY + game.ballDY;
	if (game.ballX < 0) { game.ballDX = -game.ballDX; }	// 壁に当たったら移動方向を反対にする
	if (game.ballX > 639) { game.ballDX = -game.ballDX; }
	if (game.ballY < 0) { game.ballDY = -game.ballDY; }
	if (game.ballY > 479) {
		clearInterval(timerID);
		alert("Game Over");
	}
	// ブロックとボールの接触判定
	for(var i=0; i<game.blockXY.length; i++){
		if (game.blockXY[i] == null){ continue; }	// 処理済みのブロックの場合は即座にループの先頭へ
		if (	(game.ballX >= game.blockXY[i].x) && 
			(game.ballX <= game.blockXY[i].x+game.blockWidth) &&
			(game.ballY >= game.blockXY[i].y) &&
			(game.ballY <= game.blockXY[i].y+game.blockHeight)){
			context.fillRect(game.blockXY[i].x, game.blockXY[i].y, game.blockWidth, game.blockHeight);	// ブロックを消す
			game.blockXY[i] = null;	// nullにすることでブロックを消したことを示す
			game.ballDY = -game.ballDY;	// ボールの移動方向を反転させる
			game.blockCount = game.blockCount - 1;	// ブロックの数を減らす
			if (game.blockCount < 1){	// 全部消したらゲームクリア
				clearInterval(timerID);
				alert("ゲームクリア！");
			}
		}
	}
	// ボールとパドルを描画
	context.fillStyle = "white";
	context.fillRect(game.ballX, game.ballY, 2, 2);
	context.fillStyle = "yellow";
	context.fillRect(game.padX, game.padY, game.padWidth, game.padHeight);	// パドルを描く
	// ボールとパドルの接触判定
	if (game.ballY < game.padY) { return; }	// パドル位置まで達していない
	if (game.ballY > (game.padY+game.padHeight)) { return; }	// パドル位置を超えた
	if ((game.ballX >= game.padX) && (game.ballX <= (game.padX+game.padWidth))){
		game.ballDY = -game.ballDY;
		game.padWidth = game.padWidth - 1;	// パドルを小さくしていく
		if (game.padWidth < 8) { game.padWidth = 8; }
	}
}
// パドルの移動処理
function movePaddle(evt){
	game.padX = evt.clientX - 25;
}
// ゲーム開始時のブロックの描画（10個×5段）
function drawBlock(){
	for(var y=0; y<5; y++){
		for(var x=0; x<10; x++){
			var bx = 20 + x*game.blockMarginW + 10;	// 20は全体のマージン、10ブロックとの間隔
			var by = 40 + y*game.blockMarginH + 10;	// 20は全体のマージン、10ブロックとの間隔
			game.blockXY.push({ x : bx, y : by});	// 配列にブロックの座標を入れる
			context.fillStyle = "white";
			context.fillRect(bx, by, game.blockWidth, game.blockHeight);
			game.blockCount = game.blockCount + 1;	// 作ったブロックの数をカウントする
		}
	}
}


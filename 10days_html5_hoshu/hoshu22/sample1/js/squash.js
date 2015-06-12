// スカッシュ（パドルでボールを打つだけのゲーム）
// Game用の変数
var context = null;
var timerID = null;
var game = {
	ballX : 0,
	ballY : 0,
	ballDX : 4.3,
	ballDY : 3.9,
	padX : 10,
	padY : 440,
	padWidth : 50,
	padHeight : 10
};
// ページが読み込まれた時の処理
window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	context = canvasObj.getContext("2d");
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

// 加速度センサーの値を入れる変数を用意
var offsetX = 0;
var offsetY = 0;
window.addEventListener("load", function(){
	// ゲームに使用する変数などを初期化
	var canvasBGObj = document.getElementById("bg");
	var contextBG = canvasBGObj.getContext("2d");
	var canvasMapObj = document.getElementById("bgMap");
	var contextMap = canvasMapObj.getContext("2d");
	var bgImg = document.getElementById("dataBG");
	var mapImg = document.getElementById("dataMap");
	var bgX = 0;
	var bgY = -bgImg.naturalHeight/2;
	var mapX = 0;
	var mapY = -mapImg.naturalHeight;
	var bgSize = 256;	// 背景サイズ(256px　×　256px)
	var mapSize = 256;	// マップサイズ(256px　×　256px)
	var mapWidth = 256;	// マップの横のサイズ(256px)
	var mapHeight = 1280;	// マップの横のサイズ(1280px)
	// 自機と障害物の接触判定
	var fighterX = 60;	// 自機の接触判定の開始X座標
	var fighterY = 107;	// 自機の接触判定の開始Y座標
	var hitWidth = 8;	// 接触判定する横のピクセル数
	var hitHeight = 7;	// 接触判定する縦のピクセル数
	// ゲームオーバーなどの文字の色やサイズ
	contextMap.fillStyle = "white";
	contextMap.font = "12px bold 'Verdana-Bold'";
	contextMap.textAlign = "center";
	// 背景色を変化させるための変数
	var bgCounter = 0;
	// 定期的に背景を移動させる
	var timerID = setInterval(function(){
		var color = (20+Math.sin(bgCounter)*5);
		bgCounter = bgCounter + 0.2;
		contextBG.fillStyle = "hsl(90, 100%, "+color+"%)";
		contextBG.fillRect(0,0, canvasBGObj.width, canvasBGObj.height);
		contextBG.drawImage(bgImg, bgX, bgY, bgSize, bgSize);
		contextMap.clearRect(0,0, canvasMapObj.width, canvasMapObj.height);
		contextMap.drawImage(mapImg, mapX, mapY, mapSize, mapHeight);
		// 背景と障害物画面の横移動
		bgX = bgX + offsetX*2;
		mapX = mapX + offsetX;
		if (bgX > 0){ bgX = -bgSize/2; }
		if (bgX < -bgSize/2){ bgX = 0; }
		if (mapX > 0){ mapX = -bgSize/2; }
		if (mapX < -bgSize/2){ mapX = 0; }
		// 背景と障害物画面の縦移動
		bgY = bgY + offsetY;
		if (bgY > 0){ bgY = -bgSize/2; }
		mapY = mapY + offsetY / 2;
		if (mapY > 0){ 	// 障害物を越えたかどうか
			var endTime = (new Date()).getTime();
			clearInterval(timerID);
			// ゲームクリアの表示
			contextMap.fillText("CLEAR!!", 64, 60);
			// クリアにかかった時間を表示
			var sec = ((endTime - startTime)/1000).toFixed(1);
			contextMap.fillText("TIME = "+sec+" sec.", 64, 80);
		}
		// 接触判定
		var pixel = contextMap.getImageData(fighterX, fighterY, hitWidth, hitHeight);
		var count = 0;
		for(var i=0; i<hitWidth*hitHeight; i++){
			count = count + pixel.data[i*4+3];	// αチャネルの値を加算する
		}
		if (count > 0){	// 障害物に当たっていれば1以上の値になる
			clearInterval(timerID);
			document.getElementById("fighter").src = "images/crash.png";
			// ゲームオーバーの表示
			contextMap.fillText("GAME OVER", 64, 60);
		}
	}, 50);
	var startTime = (new Date()).getTime();	// ゲーム開始時の時間
}, true);
// 加速度センサーの値を取得する
window.addEventListener("devicemotion", function(evt){
	offsetX = evt.accelerationIncludingGravity.x;
	offsetY = (Math.floor(11 - evt.accelerationIncludingGravity.y)) / 2;
}, true);

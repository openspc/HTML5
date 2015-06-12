// ゲームに使用する変数などを初期化
(function(){
	// スコアを0点にする
	var score = 0;
	// ハイスコアはローカルストレージから読み出す。なければ700点に設定
	var highScore = window.localStorage.getItem("HighScore") || 700;
	document.getElementById("high").innerHTML = highScore;
	var w = 62;	// ブロックの横幅
	var h = 62;	// ブロックの縦幅
	var blockWidth = 5;	// 横のブロックの総数
	var blockHeight = 5;	// 縦のブロックの総数
	var totalBlock = blockWidth * blockHeight;	// ブロックの合計数
	var total = 0;	// タッチしたブロックの数
	var startTime = 0;	// 開始時間
	// 環境チェック
	if(typeof window.orientation === "number"){
		// スマートフォン (iPhone/Android)
		eventType = "touchstart";
	}else{
		// PC (Mac/UNIX/Windows)
		eventType = "click";
	}
	// ブロックを生成しイベントを設定
	for(var y=0; y<blockHeight; y++){
		for(var x=0; x<blockWidth; x++){
			var numberArea = document.createElement("div");
			numberArea.innerHTML = Math.floor(Math.random()*9+1);
			numberArea.style.left = x * w + "px";
			numberArea.style.top = y * h + "px";
			// タッチされた時の処理
			numberArea.addEventListener(eventType, function(evt){
				evt.preventDefault();
				if (this.innerHTML){
					// タッチした時に音を出す
					(new Audio("sound/get.mp3")).play();
					var point =  parseInt(this.innerHTML);
					this.innerHTML = "";
					total++;
					// 最初にタッチされたか調べる
					if (total == 1){
						startTime = (new Date()).getTime();
					}
					var endTime = (new Date()).getTime();
					// ボーナス得点の計算
					var bonusPoint = 10 - Math.floor((endTime - startTime)/1000);
					if (bonusPoint < 1){
						bonusPoint = 1;
					}
					// タッチした場所の数値と倍率を乗算する
					score = score + (point * bonusPoint);
					document.getElementById("score").innerHTML = score;
					// 全ての番号がタッチされたか調べる
					if (total == totalBlock){
						alert("クリア！スコアは"+score+"点でした");
						if (score > highScore){
							window.localStorage.setItem("HighScore", score);
							alert("ハイスコアです!!");
						}
						alert("再度遊ぶにはリロードしてください");
					}
				}
			}, true);
			// 作成したdiv要素をゲーム画面内に追加
			document.getElementById("gameScreen").appendChild(numberArea);
		}
	}
	// 定期的に値を変化させる
	setInterval(function(){
		var pos = Math.floor(Math.random() * totalBlock);
		var gs = document.getElementById("gameScreen");
		// div要素から必要な要素をピックアップ
		var ele = gs.getElementsByTagName("div")[pos];
		if (ele.innerHTML){
			var n = (parseInt(ele.innerHTML) + 1) % 10;
			if (n == 0){ n = n + 1; }
			ele.innerHTML = n;
		}
	}, 100);
})();

// ページの読み込みが完了したら処理をする
window.addEventListener("load", function(){
	var canvasOffset = 120;				// ★iPad。CanvasのY座標
	var ele = document.getElementById("status");
	// Canvasが使えるか調べる
	if (!window.HTMLCanvasElement){
		ele.innerHTML = "Canvasが使用できません";
		return;
	}
	// Canvasの要素
	var canvasObj = document.getElementById("myCanvas");
	// 2Dコンテキストの取得
	var context = canvasObj.getContext("2d");
	if (!context){
		ele.innerHTML = "2Dコンテキストが取得できません";
		return;
	}
	// アンドゥ機能でピクセルデータを入れるための変数
	var oldPixel = null;
	// Canvasを塗りつぶす
	context.fillStyle = "black";
	context.fillRect(0, 0, canvasObj.width, canvasObj.height);
	// 描画
	canvasObj.oldX = 0;
	canvasObj.oldY = 0;
	canvasObj.drawFlag = false;
	canvasObj.addEventListener("touchmove", function(evt){		// ★iPad
		if (!canvasObj.drawFlag){
			return;
		}
		var x = evt.touches[0].clientX;						// ★iPad
		var y = evt.touches[0].clientY-canvasOffset;			// ★iPad
		context.strokeStyle = "rgba(255, 255, 255,1)";
		context.lineWidth = 10;
		context.lineCap = "round";
		context.beginPath();
		context.moveTo(canvasObj.oldX, canvasObj.oldY);
		context.lineTo(x, y);
		context.stroke();
		context.closePath();
		canvasObj.oldX = x;
		canvasObj.oldY = y;
		evt.preventDefault();								// ★iPad
	}, false);
	canvasObj.addEventListener("touchstart", function(evt){		// ★iPad
		canvasObj.oldX = evt.touches[0].clientX;				// ★iPad
		canvasObj.oldY = evt.touches[0].clientY-canvasOffset;	// ★iPad
		canvasObj.drawFlag = true;
		// アンドゥ機能のためにピクセルデータを保存
		oldPixel = context.getImageData(0,0, canvasObj.width, canvasObj.height);
	}, false);
	canvasObj.addEventListener("touchend", function(evt){		// ★iPad
		canvasObj.drawFlag = false;
	}, false);
	// 文字を描画する
	document.getElementById("drawText").addEventListener("click", function(){
		// アンドゥ機能のためにピクセルデータを保存
		oldPixel = context.getImageData(0,0, canvasObj.width, canvasObj.height);
		// テキストフィールドに入力された文字を描画
		context.fillStyle="black";
		context.fillRect(0, 0, canvasObj.width, canvasObj.height);
		context.fillStyle="gray";
		context.font = "normal bold 370pt 'HiraKakuProN-W6'";	// ★iPad
		context.textAlign = "center";
		var text = document.getElementById("char").value;
		context.fillText(text, canvasObj.width/2, 470);			// ★iPad
	}, true);
	// 取り消し（アンドゥ）
	document.getElementById("undo").addEventListener("click", function(){
		var currentPixel = context.getImageData(0,0, canvasObj.width, canvasObj.height);
		if (oldPixel){
			context.putImageData(oldPixel, 0, 0);
			oldPixel = currentPixel;
		}
	}, true);
	// ローカルストレージに保存
	document.getElementById("save").addEventListener("click", function(){
		var imageData = canvasObj.toDataURL("image/png");
		try{												// ★iPad
			window.localStorage.setItem("kanji", imageData);
		}catch(e){										// ★iPad
			alert("ストレージがいっぱいで保存できません");		// ★iPad
		}												// ★iPad
	}, true);
	// ローカルストレージから読み出し
	document.getElementById("load").addEventListener("click", function(){
		var imageObj = new Image();
		imageObj.src = window.localStorage.getItem("kanji");
		imageObj.onload = function(){
			context.drawImage(this, 0, 0);
		}
	}, true);
}, true);

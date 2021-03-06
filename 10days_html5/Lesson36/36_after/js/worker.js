// ワーカーで分散して処理を行う
window.addEventListener("load", function(){
	// ワーカーの状況を表示する領域
	var stat = document.getElementById("workerStatus");

	// Web Workersが使えるか調べる
	if (!window.Worker){
		stat.innerHTML = "Web Workersは使用できません";
		return;
	}
	// Canvasの情報を読み出す
	var canvasObj = document.getElementById("myCanvas");
	var w = canvasObj.width;
	var h = canvasObj.height;
	var context = canvasObj.getContext("2d");

	// ボタンがクリックされた時の処理
	document.getElementById("effect").addEventListener("click", function(){
		// 複数のワーカーオブジェクトを入れるための配列変数
		var myWorker = [ ];
		var maxWorker = parseInt(document.getElementById("workerNum").value);
		var total = 0;	// 終了したワーカーの数を入れる変数

		// ワーカーの数だけノードを作成
		stat.innerHTML = "";
		for(var i=0; i<maxWorker; i++){
			var node = document.createElement("div");
			node.id = "status"+i;	// ID名は「status番号」
			stat.appendChild(node);
		}
		// 分散して処理を行う
		var processHeight = (h / maxWorker);	// 処理する縦幅
		// 時間を計測する
		var startTime = (new Date()).getTime();
		// 指定された数に分割してワーカーを処理
		for(var workerCount=0; workerCount<maxWorker; workerCount++){
			var workerStartPoint = processHeight * workerCount;
			// ピクセルデータを読み出す
			var image = context.getImageData(0, workerStartPoint, w, processHeight);
			// data配列にピクセルデータが格納されている
// ---- 初版からの変更箇所ここから
			// var pixels = image.data;
			for(var p=0, pixels=[ ]; p<image.data.length; p++){ pixels[p] = image.data[p]; }
// ---- 初版からの変更箇所ここまで
			myWorker[workerCount] = new Worker("js/effect.js");
			myWorker[workerCount].onmessage = function(evt){
				// 処理中の場合の進行割合の表示
				if (evt.data.status == "processing"){
					var ele = document.getElementById("status"+evt.data.proccessID);
					ele.innerHTML = ((evt.data.per)*100).toFixed(1)+"%";
				}
				// 処理が完了していない場合は以後の処理をしない
				if (evt.data.status != "end"){
					return;
				}
				// Canvasへの表示処理
				var outputImage = context.createImageData(w, processHeight);
				// 加工したピクセルをコピー
				for(var i=0; i<evt.data.pixels.length; i++){
					outputImage.data[i] = evt.data.pixels[i];
				}
				context.putImageData(outputImage, 0, processHeight*evt.data.proccessID);
				var ele = document.getElementById("status"+evt.data.proccessID);
				ele.innerHTML = "エフェクト処理が終了しました("+evt.data.proccessID+")";
				// 終了時間を計測
				total++;
				if (total == maxWorker){
					var endTime = (new Date()).getTime();
					var totalTime = (endTime - startTime)/1000;
					document.getElementById("time").innerHTML = totalTime + "秒かかりました"
				}
			}
			var ele = document.getElementById("status"+workerCount);
			ele.innerHTML = (workerCount+1)+"番目のワーカーでピクセル数を計算中...";
			myWorker[workerCount].postMessage({
				width: w,
				height: processHeight,
				pixelData : pixels,
				start : workerStartPoint,
				proccessID : workerCount
			});
		}
	}, true);
	// Canvasに画像を描画する
	var imageObj = new Image();
	imageObj.src = "images/flower.jpg";
	imageObj.onload = function(){
		context.drawImage(imageObj, 0, 0, 720, 480);
	}
}, true);

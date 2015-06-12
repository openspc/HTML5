window.addEventListener("load", function(){
	// HTML5 Videoに対応していない場合は以後の処理をしない
	if (!HTMLVideoElement){
		return;
	}

	// video要素へのアクセスを手軽にするため変数videoObjに入れる
	var videoObj = document.getElementById("myVideo");

	// 再生ボタンの処理（Audioのレッスンとほぼ同じです）
	document.getElementById("playButton").addEventListener("click", function(){
		videoObj.play();
	}, true);

	// 停止ボタンの処理
	document.getElementById("stopButton").addEventListener("click", function(){
		videoObj.pause();
	}, true);

	// 巻き戻しボタンの処理
	document.getElementById("rewindButton").addEventListener("click", function(){
		// 再生ヘッドを0秒にする
		videoObj.currentTime = 0;
		videoObj.pause();
	}, true);

}, true);

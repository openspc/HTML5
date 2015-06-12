window.addEventListener("load", function(){
	// HTML5 Videoに対応していない場合は以後の処理をしない
	if (!HTMLVideoElement){
		return;
	}
	// 状況を表示する領域
	var stat = document.getElementById("status");

	// video要素へのアクセスを手軽にするため変数videoObjに入れる
	var videoObj = document.getElementById("myVideo");

	// 再生可能な形式を調べる
	var mimetype = [
					{ type : "video/mp4", extension : ".mp4"},
					{ type : "video/webm", extension : ".webm"},
					{ type : "video/ogg", extension : ".ogv"},
					{ type : "video/quicktime", extension : ".mov"},
					{ type : "video/3gpp", extension : ".3gp"}
	];
	var ext = "";
	for(var i=0; i<mimetype.length; i++){
		var checkString = videoObj.canPlayType(mimetype[i].type);
		if ((checkString == "maybe") || (checkString == "probably")){
			ext = mimetype[i].extension;
			stat.innerHTML = mimetype[i].type+"が再生可能です";
			break;	// 再生可能な形式が見つかったのループを抜ける
		}
	}
	if (!ext){
		stat.innerHTML = "再生可能な映像フォーマットがありません";
		return;
	}

	// サムネールにイベントを設定する
	var imageList = document.querySelectorAll("#playList img");
	for(i=0; i<imageList.length; i++){
		imageList[i].addEventListener("click", function(){
			// プレイリストのimg要素のdata-video-urlを読み出し拡張子と連結
			videoObj.src = this.getAttribute("data-video-url") + ext;
			videoObj.play();
		}, true);
	}


	// ------------------------------------------------------------------------------------------
	// 再生ボタンの処理（前のレッスンとほぼ同じ）
	document.getElementById("playButton").addEventListener("click", function(){
		videoObj.play();
	}, true);

	// 停止ボタンの処理
	document.getElementById("stopButton").addEventListener("click", function(){
		videoObj.pause();
	}, true);

	// 巻き戻しボタンの処理
	document.getElementById("rewindButton").addEventListener("click", function(){
		videoObj.currentTime = 0;
		videoObj.pause();
	}, true);

	// スライダー処理
	document.getElementById("speedSlider").addEventListener("change", function(){
		var n = document.getElementById("speedSlider").valueAsNumber;
		videoObj.playbackRate = n;
		videoObj.defaultPlaybackRate = n;
	}, true);
}, true);

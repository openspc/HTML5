// ドラッグ＆ドロップ処理をする
window.addEventListener("load", function(){
	// ドロップ側の処理
	var drop = document.getElementById("dropArea");
	drop.addEventListener("drop", function(evt){
		evt.preventDefault();
		var fileList = evt.dataTransfer.files;
		// ドロップされたファイル数
		drop.innerHTML = "ドロップされたファイル数："+fileList.length;
		for(var i=0; i<fileList.length; i++){
			drop.innerHTML += "<hr>ファイル名："+fileList[i].name;
			drop.innerHTML += "<br>ファイルサイズ："+fileList[i].size+" バイト";
			drop.innerHTML += "<br>MIME Type："+fileList[i].type;
			// テキストファイルなら読み込み先頭20文字を表示
			if (window.FileReader && (fileList[i].type == "text/plain")){
				var reader = new FileReader();
				reader.onload = function(evt){
					drop.innerHTML += "<br><b>"+evt.target.result.substr(0, 20)+"</b>";
				}
				reader.readAsText(fileList[i]);
			}
		}
		drop.style.backgroundColor = "#eee";
	}, true);
	drop.addEventListener("dragenter", function(evt){
		evt.preventDefault();
		drop.style.backgroundColor = "#ecc";
	}, true);
	drop.addEventListener("dragleave", function(evt){
		evt.preventDefault();
		drop.style.backgroundColor = "#eee";
	}, true);
	// このイベントは必須
	drop.addEventListener("dragover", function(evt){
		evt.preventDefault();
	}, true);

	// ウィンドウのイベント（必須）
	window.addEventListener("drop", function(evt){
		evt.preventDefault();
		drop.innerHTML += "windowでdropイベント発生<br>";
	}, true);
	window.addEventListener("dragover", function(evt){
		evt.preventDefault();
		drop.innerHTML += "windowでdragoverイベント発生<br>";
	}, true);
	// ウィンドウのイベント（必須ではない）
	window.addEventListener("dragleave", function(evt){
		evt.preventDefault();
		drop.innerHTML += "windowでdragleaveイベント発生<br>";
	}, true);
	window.addEventListener("dragenter", function(evt){
		evt.preventDefault();
		drop.innerHTML += "windowでdragenterイベント発生<br>";
	}, true);
}, true);

// ページの読み込みが完了したら処理をする
window.addEventListener("load", function(){
	// File APIが使えるか調べる
	if (!window.File){
		ele.innerHTML = "File APIが使用できません";
		return;
	}
	// 情報を表示する領域の要素
	var ele = document.getElementById("result");
	// 「保存する」ボタンがクリックされた時の処理
	document.getElementById("read").addEventListener("click", function(){
		var fileList = document.getElementById("filedata").files;
		// 選択されたファイル数
		ele.innerHTML = "選択したファイル数："+fileList.length;
		for(var i=0; i<fileList.length; i++){
			ele.innerHTML += "<hr>ファイル名："+fileList[i].name;
			ele.innerHTML += "<br>ファイルサイズ："+fileList[i].size+" バイト";
			ele.innerHTML += "<br>MIME Type："+fileList[i].type;
			ele.innerHTML += "<br>lastModifiedDate："+fileList[i].lastModifiedDate;
			ele.innerHTML += "<hr>";
			var reader = new FileReader();
			reader.onloadstart = function(evt){
				ele.innerHTML += "loadstartイベント発生<br>";
			}
			reader.onload = function(evt){
				ele.innerHTML += "loadイベント発生<br>";
			}
			reader.onprogress = function(evt){
				var loadData = evt.loaded;
				ele.innerHTML += "progressイベント発生："+loadData+" バイト<br>";
			}
			reader.onloadend = function(evt){
				ele.innerHTML += "loadendイベント発生<br>";
			}
			reader.onerror = function(evt){
				var errorNo = evt.target.error.code
				ele.innerHTML += "errorイベント発生："+errorNo+"<br>";
			}
			reader.onabort = function(evt){
				ele.innerHTML += "abortイベント発生<br>";
			}
			reader.readAsText(fileList[i], "utf-8");
		}
	}, true);
}, true);

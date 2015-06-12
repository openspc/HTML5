// 選択した画像ファイルの内容を表示
window.addEventListener("load", function(){
	// File APIが使えるか調べる
	if (!window.File){
		ele.innerHTML = "File APIが使用できません";
		return;
	}
	// 情報を表示する領域の要素
	var ele = document.getElementById("fileinfo");
	// 進捗状況を表示するプログレスバーの要素を特定
	var prog = document.getElementById("loadstatus");
	// ファイルを読み込むためのFile Readerオブジェクトを入れる変数
	var reader;

	// ボタンがクリックされた時の処理
	document.getElementById("read").addEventListener("click", function(){
		var imageFileList = document.getElementById("filedata").files;
		for(var i=0; i<imageFileList.length; i++){
			// 選択されたファイル情報
			ele.innerHTML = "<hr>ファイル名："+imageFileList[i].name;
			ele.innerHTML += "<br>ファイルサイズ："+imageFileList[i].size+" バイト";
			ele.innerHTML += "<br>MIME Type："+imageFileList[i].type;
			ele.innerHTML += "<hr>";
			// 画像かどうか調べる
			if (imageFileList[i].type.indexOf("image/") != 0){
				ele.innerHTML += "選択したファイルは画像ではありません";
				return;
			}
			// 画像ファイルの読み込み処理
			reader = new FileReader();
			reader.onload = function(evt){
				var totalData = evt.total;
				prog.innerHTML = "100% ("+totalData+"/"+totalData+" バイト)";
				prog.value = 100;
				ele.innerHTML += "読み込み完了<br>";
				// ページ上に表示するサムネール画像を作成する
				var imgObj = document.createElement("img");
				imgObj.src = evt.target.result;	// data:URLを代入
				imgObj.width = 32;
				imgObj.height = 32;
				imgObj.onclick = function(){
					document.getElementById("view").src = this.src;
				}
				imgObj.onload = function(){
					document.getElementById("imagelist").appendChild(imgObj);
				}
			}
			reader.onerror = function(evt){
				var errorNo = evt.target.error.code
				ele.innerHTML += "エラー発生："+errorNo;
			}
			reader.onabort = function(evt){
				ele.innerHTML += "読み込みが中断されました";
			}
			reader.onprogress = function(evt){
				var loadData = evt.loaded;
				var totalData = evt.total;
				var per = (loadData/totalData) * 100;
				per = per.toFixed(1);	// 小数点第一位までの表示にする
				prog.innerHTML = per+"% ("+loadData+"/"+totalData+" バイト)";
				prog.value = per;
			}
			// DataURL形式でファイルを読み込む
			reader.readAsDataURL(imageFileList[i]);
		}
	}, true);
	// 読み込み停止ボタン
	document.getElementById("stopButton").addEventListener("click", function(){
		reader.abort();
	}, true);
}, true);

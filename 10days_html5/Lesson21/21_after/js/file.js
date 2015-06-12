// 選択したテキストファイルの内容を表示
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

	// 「保存する」ボタンがクリックされた時の処理
	document.getElementById("read").addEventListener("click", function(){
		var textFile = document.getElementById("filedata").files[0];
		// 選択されたファイル情報
		ele.innerHTML = "<hr>ファイル名："+textFile.name;
		ele.innerHTML += "<br>ファイルサイズ："+textFile.size+" バイト";
		ele.innerHTML += "<br>MIME Type："+textFile.type;
		ele.innerHTML += "<hr>";
		// テキストかどうか調べる
		if (textFile.type.indexOf("text/") != 0){
			ele.innerHTML += "選択したファイルはテキスト形式ではありません";
			return;
		}
		// テキストファイルなら処理を行う
		reader = new FileReader();
		reader.onload = function(evt){
			var totalData = evt.total;
			prog.innerHTML = "100% ("+totalData+"/"+totalData+" バイト)";
			prog.value = 100;
			ele.innerHTML += "読み込み完了";
			var text = evt.target.result;
			var text = text.substr(0, 100);	// 先頭100文字だけ表示
			document.getElementById("contents").textContent = text;
			//document.getElementById("contents").innerText = text;
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
		reader.readAsText(textFile, "utf-8");
	}, true);
	// 読み込み停止ボタン
	document.getElementById("stopButton").addEventListener("click", function(){
		reader.abort();
	}, true);
}, true);

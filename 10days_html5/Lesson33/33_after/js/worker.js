// ワーカーで句読点と、語尾を変更する
window.addEventListener("load", function(){
	var ele = document.getElementById("result");
	// Web Workersが使えるか調べる
	if (!window.Worker){
		ele.innerHTML = "Web Workersは使用できません";
		return;
	}
	// 変換ボタン(句読点変換)がクリックされた時の処理
	document.getElementById("convert1").addEventListener("click", function(){
		var text = document.getElementById("sourcetext").value;
		var myWorker = new Worker("js/convert1.js");
		myWorker.onmessage = function(evt){
			ele.innerHTML = evt.data;
		}
		myWorker.postMessage(text);
	}, true);
	// 変換ボタン(語尾変換)がクリックされた時の処理
	document.getElementById("convert2").addEventListener("click", function(){
		var text = document.getElementById("sourcetext").value;
		var myWorker = new Worker("js/convert2.js");
		myWorker.onmessage = function(evt){
			var count = evt.data.total;
			var text = evt.data.result;
			ele.innerHTML = text+"<br>変換した数："+count+"個";
		}
		myWorker.postMessage(text);
	}, true);
}, true);

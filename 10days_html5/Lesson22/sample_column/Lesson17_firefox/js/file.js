// ページの読み込みが完了したら処理をする
window.addEventListener("load", function(){
	// 情報を表示する領域の要素
	var ele = document.getElementById("result");
	// 「保存する」ボタンがクリックされた時の処理
	document.getElementById("read").addEventListener("click", function(){
		var fileList = document.getElementById("filedata").files;
		ele.innerHTML = "選択したファイル数："+fileList.length;
		f = new FileReader();
		blob = fileList[0].mozSlice(6,10);
		//a = fileList[0].slice(0,100);
		console.log(blob);
		f.onload = function(evt){
 					ele.innerHTML += evt.target.result + "<hr>";
		}
		f.readAsBinaryString(a);
	}, true);
}, true);

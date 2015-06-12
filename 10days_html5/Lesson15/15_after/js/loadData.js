// 保存リストから一覧を作成し表示する
function generateList(){
	var data = window.localStorage;
	var dialyList = "";
	for(var i=0; i<data.length; i++){
		var dataKey = data.key(i);
		// キーが日付かどうか正規表現を使って調べる
		var result = dataKey.match(/^\d{1,4}年\d{1,2}月\d{1,2}日/);
		// 日付の場合のみリストして表示する
		if(result != null){
			// リンクを生成
			var link = '<a href="#" onclick=loadDialy("'+data.key(i)+'")>'+data.key(i)+'</a>';
			dialyList += link+"<br>";
		}
	}
	document.getElementById("list").innerHTML = dialyList;
}
// リンクがクリックされた時の処理
function loadDialy(dialy_date){
	var dialyData = JSON.parse(window.localStorage.getItem(dialy_date));
	document.getElementById("dialyTitle").value = dialyData.title;
	document.getElementById("dialyDate").value = dialy_date;
	document.getElementById("dialyContents").value = dialyData.contents;
}

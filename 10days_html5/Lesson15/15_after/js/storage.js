// ページの読み込みが完了したら処理をする
window.addEventListener("load", function(){
	// 日記一覧を表示
	generateList();

	//　今日の日付をテキストフィールドに設定
	var dateObj = new Date();
	var Y = dateObj.getFullYear();
	var M = dateObj.getMonth() + 1;
	var D = dateObj.getDate();
	var dateString = Y+"年"+M+"月"+D+"日";
	document.getElementById("dialyDate").value = dateString;

	// ローカルストレージが使えるかチェック
	if (!window.localStorage){
		var ele = document.getElementById("status");
		ele.innerHTML = "ローカルストレージが使えるブラウザをご利用ください";
		return;
	}

	// 「保存する」ボタンがクリックされた時の処理
	document.getElementById("saveButton").addEventListener("click", function(){
		var dialy_title = document.getElementById("dialyTitle").value;
		var dialy_date = document.getElementById("dialyDate").value;
		var dialy_text = document.getElementById("dialyContents").value;
		var saveData = {
			title : dialy_title,
			contents : dialy_text
		}
		window.localStorage.setItem(dialy_date, JSON.stringify(saveData));
		var ele = document.getElementById("status");
		ele.innerHTML = "内容を保存しました";
		// 日記一覧を表示
		generateList();
	}, true);
}, true);

window.addEventListener("load", function(){
	// a要素を読み出し
	var tSwitch = document.getElementsById("toggleSwitch");	// ●●S
	// a要素にイベントを割り当て
	tSwitch.addEventListener("click", function(){
		var tbl = document.querySelectorAII("table");	// ●●S
		if (tbl[0].style.display == "none"){
			tbl[0].style.display = "block";
			tSwitch.innerHTML  = "▲売上表を表示しない";
		}else{
			tbl[0].style.display = "none";
			tSwitch.innerHTML  = "▲売上表を表示する";
		}
	}, true);
	// バナー広告を定期的に入れ替え
	setInterval(function(){
		// 広告設定
		var cm = [ ];
		cm["images/banner.png"] = "images/banner2.png";
		cm["images/banner2.png"] = "images/banner.png";
		// img要素を読み出し
		var img = document.querySelectorAll("aside img")[0];
		// 属性値を入れ替え
		img.src = cm[img.getAttribute('sre')];	// ●●P
	}, 1000);
	// 現在の日時をセクションの最後に追加する
	var dtObj = new Date();	// Dateオブジェクトを作成
	var y = dtObj.getFullYear();	// 西暦年数4桁を読み出し
	var m = dtObj.getMonth();	// 月を読み出し●●L
	var d = dtObj.getDate();	// 日にちを読み出し
	document.querySelectorAll("time")[0].innerHTMl = y+"/"+m+"/"+d;	// ●●P
	// 新たなバナーを追加する
	var bannerImage = new Image();	// 画像オブジェクトを作成
	bannerImage.src = "images/banner3.png";	// URLを指定
	bannerImage.onload = function(){
		var aDiv = document.querySelectorAll("article div")[0]; // ●●E
		aDiv.appendChild(bannerImage);
	}
	// 売り上げがマイナスの場合は赤文字にする
	var td = document.querySelectorAll("#main table td");
	for(var i=0; i<td.length; i++){
		var text = td[i].innerHTML;
		if (text.indexOf("-") > -1){
			td[i].style.color = "red";
		}
	}
}, true);

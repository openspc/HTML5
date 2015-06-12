// フォーム内容のコントロール
window.addEventListener("load", function(){
	var ele = document.getElementById("status");
	// 値の増減ボタン
	document.getElementById("countUp").addEventListener("click", function(){
		document.getElementById("resTime").stepUp(1);
	}, true);
	document.getElementById("countDown").addEventListener("click", function(){
		document.getElementById("resTime").stepDown(1);
	}, true);
	// 人数を増やすボタン
	document.getElementById("plus1").addEventListener("click", function(){
		var n = document.getElementById("resNumber").valueAsNumber;
		n = n + 1;
		document.getElementById("resNumber").value = n;
		// エラーチェック
		var flag = document.getElementById("resNumber").checkValidity();
		if(flag == true){
			ele.innerHTML = "入力値にエラーはありません";
		}else{
			var msg = document.getElementById("resNumber").validationMessage;
			ele.innerHTML = "エラー："+msg;
		}
	}, true);
	// カラー指定ボタン
	var eleBG = document.getElementById("bgcolor");
	var R = 0;
	var G = 0;
	var B = 0;
	// 赤スライダー
	document.getElementById("red").addEventListener("change", function(){
		R = this.valueAsNumber;
		ele.innerHTML = "red : "+R;
		eleBG.style.backgroundColor = "rgb("+R+","+G+","+B+")";
	}, true);
	// 緑スライダー
	document.getElementById("green").addEventListener("change", function(){
		G = this.valueAsNumber;
		ele.innerHTML = "green : "+G;
		eleBG.style.backgroundColor = "rgb("+R+","+G+","+B+")";
	}, true);
	// 青スライダー
	document.getElementById("blue").addEventListener("change", function(){
		B = this.valueAsNumber;
		ele.innerHTML = "blue : "+B;
		eleBG.style.backgroundColor = "rgb("+R+","+G+","+B+")";
	}, true);
	// 予約状況を調べるボタン
	document.getElementById("resCheck").addEventListener("click", function(){
		var n = document.getElementById("resStatus").value;
		n = n + 10;
		document.getElementById("resStatus").value = n;
		ele.innerHTML = n;
	}, true);
	// 標準の入力チェック（バリデート）をオフにするボタン
	document.getElementById("validOff").addEventListener("click", function(){
		document.getElementById("resForm").noValidate = true;
		ele.innerHTML = "標準の入力チェック（バリデート）をオフにしました";
	}, true);
	// スクリプトで入力チェック（バリデート）
	document.getElementById("resForm").addEventListener("submit", function(evt){
		var uID = document.getElementById("userID").value;
		if (uID != 1){
			evt.preventDefault();
			document.getElementById("userID").setCustomValidity("1以外は駄目です");
		}else{
			document.getElementById("userID").setCustomValidity("");
		}
		var n = document.getElementById("resStatus").value;
		if (n >= 90){
			evt.preventDefault();
			document.getElementById("resNumber").setCustomValidity("部屋が満杯です");
		}
	}, true);
}, true);



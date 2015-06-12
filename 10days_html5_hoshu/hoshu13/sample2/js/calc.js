// メモリが許す限り計算
var data = [];
for(var i=0; i<100000000; i++){	// 1億桁の計算
	data[i] = 9;
}
window.addEventListener("load", function(){
	// 「値を加算する」ボタンがクリックされた時の処理
	document.getElementById("addButton").addEventListener("click", function(){
		var n = parseInt(document.getElementById("num").value);
		add(n);
		display();
	}, true);
	// 計算結果（配列内容）をページ上に表示
	function display(){
		var txt = "";
		for(var i=data.length-1; i>=0; i--){	// 桁数の数だけ表示
			txt = txt + String.fromCharCode(0x30 + data[i])+" ";
		}
		document.getElementById("result").innerHTML = txt;
	}
	display();
}, true);
// 加算
function add(n){
	var ptr = 0;	// 最初の桁から加算していく（つまり最初の配列要素から加算）
	var len = data.length;
	while(true){
		data[ptr] = data[ptr] + n;	// 加算する
		if (data[ptr] < 10){ return; }// 10以下なら処理が終わったので関数から抜ける
		data[ptr] = data[ptr] - 10;	// 1桁にする
		n = 1;	// 次の桁に加算する値。これは必ず1になる
		ptr = ptr + 1;	// 加算する次の桁
		if (ptr > len){
			data[ptr] = 1;
			return;
		}
	}
}


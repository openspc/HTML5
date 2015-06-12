// スタックを用意する。ここでは配列で表現。
var stack = [ ];
// スタックポインタを用意する。最初は何もないので0
var stackPointer = 0;
// スタックに入る限界値（ここでは10にしてある）
var stackMax = 10;
// ページの読み込みが完了したら処理をする
window.addEventListener("load", function(){
	// 「スタックに入れる」ボタンがクリックされた時の処理
	document.getElementById("pushButton").addEventListener("click", function(){
		var n = document.getElementById("num").value;	// スタックに入れる値を読み出す
		pushValue(n);	// スタックに値を入れる
	}, true);
	// 「2つの値を加算する」ボタンがクリックされた時の処理
	document.getElementById("addButton").addEventListener("click", function(){
		var n1 = popValue();	// スタックから1つ値を取り出す
		if (n1 === null){ return; }	// nullなら失敗（エラー）
		var n2 = popValue();	// スタックから1つ値を取り出す
		if (n2 === null){ return; }	// nullなら失敗（エラー）
		var n = parseFloat(n1)+ parseFloat(n2);	// 値を加算
		pushValue(n);	// スタックに値を入れる
	}, true);
}, true);
// スタックの内容を表示
function viewStack(){
	var text = "";
	for(var i=0; i<stack.length; i++){
		text = text + '<div class="sp">' + stack[i] + '</div>';
	}
	// スタックの内容を表示
	document.getElementById("stackStatus").innerHTML = text;
}
// スタックに値を1つ入れる
function pushValue(n){
	if (stackPointer === stackMax){
		alert("スタックオーバーフローです");
		return;
	}
	stack.unshift(n);	// スタックに入れる
	stackPointer = stackPointer + 1;	// スタックポインタを1つ増やす
	viewStack();
}
// スタックから値を1つ取り出す
function popValue(){
	if (stackPointer === 0){
		alert("スタックアンダーフローです");
		return null;
	}
	stackPointer = stackPointer - 1;	// スタックポインタを1つ減らす
	return stack.shift();	// スタックポインタから値を1つ取り出す
	viewStack();
}

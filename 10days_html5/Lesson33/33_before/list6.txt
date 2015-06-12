// 語尾を変換
// 変換を行う関数（外部ファイル）を読み込ませる
importScripts("convertwords.js");
// イベントハンドラの設定
onmessage = function(evt){
	var text = evt.data;
	var count = text.match(/です/g).length;
	// 語尾を変換する処理を呼び出す
	var text = convert(text);
	// 変換した文字と変換した合計数を返す
	postMessage( { result : text, total : count });
}

// 句読点を変換
onmessage = function(evt){
	var text = evt.data;
	text = text.replace(/、/g, "，").replace(/。/g,"．");
	postMessage(text);
}

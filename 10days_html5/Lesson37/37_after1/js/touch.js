// タッチイベントを設定する
// タッチ開始
window.document.addEventListener("touchstart", function(evt){
	evt.preventDefault();
	getTouchInfo(evt.touches, "Touch Start");
}, true);
// タッチ中
window.document.addEventListener("touchmove", function(evt){
	evt.preventDefault();
	getTouchInfo(evt.touches, "Touch Move");
}, true);
// タッチ終了
window.document.addEventListener("touchend", function(evt){
	evt.preventDefault();
	getTouchInfo(evt.touches, "Touch End");
}, true);
// タッチ情報を表示する関数
function getTouchInfo(data, message){
	var ele = document.getElementById("status");
	ele.innerHTML = message;
	for(var i=0; i<data.length; i++){
		ele.innerHTML += "<br>タッチ番号："+i;
		ele.innerHTML += "<br>identifier："+data[i].identifier;
		ele.innerHTML += "<br>target："+data[i].target.tagName;
		ele.innerHTML += "<br>pageX："+data[i].pageX;
		ele.innerHTML += "<br>pageY："+data[i].pageY;
		ele.innerHTML += "<br>clientX："+data[i].clientX;
		ele.innerHTML += "<br>clientY："+data[i].clientY;
		ele.innerHTML += "<br>screenX："+data[i].screenX;
		ele.innerHTML += "<br>screenY："+data[i].screenY;
		ele.innerHTML += "<hr>";
	}
}

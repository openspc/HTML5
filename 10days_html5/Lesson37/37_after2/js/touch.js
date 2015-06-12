// タッチイベントを利用して画像をドラッグする
// タッチ開始
var moveTarget = null;
window.document.addEventListener("touchstart", function(evt){
	evt.preventDefault();
	moveTarget = null;
	if (evt.touches[0].target.tagName == "IMG"){
		moveTarget = evt.touches[0].target;
	}
}, true);
// タッチ中の処理
window.document.addEventListener("touchmove", function(evt){
	evt.preventDefault();
	if (moveTarget == null){
		return;
	}
	moveTarget.style.position = "absolute";
	moveTarget.style.left = evt.touches[0].screenX + "px";
	moveTarget.style.top = evt.touches[0].screenY + "px";
}, true);

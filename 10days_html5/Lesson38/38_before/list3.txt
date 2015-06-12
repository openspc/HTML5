// ジェスチャーで画像を拡大縮小／回転させる
// ジェスチャー開始
var moveTarget = null;
var targetWidth = 0;
var targetHeight = 0;
var ele = document.getElementById("status");
// ジェスチャー開始の処理
window.document.addEventListener("gesturestart", function(evt){
	evt.preventDefault();
	ele.innerHTML = "Gesture Start";
}, true);
// ジェスチャー中の処理
window.document.addEventListener("gesturechange", function(evt){
	evt.preventDefault();
	if (moveTarget == null){
		return;
	}
	// スケール値を求める
	var scale = evt.scale;
	var w = targetWidth * scale;
	var h = targetHeight * scale;
	// 回転角度を求める
	var rotation = evt.rotation;
	var r = "rotate("+evt.rotation+"deg)";
	moveTarget.style.position = "absolute";
	moveTarget.style.width = w + "px";
	moveTarget.style.height = h + "px";
	moveTarget.style.webkitTransform = r;
	ele.innerHTML = scale+"<br>"+r;
}, true);
// ジェスチャー終了の処理
window.document.addEventListener("gestureend", function(evt){
	evt.preventDefault();
	var ele = document.getElementById("status");
	ele.innerHTML = "Gesture End";
}, true);
// タッチ開始
window.document.addEventListener("touchstart", function(evt){
	evt.preventDefault();
	moveTarget = evt.touches[0].target;
	if (!moveTarget){
		return;
	}
	if (moveTarget.tagName != "IMG"){
		moveTarget = null;
		return;
	}
	// タッチされた画像の横幅を変数に入れておく
	targetWidth = moveTarget.width;
	targetHeight = moveTarget.height;
}, true);
// タッチ中の処理
window.document.addEventListener("touchmove", function(evt){
	evt.preventDefault();
	if (moveTarget == null){
		return;
	}
	// 指の押下時、画像の中央に設定
	var w = targetWidth / 2;
	var h = targetHeight / 2;
	moveTarget.style.position = "absolute";
	moveTarget.style.left = (evt.touches[0].screenX - w) + "px";
	moveTarget.style.top = (evt.touches[0].screenY- h) + "px";
}, true);

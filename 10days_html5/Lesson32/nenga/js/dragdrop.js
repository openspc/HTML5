// ドラッグ＆ドロップ処理をする
window.addEventListener("load", function(){
	// ドラッグ側の処理
	var itemList = document.querySelectorAll(".dd");
	for(var i=0; i<itemList.length; i++){
		itemList[i].id = "dragNo"+i;	// IDを割り当てる
		itemList[i].addEventListener("dragstart", function(evt){
			evt.dataTransfer.setData("text", evt.currentTarget.id);
		}, true);
	}
	// ドロップ側の処理
	var drop = document.getElementById("dropArea");
	drop.addEventListener("drop", function(evt){
		evt.preventDefault();
		var ele = document.getElementById(evt.dataTransfer.getData("text"));
		ele.style.top = evt.clientY+"px";
		ele.style.left = evt.clientX+"px";
	}, true);
	// このイベントは必須
	drop.addEventListener("dragover", function(evt){
		evt.preventDefault();
	}, true);
}, true);

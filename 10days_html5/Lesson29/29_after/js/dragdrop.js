// ドラッグ＆ドロップ処理をする
window.addEventListener("load", function(){
	// ドラッグ側の処理
	var itemList = document.querySelectorAll("#dragItems div");
	for(var i=0; i<itemList.length; i++){
		itemList[i].draggable = true;	// Safari, Chrome
		itemList[i].id = "dragNo"+i;	// IDを割り当てる
		itemList[i].addEventListener("dragstart", function(evt){
			evt.dataTransfer.setData("text", evt.currentTarget.id);
		}, true);
	}
	// ドロップ側の処理
	var drop = document.getElementById("dropArea");
	drop.addEventListener("drop", function(evt){
		evt.preventDefault();
		var ID = evt.dataTransfer.getData("text");
		try{
			drop.innerHTML += document.getElementById(ID).innerHTML+"/";
		}catch(e){
			drop.innerHTML += "デスクトップからドロップされました/";
		}
		drop.style.backgroundColor = "#eee";
	}, true);
	drop.addEventListener("dragenter", function(evt){
		evt.preventDefault();
		drop.style.backgroundColor = "#ecc";
	}, true);
	drop.addEventListener("dragleave", function(evt){
		evt.preventDefault();
		drop.style.backgroundColor = "#eee";
	}, true);
	// このイベントは必須
	drop.addEventListener("dragover", function(evt){
		evt.preventDefault();
	}, true);
}, true);

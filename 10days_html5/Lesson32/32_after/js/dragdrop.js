// ドラッグ＆ドロップ処理をする
window.addEventListener("load", function(){
	// ドロップ側の処理
	var drop = document.getElementById("dropArea");
	drop.addEventListener("drop", function(evt){
		evt.preventDefault();
		var fileList = evt.dataTransfer.files;
		// ドロップされたファイル数
		for(var i=0; i<fileList.length; i++){
			// ファイルの処理
			if (window.FileReader){
				(function(fileObj){
					var fileInfo = "ファイル名："+fileObj.name;
					fileInfo += "、ファイルサイズ："+fileObj.size+" バイト";
					fileInfo += "、MIME Type："+fileObj.type;
					var reader = new FileReader();
					reader.onload = function(evt){
						var typeList = [
							{ type : "image/", name : "img" },
							{ type : "video/", name : "video" },
							{ type : "audio/", name : "audio" }
						];
						for(var i=0; i<typeList.length; i++){
							var ele = null;
							if (fileObj.type.indexOf(typeList[i].type) == 0){
								var ele = document.createElement(typeList[i].name);
								// 読み込まれたデータはData URL形式なので、そのまま代入
								ele.src = reader.result;
								ele.title = fileInfo;
								ele.controls = true;
								drop.appendChild(ele);
								break;
							}
							if (fileObj.type.indexOf("text/") == 0){
								var ele = document.createElement("div");
								// 読み込まれたデータはテキストなので、そのまま代入
								ele.textContent = reader.result;
								drop.appendChild(ele);
								break;
							}
						}
						if (ele == null){
							var ele = document.createElement("img");
							ele.src = "images/unknown.png";
							ele.title = fileInfo;
							drop.appendChild(ele);
						}
					}
					// ファイルの種類によって読み込み方法を変える
					if (fileObj.type.indexOf("text/") == 0){
						reader.readAsText(fileObj);
					}else{
						reader.readAsDataURL(fileObj);
					}
				})(fileList[i]);
			}
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

	// ウィンドウのイベント（必須）
	window.addEventListener("drop", function(evt){
		evt.preventDefault();
	}, true);
	window.addEventListener("dragover", function(evt){
		evt.preventDefault();
	}, true);
}, true);

// ドラッグ＆ドロップ処理をする
window.addEventListener("load", function(){
	// ドロップ側の処理
	var drop = document.getElementById("dropArea");
	drop.addEventListener("drop", function(evt){
		evt.preventDefault();
		var fileList = evt.dataTransfer.files;
		// ドロップされたファイル数
		for(var i=0; i<fileList.length; i++){
			// 画像ファイルの場合のみ処理
			if (window.FileReader && (fileList[i].type.indexOf("image/") == 0)){
				(function(fileObj){
					var fileInfo = "ファイル名："+fileObj.name;
					fileInfo += "、ファイルサイズ："+fileObj.size+" バイト";
					fileInfo += "、MIME Type："+fileObj.type;
					var reader = new FileReader();
					reader.onload = function(evt){
						var imageObj = new Image();	// 画像オブジェクトを作成
						imageObj.src = reader.result;	// 読み込まれたデータはData URL形式なので、そのまま代入
						imageObj.width = 64;
						imageObj.height = 64;
						imageObj.title = fileInfo;
						imageObj.addEventListener("click", function(){
							if (this.width == 64){
								this.width = this.naturalWidth;
								this.height = this.naturalHeight;
							}else{
								this.width = 64;
								this.height = 64;
							}
						}, true);
						drop.appendChild(imageObj);
					}
					reader.readAsDataURL(fileObj);
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

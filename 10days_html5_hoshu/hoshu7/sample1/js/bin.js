window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	var context = canvasObj.getContext("2d");
	if (!context){ return; }
	// ボタンがクリックされた時の処理
	document.getElementById("exec").addEventListener("click", function(){
		var binaryFile = document.getElementById("filedata").files[0];
		reader = new FileReader();
		reader.onload = function(evt){
			var data = evt.target.result;	// バイナリデータ読み出し
			var ptr = 0;
			for(var y=0; y<128; y++){
				for(var x=0; x<128; x++){
					var val = data.charCodeAt(ptr++);
					var R = val.toString(16); if(val<16){ R = "0"+R; }
					val = data.charCodeAt(ptr++);
					var G = val.toString(16); if(val<16){ G = "0"+G; }
					val = data.charCodeAt(ptr++);
					var B = val.toString(16); if(val<16){ B = "0"+B; }
					context.fillStyle = "#"+R+G+B;
					context.fillRect(x,y,1,1);
				}
			}
		}
		reader.readAsBinaryString(binaryFile);
	}, true);
}, true);

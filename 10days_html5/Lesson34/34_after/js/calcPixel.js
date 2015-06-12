// ピクセル数を計算
onmessage = function(evt){
	var w = evt.data.width;
	var h = evt.data.height;
	var pixels = evt.data.pixelData;
	var R = evt.data.red;
	var G = evt.data.green;
	var B = evt.data.blue;
	var count = 0;
	for(var y=0; y<h; y++){
		for(var x=0; x<w; x++){
			var pointer = (y * w + x ) * 4;	// RGBαなので4つの配列要素
			var red = pixels[pointer+0];	// 赤の輝度（0〜255）
			var green = pixels[pointer+1];	// 緑の輝度（0〜255）
			var blue = pixels[pointer+2];	// 青の輝度（0〜255）
			var alpha = pixels[pointer+3];	// 不透明度（0〜255）
			if ((red == R) && (green == G) && (blue == B)){
				count = count + 1;
			}
		}
	}
	postMessage(count);
}

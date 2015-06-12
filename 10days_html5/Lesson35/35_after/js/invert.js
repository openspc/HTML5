// 補色にする（反転処理）
function invert(pixels, w, h){
	for(var y=0; y<h; y++){
		for(var x=0; x<w; x++){
			var pointer = (y * w + x ) * 4;	// RGBαなので4つの配列要素
			var red = pixels[pointer+0];	// 赤の輝度（0〜255）
			var green = pixels[pointer+1];	// 緑の輝度（0〜255）
			var blue = pixels[pointer+2];	// 青の輝度（0〜255）
			var alpha = pixels[pointer+3];	// 不透明度（0〜255）
			// 輝度を反転
			red = 255 - red;
			green = 255 - green;
			blue = 255 - blue;
			// 結果を書き込む
			pixels[pointer+0] = red;
			pixels[pointer+1] = green;
			pixels[pointer+2] = blue;
			pixels[pointer+3] = alpha;
		}
		postMessage({
			status : "processing",
			per : y/h	// 進行割合
		});
	}
	// 処理した結果を入れてある配列を返す
	return pixels;
}

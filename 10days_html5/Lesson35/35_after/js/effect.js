// エフェクト処理を行う
importScripts("invert.js");
onmessage = function(evt){
	var w = evt.data.width;
	var h = evt.data.height;
	var pixels = evt.data.pixelData;
	var R = evt.data.red;
	var G = evt.data.green;
	var B = evt.data.blue;
	var result = invert(pixels, w, h);
	postMessage({
		status : "end",
		pixels : result
	});
}

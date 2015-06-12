// エフェクト処理を行う
importScripts("invert.js");
onmessage = function(evt){
	var workerCount = evt.data.proccessID;
	var workerStartPoint = evt.data.start;
	var w = evt.data.width;
	var h = evt.data.height;
	var pixels = evt.data.pixelData;
	var R = evt.data.red;
	var G = evt.data.green;
	var B = evt.data.blue;
	var result = invert(pixels, w, h, workerCount);
	postMessage({
		status : "end",
		pixels : result,
		start : workerStartPoint,
		proccessID : workerCount
	});
}

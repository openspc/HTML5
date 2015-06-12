// マップデータ
var mapData = [
	"11111333322222333333",
	"11133333332222223300",
	"11113331133222333000",
	"11111311130000000000",
	"31133300003313323330",
	"31300033333113323000",
	"00033333331111230000",
	"33333333333333233000",
	"11111133333332300000",
	"11111111111332000000"
];
window.addEventListener("load", function(){
	var canvasObj = document.getElementsByTagName("canvas")[0];
	var context = canvasObj.getContext("2d");
	if (!context){ return; }
	for(var y=0; y<mapData.length; y++){
		for(var x=0; x<mapData[0].length; x++){
			var n = mapData[y].charAt(x);	// 1文字読み出し
			(function(n, x, y){
				var img = new Image();
				img.src = "images/"+n+".png";
				img.onload = function(){
					context.drawImage(this, x*32, y*32);	// マップ画像のサイズは32×32ピクセル
				}
			})(n, x, y);
		}
	}
}, true);

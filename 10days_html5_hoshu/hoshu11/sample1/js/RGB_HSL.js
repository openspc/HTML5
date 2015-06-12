// RGBとHSLの相互変換関数（ワーカー内専用のグローバル関数）
// RGB to HSL (R:0~255, G:0〜255, B:0〜255, h:0〜360, s:-1〜1, l:0〜1)
function RGBtoHSL(r, g, b){
	var h = 0;
	var s = 0;
	var l = 0;
	var cmax, cmin;
	if ( r >= g  ) cmax = r; else cmax = g;
	if ( b > cmax) cmax = b;
	if ( r <= g  ) cmin = r; else cmin = g;
	if ( b < cmin) cmin = b;
	l = (cmax + cmin) / 2;
	var c = cmax - cmin;
	if ( c != 0 ){
		if ( l <= 0.5 ) s = c / (cmax + cmin); else s = c / ( 2 - (cmax + cmin));
		if ( r == cmax){
			h = ( g - b ) / c;
		}else{
			if (g == cmax){
				h = 2 + ( b - r ) / c;
			}else{
				if ( b == cmax ) h = 4 + ( r - g ) / c;
			}
		}
		h = h * 60;
		if ( h < 0 ) h = h + 360;
	}
	return { H:h, S:s, L:l/255 };
}
// HSL to RGB (R:0~255, G:0〜255, B:0〜255, h:0〜360, s:-1〜1, l:0〜1)
function HSLtoRGB(h, s, l){
	if (s < 0) s = 0;
	if (s > 1) s = 1;
	if (l < 0) l = 0;
	if (l > 1) l = 1;
	h = h % 360;
	if (h < 0) h = h + 360;
	if (l <= 0.5){
		var cmin = l * ( 1 - s );
		var cmax = 2 * l - cmin;
	}else{
		var cmax = l * ( 1 - s ) + s;
		var cmin = 2 * l - cmax;
	}
	var r = h2v(h+120,cmin,cmax);
	var g = h2v(h,cmin,cmax);
	var b = h2v(h-120,cmin,cmax);
	return { R:r, G:g, B:b };
	function h2v(hh,min,max){
		hh = hh % 360;
		if (hh <  0) hh = hh + 360;
		if (hh <  60) return min + (max - min) * hh / 60;
		if (hh >= 60 && hh < 180) return max;
		if (hh >=180 && hh < 240) return min+(max-min)*(240-hh)/60;
		return min;
	}
}

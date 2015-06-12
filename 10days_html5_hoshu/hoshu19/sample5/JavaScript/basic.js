A = 10
GOSUB1000()
GOSUB1000()
A = 100
GOSUB1000()
GOSUB1000()
// GOSUB1000という名前のサブルーチン（関数）
function GOSUB1000(){
	document.getElementById("screen1").innerHTML += "A = "+A+"<br>"
	A = A + 1
	return
}

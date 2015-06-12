window.addEventListener("load", function(){
	var ele = document.querySelectorAll("#container span");
	for(var i=0; i<ele.length; i++){
		ele[i].style.color = "red";
	}
}, true);

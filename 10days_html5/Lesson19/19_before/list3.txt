// お店情報をグーグルマップ上に表示
var map = null;
var marker = null;
window.addEventListener("load", function(){
	// 情報を表示するための領域を指し示す変数
	var ele = document.getElementById("status");

	// Geolocation APIに対応しているか調べる
	if (!navigator.geolocation){
		ele.innerHTML = "Geolocation APIに対応していません";
		return;
	}

	// 緯度、経度を入れる変数
	var lati  = 36;
	var long = 135;

	// 現在地とお店情報をローカルストレージに保存
	document.getElementById("save").addEventListener("click", function(){
		var name = document.getElementById("shopName").value;
		var info = document.getElementById("shopInfo").value;
		var saveData = {
			lat : lati,	// 緯度
			lng : long,	// 経度
			shopName : name,	// お店の名前
			shopInfo : info	// お店情報
		}
		var key = "geo:"+(new Date()).getTime();	// 登録時のミリ秒をキーに含めて保存
		try{
			window.localStorage.setItem(key, JSON.stringify(saveData));
		}catch(e){
			ele.innerHTML = "ローカルストレージに保存できませんでした";
			return;
		}
		ele.innerHTML = "お店情報と位置情報を保存しました";
		// お店一覧を更新
		generate();
	}, true);

	// 地図をページ内に表示する
	map = new google.maps.Map(
		document.getElementById("myGoogleMap"),{
			zoom : 5,
			center : new google.maps.LatLng(36, 135),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		}
	);

	// 監視用IDを入れるための変数
	var watchID = null;
	document.getElementById("get").addEventListener("click", function(){
		var option = {
			enableHighAccuracy : true,	// 詳細な位置を取得
			timeout : 60*1000,	// タイムアウトまでは60秒
			maximumAge : 0	// 最新のデータを取得
		}
		watchID = navigator.geolocation.watchPosition(getPos, errPos, option);
	}, true);
	// 位置情報を取得した場合に処理を行う関数
	function getPos(position){
		lati = position.coords.latitude;	// 緯度
		long = position.coords.longitude;	// 経度
		ele.innerHTML = "緯度："+lati+"<br>経度："+long;
		// 地図の中心を現在地にする
		var currentPosition = new google.maps.LatLng(lati, long);
		map.setCenter(currentPosition);

		// マーカーを表示する
		if (marker){
			marker.setMap(null);	// マーカーを削除
		}
		marker = new google.maps.Marker({
			position: currentPosition,
			map: map
		});
	}
	// 位置情報の取得に失敗した場合に処理を行う関数
	function errPos(error){
		var message = [ "",
			"ユーザーが位置情報の提供を拒否しました",
			"何らかの原因で位置情報を取得できませんでした",
			"タイムアウトしました。時間内に位置を特定できませんでした"
		]
		ele.innerHTML = error.code+"："+message[error.code];
	}
	// 位置情報の定期的な取得を停止
	document.getElementById("stop").addEventListener("click", function(){
		// 位置情報の取得が行われていない場合は何もしない
		if(watchID == null){
			ele.innerHTML = "位置情報の取得は行っていません";
			return;
		}
		navigator.geolocation.clearWatch(watchID);
		ele.innerHTML = "位置情報の取得を停止しました";
		// 監視を解除したことを示すのでnullを入れる
		watchID = null;
	}, true);
	// リストを表示
	generate();
}, true);

// ローカルストレージから読み出してリストとして表示
function generate(){
	var data = window.localStorage;
	var shopList = "";
	for(var i=0; i<data.length; i++){
		var dataKey = data.key(i);
		// キーがgeoで始まるかどうか調べる
		var pointer = dataKey.indexOf("geo:");
		// お店情報のみリストして表示する
		if(pointer == 0){
			// 日付を求める
			var dateTime = dataKey.substr("geo:".length, dataKey.length);
			var dateObj = new Date();
			dateObj.setTime(dateTime);
			var Y = dateObj.getFullYear();
			var M = dateObj.getMonth() + 1;
			var D = dateObj.getDate();
			var h = dateObj.getHours();
			var m = dateObj.getMinutes();
			var dateString = Y+"年"+M+"月"+D+"日　";
			dateString += h+"時"+m+"分";
			// リンクを生成
			var link = '<a href="#" onclick=loadShopData("'+data.key(i)+'")>'+dateString+'</a>';
			shopList += link+"<br>";
		}
	}
	document.getElementById("list").innerHTML = shopList;
}

// リンクがクリックされた時の処理
function loadShopData(data){
	var shopData = JSON.parse(window.localStorage.getItem(data));
	document.getElementById("shopName").value = shopData.shopName;
	document.getElementById("shopInfo").value = shopData.shopInfo;
	// 地図の中心を現在地にする
	var lati = shopData.lat;
	var long = shopData.lng;
	var currentPosition = new google.maps.LatLng(lati, long);
	map.setCenter(currentPosition);
	// 新規にマーカーを表示する
	if (marker){
		marker.setMap(null);	// マーカーを削除
	}
	marker = new google.maps.Marker({
		position: currentPosition,
		map: map
	});
	return false;
}



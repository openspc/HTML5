// 現在地をグーグルマップ上に表示
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

	// 現在地をローカルストレージに保存
	document.getElementById("save").addEventListener("click", function(){
		var saveData = {
			lat : lati,	// 緯度
			lng : long	// 経度
		}
		try{
			window.localStorage.setItem("geo", JSON.stringify(saveData));
		}catch(e){
			ele.innerHTML = "ローカルストレージに保存できませんでした";
			return;
		}
		ele.innerHTML = "位置情報を保存しました";
	}, true);

	// ローカルストレージから読み出して地図上に表示
	document.getElementById("restore").addEventListener("click", function(){
		var saveData = window.localStorage.getItem("geo");
		if (saveData == null){
			ele.innerHTML = "位置情報に関するデータは保存されていません";
			return;
		}
		var data = JSON.parse(saveData);
		lati = data.lat;
		long = data.lng;
		// 地図の中心を現在地にする
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
}, true);



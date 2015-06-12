// 現在地をグーグルマップ上に表示
var map = null;
var marker = null;
window.addEventListener("load", function(){
	// 地図をページ内に表示する
	map = new google.maps.Map(
		document.getElementById("myGoogleMap"),{
			zoom : 5,
			center : new google.maps.LatLng(36, 135),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		}
	);

	// 情報を表示するための領域を指し示す変数
	var ele = document.getElementById("status");

	// Geolocation APIに対応しているか調べる
	if (!navigator.geolocation){
		ele.innerHTML = "Geolocation APIに対応していません";
		return;
	}

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
		var lat = position.coords.latitude;	// 緯度
		var lng = position.coords.longitude;	// 経度
		var alt = position.coords.altitude;	// 高度
		var acc = position.coords.accuracy;	// 緯度経度の誤差
		var altAcc = position.coords.altitudeAccuracy;	// 高度の誤差
		var hd = position.coords.heading;	// 方角
		ele.innerHTML = "緯度："+lat+"<br>経度："+lng+"<br>緯度経度の誤差："+acc+" m<br>"+
		"高度："+alt+"<br>高度の誤差："+altAcc+" m<br>方角："+hd;
		// 地図の中心を現在地にする
		var currentPosition = new google.maps.LatLng(lat, lng);
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



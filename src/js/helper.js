var map;
var markers;

function MarkerAndInfo(latlng, mymap, mytitle, infoString) {
	this.googleMarker = new google.maps.Marker({
		position: new google.maps.LatLng(latlng),
		map: mymap,
		animation: google.maps.Animation.DROP,
		title: mytitle
	});
	this.infoWindow = new google.maps.InfoWindow({
		content: infoString,
		//maxWidth: 200
	});
	this.clousure = function() {
		var mythis = this;
		return function() {
			console.log(mythis.infoWindow);
			mythis.infoWindow.open(map, mythis.googleMarker);
		}
	};
	this.googleMarker.addListener('click', this.clousure());
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 21.278518,
			lng: -157.828231
		},
		zoom: 12
	});
	markers = [];
}

function markvisible(value, index) {
	var pre = markers[index].googleMarker.getVisible()
	markers[index].googleMarker.setVisible(value);
	if(value && !pre)
	markers[index].googleMarker.setAnimation(google.maps.Animation.DROP);
}

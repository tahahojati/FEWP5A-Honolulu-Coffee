var map;
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
	/*this.showNote = (function() {
		var mythis = this;
		return function() {
			console.log(mythis.infoWindow);
			mythis.infoWindow.open(map, mythis.googleMarker);
		}
	})();*/
	this.markerVisible = true; 
	this.showNote = $.proxy(function() {
		console.log(this.infoWindow);
		this.infoWindow.open(map,this.googleMarker);
	}, this);
	this.googleMarker.addListener('click', this.showNote);
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


/**global googlemap vairable
@type {google.maps.Map}*/
var map;

/** Helper class for handling the markers on google map.
@constructor
@param {google.maps.LatLng} latlng position of the marker
@param {google.maps.Map} mymap map to display marker on
@param {string} title the name of the marker
@param {string} infoHTML what to show on the info pop up window
@property {google.maps.Marker} googleMarker a marker
@property {google.maps.InfoWindow} window to show when marker is clicked
@property {google.maps.Animation} animation drop animation for marker.
*/
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
	/**function that displays the info window of the marker 
	@method*/
	this.showNote = $.proxy(function() {
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


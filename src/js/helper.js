/**global googlemap vairable
@type {google.maps.Map}*/
var map;
var googleError;
var infoWindow = null;

function mapsError() {
	//var child = document.createElement("h2");
	// child.appendChild(document.createTextNode("Sorry! request to google maps failed :("));
	// child.style.color = 'red';
	// document.getElementById("map").appendChild(child);
	window.alert("Sorry! request to google maps failed :(");
	googleError = true;
}

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
	if (!googleError) {
		if (infoWindow === null)
			infoWindow = new google.maps.InfoWindow();
		this.googleMarker = new google.maps.Marker({
			position: new google.maps.LatLng(latlng),
			map: mymap,
			animation: google.maps.Animation.DROP,
			title: mytitle
		});
		this.infoContent = infoString;
		/**function that displays the info window of the marker 
		@method*/
		this.clicked = $.proxy(function() {
			infoWindow.setContent(this.infoContent);
			//maxWidth: 200
			this.googleMarker.setAnimation(google.maps.Animation.BOUNCE);
			window.setTimeout(function(mythis) {
				mythis.googleMarker.setAnimation(null);
			}, 1500, this);
			infoWindow.open(map, this.googleMarker);
		}, this);
		this.googleMarker.addListener('click', this.clicked);
	}
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
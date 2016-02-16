/**
@author Taha Pourjalali
*/

/**
my FourSquare ID -- very unsafe!
@type {string} 
@constant
*/
var FOURSQUAREID = "PEVDLWKZEUCSU1ULZMCKDV4SMRWDIBTJ0O0SA5PEDSEFHQA5";
/**my FourSquare secret -- very unsafe! 
@type {string} 
 @constant*/
var FOURSQUARESECRET = "QZ3SKHECKEKEDL3I1RHYD2F00ZRDJKZ0Z4Z3BHAY45PMP55U";
/**FourSquare AJAX address for venue queries
@type {string} 
@constant*/
var FOURSQUAREVENUEENDPOINT = "https://api.foursquare.com/v2/venues/";
/**html template code for the pop up notes on the google map 
@type {string} 
@constant
 */ 
var infoFormat = '<div class="maps-note"><h4>%name%</h4><img class="img-responsive" src="%img%" alt="Best img from foursquare"><p>foursquare rating: %rating%</p> </div>';

/**@param {string} fourSquareID the FourSquare ID of the venue.  
@constructor
@property {string} fourSquareID ID of the venue.
@property {boolean} completedAJAX takes track of whether the venue information was recieved from fourSquare or not. 
@property {MarkerAndInfo} marker a pointer to the map marker of the venue.
@property {string} img url to an image of the venue.
@property {double} rating FourSquare rating of the venue. */
function CoffeePlace(fourSquareID) {
	this.fourSquareID = fourSquareID;
	this.completedAJAX = false;
	this.marker = null;
	/**@returns {function} success function for AJAX that updates the object properties*/
	this.fourSquareSuccess = function() {
		var mythis = this;
		return function(data) {
			mythis.name = data.response.venue.name;
			mythis.latlng = {
				lat: data.response.venue.location.lat,
				lng: data.response.venue.location.lng
			};
			mythis.img = data.response.venue.bestPhoto.prefix + "width200" + data.response.venue.bestPhoto.suffix;
			mythis.rating = data.response.venue.rating;
			mythis.completedAJAX = true;
			mythis.marker = new MarkerAndInfo(mythis.latlng, map, mythis.name, infoFormat.replace("%name%", mythis.name).replace("%img%", mythis.img).replace("%rating%", mythis.rating));
		};
	};
	$.getJSON(FOURSQUAREVENUEENDPOINT + this.fourSquareID, {
		client_id: FOURSQUAREID,
		client_secret: FOURSQUARESECRET,
		v: "20160101",
		m: "swarm"
	}, this.fourSquareSuccess());
}
/**@param {boolean} 
This function is refered to by viewmodel to change the visibility of google maps marker for each venue. 
*/
CoffeePlace.prototype.markvisible = function(value) {
	this.marker.googleMarker.setVisible(value);
	if (value && !this.marker.markerVisible)
		this.marker.googleMarker.setAnimation(google.maps.Animation.DROP);
	this.marker.markerVisible = value;
};

/**
Model is a collection of {@link CoffeePlace | CoffeePlaces} along
 with useful methods for interacting with the viewmodel
 @constructor
 @property {CoffeePlace[]} places array of {@link CoffeePlace}
*/
function Model() {
	this.places = [
		new CoffeePlace("539b9c22498e606f9b3b1f7a"),
		new CoffeePlace("4b60e1ecf964a52095ff29e3"),
		new CoffeePlace("4b7b7a54f964a520f9642fe3"),
		new CoffeePlace("53758c1b11d20b26da933dac"),
		new CoffeePlace("51bbbbb12fc61cb0b5bf190a"),
		new CoffeePlace("4d13dff1816af04de34237c2")
	];
	/**@returns {int} returns the number of venues. */
	this.size = function() {
		return this.places.length;
	};
	/** fills in the viewmodel's array with the venues. It makes sure that 
	venue information are fully retrieved through AJAX before it passes them to viewmodel.
	@param {ko.observableArray} oArray the array to populate*/
	this.populate = function(oArray) {
		oArray.removeAll();
		for (var i = 0; i < this.places.length; ++i) {
			this.pushElement(this, oArray, i);
		}
	};
	/**
	function called by populate to add each venue to oArray. 
	@param  {Model} context this function uses setTimeout to call itself so
	 you must pass context to be used instead of this. 
	 @param {ko.observableArray} oArray array to push to.
	 @param {int} index of venue in the {@link Model#places | places} array.
	*/
	this.pushElement = function(mythis, oArray, index) {
		if (mythis.places[index].completedAJAX) {
			oArray.push(mythis.places[index]);
		} else {
			setTimeout(mythis.pushElement, 200, mythis, oArray, index);
		}
	};
}
/** global model variable used in view and model view. 
@type {Model}
*/
var CoffeePlacesModel = new Model();
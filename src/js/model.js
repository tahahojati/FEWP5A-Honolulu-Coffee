var FOURSQUAREID = "PEVDLWKZEUCSU1ULZMCKDV4SMRWDIBTJ0O0SA5PEDSEFHQA5";
var FOURSQUARESECRET = "QZ3SKHECKEKEDL3I1RHYD2F00ZRDJKZ0Z4Z3BHAY45PMP55U";
var FOURSQUAREVENUEENDPOINT = "https://api.foursquare.com/v2/venues/"
var infoFormat = '<div class="maps-note"><h4>%name%</h4><img class="img-responsive" src="%img%" alt="Best img from foursquare"><p>foursquare rating: %rating%</p> </div>';

function CoffeePlace(fourSquareID) {
	this.fourSquareID = fourSquareID;
	this.completedAJAX = false;
	this.clousure = function() {
		var mythis = this;
		return function(data) {
			//console.log(data);
			//console.log(data.response.venue.name);
			mythis.name = data.response.venue.name;
			mythis.latlng = {
				lat: data.response.venue.location.lat,
				lng: data.response.venue.location.lng
			};
			mythis.img = data.response.venue.bestPhoto.prefix + "width200" + data.response.venue.bestPhoto.suffix;
			mythis.rating = data.response.venue.rating;
			mythis.completedAJAX = true;
			markers.push(new MarkerAndInfo(mythis.latlng, map, mythis.name, infoFormat.replace("%name%", mythis.name).replace("%img%", mythis.img).replace("%rating%", mythis.rating)));
		};
	}
	$.getJSON(FOURSQUAREVENUEENDPOINT + this.fourSquareID, {
		client_id: FOURSQUAREID,
		client_secret: FOURSQUARESECRET,
		v: "20160101",
		m: "swarm"
	}, this.clousure());
}


function Model() {
	this.places = [
		new CoffeePlace("539b9c22498e606f9b3b1f7a"),
		new CoffeePlace("4b60e1ecf964a52095ff29e3"),
		new CoffeePlace("4b7b7a54f964a520f9642fe3"),
		new CoffeePlace("53758c1b11d20b26da933dac"),
		new CoffeePlace("51bbbbb12fc61cb0b5bf190a"),
		new CoffeePlace("4d13dff1816af04de34237c2")
	];
	this.size = function() {
		return this.places.length;
	}
	this.populate = function(oArray) {
		oArray.removeAll();
		for (var i = 0; i < this.places.length; ++i) {
			this.pushElement(this, oArray, i);
		}
	};
	this.pushElement = function(mythis, oArray, index) {
		//console.log("in push element")
		if (mythis.places[index].completedAJAX) {
			//	console.log("good");
			oArray.push(mythis.places[index]);
		} else {
			//console.log("bad");
			setTimeout(mythis.pushElement, 200, mythis, oArray, index);
		}
	}
}
var CoffeePlacesModel = new Model();
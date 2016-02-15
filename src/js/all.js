var FOURSQUAREID = "PEVDLWKZEUCSU1ULZMCKDV4SMRWDIBTJ0O0SA5PEDSEFHQA5";
var FOURSQUARESECRET = "QZ3SKHECKEKEDL3I1RHYD2F00ZRDJKZ0Z4Z3BHAY45PMP55U";
var FOURSQUAREVENUEENDPOINT = "https://api.foursquare.com/v2/venues/"
var infoFormat = '<div class="maps-note"><h1>%name%</h1><img class="img-responsive" src="%img%" alt="Best img from foursquare"><p>foursquare rating: %rating%</p> </div>';

var map;
var markers;

function MarkerAndInfo(latlng, mymap, mytitle, infoString) {
	this.googleMarker = new google.maps.Marker({
		position: new google.maps.LatLng(latlng),
		map: mymap,
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
	markers[index].googleMarker.setVisible(value);
}


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


function AppViewModel() {
	this.searchTerm = ko.observable("");
	this.shops = ko.observableArray();
	this.visible = [];
	CoffeePlacesModel.populate(this.shops);
	for (var j = 0; j < CoffeePlacesModel.size(); ++j)
		this.visible.push(ko.observable(true));
	//console.log(this.visible[3])
	this.dosearch = function() {
		var mythis = this;
		return function() {
			var i = 0;
			//console.log("called");
			//console.log("value:  " + mythis.searchTerm());
			//CoffeePlacesModel.populate(mythis.shops);
			var len = mythis.shops().length;
			for (i = 0; i < len; ++i) {
				if (mythis.shops()[i].name.search(new RegExp(mythis.searchTerm(), "i")) == -1) {
					//console.log(mythis.shops()[i].name);
					mythis.visible[i](false);
					//mythis.shops.splice(i, 1);
					markvisible(false, i);
				} else {
					mythis.visible[i](true);
					markvisible(true, i);
				}
			}
		};
	};
	this.searchTerm.subscribe(this.dosearch());
}
// Activates knockout.js
var main = new AppViewModel();
ko.applyBindings(main);



//GoogleMaps

/*new CoffeePlace("The ", "3538 Waialae Ave\nHonolulu, HI 96816", "539b9c22498e606f9b3b1f7a", 21.2834, -157.80026),
new CoffeePlace("Stir", "3583 Waialae Ave\nHonolulu, HI 96816", "4b60e1ecf964a52095ff29e3", 21.294237, -157.812856),
new CoffeePlace("Island Vintage Coffee", "2301 Kalakaua Ave\nHonolulu, HI 96815", "4b7b7a54f964a520f9642fe3", 21.278211, -157.828591),
new CoffeePlace("Kai Coffee", "2424 Kalakaua Ave\nHonolulu, HI 96815", "53758c1b11d20b26da933dac", 21.275869, -157.824931),
new CoffeePlace("Brue Bar", "119 Merchant St\nHonolulu, HI 96813", "51bbbbb12fc61cb0b5bf190a", 21.308513, -157.862892),
new CoffeePlace("Insomnia", "669 Auahi St\nHonolulu, HI 96813", "4d13dff1816af04de34237c2", 21.298579, -157.861207)*/
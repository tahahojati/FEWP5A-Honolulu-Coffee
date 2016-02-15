function AppViewModel() {
	this.searchTerm = ko.observable("");
	this.allshops = [
		new CoffeePlace("The Curb Kaimuki", "3538 Waialae Ave\nHonolulu, HI 96816", "the-curb-kaimuki-honolulu-2", 21.2834, -157.80026),
		new CoffeePlace("Stir", "3583 Waialae Ave\nHonolulu, HI 96816", "stir-honolulu", 21.294237, -157.812856),
		new CoffeePlace("Island Vintage Coffee", "2301 Kalakaua Ave\nHonolulu, HI 96815", "island-vintage-coffee-honolulu-4", 21.278211, -157.828591),
		new CoffeePlace("Kai Coffee", "2424 Kalakaua Ave\nHonolulu, HI 96815", "kai-coffee-hawaii-honolulu", 21.275869, -157.824931),
		new CoffeePlace("Brue Bar", "119 Merchant St\nHonolulu, HI 96813", "brue-bar-honolulu", 21.308513, -157.862892),
		new CoffeePlace("Insomnia", "669 Auahi St\nHonolulu, HI 96813", "insomnia-honolulu", 21.298579, -157.861207)
	];
	this.shops = ko.observableArray(this.allshops.slice());
	this.dosearch = function() {
		var mythis = this;
		return function() {
			console.log("called");
			console.log("hello" + mythis.searchTerm());
			mythis.shops.removeAll();
			var len = mythis.allshops.length;
			for (var i = 0; i < len; ++i) {
				if (mythis.allshops[i].name.search(new RegExp(mythis.searchTerm(), "i")) != -1) {
					console.log(mythis.allshops[i].name);
					mythis.shops.push(mythis.allshops[i]);
					markvisible(true, i);
				} else
					markvisible(false, i);
			}
		};
	};
	this.dosearch2 = function() {
			document.getElementById('placesDiv').innerHTML = 'hello world'
		}
		//console.log(this.dosearch2);
	this.searchTerm.subscribe(this.dosearch());

}

function CoffeePlace(name, address, yelpID, mylat, mylon) {
	this.address = address;
	this.name = name;
	this.yelpID = yelpID;
	this.latlng = {
		lat: mylat,
		lng: mylon
	};
	this.clousure = function() {
		var mythis = this;
		return function(data) {
			console.log(data);
		}
	};
	$.getJSON('https://api.yelp.com/v2/business/' + this.yelpID,{Consumer} ,this.clousure());
}

// Activates knockout.js
var main = new AppViewModel();
ko.applyBindings(main);



//GoogleMaps
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
		maxWidth: 200
	});
	this.clousure = function() {
		var mythis = this;
		return function() {
			console.log(mythis.infoWindow);
			mythis.infoWindow.open(map, mythis.googleMarker);
		}
	};
	this.clousure = function() {
		var mythis = this;
		return function() {
			console.log(mythis.infoWindow);
			mythis.infoWindow.open(map, mythis.googleMarker);
		};
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
	for (var i = 0; i < main.allshops.length; ++i) {
		markers.push(new MarkerAndInfo(main.allshops[i].latlng, map, main.allshops[i].name, "Hello"));
	}

}

function markvisible(value, index) {
	markers[index].googleMarker.setVisible(value);
}
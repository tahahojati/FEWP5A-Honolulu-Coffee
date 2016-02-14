var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 21.278518,
			lng: -157.828231
		},
		zoom: 12
	});
}

function AppViewModel() {
	this.allshops = ko.observableArray([
		new CoffeePlace("The Curb Kaimuki", "3538 Waialae Ave\nHonolulu, HI 96816", "hello"),
		new CoffeePlace("Stir", "3583 Waialae Ave\nHonolulu, HI 96816", "dfa"),
		new CoffeePlace("Island Vintage Coffee", "2301 Kalakaua Ave\nHonolulu, HI 96815", "dfa"),
		new CoffeePlace("Kai Coffee", "2424 Kalakaua Ave\nHonolulu, HI 96815", "dfa"),
		new CoffeePlace("Brue Bar", "119 Merchant St\nHonolulu, HI 96813", "dfa"),
		new CoffeePlace("Insomnia", "669 Auahi St\nHonolulu, HI 96813", "dfa")
	]);
}

function CoffeePlace(name, address, yelpURL) {
	this.address = address;
	this.name = name;
	this.yelpURL = yelpURL;
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());
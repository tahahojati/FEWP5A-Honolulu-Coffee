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
	this.searchTerm = ko.observable("");
	this.allshops = [
		new CoffeePlace("The Curb Kaimuki", "3538 Waialae Ave\nHonolulu, HI 96816", "hello"),
		new CoffeePlace("Stir", "3583 Waialae Ave\nHonolulu, HI 96816", "dfa"),
		new CoffeePlace("Island Vintage Coffee", "2301 Kalakaua Ave\nHonolulu, HI 96815", "dfa"),
		new CoffeePlace("Kai Coffee", "2424 Kalakaua Ave\nHonolulu, HI 96815", "dfa"),
		new CoffeePlace("Brue Bar", "119 Merchant St\nHonolulu, HI 96813", "dfa"),
		new CoffeePlace("Insomnia", "669 Auahi St\nHonolulu, HI 96813", "dfa")
	];
	this.shops = ko.observableArray(this.allshops);
	this.dosearch = function() {
		console.log("called");
		console.log("hello" + this.searchTerm());

		if (this.searchTerm() === "" ) {

			return this.allshops;
		} else {
			var r = [];
			var len = this.allshops().length;
			for (var i = 0; i < len; ++i) {
				console.log(this.allshops()[i].name);
				if (this.allshops()[i].name.search(this.searchTerm()) != -1)
					r.push(this.allshops()[i]);
			}
		}
	};
	this.dosearch2= function(){
		document.getElementById('placesDiv').innerHTML='hello world'
	}
		//console.log(this.dosearch2);
		this.searchTerm.subscribe(this.dosearch);

}

function CoffeePlace(name, address, yelpURL) {
	this.address = address;
	this.name = name;
	this.yelpURL = yelpURL;
}

// Activates knockout.js
var main = new AppViewModel();
ko.applyBindings(main);
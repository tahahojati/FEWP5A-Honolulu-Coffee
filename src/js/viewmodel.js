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
					mythis.shops()[i].markvisible(false);
					// mythis.shops()[i].marker.visible = false; 
				} else {
					mythis.visible[i](true);
					// mythis.shops()[i].marker.setVisible(true);
					mythis.shops()[i].markvisible(true);
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
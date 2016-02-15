/**@fileOverview  This file defines the app's viewmodel and instantiates it.
* @author Taha Pourjalali
*/
/**
*@class defines the app's viewmodel.  Follows the disign patterns of knockout.js. 
@property {ko.observable} searchTerm bind this to filter the shops.
@property {ko.observableArray} shops an array of selected coffee shops.
@property {ko.observable[]} visible elements in this array will be boolean observables indicating whether a shop should be visible or not (based on the <tt>searchTerm</tt> filter). 
@property 
*/
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
			var len = mythis.shops().length;
			for (i = 0; i < len; ++i) {
				if (mythis.shops()[i].name.search(new RegExp(mythis.searchTerm(), "i")) == -1) {
					mythis.visible[i](false);
					mythis.shops()[i].markvisible(false);
				} else {
					mythis.visible[i](true);
					mythis.shops()[i].markvisible(true);
				}
			}
		};
	};
	this.searchTerm.subscribe(this.dosearch());
}
var main = new AppViewModel();
ko.applyBindings(main);
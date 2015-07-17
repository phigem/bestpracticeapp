sap.ui.define([
   "sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("de.ciber.bestpracticeapp.controller.Overview", {
	    
	    // We add the event handler function to the controller of our invoices list. Now it is time to navigate to the detail page by clicking an item in the invoice list. 
	    // We access the router instance for our app by calling the helper method sap.ui.core.UIComponent.getRouterFor(this). 
	    // On the router we call the navTo method to navigate to the detail route that we specified in the routing configuration.
		onOrderPress: function(oEvent) {
		    
		    //The control instance that has been interacted with can be accessed by the getSource method that is available for all OpenUI5 events. It will return the ObjectListItem that has been clicked in our case. We will use it to pass the information of the clicked item to the detail page so that the same item can be displayed there.
		    var oItem = oEvent.getSource();
		    
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			//In the navTo method we now add a configuration object to fill the navigation parameter invoicePath with the current information of the item. This will update the URL and navigate to the detail view at the same time. On the detail page, we can access this context information again and display the corresponding item.
			//To identify the object that we selected, we would typically use the key of the item in the back-end system because it is short and precise. For our invoice items however, we do not have a simple key and directly use the binding path to keep the example short and simple. The path to the item is part of the binding context which is a helper object of OpenUI5 to manage the binding information for controls. 
			//The binding context can be accessed by calling the getBindingContext method with the model name on any bound OpenUI5 control. We need to remove the first / from the binding path by calling .substr(1) on the string because this is a special character in URLs and is not allowed, we will add it again on the detail page.
			oRouter.navTo("detail", {
				orderPath: oItem.getBindingContext("northwind").getPath().substr(1)
			});
		},

		onFilterOrder: function(oEvent) {

			// array of filters on which logical conjunction is applied
			// aFilter is an array of other instances of sap.ui.model.Filter. If bAnd is set all filters within the filter will be ANDed else they will be ORed.
			var aFilter = [];

			//indicates whether an "and" logical conjunction is applied on the filters. If it's set to false, an "or" conjunction is applied
			var bAnd = false;

			var sQuery = oEvent.getParameter("query");

			if (sQuery) {
				if (jQuery.isNumeric(sQuery)) {
					var iQuery = parseInt(sQuery, 10);
					aFilter.push(new Filter({
						path: "OrderID", //the binding path for this filter
						operator: FilterOperator.Contains, //operator used for the filter
						value1: iQuery //first value to use for filter
					}));
				}
				aFilter.push(new Filter({
					path: "ShipName",
					operator: FilterOperator.Contains,
					value1: sQuery
				}));
				aFilter.push(new Filter({
					path: "ShipAddress",
					operator: FilterOperator.Contains,
					value1: sQuery
				}));
				aFilter.push(new Filter({
					path: "ShipCity",
					operator: FilterOperator.Contains,
					value1: sQuery
				}));

				aFilter = new Filter(aFilter, bAnd);


			} else {
			    
			    // reset filter
				aFilter = null;
				
			}
			
			var oList = this.getView().byId("idOrderList");
			var oBinding = oList.getBinding("items");
			
			// filter binding
			oBinding.filter(aFilter);
		}

	});
});
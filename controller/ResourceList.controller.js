sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("de.ciber.bestpracticeapp.controller.ResourceList", {
		onResourceSearch: function(oEvent) {
		    
            var aFilters = [];
            
            var oFilter = null;
            
            var bAnd = false;
            
            var bRefresh = oEvent.getParameter("refreshButtonPressed");
            
			var sQuery = oEvent.getParameter("query");
			
			if (sQuery && !bRefresh) {
				aFilters.push(new Filter("Name", FilterOperator.Contains, sQuery));
				aFilters.push(new Filter("SAP_ARBPL", FilterOperator.Contains, sQuery));
				aFilters.push(new Filter("Responsible", FilterOperator.Contains, sQuery));
				aFilters.push(new Filter("Status", FilterOperator.EQ , sQuery));
				
				oFilter = new Filter(aFilters, bAnd);
			}
			
			var oList = this.getView().byId("idResourceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(oFilter);
			
			//Update a properts in the model itself to reflect the number of hits
			oBinding.getModel().setProperty("/resourceCount", oBinding.getLength());
		}
	});

});
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";
	return Controller.extend("de.ciber.bestpracticeapp.controller.Detail", {

		//In the init method of the controller we fetch the instance of our app router and attach to the detail route by calling the method attachPatternMatched on the route that we accessed by its name. 
		//We register an internal callback function _onObjectMatched that will be executed when the route is hit, either by clicking on the item or by calling the app with a URL for the detail page.
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},

		//In the _onObjectMatched method that is triggered by the router we receive an event that we can use to access the URL and navigation parameters. 
		//The arguments parameter will return an object that corresponds to our navigation parameters from the route pattern.
		//We access the orderPath that we set in the order list controller and call the bindElement function on the view to set the context. 
		//We have to add the root / in front of the path again that was removed for passing on the path as a URL parameter.
		_onObjectMatched: function(oEvent) {

			//The bindElement function is creating a binding context for a OpenUI5 control and receives the model name as well as the path to an item in a configuration object. 
			//This will trigger an update of the UI controls that we connected with fields of the order model. 
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").orderPath,
				model: "northwind"
			});
		},

		//we tell the control to display a back button by setting the parameter showNavButton to true and register an event handler that is called when the back button is pressed.
		/*
		This implementation is a bit better than the browser’s back button for our use case. The browser would simply go back one step in the history even though we were on another page outside of the app. 
		In the app, we always want to go back to the overview page even if we came from another link or opened the detail page directly with a bookmark. 
		You can try it by loading the detail page in a new tab directly and clicking on the back button in the app, it will still go back to the overview page.
		*/
		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
            
            //In the event handler we access the navigation history and try to determine the previous hash. In contrast to the browser history, we will get a valid result only if a navigation step inside our app has already happened. 
            //Then we will simply use the browser history to go back to the previous page. If no navigation has happened before, we can tell the router to go to our overview page directly. 
            //The second parameter true tells the router to replace the current history state with the new one since we actually do a back navigation by ourself.
			if (sPreviousHash !== "undefined"){
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview", true);
			}
		}
	});
});
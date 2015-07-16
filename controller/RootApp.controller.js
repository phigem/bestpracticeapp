/*
We define the app controller in its own file by extending the controller object of the OpenUI5 core.
*/
/* Controller Conventions
- Controller names are capitalized
- Controllers carry the same name as the related view (if there is a 1:1 relationship)
- Event handlers are prefixed with on*
- Controller names always end with *.controller.js

- Use sap.ui.define for controllers and all other JavaScript modules to define a global namespace. With the namespace, the object can be addressed throughout the application.
- Use sap.ui.require for asynchronously loading dependencies but without declaring a namespace, for example code that is directly executed and is not referenced in other places.
- Use the name of the artifact to load for naming the function parameters (without namespace).

- Use hungarian notation for variable names.
*/
/* Internationalization Conventions
- The resource model for internationalization is called the i18n model.
- The default filename is i18n.properties.
- Resource bundle keys are written in (lower) camelCase.
- Resource bundle values can contain parameters like {0}, {1}, {2}, …
- Never concatenate strings that are translated, always use placeholders.
- Use Unicode escape sequences for special characters.
*/
sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/model/json/JSONModel"
], function(Controller, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("de.ciber.bestpracticeapp.controller.RootApp", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf de.ciber.bestpractice.view.RootView
		 */
		onInit: function() {
			var oData = {
				user: {
					name: ""
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel, "userdata");
		},

		onShowWelcomeMessage: function(oEvent) {
			this.onOpenDialog();
			// get i18n model
			var i18nModel = this.getView().getModel("i18n");
			// read msg from i18n model
			var oBundle = i18nModel.getResourceBundle();
			var sRecipient = this.getView().getModel("userdata").getProperty("/user/name");
			var sMsg = oBundle.getText("GREET_MSG_TEXT", [sRecipient]);
			// show message
			MessageToast.show(sMsg);
		},
		_getDialog: function() {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("de.ciber.bestpracticeapp.view.fragment.MessagePopup", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
		onOpenDialog: function() {
			this._getDialog().open();
		},
		onCloseDialog: function() {
			this._getDialog().close();
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf de.ciber.bestpractice.view.RootView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf de.ciber.bestpractice.view.RootView
		 */
		onAfterRendering: function() {
			var oDefaultControl = this.getView().byId("idDefaultControl");
			var oTestControl = this.getView().byId("idTestControl");

		}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf de.ciber.bestpractice.view.RootView
		 */
		//	onExit: function() {
		//
		//	}
	});
});
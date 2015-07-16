/*
The implementation of the “DialogMessage” reuse object is extending from a base object to inherit the core functionality of OpenUI5.
Our _getDialog method instantiates our dialog fragment. Note that now the reuse object is passed on as a controller to the fragment.
The open method now contains our dialog instantiation. This is the first time open method will be called, the dialog is instantiated. 
The view argument of this method is used to connect the current view to the dialog. We will call the interface of this object later in the controller.

The onOpenDialog method now accesses its component by calling the helper method getOwnerComponent. 
When calling the open method of the reuse object we pass in the current view to connect it to the dialog. 
*/
/*Asset  Conventions
- Put all assets that are used across multiple controllers in separate modules.
*/
sap.ui.define([
	"sap/ui/base/Object"
], function (Object) {
	"use strict";
	return Object.extend("de.ciber.bestpracticeapp.controller.popup.DialogMessage", {
		_getDialog : function () {
			// create dialog lazily
			if (!this._oDialog) {
				// create dialog via fragment factory
				this._oDialog = sap.ui.xmlfragment("de.ciber.bestpracticeapp.view.fragment.DialogMessage", this);
			}
			return this._oDialog;
		},
		open : function (oView) {
			var oDialog = this._getDialog();
			
			// forward compact/cozy style into Dialog
			// The fragment dialog is not part of the app view but opened in a special part of the DOM called "static area". 
			// The content density class defined on the app view is not known to the dialog,  so we sync the style class of the app with the dialog manually.
			jQuery.sap.syncStyleClass(oView.getController().getOwnerComponent().getContentDensityClass(), oView, oDialog);
			
			// connect dialog to view (models, lifecycle)
			oView.addDependent(oDialog);
			
			// open dialog
			oDialog.open();
		},
		onCloseDialog : function () {
			this._getDialog().close();
		}
	});
});
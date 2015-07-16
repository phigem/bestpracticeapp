/*
The Component.js file consists of two parts now: The new metadata section that simply defines a reference to the descriptor and the previously introduced init function that is called when the component is initialized.
In the component, we now completely remove the lines of code containing the model instantiation for our resource bundle. It is now done by OpenUI5 automatically from the configuration entries in the descriptor.
*/
sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel"
], function(UIComponent, JSONModel) {
	"use strict";
	return UIComponent.extend("de.ciber.bestpracticeapp.Component", {
		metadata: {
			manifest: "json"
		},
		//We create a Component.js file in the webapp folder that will hold our application setup. The init function of the component is automatically invoked by OpenUI5 when the component is instantiated. Our component inherits from the base class sap.ui.core.UIComponent and it is obligatory to make the super call to the init function of the base class in the overridden init method.
		init: function() {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// always use absolute paths relative to our own component
			var rootPath = jQuery.sap.getModulePath("de.ciber.bestpracticeapp");
			jQuery.sap.log.info(rootPath, "ciber-log: Details for rootpath", this);
			// set device model
			var deviceModel = new JSONModel({
				isTouch: sap.ui.Device.support.touch,
				isNoTouch: !sap.ui.Device.support.touch,
				isPhone: sap.ui.Device.system.phone,
				isNoPhone: !sap.ui.Device.system.phone,
				listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
				listItemType: sap.ui.Device.system.phone ? "Active" : "Inactive"
			});
			deviceModel.setDefaultBindingMode("OneWay");
			this.setModel(deviceModel, "device");

		}
	});
});
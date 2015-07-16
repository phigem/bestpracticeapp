/*
The Component.js file consists of two parts now: The new metadata section that simply defines a reference to the descriptor and the previously introduced init function that is called when the component is initialized.
In the component, we now completely remove the lines of code containing the model instantiation for our resource bundle. It is now done by OpenUI5 automatically from the configuration entries in the descriptor.
*/
/* Component + manifest Conventions
- The component is named Component.js.
- The descriptor file is named manifest.json.
- Together with all assets of the app, these files are located in the app folder.
- The index.html file is located outside of the webapp folder.
*/
/* Modul Conventions
- Use sap.ui.define for controllers and all other JavaScript modules to define a global namespace. With the namespace, the object can be addressed throughout the application.
- Use sap.ui.require for asynchronously loading dependencies but without declaring a namespace, for example code that is directly executed and is not referenced in other places.
- Use the name of the artifact to load for naming the function parameters (without namespace).
*/
//This Asynchronous Module Definition (AMD) syntax allows to clearly separate the module loading from the code execution and greatly improves the performance of the application. The browser can decide when and how the resources are loaded prior to code exection.
sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "de/ciber/bestpracticeapp/controller/DialogPopup"
], function(UIComponent, JSONModel, DialogPopup) {
	"use strict";
	return UIComponent.extend("de.ciber.bestpracticeapp.Component", {
	    //All application-specific configuration settings will further be put in a separate descriptor file called manifest.json.
	    //The content of the manifest.json file is a configuration object in JSON format that contains all global application settings and parameters. 
	    //The manifest file is called the descriptor for applications, components, and libraries and is also referred to as 'descriptor' or 'app descriptor' when used for applications.
		metadata: {
			manifest: "json"
		},
		//We create a Component.js file in the webapp folder that will hold our application setup. The init function of the component is automatically invoked by OpenUI5 when the component is instantiated. Our component inherits from the base class sap.ui.core.UIComponent and it is obligatory to make the super call to the init function of the base class in the overridden init method.
		init: function() {
			// Call the init function of the parent. The init function of the component is automatically invoked by OpenUI5 when the component is instantiated. 
			// Our component inherits from the base class sap.ui.core.UIComponent and it is obligatory to make the super call to the init function of the base class in the overridden init method.            
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
            
            
            //We now expand our reuse concept and invoke the dialog on the component level. 
            //This allows us to use the dialog in multiple views throughout our app without having to put the instantiation code in each controller.
            this.dialogPopup = new DialogPopup();
		}
	});
});
jQuery.sap.declare("de.ciber.bestpracticeapp.Component");
//jQuery.sap.require("sap.ui.demo.tdg.Router");


sap.ui.core.UIComponent.extend("de.ciber.bestpracticeapp.Component", {
   metadata : {
        name : "SAPUI5 Best Practice App",
        version : "1.0",
        includes : [],
        dependencies : {
            libs : ["sap.m"],
            components : []
        },
        config : {
            resourceBundle : "i18n/resourceBundle.properties"
        },
        rootView : "de.ciber.bestpracticeapp.view.RootView"
   },
    
    init : function() {
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
        
        var mConfig = this.getMetadata().getConfig();
        
        // always use absolute paths relative to our own component
        var rootPath = jQuery.sap.getModulePath("de.ciber.bestpracticeapp");
        jQuery.sap.log.info(rootPath, "ciber-log: Details for rootpath", this);
        
        // set i18n model
        var i18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl : [rootPath, mConfig.resourceBundle].join("/")
        });
        this.setModel(i18nModel, "i18n");
        
        // set device model
        var deviceModel = new sap.ui.model.json.JSONModel({
            isTouch : sap.ui.Device.support.touch,
            isNoTouch : !sap.ui.Device.support.touch,
            isPhone : sap.ui.Device.system.phone,
            isNoPhone : !sap.ui.Device.system.phone,
            listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
            listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
        });
        deviceModel.setDefaultBindingMode("OneWay");
        this.setModel(deviceModel, "device");
    }
});
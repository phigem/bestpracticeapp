//As with our controllers and views, the custom control inherits the common control functionality from a OpenUI5 base object, for controls this is done by extending the base class sap.ui.core.Control.
//Due to their nature, they are sometimes also referred to as "notepad” or “on the fly” controls.
//In our case, we extend sap.m.Input
sap.ui.define([
	"sap/m/Input",
	"sap/m/InputRenderer",
	"sap/ui/core/Renderer"
], function(Input, InputRenderer, CoreRenderer) {
	"use strict";

	var Renderer = CoreRenderer.extend(InputRenderer);

	return Input.extend("de.ciber.bestpracticeapp.control.CiberInput", {

		//The metadata section defines the data structure and thus the API of the control. With this meta information on the properties, events, and aggregations of the control OpenUI5 automatically creates setter and getter methods and other convenience functions that can be called within the app.
		metadata: {
			properties: {
				highlighted: {
					type: "boolean",
					defaultValue: false
				}
			}
		},
		//The init method is a special function that is called by the OpenUI5 core whenever the control is instantiated. It can be used to set up the control and prepare its content for display.

		toggleHighlighted: function() {
			if (this.getHighlighted()) {
				this.setHighlighted(false);
			} else {
				this.setHighlighted(true);
			}
		},
		_applyHighlighted: function(oRm) {
			oRm.addStyle("background-color", "#FFFFDF");
			oRm.addStyle("border-color", "#F5D017");
			oRm.addStyle("border-style", "solid");
			oRm.addStyle("border-width", "1px");
		},
		renderer: {
			writeInnerAttributes: function(oRm, oInput) {
				Renderer.writeInnerAttributes(oRm, oInput);
				
				//Check if highlighted is set and if no value State is active
				if (    oInput.getHighlighted() 
				        && oInput.getValueState() === sap.ui.core.ValueState.None
				        && oInput.getEnabled() && oInput.getEditable()) {
				        
					oInput._applyHighlighted(oRm);
				}
			}
		}
	});
});
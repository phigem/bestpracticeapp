sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";
	return {
		init: function () {
			// create
			var oMockServer = new MockServer({
				rootUri: "/destinations/NorthwindV3/V3/northwind/northwind.svc/"
			});
			// configure
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: 1000
			});
			// simulate
			var sPath = jQuery.sap.getModulePath("de.ciber.bestpracticeapp.test.service");
			oMockServer.simulate(sPath + "/metadata.xml", sPath);
			// start
			oMockServer.start();
		}
	};
});
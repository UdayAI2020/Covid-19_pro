/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["covid/covidpro/test/integration/AllJourneys"
], function () {
	QUnit.start();
});

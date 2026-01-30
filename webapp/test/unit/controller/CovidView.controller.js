/*global QUnit*/

sap.ui.define([
	"covid/covidpro/controller/CovidView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CovidView Controller");

	QUnit.test("I should test the CovidView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

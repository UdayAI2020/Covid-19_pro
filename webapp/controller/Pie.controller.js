sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format"
], function (Controller, JSONModel, ChartFormatter, Format) {
    "use strict";

    return Controller.extend("covid.covidpro.controller.Pie", {

        dataPath: "https://api.rootnet.in/covid19-in/stats/latest",

        onInit: function () {
            Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;

            //Get VizFrame
            var oVizFrame = this.byId("idVizFramepie");
            var oPopover = this.byId("idPopOverpie");

            if (!oVizFrame) {
                console.error("VizFrame not found: idVizFramepie");
                return;
            }
            //Load the API in a model
            var oModel = new JSONModel();
            oModel.loadData(this.dataPath);

            //Wait for data to load and setting the model
            oModel.attachRequestCompleted(() => {
                oVizFrame.setModel(oModel);

                oVizFrame.setVizProperties({
                    legend: {
                        title: { visible: false }
                    },
                    title: { visible: false }
                });

                if (oPopover) {
                    oPopover.connect(oVizFrame.getVizUid());
                    oPopover.setFormatString(formatPattern.STANDARDFLOAT);
                } else {
                    console.error("Popover not found: idPopOverpie");
                }
            });

        },
        Back: function () {
            this.getOwnerComponent().getRouter().navTo("RouteCovidView");
        }
    });
});
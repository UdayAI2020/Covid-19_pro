sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format"
], (Controller,JSONModel,ChartFormatter,Format) => {
    "use strict";

    return Controller.extend("covid.covidpro.controller.CovidView", {
        dataPath : "https://api.rootnet.in/covid19-in/stats/history",
        oVizFrame : null,
        onInit() {
            Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;

            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        formatString:formatPattern.SHORTFLOAT_MFD2,
                        visible: true
                    }
                },
                valueAxis: {
                    label: {
                        formatString: formatPattern.SHORTFLOAT
                    },
                    title: {
                        visible: true
                    }
                },
                categoryAxis: {
                    title: {
                        visible: true
                    }
                },
                title: {
                    visible: true,
                    text: 'COVID-CASE HISTORY'
                }
            });
            var dataModel = new JSONModel(this.dataPath);
            oVizFrame.setModel(dataModel);

            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
    
        },
        onPressList: function(){
            this.getOwnerComponent().getRouter().navTo("RouteList", { index: 0 }); 
        },
        onPressGraph: function(){
            this.getOwnerComponent().getRouter().navTo("RoutePie");
        }
    });
});

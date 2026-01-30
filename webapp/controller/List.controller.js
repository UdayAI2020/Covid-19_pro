sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "covid/covidpro/model/formatter"
], (Controller, JSONModel, Filter, FilterOperator, Sorter, formatter) => {
    "use strict";

    return Controller.extend("covid.covidpro.controller.List", {
        dataPath: "https://api.rootnet.in/covid19-in/stats/latest",
        formatter: formatter,

        onInit() {

            var dataModel = new JSONModel(this.dataPath);
            this.getView().setModel(dataModel, "Latest");

        },
        onSearch: function () {
            
            let sValue=this.getView().byId("newIdSearchField").getValue()
            var oList = this.byId("myList");
            var oBinding = oList && oList.getBinding("items");
            

            if (sValue.trim()) {
                var oFilter = new Filter("loc", FilterOperator.StartsWith, sValue.trim());
                oBinding.filter(oFilter);
            } else {
                oBinding.filter([]);
            }
        },
        sortAsc: function () {
            var oSorter = new Sorter("deaths", false);
            this.getView().byId("myList").getBinding("items").sort(oSorter);
        },

        sortDesc: function () {
            var oSorter = new Sorter("deaths", true);
            this.getView().byId("myList").getBinding("items").sort(oSorter);
        },
        Refresh: function() {
            var oSorter = new Sorter("loc", false);
            this.getView().byId("myList").getBinding("items").sort(oSorter);

        },
        Back: function () {
            this.getOwnerComponent().getRouter().navTo("RouteCovidView");
        },

        onSelChange: function (oEvent) {
            //console.log(oEvent);
            var oList = oEvent.getParameter("listItem");
            //console.log(oList);
            let sPath = oList.getBindingContextPath();
            console.log(sPath);
            let aItems = sPath.split("/");
            let index = aItems[aItems.length - 1];

            this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                index: index
            });
        }
    });
});
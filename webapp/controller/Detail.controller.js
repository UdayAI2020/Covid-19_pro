sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("covidpro.controller.Detail", {
        //dataPath: "https://api.rootnet.in/covid19-in/stats/latest",
        // onInit: function () {

        //     this.getOwnerComponent().getRouter()
        //         .getRoute("RouteDetail")
        //         .attachPatternMatched(this.onPatternMatched, this);
        // },

        // onPatternMatched: function (oEvent) {
        //     var index = oEvent.getParameter("arguments").index;
        //     var oView = this.getView();

        //     // Bind the view to the selected order
        //     oView.bindElement({
        //         dataPath: "https://api.rootnet.in/covid19-in/stats/latest"+index

        //     });
        // },


        //.....................working..................
        // onInit: function () {
        //     let oRouter = this.getOwnerComponent().getRouter();
        //     oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        // },
        // onRouteMatched: function (oEvent) {
        //     console.log(oEvent);
        //     let index = oEvent.getParameter("arguments").index;
        //     let sPath = "/data/regional/" + index;
        //     let oView = this.getView();
        //     console.log(oView)
        //     oView.bindElement(sPath);

        // },........................................
        onInit: function () {
    var oModel = new sap.ui.model.json.JSONModel();
    this.getView().setModel(oModel, "latest");   // named model for this view only

    oModel.loadData("https://api.rootnet.in/covid19-in/stats/latest");

    this.getOwnerComponent().getRouter()
        .getRoute("RouteDetail")
        .attachMatched(this.onRouteMatched, this);
},
        onRouteMatched: function (oEvent) {
    var index = oEvent.getParameter("arguments").index;
    var sPath = "/data/regional/" + index;

    var oModel = this.getView().getModel("latest");
    var oView  = this.getView();

    // Ensure data is loaded before binding
    if (oModel.getProperty("/data")) {
        oView.bindElement({
            path: sPath,
            model: "latest"
        });
    } else {
        // Wait until remote API finishes loading
        oModel.attachRequestCompleted(function () {
            oView.bindElement({
                path: sPath,
                model: "latest"
            });
        });
    }
},
        Back: function () {
            this.getOwnerComponent().getRouter().navTo("RouteList");
        },

        // onFilter: function () {
        //     var aFilter = [];
        //     var ProductName = this.getView().byId("idInputProductFilter").getValue();

        //     if (ProductName) {
        //         aFilter.push(new Filter("Product", FilterOperator.Contains, ProductName));
        //     }


        //     var oTable = this.getView().byId("idMTable");
        //     oTable.getBinding("items").filter(aFilter);
        // }
    });
});




sap.ui.define([], function () {
    "use strict";
    return {
        getDeathColor: function (Death) {
            if(Death>2000 && Death<3999){
                return "Information";
            }
            else if(Death>4000){
                return "Error";
            }
            else{
                return "Success";
            }
        }
    };
});
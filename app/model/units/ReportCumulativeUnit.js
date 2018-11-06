Ext.define('Admin.model.units.ReportCumulativeUnit', {
    extend: 'Admin.model.Base',
    fields: [{
        type: "string",
        name: "unit"
    }, {
        name: "collected"
    },{
        name: "aboard"
    }, {
        name: "charged"
    },{
        name: "price"
    }]
});

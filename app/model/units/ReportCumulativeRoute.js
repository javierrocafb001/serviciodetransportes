Ext.define('Admin.model.units.ReportCumulativeRoute', {
    extend: 'Admin.model.Base',
    fields: [{
        type: "string",
        name: "route"
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

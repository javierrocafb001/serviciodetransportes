Ext.define('Admin.model.units.ReportCumulativeCompany', {
    extend: 'Admin.model.Base',
    fields: [{
        type: "string",
        name: "company"
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

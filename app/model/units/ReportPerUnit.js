Ext.define('Admin.model.units.ReportPerUnit', {
    extend: 'Admin.model.Base',
    fields: [{
        type: "string",
        name: "company"
    }, {
        type: "string",
        name: "unit"
    },{
        type: "string",
        name: "route"
    },{
        name: "aboard"
    }, {
        name: "charged"
    },{
        type: "string",
        name: "reportdate"
    }]
});

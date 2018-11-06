Ext.define('Admin.model.units.ReportPerControl', {
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
        name: "status"
    }, {
        name: "reportdate"
    },{
        type: "number",
        name: "count"
    }]
});

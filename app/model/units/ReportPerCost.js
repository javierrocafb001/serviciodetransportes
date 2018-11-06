Ext.define('Admin.model.units.ReportPerCost', {
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
        name: "collected",
	type: 'number'   
    },{
        name: "aboard"
    }, {
        name: "charged"
    },{
        name: "price"
    },{
        type: "string",
        name: "reportdate"
    }]
});

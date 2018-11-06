Ext.define('Admin.model.units.ReportCumulativeCost', {
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
        name: "price"
    },{
        name: "aboard"
    }, {
        name: "charged"
    }]
});


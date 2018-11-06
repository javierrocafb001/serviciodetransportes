Ext.define('Admin.model.units.ReportGate', {
    extend: 'Admin.model.Base',
    fields: [{
        type: "string",
        name: "company"
    }, {
        name: "count",
	type: 'number'   
    },{
        name: "status"
    }, {
        name: "unit"
    },{
        name: "route",
	type: 'string'    
    }]
});

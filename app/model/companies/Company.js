Ext.define('Admin.model.companies.Company', {
    extend: 'Admin.model.Base',
    fields: [{
        type: "string",
        name: "_id"
    }, {
        type: "string",
        name: "company"
    }, {
        name: "price"
    }]
});

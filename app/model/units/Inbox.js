Ext.define('Admin.model.units.Inbox', {
    extend: 'Admin.model.Base',
    fields: [{
        type: "string",
        name: "_id"
    }, {
        name: "unit"
    }, {
        type: "string",
        name: "distance"
    }, {
        name: "lastupdate"
    }]
});

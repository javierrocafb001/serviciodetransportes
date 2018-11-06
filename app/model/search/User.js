Ext.define('Admin.model.search.User', {
    extend: 'Admin.model.Base',
    fields: [{
        type: "string",
        name: "_id"
    }, {
        type: "string",
        name: "firstname"
    }, {
        type: "string",
        name: "secondname"
    },{
        type: "string",
        name: "firstilastname"
    },{
        type: "string",
        name: "secondlastname"
    },{
        type: "string",
        name: "company"
    },{
        type: "string",
        name: "route"
    },{
        type: "string",
        name: "position"
    },{
        type: "string",
        name: "assigned"
    }]
});

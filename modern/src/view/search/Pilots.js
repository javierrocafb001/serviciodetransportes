Ext.define('Admin.view.search.Pilots', {
    extend: 'Ext.tab.Panel',
    xtype:'searchpilots',
    activeTab: 0,
    viewModel: {
        type: "pilots"
    },
    items: [{
        title: "Pilotos",
        xtype: "searchusers",
        bind: {
            store: "{users}"
        }
    }]

});

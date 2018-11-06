Ext.define('Admin.view.search.Results', {
    extend: 'Ext.tab.Panel',
    xtype:'searchresults',
    activeTab: 0,
    viewModel: {
        type: "searchresults"
    },
    items: [{
        title: "Usuarios",
        xtype: "searchusers",
        bind: {
            store: "{users}"
        }
    }]
});

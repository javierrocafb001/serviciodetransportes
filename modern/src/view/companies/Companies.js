Ext.define('Admin.view.companies.Companies', {
    extend: 'Ext.tab.Panel',
    xtype:'searchresultscompanies',
    activeTab: 0,
    viewModel: {
        type: "searchresultscompanies"
    },
    items: [{
        title: "Empresas",
        xtype: "searchcompanies",
        bind: {
            store: "{companies}"
        }
    }]
});

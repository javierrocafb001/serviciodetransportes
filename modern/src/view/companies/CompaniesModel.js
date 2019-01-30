Ext.define('Admin.view.companies.CompaniesModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.searchresultscompanies',

    stores: {
        companies: {
            type: 'searchcompanies'
        }
    }
});

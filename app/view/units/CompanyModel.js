Ext.define('Admin.view.units.CompanyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.company',
    stores: {
        company: {
            type: "company",
	 storeId: 'company'
        }
    }
   
});

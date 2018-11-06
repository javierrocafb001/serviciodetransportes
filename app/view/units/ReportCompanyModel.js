Ext.define('Admin.view.units.ReportCompanyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reportcompany',
    stores: {
        reportpercompany: {
            type: "reportpercompany",
	 storeId: 'reportpercompany'
        }    
      }
});

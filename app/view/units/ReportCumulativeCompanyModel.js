Ext.define('Admin.view.units.ReportCumulativeCompanyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporttotalcompany',
    stores: {
        reportcumulativecompany: {
            type: "reportcumulativecompany",
	 storeId: 'reportcumulativecompany'
        }    
      }
});

Ext.define('Admin.view.units.ReportGateModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporttotalgate',
    stores: {
        reportgate: {
            type: "reportgate",
	 storeId: 'reportgate'
        }    
      }
});

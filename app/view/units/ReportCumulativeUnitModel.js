Ext.define('Admin.view.units.ReportCumulativeUnitModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporttotalunit',
    stores: {
        reportcumulativeunit: {
            type: "reportcumulativeunit",
	 storeId: 'reportcumulativeunit'
        }    
      }
});

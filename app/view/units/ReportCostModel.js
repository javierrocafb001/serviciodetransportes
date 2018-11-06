Ext.define('Admin.view.units.ReportCostModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reportcost',
    stores: {
        reportpercost: {
            type: "reportpercost",
	 storeId: 'reportpercost'
        }
    }
   
});

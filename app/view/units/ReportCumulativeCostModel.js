Ext.define('Admin.view.units.ReportCumulativeCostModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporttotalcost',
    stores: {
        reportcumulativecost: {
            type: "reportcumulativecost",
	 storeId: 'reportcumulativecost'
        }
    }
   
});

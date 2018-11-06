Ext.define('Admin.view.units.ReportRouteModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reportroute',
    stores: {
        reportperroute: {
            type: "reportperroute",
	 storeId: 'reportperroute'
        }
    }
   
});

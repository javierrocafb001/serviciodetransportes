Ext.define('Admin.view.units.ReportCumulativeRouteModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporttotalroute',
    stores: {
        reportcumulativeroute: {
            type: "reportcumulativeroute",
	 storeId: 'reportcumulativeroute'
        }    
      }
});

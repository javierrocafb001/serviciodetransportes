Ext.define('Admin.view.units.ReportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.report',
    stores: {
        reportperunit: {
            type: "reportperunit",
	 storeId: 'reportperunit'
        }
    }
   
});

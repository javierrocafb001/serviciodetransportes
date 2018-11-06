Ext.define('Admin.view.units.ReportControlModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reportcontrol',
    stores: {
        reportpercontrol: {
            type: "reportpercontrol",
	 storeId: 'reportpercontrol'
        }
    }
   
});

Ext.define('Admin.view.email.ReportControlModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reportcontrol',
    stores: {
        reportpercontrol: {
            type: "reportpercontrol",
	 storeId: 'reportpercontrol'
        }    
      }
});

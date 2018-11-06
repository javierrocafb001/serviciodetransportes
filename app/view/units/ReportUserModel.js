Ext.define('Admin.view.units.ReportUserModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reportuser',
    stores: {
        reportresetuser: {
            type: "reportresetuser",
	 storeId: 'reportresetuser'
        }
    }
   
});

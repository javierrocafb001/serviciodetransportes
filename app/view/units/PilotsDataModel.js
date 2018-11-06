Ext.define('Admin.view.units.PilotaDataModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pilotsdata',
    stores: {
        pilotsdata: {
            type: "pilotsdata",
	 storeId: 'pilotsdata'
        }
    }
   
});

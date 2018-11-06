Ext.define('Admin.view.units.UnitRoutesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.unitroutes',
    stores: {
        unitroutes: {
            type: "unitroutes",
	 storeId: 'unitroutes'
        }
    }
   
});

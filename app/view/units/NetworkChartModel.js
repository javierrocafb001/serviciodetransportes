Ext.define('Admin.view.units.NetworkChartModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.networkchartmodel',
    stores: {
        networkData: {
            type: "networkData",
	 storeId: 'networkData'
        }
    }
});

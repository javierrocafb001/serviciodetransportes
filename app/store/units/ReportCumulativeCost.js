Ext.define('Admin.store.units.ReportCumulativeCost', {
    extend: 'Ext.data.Store',
    alias: 'store.reportcumulativecost',
    model: "Admin.model.units.ReportCumulativeCost",
    pageSize: 20,
    autoLoad: false,
    storeId: 'reportcumulativecost',
    proxy: {
		type: 'websocket' ,
		storeId: 'reportcumulativecost',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'reportcumulativecost' }, 
		reader: {
			type: 'json' ,
			rootProperty: 'data'
		}
    }
});

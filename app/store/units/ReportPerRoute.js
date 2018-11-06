Ext.define('Admin.store.units.ReportPerRoute', {
    extend: 'Ext.data.Store',
    alias: 'store.reportperroute',
    model: "Admin.model.units.ReportPerRoute",
    pageSize: 20,
    autoLoad: false,
    storeId: 'reportperroute',
    proxy: {
		type: 'websocket' ,
		storeId: 'reportperroute',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'reportperroute' }, 
		reader: {
			type: 'json' ,
			rootProperty: 'data'
		}
    }
});

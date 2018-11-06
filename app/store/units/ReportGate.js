Ext.define('Admin.store.units.ReportGate', {
    extend: 'Ext.data.Store',
    alias: 'store.reportgate',
    model: "Admin.model.units.ReportGate",
    pageSize: 20,
    autoLoad: false,
    storeId: 'reportgate',
    proxy: {
		type: 'websocket' ,
		storeId: 'reportgate',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
		extraParams: { store: 'reportgate' }, 
		reader: {
			type: 'json' ,
			rootProperty: 'data'
		}
    }    
});

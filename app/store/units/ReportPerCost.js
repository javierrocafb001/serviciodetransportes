Ext.define('Admin.store.units.ReportPerCost', {
    extend: 'Ext.data.Store',
    alias: 'store.reportpercost',
    model: "Admin.model.units.ReportPerCost",
    pageSize: 20,
    autoLoad: false,
    storeId: 'reportpercost',
    proxy: {
		type: 'websocket' ,
		storeId: 'reportpercost',
                url: 'wss://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'reportpercost' }, 
		reader: {
			type: 'json' ,
			root: 'data'
		}
    }
 
});

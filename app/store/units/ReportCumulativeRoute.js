Ext.define('Admin.store.units.ReportCumulativeRoute', {
    extend: 'Ext.data.Store',
    alias: 'store.reportcumulativeroute',
    model: "Admin.model.units.ReportCumulativeRoute",
    pageSize: 20,
    autoLoad: false,
    storeId: 'reportcumulativeroute',
    proxy: {
		type: 'websocket' ,
		storeId: 'reportcumulativeroute',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'reportcumulativeroute' }, 
		reader: {
			type: 'json' ,
			rootProperty: 'data'
		}
    }    
});

Ext.define('Admin.store.units.ReportCumulativeCompany', {
    extend: 'Ext.data.Store',
    alias: 'store.reportcumulativecompany',
    model: "Admin.model.units.ReportCumulativeCompany",
    pageSize: 20,
    autoLoad: false,
    storeId: 'reportcumulativecompany',
    proxy: {
		type: 'websocket' ,
		storeId: 'reportcumulativecompany',
                url: 'wss://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'reportcumulativecompany' }, 
		reader: {
			type: 'json' ,
			root: 'data'
		}
    }
});

Ext.define('Admin.store.units.ReportPerCompany', {
    extend: 'Ext.data.Store',
    alias: 'store.reportpercompany',
    model: "Admin.model.units.ReportPerCompany",
    pageSize: 20,
    autoLoad: false,
    storeId: 'reportpercompany',
    proxy: {
		type: 'websocket' ,
		storeId: 'reportpercompany',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'reportpercompany' }, 
		reader: {
			type: 'json' ,
			rootProperty: 'data'
		}
    }  
});

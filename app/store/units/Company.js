Ext.define('Admin.store.units.Company', {
    extend: 'Ext.data.Store',
    alias: 'store.company',
    model: "Admin.model.units.Company",
    pageSize: 20,
    autoLoad: false,
    storeId: 'company',
    proxy: {
		type: 'websocket' ,
		storeId: 'company',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'company' }, 
		reader: {
			type: 'json' ,
			rootProperty: 'data'
		}
    }
});

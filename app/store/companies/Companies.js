Ext.define('Admin.store.companies.Companies', {
    extend: 'Ext.data.Store',
    alias: 'store.searchcompanies',
    model: "Admin.model.companies.Company",
    storeId: 'searchcompanies',
    proxy: {
		type: 'websocket' ,
		storeId: 'searchcompanies',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'searchcompanies' }, 
		reader: {
			type: 'json' ,
			root: 'data'
		}
    },
    autoLoad: true
});


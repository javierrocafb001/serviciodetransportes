Ext.define('Admin.store.search.Users', {
    extend: 'Ext.data.Store',
    alias: 'store.searchusers',
    model: "Admin.model.search.User",
    storeId: 'searchusers',
    proxy: {
		type: 'websocket' ,
		storeId: 'searchusers',
                url: 'wss://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'searchusers' }, 
		reader: {
			type: 'json' ,
			root: 'data'
		}
    },
    autoLoad: false,
    sorters: [{
        property: "position",
	    direction: "ASC"
                },{
        property: 'firstname',
         direction: 'ASC'
	       }]
      
});


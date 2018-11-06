Ext.define('Admin.store.units.UnitRoutes', {
    extend: 'Ext.data.Store',
    alias: 'store.unitroutes',
    model: "Admin.model.units.UnitRoutes",
    pageSize: 20,
    autoLoad: false,
    storeId: 'unitroutes',
    proxy: {
		type: 'websocket' ,
		storeId: 'unitroutes',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
		extraParams: { store: 'unitroutes' }, 
		reader: {
			type: 'json' ,
			rootProperty: 'data'
		}
    }
});

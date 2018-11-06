Ext.define('Admin.store.units.ReportPerControl', {
    extend: 'Ext.data.Store',
    alias: 'store.reportpercontrol',
    model: "Admin.model.units.ReportPerControl",
    pageSize: 20,
    autoLoad: false,
    storeId: 'reportpercontrol',
    proxy: {
		type: 'websocket' ,
		storeId: 'reportpercontrol',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'reportpercontrol' }, 
		reader: {
			type: 'json' ,
			rootProperty: 'data'
		}
    }
});

Ext.define('Admin.store.units.ReportPerUnit.js', {
    extend: 'Ext.data.Store',
    alias: 'store.reportperunit',
    model: "Admin.model.units.ReportPerUnit",
    pageSize: 20,
    autoLoad: false,
    storeId: 'reportperunit',
    proxy: {
		type: 'websocket' ,
		storeId: 'reportperunit',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'reportperunit' }, 
		reader: {
			type: 'json' ,
		        rootProperty: 'data'
		}
    }
});

Ext.define('Admin.store.units.ReportResetUser.js', {
    extend: 'Ext.data.Store',
    alias: 'store.reportresetuser',
    model: "Admin.model.units.ReportResetUser",
    pageSize: 20,
    autoLoad: false,
    storeId: 'reportresetuser',
    proxy: {
		type: 'websocket' ,
		storeId: 'reportresetuser',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'reportresetuser' }, 
		reader: {
			type: 'json' ,
			rootProperty: 'data'
		}
    }

});

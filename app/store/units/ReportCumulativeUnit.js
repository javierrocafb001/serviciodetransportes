Ext.define('Admin.store.units.ReportCumulativeUnit', {
    extend: 'Ext.data.Store',
    alias: 'store.reportcumulativeunit',
    model: "Admin.model.units.ReportCumulativeUnit",
    pageSize: 20,
    autoLoad: false,
    storeId: 'reportcumulativeunit',
    proxy: {
		type: 'websocket' ,
		storeId: 'reportcumulativeunit',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'reportcumulativeunit' }, 
		reader: {
			type: 'json' ,
			rootProperty: 'data'
		}
    }

});

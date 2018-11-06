Ext.define('Admin.store.units.Company', {
    extend: 'Ext.data.Store',
    alias: 'store.pilotsdata',
    model: "Admin.model.units.PilotsData",
    pageSize: 20,
    autoLoad: false,
    storeId: 'pilotsdata',
    listeners: {
    beforeload: function(){
    if(Ext.getCmp('gridusers').getSelection()){
    var position = Ext.getCmp('gridusers').getSelection().data.position
    this.getProxy().extraParams = { store: 'pilotsdata', position: position }; 

     }
    }
    }, proxy: {
     type: 'websocket' ,
     storeId: 'pilotsdata',
     url: 'ws://192.168.1.54:8080',
     communicationType: 'event',
     keepUnsentMessages: true,
     autoReconnect: true,
     autoReconnectInterval: 1000,
     extraParams: { store: 'pilotsdata' }, 
     reader: {
		type: 'json' ,
		rootProperty: 'data'
	}
    }

});

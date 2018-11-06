Ext.define('Admin.store.units.Inbox', {
    extend: 'Ext.data.Store',
    alias: 'store.inbox',
    model: "Admin.model.units.Inbox",
    pageSize: 20,
    autoLoad: false,
    storeId: 'inbox',
    listeners: {
    beforeload: function(){
   this.getProxy().extraParams = { store: 'locationdata', timeelapsed: Ext.Date.format(new Date(), 'Y/m/d H:i:s'), userlocation: { latitude: localStorage.getItem('userlocationlatitude'), longitude: localStorage.getItem('userlocationlongitude') } }; 
	      }
       },
	proxy: {
		type: 'websocket' ,
		storeId: 'inbox',
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
	        extraParams: { store: 'locationdata' }, 
		reader: {
			type: 'json' ,
			rootProperty: 'data'
		}
    }
});

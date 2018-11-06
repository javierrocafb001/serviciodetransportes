Ext.define('Admin.model.timeline.TimeLine', {
    extend: 'Admin.model.Base',
    fields: [{
                name: "_id"
            }, {
                name: "user"
            }, {
                name: "content"
            }, {
                name: "date",
                type: "date",
		dateFormat: 'Y/m/d H:i:s' 
            }, {
                name: "userId"
            }, {
                name: "notificationType"
            }],

	proxy: {
		type: 'websocket' ,
		storeId: 'timelinestore',
        	extraParams: { store: 'timelinestore', timeelapsed: Ext.Date.format(new Date(), 'Y/m/d H:i:s'), route: localStorage.getItem('route'), unit: localStorage.getItem('unit'), company: localStorage.getItem('company'), user: localStorage.getItem('user'), assignedid: localStorage.getItem('assignedid') }, 
                url: 'ws://192.168.1.54:8080',
                communicationType: 'event',
	        keepUnsentMessages: true,
	        autoReconnect: true,
	        autoReconnectInterval: 1000,
		reader: {
			type: 'json' ,
			rootProperty: 'data'
		}
	}
});

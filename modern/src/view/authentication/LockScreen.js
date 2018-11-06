Ext.define('Admin.view.authentication.LockScreen', {
    extend: 'Admin.view.authentication.AuthBase',
    xtype: 'lockscreen',
    requires: [
        'Ext.field.Text'
    ],
    padding: 20,
    listeners: {
      painted: function(){
       Ext.getCmp('maintoolbar').setHidden(true);
       Ext.getCmp('navigationbar').setHidden(true);
      }
    },	
    items: [{
        xtype: "panel",
        items: [{
            padding: "10 10 0 10",
            html: "Se Conecto con una Clave Temporal, debe Cambiarla."
        }, {
            xtype: "container",
            padding: 20,
            defaults: {
                margin: "0 0 5 0"
            },
            items: [{
                xtype: "passwordfield",
                placeHolder: "Escoja su Nueva Clave",
                ui: "light",
		itemId: 'newpassword',    
		listeners: {
                change: function(field, newValue, oldValue){
                field.setValue(newValue.toLowerCase());
                }
		}
            }, {
                xtype: "button",
                text: "Enviar la Clave",
                iconAlign: "right",
                iconCls: "x-fa fa-angle-right",
                width: "100%",
                ui: "gray-button",
                handler: function() {
                Ext.websocket.send('temporarynewpassword', { user: localStorage.getItem('user'), password: this.getParent().down('#newpassword').getValue() });
                }
            }]
        }]
    }]
   
});

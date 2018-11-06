Ext.define('Admin.view.forms.AddRouteForm', {
    extend: 'Ext.form.Panel',
    xtype: 'addrouteform',
    cls: "wizardform",
    title: "Agregar una Ruta",
    itemId: 'addrouteform',
	id: 'addrouteform',
    iconCls: "x-fa fa-info",
    bodyPadding: "0 20 10 20",
    defaults: {
        margin: "0 0 10 0"
    },
    items: [{
        xtype: "textfield",
       itemId: 'route',
       required: true,
       placeHolder: "escribe la Ruta",
       listeners: {
       change: function(field, newValue, oldValue){
          field.setValue(newValue.toLowerCase());
          }
       }	    
    },{
                        xtype: 'button',
                        text: 'Cancelar',
                        ui: "soft-red",
                        iconCls: "x-fa fa-plus",
                        margin: "10 10 10 10",
                        docked: 'bottom',
		        layout: {
                          pack: 'left'
                        },
		        scope: this,
                        handler: function(b, e) {
                        Admin.view.main.MainController.prototype.onResetForm.apply(this, arguments);
                        Admin.view.main.MainController.prototype.onCancelButton.apply(this, arguments);
	                return void 0;	
                        }
                    },{
                        xtype: 'button',
                        text: 'Guardar',
                        ui: "soft-green",
                        iconCls: "x-fa fa-plus",
                        margin: "10 10 10 10",
                        docked: 'bottom',
		        layout: {
                          pack: 'left'
                        },
                        handler: function(){
		         if(!this.getParent().down('#route').getValue()){
(this.getParent().down('#route').getValue()) ? '' : this.getParent().down('#route').setPlaceHolder('escribe la Ruta');
			 } else {
			 var route;
			 route = this.getParent().down('#route').getValue();

			 data = { route: Ext.util.Format.lowercase(route) }

				 Ext.Msg.confirm("Agregar Ruta", "Estas a punto de crear la Ruta: " + ' ' + '<b>' + this.getParent().down('#route').getValue() + '</b'  + " ,deseas continuar?", function(btn){ 
			                                                        if(btn === 'yes'){
			Ext.websocket.send('addroute',  { data: { route: data.route } }); 
                        Admin.view.main.MainController.prototype.onResetForm.apply(this, arguments);
			Admin.view.main.MainController.prototype.onCancelButton.apply(this, arguments);

										 } 
			 return void 0;
			 });
			 }	
			
			}
                    }]

});

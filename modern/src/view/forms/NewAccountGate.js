Ext.define('Admin.view.forms.NewAccountGate', {
    extend: 'Ext.form.Panel',
    xtype: 'newaccountgateform',
    cls: "wizardform",
    title: "Crear Usuario Garita",
    itemId: 'newaccountgateform',
	id: 'newaccountgateform',
    iconCls: "x-fa fa-info",
    bodyPadding: "0 20 10 20",
    defaults: {
        margin: "0 0 10 0"
    },
    items: [{
        xtype: "textfield",
       itemId: 'firstname',
       required: true,
       placeHolder: "primer nombre",
       listeners:{
          change: function(field, newValue, oldValue){
          field.setValue(newValue.toLowerCase());
          },
           blur: function(){
           this.getParent().down('#user').setValue(Ext.util.Format.lowercase(this.getParent().down('#firstname').getValue()).charAt(0) + Ext.util.Format.lowercase(this.getParent().down('#firstlastname').getValue()) + Ext.util.Format.lowercase(this.getParent().down('#secondlastname').getValue()))
	   }	   
	 } 
    }, {
        xtype: "textfield",
       itemId: 'secondname',
        placeHolder: "segundo nombre",
        listeners:{
        change: function(field, newValue, oldValue){
          field.setValue(newValue.toLowerCase());
          },
	blur: function(){
this.getParent().down('#user').setValue(Ext.util.Format.lowercase(this.getParent().down('#firstname').getValue()).charAt(0) + Ext.util.Format.lowercase(this.getParent().down('#firstlastname').getValue()) + Ext.util.Format.lowercase(this.getParent().down('#secondlastname').getValue()))
	   }	   
	 } 
    },{
        xtype: "textfield",
       itemId: 'firstlastname',
        placeHolder: "primer apellido",
        listeners:{
	change: function(field, newValue, oldValue){
          field.setValue(newValue.toLowerCase());
          },	
           blur: function(){
this.getParent().down('#user').setValue(Ext.util.Format.lowercase(this.getParent().down('#firstname').getValue()).charAt(0) + Ext.util.Format.lowercase(this.getParent().down('#firstlastname').getValue()) + Ext.util.Format.lowercase(this.getParent().down('#secondlastname').getValue()))
	   }	   
	 } 
    },{
        xtype: "textfield",
       itemId: 'secondlastname',
        placeHolder: "segundo apellido",
        listeners:{
         change: function(field, newValue, oldValue){
          field.setValue(newValue.toLowerCase());
          },
           blur: function(){
this.getParent().down('#user').setValue(Ext.util.Format.lowercase(this.getParent().down('#firstname').getValue()).charAt(0) + Ext.util.Format.lowercase(this.getParent().down('#firstlastname').getValue()) + Ext.util.Format.lowercase(this.getParent().down('#secondlastname').getValue()))
	   }	   
	 } 
    },{
        xtype: "textfield",
       itemId: 'user',
	disabled: true,
        placeHolder: "usuario generado"
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
		         if(!this.getParent().down('#firstname').getValue() || !this.getParent().down('#secondname').getValue() || !this.getParent().down('#firstlastname').getValue() || !this.getParent().down('#secondlastname').getValue()){
(this.getParent().down('#firstname').getValue()) ? '' : this.getParent().down('#firstname').setPlaceHolder('ingresa el primer nombre');
(this.getParent().down('#secondname').getValue()) ? '' : this.getParent().down('#secondname').setPlaceHolder('ingresa el segundo nombre');
(this.getParent().down('#firstlastname').getValue()) ? '' : this.getParent().down('#firstlastname').setPlaceHolder('ingresa el primer apellido');
(this.getParent().down('#secondlastname').getValue()) ? '' : this.getParent().down('#secondlastname').setPlaceHolder('ingresa el segundo apellido');
			 } else {
			 var firstname, secondname, firstlastname, secondlastname, user, position, data;
			 firstname = this.getParent().down('#firstname').getValue(); 
			 secondname = this.getParent().down('#secondname').getValue();
			 firstlastname = this.getParent().down('#firstlastname').getValue();
			 secondlastname = this.getParent().down('#secondlastname').getValue();
			 user = this.getParent().down('#user').getValue();
                         position = 'control de garita';

			 data = { firstname: Ext.util.Format.lowercase(firstname), 
				  secondname: Ext.util.Format.lowercase(secondname),
				  firstlastname: Ext.util.Format.lowercase(firstlastname),
				  secondlastname: Ext.util.Format.lowercase(secondlastname),
				  user: user,
				  position: position }

				 Ext.Msg.confirm("Crear Usuario", "Estas a punto de crear el usuario Control de Garita: " + ' ' + '<b>' + this.getParent().down('#user').getValue() + '</b>' + ' ' + this.getParent().down('#firstname').getValue() + ' ' +  this.getParent().down('#firstlastname').getValue() + ' ' + this.getParent().down('#secondlastname').getValue() +  " ,deseas continuar?", function(btn){ 
			                                                        if(btn === 'yes'){
			Ext.websocket.send('newaccountgate',  { data: { firstname: data.firstname,
			                                     secondname: data.secondname,
					                     firstlastname: data.firstlastname,
					                     secondlastname: data.secondlastname,
					                               user: data.user,
					                           position: data.position } }); 

			Admin.view.main.MainController.prototype.onResetForm.apply(this, arguments);
			Admin.view.main.MainController.prototype.onCancelButton.apply(this, arguments);

										 } 
			  return void 0; 
			 });
			 }	
			
			}
                    }]

});

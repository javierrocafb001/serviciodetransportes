Ext.define('Admin.view.forms.Account', {
    extend: 'Ext.form.Panel',
    xtype: 'accountform',
    cls: 'wizardform',
    requires: [
        'Ext.field.Password',
        'Ext.field.Text'
    ],
    title: "Editar Cuenta",
    iconCls: "x-fa fa-info",
    itemId: 'accountform',
	id: 'accountform',
    bodyPadding: "0 20 10 20",
    listeners: {
        painted: function(){
		Ext.getCmp(this.dom.id).down('#firstname').setValue(Ext.getCmp('gridusers').getSelection().data.firstname)
                Ext.getCmp(this.dom.id).down('#secondname').setValue(Ext.getCmp('gridusers').getSelection().data.secondname)
                Ext.getCmp(this.dom.id).down('#firstlastname').setValue(Ext.getCmp('gridusers').getSelection().data.firstlastname)
                Ext.getCmp(this.dom.id).down('#secondlastname').setValue(Ext.getCmp('gridusers').getSelection().data.secondlastname)
                if(Ext.getCmp('gridusers').getSelection().data.position !== 'administrador'){
                   Ext.getCmp(this.dom.id).down('#unitnumber').setHidden(false);
		   Ext.getCmp(this.dom.id).down('#unitnumber').setValue(Ext.getCmp('gridusers').getSelection().data.unit)
		}
	}
    },
    defaults: {
        margin: "0 0 10 0"
    },
    items: [{
        xtype: "textfield",
       itemId: 'firstname',
       required: true,
       placeHolder: "primer nombre",
       fieldStyle : 'text-transform: lowercase',
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
       itemId: 'unitnumber',
       hidden: true,
        placeHolder: "numero de unidad del bus",
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

			if(Ext.getCmp('gridusers').getSelection().data.position !== 'administrador'){	
		         if(!this.getParent().down('#firstname').getValue() || !this.getParent().down('#secondname').getValue() || !this.getParent().down('#firstlastname').getValue() || !this.getParent().down('#secondlastname').getValue() || !this.getParent().down('#unitnumber').getValue()){
(this.getParent().down('#firstname').getValue()) ? '' : this.getParent().down('#firstname').setPlaceHolder('ingresa el primer nombre');
(this.getParent().down('#secondname').getValue()) ? '' : this.getParent().down('#secondname').setPlaceHolder('ingresa el segundo nombre');
(this.getParent().down('#firstlastname').getValue()) ? '' : this.getParent().down('#firstlastname').setPlaceHolder('ingresa el primer apellido');
(this.getParent().down('#secondlastname').getValue()) ? '' : this.getParent().down('#secondlastname').setPlaceHolder('ingresa el segundo apellido');
(this.getParent().down('#unitnumber').getValue()) ? '' : this.getParent().down('#unitnumber').setPlaceHolder('ingresa la unidad de bus');
			 } else {
			 var firstname, secondname, firstlastname, secondlastname, unit, newuser,user, position, data;
			 firstname = this.getParent().down('#firstname').getValue(); 
			 secondname = this.getParent().down('#secondname').getValue();
			 firstlastname = this.getParent().down('#firstlastname').getValue();
			 secondlastname = this.getParent().down('#secondlastname').getValue();
			 unit = this.getParent().down('#unitnumber').getValue();
			 newuser = this.getParent().down('#user').getValue();
			 user = Ext.getCmp('gridusers').getSelection().data.user 

			 data = { firstname: Ext.util.Format.lowercase(firstname), 
				  secondname: Ext.util.Format.lowercase(secondname),
				  firstlastname: Ext.util.Format.lowercase(firstlastname),
				  secondlastname: Ext.util.Format.lowercase(secondlastname),
				  unit: unit,
				  newuser: newuser,
				  user: user,
				  position: position }

				 Ext.Msg.confirm("Editar Cuenta", "Estas a punto de editar el usuario: " + ' ' + '<b>' + this.getParent().down('#user').getValue() + '</b>' + ' ' + this.getParent().down('#firstname').getValue() + ' ' +  this.getParent().down('#firstlastname').getValue() + ' ' + this.getParent().down('#secondlastname').getValue() + ' '  + 'Numero de Unidad de Transporte:' + ' ' + this.getParent().down('#unitnumber').getValue() + " ,deseas continuar?", function(btn){ 
			                                                        if(btn === 'yes'){
			websocket.send('editaccount',  { data: { firstname: data.firstname,
			                                     secondname: data.secondname,
					                     firstlastname: data.firstlastname,
					                     secondlastname: data.secondlastname,
					                               unit: data.unit,
				                                       newuser: data.newuser,
					                               user: data.user } }); 

			 Admin.view.main.MainController.prototype.onResetForm.apply(this, arguments);
			 Admin.view.main.MainController.prototype.onCancelButton.apply(this, arguments);
                         return void 0;     


										 } 
			 
			 });
			 }	
			} else {
	
            if(!this.getParent().down('#firstname').getValue() || !this.getParent().down('#secondname').getValue() || !this.getParent().down('#firstlastname').getValue() || !this.getParent().down('#secondlastname').getValue()){
    (this.getParent().down('#firstname').getValue()) ? '' : this.getParent().down('#firstname').setPlaceHolder('ingresa el primer nombre');
    (this.getParent().down('#secondname').getValue()) ? '' : this.getParent().down('#secondname').setPlaceHolder('ingresa el segundo nombre');
(this.getParent().down('#firstlastname').getValue()) ? '' : this.getParent().down('#firstlastname').setPlaceHolder('ingresa el primer apellido');
(this.getParent().down('#secondlastname').getValue()) ? '' : this.getParent().down('#secondlastname').setPlaceHolder('ingresa el segundo apellido');
			 } else {
			 var firstname, secondname, firstlastname, secondlastname, unit, user, newuser, position, data;
			 firstname = this.getParent().down('#firstname').getValue(); 
			 secondname = this.getParent().down('#secondname').getValue();
			 firstlastname = this.getParent().down('#firstlastname').getValue();
			 secondlastname = this.getParent().down('#secondlastname').getValue();
                         newuser = this.getParent().down('#user').getValue();
			 user = Ext.getCmp('gridusers').getSelection().data.user

			 data = { firstname: Ext.util.Format.lowercase(firstname), 
				  secondname: Ext.util.Format.lowercase(secondname),
				  firstlastname: Ext.util.Format.lowercase(firstlastname),
				  secondlastname: Ext.util.Format.lowercase(secondlastname),
                                  user: user,
				  newuser: newuser,
				  position: position }

				 Ext.Msg.confirm("Editar Administrador", "Estas a punto de editar el Usuario Administrador: " + ' ' + '<b>' + this.getParent().down('#user').getValue() + '</b>' + ' ' + this.getParent().down('#firstname').getValue() + ' ' +  this.getParent().down('#firstlastname').getValue() + ' ' + this.getParent().down('#secondlastname').getValue() + " ,deseas continuar?", function(btn){ 
			                                                        if(btn === 'yes'){
			websocket.send('editaccountadmon',  { data: { firstname: data.firstname,
			                                     secondname: data.secondname,
					                     firstlastname: data.firstlastname,
					                     secondlastname: data.secondlastname,
				                                       newuser: data.newuser,
					                               user: data.user } }); 

                         Admin.view.main.MainController.prototype.onResetForm.apply(this, arguments);
			 Admin.view.main.MainController.prototype.onCancelButton.apply(this, arguments);
                         return void 0;     



										 } 
			 
			 });
			 }	

			}
			}
                    }]

});

Ext.define('Admin.view.forms.NewAccount', {
    extend: 'Ext.form.Panel',
    xtype: 'newaccountform',
    cls: "wizardform",
    title: "Nueva Cuenta",
    itemId: 'newaccountform',
	id: 'newaccountform',
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
       itemId: 'unitnumber',
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
    }, {
            xtype: 'segmentedbutton',
	    itemId: 'position',
            items: [{
                text: 'piloto',
                value: 'piloto',
		pressed: true
            }, {
                text: 'ayudante',
		value: 'ayudante'
            }]
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
		         if(!this.getParent().down('#firstname').getValue() || !this.getParent().down('#secondname').getValue() || !this.getParent().down('#firstlastname').getValue() || !this.getParent().down('#secondlastname').getValue() || !this.getParent().down('#unitnumber').getValue()){
(this.getParent().down('#firstname').getValue()) ? '' : this.getParent().down('#firstname').setPlaceHolder('ingresa el primer nombre');
(this.getParent().down('#secondname').getValue()) ? '' : this.getParent().down('#secondname').setPlaceHolder('ingresa el segundo nombre');
(this.getParent().down('#firstlastname').getValue()) ? '' : this.getParent().down('#firstlastname').setPlaceHolder('ingresa el primer apellido');
(this.getParent().down('#secondlastname').getValue()) ? '' : this.getParent().down('#secondlastname').setPlaceHolder('ingresa el segundo apellido');
(this.getParent().down('#unitnumber').getValue()) ? '' : this.getParent().down('#unitnumber').setPlaceHolder('ingresa la unidad de bus');
			 } else {
			 var firstname, secondname, firstlastname, secondlastname, unit, user, position, data;
			 firstname = this.getParent().down('#firstname').getValue(); 
			 secondname = this.getParent().down('#secondname').getValue();
			 firstlastname = this.getParent().down('#firstlastname').getValue();
			 secondlastname = this.getParent().down('#secondlastname').getValue();
			 unit = this.getParent().down('#unitnumber').getValue();
			 user = this.getParent().down('#user').getValue();
                         position = this.getParent().down('#position').getValue();

			 data = { firstname: Ext.util.Format.lowercase(firstname), 
				  secondname: Ext.util.Format.lowercase(secondname),
				  firstlastname: Ext.util.Format.lowercase(firstlastname),
				  secondlastname: Ext.util.Format.lowercase(secondlastname),
				  unit: unit, 
				  user: user,
				  position: position }

				 Ext.Msg.confirm("Nueva Cuenta", "Estas a punto de agregar a el usuario: " + ' ' + '<b>' + this.getParent().down('#user').getValue() + '</b>' + ' ' + this.getParent().down('#firstname').getValue() + ' ' +  this.getParent().down('#firstlastname').getValue() + ' ' + this.getParent().down('#secondlastname').getValue() + ' '  + 'en la Posicion de:' + ' ' + this.getParent().down('#position').getValue() + " ,deseas continuar?", function(btn){ 
			                                                        if(btn === 'yes'){
			Ext.websocket.send('newaccount',  { data: { firstname: data.firstname,
			                                     secondname: data.secondname,
					                     firstlastname: data.firstlastname,
					                     secondlastname: data.secondlastname,
					                               unit: data.unit,
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



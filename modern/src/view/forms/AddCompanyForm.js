Ext.define('Admin.view.forms.AddCompanyForm', {
    extend: 'Ext.form.Panel',
    xtype: 'addcompanyform',
    cls: "wizardform",
    title: "Agregar Empresa",
    itemId: 'addcompanyform',
	id: 'addcompanyform',
    iconCls: "x-fa fa-info",
    bodyPadding: "0 20 10 20",
    defaults: {
        margin: "0 0 10 0"
    },
    items: [{
        xtype: "textfield",
       itemId: 'company',
       required: true,
       placeHolder: "Nombre de la Empresa",
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
		         if(!this.getParent().down('#company').getValue()){
(this.getParent().down('#company').getValue()) ? '' : this.getParent().down('#company').setPlaceHolder('Nombre de la Empresa');
			 } else {
			 var company;
			 company = this.getParent().down('#company').getValue();

			 data = { company: Ext.util.Format.lowercase(company) }

				 Ext.Msg.confirm("Agregar Empresa", "Estas a punto de crear la Empresa: " + ' ' + '<b>' + this.getParent().down('#company').getValue() + '</b'  + " ,deseas continuar?", function(btn){ 
			                                                        if(btn === 'yes'){
			Ext.websocket.send('addcompany',  { data: { company: data.company } }); 
                        Admin.view.main.MainController.prototype.onResetForm.apply(this, arguments);
			Admin.view.main.MainController.prototype.onCancelButton.apply(this, arguments);


										 } 
                        return void 0;			 
			 });
			 }	
			
			}
                    }]

});

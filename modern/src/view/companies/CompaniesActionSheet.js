Ext.define('Admin.view.companies.CompaniesActionSheet', {
    extend: 'Ext.ActionSheet',
    xtype: 'companiesactionsheet',
    cls: "userProfile-container dashboard",
    itemId: 'companiesactionsheet',
	id: 'companiesactionsheet',
    scrollable: "y",
	viewModel: {
        type: "userprofile"
    },
    items: [{ text:"Editar Precio del Pasaje", 
		 handler:function(){ 
		if(Ext.getCmp('gridcompanies').getSelection()){
                 Ext.Msg.prompt('Precio del Pasaje', 
                    'Ingrese el Precio del Pasaje: ejemplo 2.50', 
                 function(btn, number) {
	         if(btn === 'ok'){
		 Ext.websocket.send('updateprice', { data: { price: number, 
		 company:  Ext.getCmp('gridcompanies').getSelection().data.company } });
		 }
                    });

        } else {
	Ext.Msg.alert('Error', 'Debe seleccionar un Record, Seleccione Uno.');
	}
               		}}]
  
});


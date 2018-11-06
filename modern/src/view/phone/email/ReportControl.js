Ext.define('Admin.view.phone.email.ReportControl', {
    extend: 'Ext.Container',
    controller: "email-phone",
    viewModel: {
        type: "reportcontrol"
    },
    layout: {
        type: "hbox",
        align: "stretch"
    },
    listeners: {
        painted: function(){
        Ext.Msg.prompt("Numero de Unidad", "Ingrese el Numero de Unidad:", function(btnText, sInput){
                if(btnText === 'ok'){
var passedvalue = Ext.util.Format.lowercase(sInput); 
Ext.Msg.prompt("Numero de Dias", "Ingresa el Numero de dias Atras, del Reporte que deseas Ver, por ejemplo 0 esto es igual a hoy:", function(btnText, sInput){
                if(btnText === 'ok'){
                Ext.data.StoreManager.lookup('reportpercontrol').getProxy().extraParams = { store: 'reportpercontrol', days: sInput, unitnumber: passedvalue, reportdate: Ext.Date.format(new Date(), 'Y/m/d') }; 
                Ext.data.StoreManager.lookup('reportpercontrol').load();
		}
            }, this);

		}
            }, this);

	return void 0;	
	} 
    },
    items: [{
        xtype: "reportpercontrol",
        flex: 1,
        bind: {
            store: "{reportpercontrol}",
            hidden: "{composing}"
        },
        reference: "messages",
        listeners: {
            select: "onSelectMessage"
        }
    }]

});

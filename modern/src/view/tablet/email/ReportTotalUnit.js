Ext.define('Admin.view.tablet.email.ReportTotalUnit', {
    extend: 'Ext.Container',
    controller: "email-tablet",
    viewModel: {
        type: "reporttotalunit"
    },
    layout: {
        type: "hbox",
        align: "stretch"
    },
    listeners: {
	painted: function(){
                Ext.Msg.prompt("Reporte Total por Unidad", "Ingresa el Numero de Unidad:", function(btnText, sInput){
                if(btnText === 'ok'){
            var passedvalue = sInput;
	        Ext.Msg.prompt("Numero de Dias", "Ingresa el Numero de dias Atras, del Reporte que deseas Ver, por ejemplo 0 esto es igual a hoy:", function(btnText, sInput){
                if(btnText === 'ok'){
                if(sInput <= 365){
                Ext.data.StoreManager.lookup('reportcumulativeunit').getProxy().extraParams = { store: 'reportcumulativeunit', 
		days: sInput, unit: passedvalue, reportdate: Ext.Date.format(new Date(), 'Y/m/d') }; 
                Ext.data.StoreManager.lookup('reportcumulativeunit').load();
	       } else {
		Ext.Msg.alert('Dias Atras', 'El Reporte puede verse en un Maximo de 365 dias, escoja un numero de dias Menor.'); 
		}
		}
            }, this);

	         }
            }, this);
	
		return void 0;	
	}   
    },
    margin: "20 0 0 20",
    items: [{
        xtype: "reportcumulativeunit",
        margin: "0 20 20 0",
        flex: 1,
        bind: "{reportcumulativeunit}"
    }]
});

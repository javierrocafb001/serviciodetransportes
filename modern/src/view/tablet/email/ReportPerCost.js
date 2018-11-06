Ext.define('Admin.view.tablet.email.ReportPerCost', {
    extend: 'Ext.grid.Grid',
    itemConfig: {
        viewModel: true
    },
    rowLines: false,
    striped: false,
    columns: [{
        text: "Empresa",
        dataIndex: "company",
        width: 190,
        cell: {
            innerCls: "inbox-from"
        }
    }, {
        text: "Ruta",
        dataIndex: "route",
        flex: 1,
        cell: {
            innerCls: "inbox-title"
        }
    }, {
        text: "Unidad",
        dataIndex: "unit",
        flex: 1,
        cell: {
            innerCls: "inbox-title"
        }
    }, {
        text: "Abordan",
        dataIndex: "aboard",
        flex: 1,
        cell: {
            innerCls: "inbox-title"
        }
    },{
        text: "Cobrados",
        dataIndex: "charged",
        flex: 1,
        cell: {
            innerCls: "inbox-title"
        }
    },{
        text: "Colectado",
        dataIndex: "collected",
	renderer: function(value, record){
	    return Ext.util.Format.currency((record.get('price') * record.get('charged')), 'Q', 2);
	    },
        flex: 1,
        cell: {
            innerCls: "inbox-title"
        }
    }, {
        text: "Fecha",
        dataIndex: "reportdate",
        width: 190
    }]

});

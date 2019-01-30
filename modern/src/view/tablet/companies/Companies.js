Ext.define('Admin.view.tablet.companies.Companies', {
    extend: 'Ext.Container',
    requires: [
        'Ext.grid.Grid'
    ],
    config: {
        store: null
    },
    viewModel: {
        type: "searchresultscompanies"
    },
    bind: {
            store: "{companies}"
        },
    defaultBindProperty: "store",
    listeners: {
       painted: function(){
       Ext.data.StoreManager.lookup('searchcompanies').load();
       return void 0;	       
       }
    },
    layout: "fit",
    items: [{
        xtype: "grid",
       itemId: 'gridcompanies',
	   id: 'gridcompanies',
        width: "100%",
        height: "100%",
	    columns: [{
            text: "#",
            width: 40,
	    hidden: true,
            dataIndex: "_id"
        }, {
            text: "Empresa",
            cls: "content-column",
            flex: 1,
            dataIndex: "company"
        },{
            text: "Precio del Pasaje",
            cls: "content-column",
            flex: 1,
            dataIndex: "price"
        }]
    },{
        xtype: "button",
        iconCls: "x-fa fa-plus",
        ui: "bright-blue round",
        userCls: "pop-out",
        width: 50,
        height: 50,
        bottom: 30,
        right: 10,
        handler: function(){
	  	  var d = this,
               c = d.actions;
               if (!c) {
               d.actions = c = Ext.create({
                xtype: "companiesactionsheet",
                defaults: {
                    scope: d
                },
                enter: "right",
                exit: "right",
                top: 0,
                hidden: true,
                left: null,
                height: "100%",
                hideOnMaskTap: true,
                width: 250
                });
                Ext.Viewport.add(c)
                }
                c.on("hide", function() {
                d.actionsVisible = false
                }, null, {
                single: true
                });
                c.show();
                d.actionsVisible = true 
	  
	},
        listeners: {
            longpress: "onLongPressCompose"
        }
    }],
    updateStore: function(d) {
        var c = this.getComponent(0);
        c.setStore(d)
    }

});

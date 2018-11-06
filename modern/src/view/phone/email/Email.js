Ext.define('Admin.view.phone.email.Email', {
    extend: 'Ext.Container',
    controller: "email-phone",
	itemId: 'phoneemail',
	    id: 'phoneemail',
    viewModel: {
        type: "email"
    },
    layout: {
        type: "hbox",
        align: "stretch"
    },
    listeners: {
        painted: function(){
	Ext.data.StoreManager.lookup('inbox').load();
	return void 0;	
	} 
    },
    items: [{
        xtype: "inbox",
        flex: 1,
        bind: {
            store: "{inbox}",
            hidden: "{composing}"
        },
        reference: "messages",
        listeners: {
            select: "onSelectMessage"
        }
    }]

});

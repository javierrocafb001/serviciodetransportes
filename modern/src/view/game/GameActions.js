Ext.define('Admin.view.game.GameActions', {
    extend: 'Ext.ActionSheet',
    xtype: 'gameactions',
    cls: 'userProfile-container dashboard',
    scrollable: "y",
	viewModel: {
        type: 'userprofile'
    },
	items: [{
        xtype: 'timelineprofile'
    }]

});

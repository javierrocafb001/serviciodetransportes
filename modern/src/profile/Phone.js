Ext.define('Admin.profile.Phone', {
    extend: 'Ext.app.Profile',
    requires: [
        'Admin.view.phone.*'
    ],
    views: {
        game: "Admin.view.phone.game.Game",
	email: "Admin.view.phone.email.Email",
        reportcontrol: "Admin.view.phone.email.ReportControl",
        reportpercontrol: "Admin.view.phone.email.ReportPerControl",
        inbox: "Admin.view.phone.email.Inbox",
        compose: "Admin.view.phone.email.Compose",
        searchusers: "Admin.view.phone.search.Users"
    },
    isActive: function() {
        return Ext.platformTags.phone
    },
    launch: function() {
        Ext.getBody().addCls("phone")
    }
});

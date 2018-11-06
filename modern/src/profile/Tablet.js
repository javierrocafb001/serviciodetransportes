Ext.define('Admin.profile.Tablet', {
    extend: 'Ext.app.Profile',
    requires: [
        'Admin.view.tablet.*'
    ],
    views: {
        email: "Admin.view.tablet.email.Email",
        inbox: "Admin.view.tablet.email.Inbox",
	report: 'Admin.view.tablet.email.Report',
        reportuser: 'Admin.view.tablet.email.ReportUser',
        reportcompany: 'Admin.view.tablet.email.ReportCompany',
        reporttotalcompany: 'Admin.view.tablet.email.ReportTotalCompany',
        reporttotalunit: 'Admin.view.tablet.email.ReportTotalUnit',
        reporttotalroute: 'Admin.view.tablet.email.ReportTotalRoute',
	reporttotalgate: 'Admin.view.tablet.email.ReportTotalGate',
	reporttotalcost: 'Admin.view.tablet.email.ReportTotalCost',
	reportcost: 'Admin.view.tablet.email.ReportCost',
	reportroute: 'Admin.view.tablet.email.ReportRoute',
	reportperunit: 'Admin.view.tablet.email.ReportPerUnit',
        reportresetuser: 'Admin.view.tablet.email.ReportResetUser',
	reportgate: 'Admin.view.tablet.email.ReportGate',
	reportcumulativecompany: 'Admin.view.tablet.email.ReportCumulativeCompany',
        reportcumulativeunit: 'Admin.view.tablet.email.ReportCumulativeUnit',
        reportcumulativeroute: 'Admin.view.tablet.email.ReportCumulativeRoute',
	reportcumulativecost: 'Admin.view.tablet.email.ReportCumulativeCost',
	reportpercost: 'Admin.view.tablet.email.ReportPerCost',
	reportpercompany: 'Admin.view.tablet.email.ReportPerCompany',
        reportperroute: 'Admin.view.tablet.email.ReportPerRoute',
	compose: "Admin.view.tablet.email.Compose",
        searchusers: "Admin.view.tablet.search.Users"
    },
    isActive: function() {
        return !Ext.platformTags.phone
    }
});

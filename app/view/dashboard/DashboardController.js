Ext.define('Admin.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',
    requires: [
        'Ext.util.TaskRunner'
    ],
    onRefreshToggle: function(j, h, g) {
        var e, i;
        if (j.toggleValue) {
		this.clearChartUpdates()
        } else {
	    Ext.getCmp('cpmtime').setHtml("actualizado: " + Ext.Date.format(new Date(), 'Y/m/d H:i:s'));
            Ext.data.StoreManager.lookup('networkData').load();
            e = Ext.data.StoreManager.lookup('networkData');

		if (e.getCount()) {
                i = this.chartTaskRunner;
                if (!i) {
                    this.chartTaskRunner = i = new Ext.util.TaskRunner()
                }
                i.start({
                    run: function() {
                        var a = e.first();
                        e.remove(a);
                        e.add(a)
                    },
                    interval: 200
                })
            }
        }
        j.toggleValue = !j.toggleValue
    },
    clearChartUpdates: function() {
        this.chartTaskRunner = Ext.destroy(this.chartTaskRunner)
    },
    destroy: function() {
        this.clearChartUpdates();
        Ext.app.ViewController.prototype.destroy.call(this)
    },
    onHideView: function() {
        this.clearChartUpdates()
    }
   
});

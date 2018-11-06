Ext.define('Admin.view.charts.ChartGate', {
    extend: 'Ext.Container',
    xtype: 'chartgate',
    cls: "dashboard",
    viewModel: {
        type: "chartgame"
    },
    scrollable: true,
    config: {
        style: 'background-color: black',
        layout: 'fit'
    },
    photonTube: 0,
    initialize: function() {
              this.setItems(
              [{
                xtype: 'draw',
                itemId: 'space'
              }, {
                        xtype: 'button',
                        text: 'Reporta un Bus',
                        ui: "soft-green",
                        iconCls: "x-fa fa-plus",
                        margin: "10 10 10 10",
                        docked: 'bottom',
		        layout: {
                          pack: 'center'
                        },
		        scope: this,
                        handler: function(b, e) {
				
			    var surface = this.down('#space').getSurface();
                           if (this.photonTube == 0){
                                this.photonTube = 1;
			    } else {
                                this.photonTube = 0;
                            }

                            surface.add({
                                type: 'photontorpedobus',
                                surface: surface,
                                src: 'modern/resources/images/photon.png',
				photonTube: this.photonTube
                            });
			  
                        return void 0;
                        }
                    } 
              ])

	  }

});

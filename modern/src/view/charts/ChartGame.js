Ext.define('Admin.view.charts.ChartGame', {
    extend: 'Ext.Container',
    xtype: 'chartgame',
    cls: "dashboard",
    viewModel: {
        type: "chartgame"
    },
    scrollable: true,
    itemId: 'chartgamecanvas',
    id: 'chartgamecanvas',	
    config: {
        style: 'background-color: black',
        layout: 'fit'
    },
    photonTube: 0,
    initialize: function() {

	    switch(localStorage.getItem('position')){
              case 'piloto':
              this.setItems(
              [{
                xtype: 'draw',
                itemId: 'space'
              }, {
                xtype: 'button',
                itemId: 'counterlabel',
		id: 'counterlabel',      
                    ui: "soft-purple",
              disabled: true,
		  text: 'Numero de Pasajeros: ',
		docked: 'top',
                margin: '0 0 0 0'
              },{
                        xtype: 'button',
                        text: 'Reporta/Reporte',
                        ui: "soft-cyan",
                        iconCls: "x-fa fa-plus",
                        margin: "10 10 10 10",
                        docked: 'bottom',
		        layout: {
                        pack: 'center'
                        },
		        scope: this,
                        handler: function(b, e) {
               if(this.down('#counterlabel').getValue() == 0 || this.down('#counterlabel').getValue() == null){          
	      var d = this,
               c = d.actions;
               if (!c) {
               d.actions = c = Ext.create({
                xtype: 'gameactions',
                defaults: {
                    scope: d
                },
                enter:'right',
                exit: 'right',
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
	        } else { Ext.Msg.confirm("Reportar Pasajeros", "Estas a punto de reportar que subieron " + '<b>' + this.down('#counterlabel').getValue() + '</b>' + " pasajeros, deseas continuar?", function(btn){ 
			     if(btn === 'yes'){
                             if(localStorage.getItem('route') !== 'undefined'){
 			     Ext.websocket.send('report', { data: { id: localStorage.getItem('iduser'), user: localStorage.getItem('user'), firstname: localStorage.getItem('firstname'), firstlastname: localStorage.getItem('firstlastname'), route: localStorage.getItem('route'), company: localStorage.getItem('company'), unit: localStorage.getItem('unit'), price: localStorage.getItem('priceofroute'), number: this.down('#counterlabel').getValue(), position: localStorage.getItem('position'), reporttime: Ext.Date.format(new Date(), 'Y/m/d'), time: Ext.Date.format(new Date(), 'Y/m/d H:i:s')}});
			     Ext.websocket.send('inform', { data: { unit: localStorage.getItem('unit'), route: localStorage.getItem('route'), company: localStorage.getItem('company'), price: localStorage.getItem('priceofroute'), aboard: this.down('#counterlabel').getValue(), status: 'open', reporttime: Ext.Date.format(new Date(), 'Y/m/d'), time: Ext.Date.format(new Date(), 'Y/m/d H:i:s') } });   
			     this.down('#counterlabel').setValue(0);
			     this.down('#counterlabel').setText('Numero de Pasajeros: ' + 0);
                             } else {
			      Ext.Msg.alert('Error', 'No Tienes asignada una Ruta, Empresa, Piloto/Ayudante o Unidad de Transporte, Comunicate con el Administrador.');	     
			      Ext.websocket.send('mainreportvalidator', { data: { user: localStorage.getItem('user') } }); 
			     }
			     
			     } else {
                             this.down('#counterlabel').setValue(0);
			     this.down('#counterlabel').setText('Numero de Pasajeros: ' + 0);
                             } 

			     
			     }, this)
 
		                                    }
                            }
                    },{
                        xtype: 'button',
                        text: 'Reduce',
                        ui: "soft-red",
                        iconCls: "x-fa fa-plus",
                        margin: "10 10 10 10",
                        docked: 'bottom',
		        layout: {
                        pack: 'center'
                        },
		        scope: this,
                        handler: function(b, e) {
                            var surface = this.down('#space').getSurface(),
				count;
                            this.photonTube = 0;
                            surface.add({
                                type: 'photontorpedo',
                                src: 'modern/resources/images/photon.png',
                                surface: surface,
				photonTube: this.photonTube
                            });

			    this.down('#counterlabel').getValue() <= 0 ? count = 0 : count = this.down('#counterlabel').getValue() -1
			    this.down('#counterlabel').setValue(count);
                            this.down('#counterlabel').setText('Numero de Pasajeros: ' + '<b>' + count + '</b>');

                        }
                    }, {
                        xtype: 'button',
                        text: 'Aumenta',
                        ui: "soft-green",
                        iconCls: "x-fa fa-plus",
                        margin: "10 10 10 10",
                        docked: 'bottom',
		        layout: {
                          pack: 'left'
                        },
		        scope: this,
                        handler: function(b, e) {
				
			    var surface = this.down('#space').getSurface(),
				count;

			    this.photonTube = 1;
                            surface.add({
                                type: 'photontorpedo',
                                src: 'modern/resources/images/photon.png',
                                surface: surface,
				photonTube: this.photonTube
                            });
  			    count = this.down('#counterlabel').getValue() +1
			    this.down('#counterlabel').setValue(count);
	                    this.down('#counterlabel').setText('Numero de Pasajeros: ' + '<b>' + count + '</b>');

                        }
                    } 
              ])

	      break;	    
	      case 'ayudante':
              this.setItems(
              [{
                xtype: 'draw',
                itemId: 'space'
              }, {
                xtype: 'button',
                itemId: 'counterlabel',
                    ui: "soft-purple",
              disabled: true,
		  text: 'Numero de Pasajeros: ',
		docked: 'top',
                margin: '0 0 0 0'
              },{
                        xtype: 'button',
                        text: 'Reporta/Reporte',
                        ui: "soft-cyan",
                        iconCls: "x-fa fa-plus",
                        margin: "10 10 10 10",
                        docked: 'bottom',
		        layout: {
                        pack: 'center'
                        },
		        scope: this,
                        handler: function(b, e) {
               if(this.down('#counterlabel').getValue() == 0 || this.down('#counterlabel').getValue() == null){          
	       var d = this,
               c = d.actions;
               if (!c) {
               d.actions = c = Ext.create({
                xtype: "gameactions",
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
	        } else { 
			Ext.websocket.send('validatereport', { data: { id: localStorage.getItem('iduser'), user: localStorage.getItem('user'), firstname: localStorage.getItem('firstname'), firstlastname: localStorage.getItem('firstlastname'), route: localStorage.getItem('route'), company: localStorage.getItem('company'), unit: localStorage.getItem('unit'), position: localStorage.getItem('position'), price: localStorage.getItem('priceofroute'), number: this.down('#counterlabel').getValue(), reporttime: Ext.Date.format(new Date(), 'Y/m/d'),  time: Ext.Date.format(new Date(), 'Y/m/d H:i:s')}});
			
 
		          }
                         }
                    },{
                        xtype: 'button',
                        text: 'Reduce',
                        ui: "soft-red",
                        iconCls: "x-fa fa-plus",
                        margin: "10 10 10 10",
                        docked: 'bottom',
		        layout: {
                        pack: 'center'
                        },
		        scope: this,
                        handler: function(b, e) {
                            var surface = this.down('#space').getSurface(),
				count;
                            this.photonTube = 0;
                            surface.add({
                                type: 'photontorpedo',
                                src: 'modern/resources/images/photon.png',
				surface: surface,
				photonTube: this.photonTube
                            });

			    this.down('#counterlabel').getValue() <= 0 ? count = 0 : count = this.down('#counterlabel').getValue() -1
			    this.down('#counterlabel').setValue(count);
                            this.down('#counterlabel').setText('Numero de Pasajeros: ' + '<b>' + count + '</b>');

                        }
                    }, {
                        xtype: 'button',
                        text: 'Aumenta',
                        ui: "soft-green",
                        iconCls: "x-fa fa-plus",
                        margin: "10 10 10 10",
                        docked: 'bottom',
		        layout: {
                          pack: 'left'
                        },
		        scope: this,
                        handler: function(b, e) {
				
			    var surface = this.down('#space').getSurface(),
				count;

			    this.photonTube = 1;
                            surface.add({
                                type: 'photontorpedo',
                                src: 'modern/resources/images/photon.png',
                                surface: surface,
				photonTube: this.photonTube
                            });
  			    count = this.down('#counterlabel').getValue() +1
			    this.down('#counterlabel').setValue(count);
	                    this.down('#counterlabel').setText('Numero de Pasajeros: ' + '<b>' + count + '</b>');

                        }
                    } 
              ])

	      break;
              case 'estacion':

	      break;	    
	    }
	  }

});

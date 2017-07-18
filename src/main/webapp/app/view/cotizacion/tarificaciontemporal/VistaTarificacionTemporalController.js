Ext.define('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporalController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.tarificaciontemporal',
	
	onItemClic: function (node, rec, item, index, e) {
		Ice.log('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporalController.onItemClic args:', arguments);
		var me = this,
			view = this.getView(),
			paso = 'Recuperando tarifa temporal';
		try {
			Ext.create({
				xtype: 'ventanatarifastemporales',
				
				cdunieco: view.getCdunieco(),
				cdramo: view.getCdramo(),
				estado: view.getEstado(),
				nmpoliza: view.getNmpoliza(),
				cdperpag: rec.get('cdperpag'),
				cdtipsit: view.getCdtipsit(),
				
				buttons: [
					{
						text: 'Confirmar',
	                    iconCls: 'x-fa fa-key',
						handler: function (me) {
							var paso = 'Tarificando el plan seleccionado'; 							
							//me.up('ventanatarifastemporales').cerrar();
							try {
								// Tarifincando cotizacion con el plan seleccionado y redirecconando a emitir
								Ice.request({
					                mascara: paso,
					                url: Ice.url.emision.tarificarPlan,
					                params: Ice.convertirAParams({
										cdunieco: view.getCdunieco(),
										cdramo: view.getCdramo(),
										estado: view.getEstado(),
										nmpoliza: view.getNmpoliza(),
										nmsuplem: view.getNmsuplem(),					                     
										cdtipsit: view.getCdtipsit(),					                        
										cdperpag: rec.get('cdperpag')
									}),
					                success: function (action) {
					                	me.up('ventanatarifastemporales').cerrar();
					                	Ice.query('#mainView').getController().redirectTo('emision.action?cdunieco=' + view.getCdunieco() +
				                                '&cdramo=' + view.getCdramo() + '&estado=' + view.getEstado() + '&nmpoliza=' + view.getNmpoliza() +
				                                '&cdtipsit=' + view.getCdtipsit(),
				                            true);
					                }
					            });
							} catch (e) {
								Ice.manejaExcepcion(e, paso);
							}
						}
					}, {
						text: 'Cerrar',
						iconCls: 'x-fa fa-close',
						handler: function (me) {
							me.up('ventanatarifastemporales').cerrar();
						}
					}
				]
			}).mostrar();	
		} catch(e) {
			Ice.manejaExcepcion(e, paso);
		}
	}
});
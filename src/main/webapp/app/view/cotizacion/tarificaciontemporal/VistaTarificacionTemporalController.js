Ext.define('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporalController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.tarificaciontemporal',
	
	onItemClic: function (node, rec, item, index, e) {
		Ice.log('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporalController.onItemClic');
		
		var me = this,
			paso = 'Recuperando tarifa temporal';
		
		
		try {			
			
			Ext.create({
				xtype: 'ventanatarifastemporales',
				
				cdunieco: rec.data.cdunieco,
				cdramo: rec.data.cdramo,
				estado: rec.data.estado,
				nmpoliza: rec.data.nmpoliza,
				cdperpag: rec.data.cdperpag,
				
				botones: [
					{
						text: 'Cerrar',
						iconCls: 'x-fa fa-check',
						handler: function (me) {
							me.up('ventanatarifastemporales').cerrar();
						}
					}, {
						text: 'Confirmar',
	                    iconCls: 'x-fa fa-dollar',
						handler: function (me) {
							var paso = 'Tarificando el plan seleccionado'; 
							
							me.up('ventanatarifastemporales').cerrar();
							
							/*
							 Ice.request({
					                mascara: paso,
					                url: Ice.url.core.recuperarDatosSesion,
					                success: function (action) {
					                    var paso2 = 'Redirecconando a la ventana de emitir;
					                    try {
					                    	Ice.query('#mainView').getController().redirectTo('emision.action?cdunieco=' + rec.data.cdunieco +
					                                '&cdramo=' + rec.data.cdramo + '&estado=' + rec.data.estado + '&nmpoliza=' + rec.data.nmpoliza +
					                                '&cdtipsit=' + view.getCdtipsit(),
					                            true);
					                    } catch (e) {
					                        Ice.manejaExcepcion(e, paso2);
					                    }
					                }
					            }); */
						}
					}
				]
			}).mostrar();	
			
		} catch(e) {
			Ice.manejaExcepcion(e, paso);
		}
	}
});
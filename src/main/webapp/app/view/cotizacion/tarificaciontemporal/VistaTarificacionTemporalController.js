Ext.define('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporalController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.tarificaciontemporal',
	
	onItemClic: function (node, rec, item, index, e) {
		Ice.log('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporalController.onItemClic');
		
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
				cdperpag: rec.data.cdperpag,
				cdtipsit: view.getCdtipsit(),
				
				botones: [
					{
						text: 'Cerrar',
						iconCls: 'x-tool-close',
						handler: function (me) {
							me.up('ventanatarifastemporales').cerrar();
						}
					}, {
						text: 'Confirmar',
	                    iconCls: 'x-fa fa-dollar',
						handler: function (me) {
							
							var paso = 'Tarificando el plan seleccionado'; 							
							me.up('ventanatarifastemporales').cerrar();
													
							try{
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
					                        nmsituac: view.getNmsituac(),
					                        cdperpag: rec.data.cdperpag
					                    }),
					                success: function (action) {
					                    alert(action);
					                }
					            });
								
								
							}catch(e){
								Ice.manejaExcepcion(e, paso);
							}
						}
					}
				]
			}).mostrar();	
			
		} catch(e) {
			Ice.manejaExcepcion(e, paso);
		}
	}
});
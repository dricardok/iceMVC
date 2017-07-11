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
						text: 'Aceptar',
						iconCls: 'x-fa fa-check',
						handler: function (me) {
							me.up('ventanatarifastemporales').cerrar();
						}
					}, {
						text: 'Continuar',
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
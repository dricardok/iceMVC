Ext.define('Ice.view.cotizacion.PagoTarjetaController', {
	extend: 'Ice.app.controller.FormIceController',
	alias: 'controller.pagotarjeta',
	
	cerrar: function () {
		var me = this.getView();		
		me.cerrar();
	},
	
	pagar: function () {
		var me = this,
			view = me.getView(),
			ref  = me.getReferences().formpagotarjeta,
	    	paso = "Realizando Pago";
		
		try{
			combobanco = Ice.query('[name=cdbanco]', ref);			
			//Ice.validarFormulario(view);					
			
			Ice.request({
	            mascara: paso,
	            url: Ice.url.emision.realizarPago,
	            params: Ice.convertirAParams({
	                cdunieco: view.getCdunieco(),
	                cdramo: view.getCdramo(),
	                estado: view.getEstado(),
	                nmpoliza: view.getNmpoliza(),
	                nmsuplem: view.getNmsuplem(),
	                cdbanco: ref.getValues().cdbanco,
	                dsbanco: combobanco.getRawValue(),
	                nmtarjeta: ref.getValues().nmtarjeta,
	                codseg: ref.getValues().codseg,
	                fevencm: ref.getValues().fevencm,
	                fevenca: ref.getValues().fevenca,
	                nombre: ref.getValues().nombre,
	                email: ref.getValues().email	                
	            }),
	            success: function (action) {
	            	
	                Ext.Msg.alert('Aqui se manda a emitir');
	                
	            }
	        });			
			
		} catch(e) {
			Ice.manejaExcepcion(e, paso);
		}
	}
});
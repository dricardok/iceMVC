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
	    	paso = "Realizando Pago";		
		try{
			Ice.validarFormulario(view);
			
			var valores = view.getValues();
			
		}catch(e){
			Ice.manejaExcepcion(e, paso);
		}
		
	
		/*
		Ice.request({
            mascara: paso,
            url: Ice.url.emision.realizarPago,
            params: Ice.convertirAParams({
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                nmsuplem: view.getNmsuplem(),
                /*cdbanco: ref.
                dsbanco:
                nmtarjeta:
                codseg:
                fevencm:
                fecvena:
                nombre:
                email:
                
            }),
            success: function (action) {
                if (action.params) {
                    Ice.cargarFormulario(view, action.params);
                }
            }
        });*/
	}
});
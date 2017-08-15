Ext.define('Ice.view.bloque.mesacontrol.RegistroTramiteWindowController', {
	extend: 'Ice.app.controller.FormIceController',
	alias: 'controller.registrotramitewindow',
	
	onCancelar: function () {
		var me   = this,
			paso = 'con cancelar',
			view = me.getView();
		try{
			view.cerrar();
		}catch(e){
			Ice.manejaExcepcion(e,paso)
		}
	},
	onGuardar: function()	{
		var me   = this,
		paso = 'On guardar',
		view = me.getView();
	try{
		var form = view.lookupReference('form');
		Ice.validarFormulario(form);
		var data = form.getValues();
		Ice.log("datos mesacontrol: ",data);
		for(var idx in data){
			data['params.'+idx]=data[idx];
		}
		data['params.'+'accion']='I';
		data['params.'+'cdtipflu']=view.getCdtipflu();
		data['params.'+'cdflujomc']=view.getCdflujomc();
		Ice.request({
			url:Ice.url.bloque.mesacontrol.movimientoMesacontrol,
			params:data,
			success:function(datos){
				
				paso = 'guardando datos';
				
				view.fireEvent('guardartramite',view,datos.ntramite);
				Ice.mensajeCorrecto("Número de tramite generado: "+datos.ntramite);
				view.cerrar();
				
			}
		});
	}catch(e){
		Ice.manejaExcepcion(e,paso)
	}
	}
});
Ext.define('Ice.view.bloque.mesacontrol.FormnNuevoTramite', {
	extend: 'Ice.view.componente.FormDosColumnasIce',
	xtype: 'formnuevotramite',
	controller: 'formnuevotramite',
	
	constructor: function (config) {
		var me = this,
		paso = 'Construyendo formulario de nuevo tramite para la mesa de control';		
		
		try {
			var comps = Ice.generaComponentes({
				pantalla: 'MESA_CONTROL',
				seccion: 'FORMULARIO_NUEVO_TRAMITE',
				//modulo: 'NUEVO_TRAMITE',
				
				items: true,
				fields: true,
				validators: true
			});
			
			Ice.log(paso, 'campos generados', comps);
			
			config.items = (comps.MESA_CONTROL.FORMULARIO_NUEVO_TRAMITE.items || []).concat(config.items || []);
			config.modelFields = comps.MESA_CONTROL.FORMULARIO_NUEVO_TRAMITE.fields || [];
			config.modelValidators = comps.MESA_CONTROL.FORMULARIO_NUEVO_TRAMITE.validators || [];
			
		} catch(e) {
			Ice.generaExcepcion(e, paso);
		}		
		
		me.callParent(arguments);
	}
});
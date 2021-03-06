Ext.define('Ice.view.bloque.mesacontrol.FormMesaControl', {
	extend: 'Ice.view.componente.FormTresColumnasIce',
	xtype: 'formmesacontrol',
	
	controller: 'formmesacontrol',
	
	//title: 'Filtros',
	
	buttons: [
		{
			text: 'Buscar',
			iconCls: 'x-fa fa-search',
			reference: 'formMesaControlBtnBuscar',
            handler: 'onBuscarClic'
        },
        {
        	text: 'Limpiar',
        	iconCls: 'x-fa fa-eraser',
        	ui:'gray',
        	//iconCls: 'x-fa fa-bar-chart',
        	reference: 'formMesaControlBtnLimpiar',
        	handler: 'onLimpiarClic'
        }
	],
	
	
	constructor: function (config) {		
		var me = this,
		paso = 'Construyendo formulario de mesa de control';
		
		try {
			var comps = Ice.generaComponentes({
				pantalla: 'MESA_CONTROL',
				seccion: 'FORMULARIO',
				//modulo: config.modulo,
				
				items: true,
				fields: true,
				validator: true
			});
			
			config.items = (comps.MESA_CONTROL.FORMULARIO.items || []).concat(config.items || []);
			config.modelFields = comps.MESA_CONTROL.FORMULARIO.fields || [];
			config.modelValidators = comps.MESA_CONTROL.FORMULARIO.validators || [];
			config.sinToggle = true;
			
		} catch(e) {
			
			Ice.generaExcepcion(e, paso);
		}
		
		me.callParent(arguments);
	}
});
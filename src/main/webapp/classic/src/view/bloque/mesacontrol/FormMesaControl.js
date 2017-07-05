Ext.define('Ice.view.bloque.mesacontrol.FormMesaControl', {	
	extend: 'Ext.form.Panel',
	xtype: 'formmesacontrol',
	
	requires: [
		 'Ext.ux.layout.ResponsiveColumn'
	],
	
	controller: 'formmesacontrol',
	
	// configuracion ext
	
	//title: 'Buscar tramite',
	
	layout: 'responsivecolumn',
	
	buttonAlign: 'center',
	
	fieldDefaults: {
		labelAlign: 'left',
	    labelWidth: 100
	},
	
	buttons: [
		{
			text: 'Buscar',
            handler: 'onBuscarClic'
        },
        {
        	text: 'Limpiar',
        	handler: 'onLimpiarClic'
        }
	],
	
	// configuracion no ext
	
	config: {
		cdunieco: null,
		cdramo: null,
		cdsubram: null,
		estado: null,
		nmpoliza: null,
		cdagente: null,
		ntramite: null,
		
		modulo: null,
        flujo: null,
        auxkey: null,
        
        cdtipsit: null,

        modelFields: [],
        modelValidators: []
	},
	
	
	constructor: function (config) {
		//Ice.log('formmesacontrol.constructor config', config);
		var me = this,
			paso = 'Construyendo formulario de mesa de control';
		
		try{
			var comps = Ice.generaComponentes({
                pantalla: 'FORM_MESA_CONTROL',
                seccion: 'FORMULARIO',
                modulo: config.modulo,
                //estatus: config.flujo.estatus || '',
                cdramo: config.cdramo,
                cdtipsit: config.cdtipsit ||'',
                auxkey: config.auxkey || '',

                items: true,
                fields: true,
                validators: true
            });
			
			config.items = (comps.FORM_MESA_CONTROL.FORMULARIO.items || []).concat(config.items || []);
            config.modelFields = comps.FORM_MESA_CONTROL.FORMULARIO.fields || [];
            config.modelValidators = comps.FORM_MESA_CONTROL.FORMULARIO.validators || [];
		}catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments); 
	}
	
	/*
	initComponent: function () {
		 Ice.log('Ice.view.bloque.mesacontrol.FormMesaControl.initComponent');
	}*/
});
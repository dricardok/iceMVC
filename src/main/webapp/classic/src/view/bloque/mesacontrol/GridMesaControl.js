Ext.define('Ice.view.bloque.mesacontrol.GridMesaControl', {
	extend: 'Ext.grid.Panel',
	xtype: 'gridmesacontrol',
	
	requires: [],
	
	controller: 'gridmesacontrol',
	
	title: 'Tramites',
	
	/*
	tbar: [
		{
			text: 'Nuevo tramite'
		}
	],*/
	
	listeners: {
		itemClick: 'onItemClic'
	},
	
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
        auxkey: null
	},
	
	constructor: function (config) {
		Ice.log('Ice.view.bloque.mesacontrol.GridMesaControl.constructor config:', config);
		var me = this,
			paso = 'Construyento grid de mesa de control';
		try{
			var comps = Ice.generaComponentes({
                pantalla: 'GRID_MESA_CONTROL',
                seccion: 'GRID',
                modulo: config.modulo,
                cdramo: config.cdramo,
                cdtipsit: config.cdtipsit ||'',
                auxkey: config.auxkey || '',

                fields: true,
                columns: true
            });
			
			config.columns = (comps.GRID_MESA_CONTROL.GRID.columns || []).concat(config.columns || []);			
			config.store = {
					autoLoad: true,
	                fields: comps.GRID_MESA_CONTROL.GRID.fields || [],
	                proxy: {
	                	type: 'ajax',
	                	url: Ice.url.bloque.mesacontrol.obtenerTramites,
	                	extraParams: Ice.convertirAParams({
	                		ntramite: config.ntramite
	                	}),
	                	reader: {
	                		type: 'json',
	                		rootProperty: 'list'
	                	}
	                }
			};
			
			
		}catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		
		me.callParent(arguments); 
	}
});
Ext.define('Ice.view.bloque.mesacontrol.GridMesaControl', {
	extend: 'Ice.view.componente.GridIce',
	xtype: 'gridmesacontrol',
	
	controller: 'gridmesacontrol',
	
	title: 'Tramites',
	
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
		
		var me= this,
			paso = 'Construyendo grid mesa control';
		try {
			var comps = Ice.generaComponentes({
				pantalla: 'MESA_CONTROL',
				seccion: 'GRID',
				fields: true,
				columns: true
			});
			
			config.columns = (comps.MESA_CONTROL.GRID.columns || []).concat(config.columns || []);			
			config.store = {
					autoLoad: true,
	                fields: comps.MESA_CONTROL.GRID.fields || [],
	                proxy: {
	                	type: 'ajax',
	                	url: Ice.url.bloque.mesacontrol.obtenerTramites,
	                	reader: {
	                		type: 'json',
	                		rootProperty: 'list'
	                	}
	                }
			};			
			
		} catch(e) {
			Ice.generaExcepcion(e, paso);
		}
		
		me.callParent(arguments); 
	},
	
	
	listeners: {
		itemClick: 'onItemClic'
	},
});
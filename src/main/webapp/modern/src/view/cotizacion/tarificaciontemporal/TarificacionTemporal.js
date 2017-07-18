Ext.define('Ice.view.cotizacion.tarificaciontemporal.TarificacionTemporal', {
	extend: 'Ice.view.componente.VentanaIce',
	xtype: 'tarificaciontemporal',
	
	// config ext
	title: 'Elige tu Plan',
	scrollable: true,
	layout: 'fit',

	// config no ext
	config: {
		cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null,
		nmsuplem: null,
		cdperpag: null,
		nmsituac: null,
		cdtipsit: null
	},
	
	constructor: function (config) {
		Ice.log('Ice.view.bloque.emsion.vistaprevia.BloqueVistaPrevia.constructor config', config);
		var me = this,
		    paso = 'Construyendo bloque de tarificacion temporal';
		try {
			if (!config || !config.cdunieco || !config.cdramo || !config.estado || !config.nmpoliza) {
				throw 'Faltan datos para construir bloque de vista previa';
			}
	        
			config.items = [
				{
	        		xtype: 'vistatarificaciontemporal',
	        		style: 'background:#DEEBF4; padding: 0 0 0 3%; min-height: 800px;',
	    			reference: 'vistatarificaciontemporal',
	    				
	    			cdunieco: config.cdunieco,
					cdramo:   config.cdramo,
					estado:   config.estado.toUpperCase(),
					nmpoliza: config.nmpoliza,
					nmsuplem: config.nmsuplem,
					nmsituac: config.nmsituac,
					cdtipsit: config.cdtipsit
	    		}
	        ];
		} catch (e) {
			Ice.generaExcepcion(e, paso);	
		}
		me.callParent(arguments);
	}
});
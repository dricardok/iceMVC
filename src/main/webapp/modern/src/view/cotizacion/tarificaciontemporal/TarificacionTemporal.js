Ext.define('Ice.view.cotizacion.tarificaciontemporal.TarificacionTemporal', {
	extend: 'Ice.view.componente.PanelIce',
	xtype: 'tarificaciontemporal',
	
	title: 'Elige tu Plan',
	
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
		
		try{
			/*
			config.cdunieco = 1;
			config.cdramo = 201;
			config.estado = 'W';
			config.nmpoliza = 613805
			*/
			
			if (!config
	                || !config.cdunieco
	                || !config.cdramo
	                || !config.estado
	                || !config.nmpoliza) {
	                throw 'Faltan datos para construir bloque de vista previa';
			}
	        
			config.items = [
	        	{
	        		xtype: 'vistatarificaciontemporal',
	    			reference: 'vistatarificaciontemporal',
	    				
	    			cdunieco: config.cdunieco,
					cdramo: config.cdramo,
					estado: config.estado,
					nmpoliza: config.nmpoliza,
					nmsuplem: config.nmsuplem,
					nmsituac: config.nmsituac,
					cdtipsit: config.cdtipsit
	    		}
	        ]			
			
		} catch(e) {
			Ice.generaExcepcion(e, paso);	
		}
		
		me.callParent(arguments);
	}
});
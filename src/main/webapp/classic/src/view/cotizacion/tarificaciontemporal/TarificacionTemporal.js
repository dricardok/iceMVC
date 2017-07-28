Ext.define('Ice.view.cotizacion.tarificaciontemporal.TarificacionTemporal', {
	extend: 'Ice.view.componente.PanelIce',
	xtype: 'tarificaciontemporal',
	title:'Elige tu Plan',
	requires: [
		'Ext.toolbar.TextItem'
	],

	// config ext
	scrollable: false,
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
		cdtipsit: null,

		// perfilamiento
		cdptovta: null,
		cdgrupo: null,
		cdsubgpo: null,
		cdperfil: null
	},
	
	constructor: function (config) {
		Ice.log('Ice.view.bloque.emsion.vistaprevia.TarificacionTemporal.constructor config', config);		
		var me = this,
			paso = 'Construyendo bloque de tarificacion temporal';
		try {
			if (!config || !config.cdunieco || !config.cdramo || !config.estado || !config.nmpoliza) {
				throw 'Faltan datos para construir bloque de vista previa';
	        }			
			
			config.items = [
				   {
					xtype: 'vistatarificaciontemporal',
					style: 'background:#DEEBF4; padding: 0 0 0 3%;',
					reference: 'vistatarificaciontemporal',
					
					cdunieco: config.cdunieco,
					cdramo: config.cdramo,
					estado: config.estado,
					nmpoliza: config.nmpoliza,
					nmsuplem: config.nmsuplem,
					nmsituac: config.nmsituac,
					cdtipsit: config.cdtipsit,

					cdptovta: config.cdptovta,
					cdgrupo: config.cdgrupo,
					cdsubgpo: config.cdsubgpo,
					cdperfil: config.cdperfil
				}
			];
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	}
});
Ext.define('Ice.view.cotizacion.tarificaciontemporal.TarificacionTemporal', {
	extend: 'Ice.view.componente.PanelIce',
	xtype: 'tarificaciontemporal',
	title:'Elige tu Plan',
	style:'margin 20px auto; text-align: center; font-size:18px; line-height: 20px; text-align:center !important; color:#707372; padding:15px 0px !important;font-weight:600;',
	ui:'ice-catalogo',
	cls: 'titulo_plan align_plans',
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
		cdperfil: null,

		flujo: null 
	},
	
	constructor: function (config) {
		Ice.log('Ice.view.bloque.emsion.vistaprevia.TarificacionTemporal.constructor config', config);		
		var me = this,
			paso = 'Construyendo bloque de tarificacion temporal';
		try {
			config.flujo = Ice.validarParamFlujo(config);

			if (!config || !config.cdunieco || !config.cdramo || !config.estado || !config.nmpoliza) {
				throw 'Faltan datos para construir bloque de vista previa';
	        }
			
			config.items = [
				   {
					xtype: 'vistatarificaciontemporal', 
					style: 'background:#DEEBF4; margin: 0 auto;',
					reference: 'vistatarificaciontemporal',
					cls:'',
					
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
					cdperfil: config.cdperfil,

					flujo: config.flujo,
					
					listeners: {
						'tramiteGenerado': function (vistatarificaciontemporal, flujo) {
							me.setFlujo(flujo);
							me.fireEvent('tramiteGenerado', me, flujo);
						}
					}
				}
			];
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	}
});
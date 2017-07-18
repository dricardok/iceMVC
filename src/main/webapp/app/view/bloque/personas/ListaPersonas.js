/**
 * Created by DEORTIZT on 5/22/2017.
 */
Ext.define('Ice.view.bloque.personas.ListaPersonas', {
	extend: 'Ice.view.componente.GridIce',
	xtype: 'listapersonas',
	
	controller: 'listapersonas',
	// viewModel: 'listapersonas',

	// config ext
	title: 'Personas',
	
	// config no ext
	config: {
		cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null,
		nmsituac: null,
		nmsuplem: null,

		cdbloque: null,

		modulo: null,
		flujo: null,
		cdtipsit: null
	},

	constructor: function (config) {
		Ice.log('Ice.view.bloque.personas.ListaPersonas.constructor config:', config);
		var me = this,
			paso = 'Construyendo lista de personas';
		try {
			if (!config) {
				throw 'No hay datos para lista de personas';
			}
			
			if (!config.cdramo || !config.cdtipsit) {
				throw 'Falta ramo y tipo de situaci\u00f3n para lista de personas';
			}
			
			if (!config.cdunieco || !config.estado || !config.nmpoliza || Ext.isEmpty(config.nmsuplem)) {
				throw 'Falta llave de p\u00f3liza';
			}
			
			config.modulo = config.modulo || 'EMISION';
			config.flujo = config.flujo || {};
			config.auxkey = config.auxkey || '';
			config.cdtipsit = config.cdtipsit || '';

			var comps = Ice.generaComponentes({
				pantalla: 'BLOQUE_PERSONAS',
				seccion: 'GRID',
				modulo: config.modulo,
				estatus: (config.flujo && config.flujo.estatus),
				cdramo: config.cdramo,
				cdtipsit: config.cdtipsit,
				auxKey: config.auxkey,
				items: true,
				columns: true,
				fields: true
			});

			config.columns = (comps.BLOQUE_PERSONAS.GRID.columns || []).concat(config.columns || []);

			config.store = {
				fields: comps.BLOQUE_PERSONAS.GRID.fields,
				autoLoad: false,
				proxy: {
					type: 'ajax',
					url: Ice.url.bloque.personas.cargarPersonas,
					extraParams: {
						'params.cdunieco': config.cdunieco,
						'params.cdramo': config.cdramo,
						'params.estado': config.estado,
						'params.nmpoliza': config.nmpoliza,
						'params.nmsuplem': config.nmsuplem,
						'params.nmsituac': config.nmsituac
					},
					reader: {
						type: 'json',
						successProperty: 'success',
						messageProperty: 'message',
						rootProperty: 'listas'
					}
				}
			};
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	}
});
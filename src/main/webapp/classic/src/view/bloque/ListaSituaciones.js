/**
 * Created by DCACORDE on 5/22/2017.
 */
Ext.define('Ice.view.bloque.ListaSituaciones', {
	extend: 'Ice.view.componente.GridIce',
	xtype: 'bloquelistasituaciones',

	controller: 'bloquelistasituaciones',

	config: {
		modulo: null,
		flujo: null,
		cdtipsit: null,
		cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null,
		nmsuplem: null,
		actionColumns: [],
		situacionCero: false,
		selector: false
	},

	// validacion de parametros de entrada
	constructor: function (config) {
		Ice.log('Ice.view.bloque.ListaSituaciones.constructor config:', config);
		var me = this,
			paso = 'Validando construcci\u00f3n de bloque lista situaciones';
			try {
				if (!config) {
					throw 'No hay datos para bloque lista situaciones';
				}

				if (!config.cdramo || !config.cdtipsit) {
					throw 'Falta ramo y tipo de situaci\u00f3n para bloque de lista de situaciones';
				}
			
				if (!config.estado) {
					throw 'Falta estado de p\u00f3liza';
				}
				
				if (!config.nmpoliza) {
					throw 'Falta numero de p\u00f3liza';
				}
				
//	                if (!config.nmsuplem) {
//                        throw 'Falta suplemento de p\u00f3liza';
//                    }
				
				config.modulo = config.modulo || 'COTIZACION';

				if (config.selector === true) {
					config.selModel = {
						type: 'checkboxmodel',
						mode: 'SINGLE',
						showHeaderCheckbox: false,
						allowDeselect: true
					};
				}
				
				var comps = Ice.generaComponentes({
					pantalla: 'BLOQUE_LISTA_SITUACIONES',
					seccion: 'GRID',
					modulo: config.modulo || '',
					estatus: (config.flujo && config.flujo.estatus) || '',
					cdramo: config.cdramo || '',
					cdtipsit: config.cdtipsit ||'',
					auxKey: config.auxkey || '',
//		                items: true,
					columns: true,
					fields:true
				});
				Ice.log('Ice.view.bloque.ListaSituaciones.initComponent comps:', comps);

				
				config.title = 'Situaciones de P\u00f3liza '+config.cdunieco+'-'+config.cdramo+'-'+config.estado+'-'+config.nmpoliza;
				config.columns = comps.BLOQUE_LISTA_SITUACIONES.GRID.columns;//.concat(me.config.actionColumns),
				
				Ice.log("col lista situacion: ",config.columns);
				config.store = {
					fields: comps.BLOQUE_LISTA_SITUACIONES.GRID.fields,
					autoLoad: true,
					proxy: {
						type: 'ajax',
						url: Ice.url.bloque.listaSituaciones.cargar,
						extraParams: {
							'params.cdunieco': config.cdunieco,
							'params.cdramo': config.cdramo,
							'params.estado': config.estado,
							'params.nmpoliza': config.nmpoliza,
							'params.nmsuplem': config.nmsuplem
						},
						reader: {
							type: 'json',
							successProperty: 'success',
							messageProperty: 'message',
							rootProperty: 'situaciones'
						}
					}
				};
					
				
			
			} catch (e) {
				Ice.generaExcepcion(e, paso);
			}
		me.callParent(arguments);
	},   
	

//	    // configuracio ext
//	    title: 'Lista Situaciones',	    	    
	
	// tbar: [],	    

	// contruccion usando metodos ext y parametros de entrada
	initComponent: function () {
		Ice.log('Ice.view.bloque.ListaSituaciones.initComponent');
		var me = this,
			paso = 'Construyendo bloque lista de situaciones';
		try {
			
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}             

		
		// construir componente
		Ice.log('Antes de llamar padre');
		me.callParent(arguments);       

		me.getStore().addListener('load',function(store,datos){
			me.fireEvent("cargarstore", store, datos, me);
		});
		// comportamiento
		paso = '';
		try {
			me.getController().custom();
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	}
});
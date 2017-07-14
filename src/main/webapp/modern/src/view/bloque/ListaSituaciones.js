/**
 * Created by DCACORDE on 5/22/2017.
 */
Ext.define('Ice.view.bloque.ListaSituaciones', {
	extend: 'Ice.view.componente.GridIce',
	xtype: 'bloquelistasituaciones',	

	controller: 'bloquelistasituaciones',
//		    viewModel: 'bloquelistasituaciones',	    

	// requires: [
	// 	'Ext.Toolbar',
	// 	'Ext.grid.cell.Widget'
	// ],  

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
			config.cdunieco = config.cdunieco || '';
			config.cdramo = config.cdramo || '';
			config.estado = config.estado || '';
			config.nmpoliza = config.nmpoliza || '';
			config.nmsuplem = config.nmsuplem || 0;
			config.flujo = config.flujo || {};
		
			config.modulo = config.modulo || 'COTIZACION';
			
			if (config.estado === 'w') {
				config.estado = 'W';
			}
			
			var comps = Ice.generaComponentes({
				pantalla : 'BLOQUE_LISTA_SITUACIONES',
				seccion : 'GRID',
				modulo : config.modulo || '',
				estatus : (config.flujo && config.flujo.estatus) || '',
				cdramo : config.cdramo || '',
				cdtipsit : config.cdtipsit || '',
				auxKey : config.auxkey || '',
				columns : true,
				fields : true
			});
			Ice.log('Ice.view.bloque.Coberturas.initComponent comps:',comps);
			
			config.columns = comps.BLOQUE_LISTA_SITUACIONES.GRID.columns.concat(config.columns || []);
			config.fields = comps.BLOQUE_LISTA_SITUACIONES.GRID.fields;

			config.title = 'Situaciones de p\u00f3liza '+config.cdunieco+'-'+config.cdramo+'-'+config.estado
			    +'-'+config.nmpoliza;
			
			// config.items = config.items || [];
			// config.buttons = config.buttons || [];
			
			// if (config.buttons.length > 0) {
			// 	config.items.push({
			// 		xtype : 'toolbar',
			// 		docked: 'bottom',
			// 		items: config.buttons
			// 	});
			// }
			
			// config.actionColumns = config.actionColumns || [];						
			// if (config.actionColumns.length > 0) {
			// 	var c = [];
			// 	config.actionColumns.forEach(function(it){
			// 		c.push({
			// 			width: '60',
			// 			ignoreExport: true,
			// 			cell: {
			// 				xtype: 'widgetcell',
			// 				widget: it
			// 			}
			// 		});
			// 	});
			// 	config.columns = config.columns.concat(c);
			// 	Ice.log("##d",config.columns);
			// }
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	},

		
	// configuracion del componente (no EXT)
	config: {
		actionColumns:[],
		modulo : null,
		flujo : null,
		cdtipsit : null,
		// llave de BD
		cdunieco : null,
		cdramo : null,
		estado : null,
		nmpoliza : null,
		nmsuplem : null,
		
		situacionCero: false,
		
		//fields generados en constructor
		fields: []
	},    
	

	// configuracio ext
	title: 'Lista Situaciones',
	
	initialize: function () {
		Ice.log('Ice.view.bloque.ListaSituaciones.initComponent');
		var me = this,
			paso = 'Construyendo bloque lista de situaciones';
		try {
			/*var comps = Ice.generaComponentes({
				pantalla: 'BLOQUE_LISTA_SITUACIONES',
				seccion: 'LISTA',
				modulo: me.config.modulo || '',
				estatus: (me.config.flujo && me.config.flujo.estatus) || '',
				cdramo: me.config.cdramo || '',
				cdtipsit: me.config.cdtipsit ||'',
				auxKey: me.config.auxkey || '',
//		                items: true,
				columns: true,
				fields:true
			});*/
			//Ice.log('Ice.view.bloque.ListaSituaciones.initComponent comps:', comps);
			// me.headerCt.insert(0,comps.BLOQUE_LISTA_SITUACIONES.LISTA.columns.concat(me.config.actionColumns))
			
			//Ice.log('Ice.view.bloque.ListaSituaciones.initComponent me',me);
			//me.setColumns(me.config.columns);
			me.setStore({
				fields: me.getFields(),
				autoLoad: true,
				proxy: {
					type: 'ajax',
					url: Ice.url.bloque.listaSituaciones.cargar,
					extraParams: {
						'params.cdunieco' : me.getCdunieco(),
						'params.cdramo': me.getCdramo(),
						'params.estado': me.getEstado(),
						'params.nmpoliza': me.getNmpoliza(),
						'params.nmsuplem': me.getNmsuplem()
					},
					reader: {
						type: 'json',
						successProperty: 'success',
						messageProperty: 'message',
						rootProperty: 'situaciones'
					}
				},
				listeners:{
					load:function(store,datos){
						me.fireEvent("cargarstore",store,datos,me);
					}
				}
			});
			//me.setItems();
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}             

		// construir componente
		Ice.log('Antes de llamar padre');
		me.callParent(arguments);       
		
		// comportamiento
		paso = '';
		try {
			me.getController().custom();
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	}
});
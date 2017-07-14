Ext.define('Ice.view.bloque.Coberturas', {
	extend: 'Ice.view.componente.PanelPaddingIce',
	xtype: 'bloquecoberturas',

	controller: 'bloquecoberturas',

	constructor: function (config) {
		Ice.log('Ice.view.bloque.Coberturas.constructor config:', config);
		var me = this,
		    paso = 'Validando construcci\u00f3n de bloque de coberturas';
		try {
			if (!config) {
				throw 'No hay datos para bloque coberturas';
			}

			if (!config.cdramo || !config.cdtipsit || !config.modulo) {
				// throw 'Falta ramo y tipo de situaci\u00f3n para bloque de coberturas';
			}
			
			config.cdunieco = config.cdunieco || '';
			config.cdramo = config.cdramo || '';
			config.estado = config.estado || '';
			config.nmpoliza = config.nmpoliza || '';
			config.nmsuplem = config.nmsuplem || 0;
			config.flujo = config.flujo || {};

			
			config.columns = config.columns || [];
			config.columns.push(
				{
					text: 'cesar',
					minWidth: 50,
					flex: 1
				}, {
					text: 'alvaro',
					minWidth: 50,
					flex: 1
				}
			);
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	},

	// config no ext
	config: {
		// datos para ubicar uso del componente
		modulo: null,
		flujo: null,
		cdtipsit: null,
		auxkey: null,
		
		// llave de BD
		cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null,
		nmsuplem: null,
		nmsituac: '',
		cdgarant: '',
		cdcapita: '',

		// para validar datos
		modelFields: [],
		modelValidators: []
	},
	
	title: 'Coberturas',
	initialize : function() {
		Ice.log('Ice.view.bloque.ListaSituaciones.initComponent');
		var me = this,
		    paso = 'Construyendo bloque lista de situaciones';
		try {
			paso = " creando grid coberturas";
			var it = {
				listeners: {
					itemtap: function (grid, idx, target, record) {
						me.getController().onItemTabSituaciones(grid, idx, target, record);
					},
					cargarstore: function (store, datos, grid) {
						me.getController().mostrarCoberturas(grid, 0, 0);
					}
				},
				xtype: 'bloquelistasituaciones',
				cdtipsit: me.config.cdtipsit,
				cdramo: me.config.cdramo,
				cdunieco: me.config.cdunieco,
				cdramo: me.config.cdramo,
				estado: me.config.estado,
				nmpoliza: me.config.nmpoliza,
				nmsuplem: me.config.nmsuplem,
				reference: 'grid',
				width: '100%',
				height: 300
			}
			me.add(it);

			//////////// grid coberturas //////
			var comps = Ice.generaComponentes({
				pantalla: 'COBERTURAS',
				seccion: 'COBERTURAS',
				modulo: me.modulo || '',
				estatus: (me.flujo && me.flujo.estatus) || '',
				cdramo: me.cdramo || '',
				cdtipsit: me.cdtipsit || '',
				auxKey: me.auxkey || '',
				columns: true,
				fields: true
			});
			Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);
			var gridCoberturas = {
				xtype:'gridice',
				itemId: 'gridCoberturas',
				scrollable: true,
				title: "Coberturas",
				width: '100%',
				height: 300,
				columns: comps.COBERTURAS.COBERTURAS.columns,
				listeners: {
					itemtap: 'editarCoberturaMovil'
				},
				store: {
					fields: comps.COBERTURAS.COBERTURAS.fields,
					proxy: {
						type: 'ajax',
						url: Ice.url.bloque.coberturas.datosCoberturas,
						reader: {
							type: 'json',
							rootProperty: 'list',
							successProperty: 'success',
							messageProperty: 'message'
						},
						extraParams: {
							'params.pv_cdunieco_i': me.config.cdunieco,
							'params.pv_cdramo_i': me.config.cdramo,
							'params.pv_estado_i': me.config.estado,
							'params.pv_nmpoliza_i': me.config.nmpoliza,
							'params.pv_nmsuplem_i': me.config.nmsuplem,
							'params.pv_nmsituac_i': me.getNmsituac()
						}
					}
				},
				buttons: [
					{
						// xtype: 'button',
						text: 'Editar',
						handler: 'editarCoberturaMovil',
						hidden: true
					}, {
						// xtype: 'button',
						text: 'Borrar',
						iconCls: 'x-fa fa-remove',
						disabled: true,
						handler: 'borraCoberturaMovil'
					}, {
						// xtype: 'button',
						iconCls: 'x-fa fa-plus-circle',
						disabled: true,
						text: 'Agregar Cobertura',
						handler: function (btn) {
							me.getController().mostrarPanelCoberturas(btn);
						}
					}
				]
			}
			me.add(gridCoberturas);
			
			////////// formulario editar coberuras
			var form = {
				xtype: 'formice',
				reference: 'form',
				// scrollable: true,
				// height: 300,
				buttons: [{
					// xtype: 'button',
					text: 'Guardar',
					hidden: true,
					itemId: "btnGuardarCobertura",
					handler: 'guardarCoberturaMovil'
				}]
			}
			me.add(form);

			
			/////////panel agregar coberturas
			var panelnc = {
				xtype: 'panelpaddingice',
				itemId: 'panela',
				hidden: true,
				title: 'Agregar Cobertura',
				items: [
					{
						xtype:'gridice',
						// width:'500px',
						// height:300,
						itemId: 'agregables',
						columns: [
							{ xtype: 'checkcolumn', text: 'Amparar', dataIndex: 'amparada', sortable:false},
							{ text: 'Clave', dataIndex: 'cdgarant'  },
							{ text: 'Cobertura', dataIndex: 'dsgarant',flex: 2 }
						],
						store: {
							fields: ['opcional', 'cdgarant', 'dsgarant', 'deducible', 'cdcapita',
							    'suma_asegurada', 'amparada'],
							proxy: {
								type: 'ajax',
								autoLoad: true,
								extraParams: {
									'params.pv_cdunieco_i': me.config.cdunieco,
									'params.pv_cdramo_i': me.config.cdramo,
									'params.pv_estado_i': me.config.estado,
									'params.pv_nmpoliza_i': me.config.nmpoliza,
									'params.pv_nmsuplem_i': me.config.nmsuplem,
									'params.pv_nmsituac_i': me.config.nmsituac
								},
								url: Ice.url.bloque.coberturas.datosCoberturas,
								reader: {
									type: 'json',
									rootProperty: 'list',
									successProperty: 'success',
									messageProperty: 'message'
								}
							},
							listeners: {
								load: function (st) {
									var paso = '';
									try {
										paso = 'filtrando en grid agrega cobertura';
										var remover = -1;
										while ((remover = st.find('amparada','S')) != -1) {
											st.removeAt(remover);
										}
										st.data.items.forEach(function (it, idx) {
											Ice.log("-->", it);
											it.data.amparada = true;
										});
									} catch (e) {
										Ice.generaExcepcion(e, paso);
									}
								}
							}
						}
					}
				],
				buttons: [
					{
						// xtype: 'button',
						text: 'Agregar',
						handler: 'agregarCoberturaMovil'
					}, {
						// xtype: 'button',
						text: 'Cancelar',
						handler: 'cerrarAgregar'
					}
				]
			}
			me.add(panelnc);
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		
		// construir componente
		me.callParent(arguments);
	}
});
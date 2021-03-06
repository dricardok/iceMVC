/**
  * Created by DCACORDE on 5/22/2017.
  */
Ext.define('Ice.view.bloque.Coberturas', {
	extend: 'Ice.view.componente.PanelPaddingIce',
	xtype: 'bloquecoberturas',

	requires: [
		'Ext.PagingToolbar',
		'Ext.selection.CheckboxModel'
	],
	
	controller: 'bloquecoberturas',

	constructor: function(config) {
		Ice.log('Ice.view.bloque.Coberturas.constructor config:', config);
		var me = this,
		    paso = 'Validando construcci\u00f3n de bloque de coberturas';
		try {
			if (!config) {
				throw 'No hay datos para bloque coberturas';
			}
			if (!config.cdramo) {
				throw 'Falta ramo para bloque de coberturas';
			}

			config.cdunieco = config.cdunieco || '';
			config.cdramo = config.cdramo || '';
			config.estado = config.estado || '';
			config.nmpoliza = config.nmpoliza || '';
			config.nmsuplem = config.nmsuplem || 0;
			config.flujo = config.flujo || {};
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
		cdcapita: ''
	},
	
	// config ext
	title: 'Coberturas',
	buttons: [],
	items: [],
	
	// contruccion usando metodos ext y parametros de entrada
	initComponent: function() {
		Ice.log('Ice.view.bloque.ListaSituaciones.initComponent');
		var me = this, paso = 'Construyendo bloque lista de situaciones';
		try {
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
			Ice.log('Ice.view.bloque.Coberturas.initComponent comps:',comps);

			
			paso = " creando grid coberturas";
			var store = {
				fields: comps.COBERTURAS.COBERTURAS.fields,
				proxy: {
					type: 'ajax',
					autoLoad: true,
					url: Ice.url.bloque.coberturas.datosCoberturas,
					extraParams: {
						'params.pv_cdunieco_i': me.config.cdunieco,
						'params.pv_cdramo_i': me.config.cdramo,
						'params.pv_estado_i': me.config.estado,
						'params.pv_nmpoliza_i': me.config.nmpoliza,
						'params.pv_nmsuplem_i': me.config.nmsuplem,
						'params.pv_nmsituac_i': me.config.nmsituac,
						'params.pv_cdtipsit_i': me.getCdtipsit()
					},
					reader: {
						type: 'json',
						rootProperty: 'list',
						successProperty: 'success',
						messageProperty: 'message'
					}
				}
			};
			Ext.apply(me, {
				items: [
					{
						xtype: 'bloquelistasituaciones',
						cdtipsit: this.config.cdtipsit,
						cdramo: this.config.cdramo,
						cdunieco: me.cdunieco,
						cdramo: me.cdramo,
						estado: me.estado,
						nmpoliza: me.nmpoliza,
						nmsuplem: me.nmsuplem,
						maxHeigth: '250px',
						reference: 'grid',
						actionColumns: [
							{
								xtype: 'actioncolumn',
								items: [
									{
										iconCls: 'x-fa fa-edit',
										tooltip: 'Editar',
										handler: function (grid,rowIndex,colIndex) {
											me.getController().mostrarCoberturas(grid,rowIndex,colIndex);
										}
									}
								]
							}
						],
						listeners: {
							cargarstore: function (store, datos, grid) {
								me.getController().mostrarCoberturas(grid, 0, 0);
							}
						}
					}, {
						xtype: 'gridice',
						itemId: 'gridCoberturas',
						hidden: true,
						title: 'Coberturas de la situación ' + me.getNmsituac(),
						buttons: [
							{
								itemId: 'btnAgregar',
								iconCls: 'x-fa fa-plus-circle',
								text: 'Nueva Cobertura',
								handler: 'agregarCobertura'
							}
						],
						columns: comps.COBERTURAS.COBERTURAS.columns,
						actionColumns: [{
							xtype: 'actioncolumn',
							width: 50,
							items: [
								{
									iconCls: 'x-fa fa-edit',
									tooltip: 'Editar',
									handler: 'editarCobertura'
								}, {
									iconCls: 'x-fa fa-remove',
									tooltip: 'Borrar',
									handler: 'borraCobertura',
									isDisabled: 'coberturaObligatoria'
								}
							]
						}],
						
						store: store
					}, {
						xtype: 'formtrescolumnasice',
						reference: 'form',
						hidden: true,
						buttons: [{
							text: 'Guardar',
							iconCls: 'x-fa fa-save',
							itemId: "btnGuardarCobertura",
							handler: 'guardarCoberturas'
						}]
					}
				],
				buttons: me.config.buttons
			});
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}

		// construir componente
		me.callParent(arguments);
	},

	listeners : {
		afterrender : 'cargarSituaciones'
	}
});

/**
 * Created by DEORTIZT on 5/22/2017.
 */
Ext.define('Ice.view.bloque.SituacionesRiesgo', {
	extend: 'Ice.view.componente.PanelPaddingIce',
	xtype: 'bloquesituacionesriesgo',
	
	controller: 'bloquesituacionesriesgo',
	// viewModel: 'bloquesituacionesriesgo',
	    
	// requires: [
	//     'Ext.ux.layout.ResponsiveColumn'
	// ],
	
	// validacion de parametros de entrada
	constructor: function (config) {
		Ice.log('Ice.view.bloque.SituacionesRiesgo.constructor config:', config);
		var me = this,
			paso = 'Validando construcci\u00f3n de bloque situaciones de riesgo';
		try {
			if (!config) {
				throw 'No hay datos para bloque situaciones de riesgo';
			}
			
			if (!config.cdramo || !config.cdtipsit) {
				throw 'Falta ramo y tipo de situaci\u00f3n para bloque de situaciones de riesgo';
			}
			
			config.modulo = config.modulo || 'COTIZACION';
			
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	},
	    
	// configuracion del componente (no EXT)
	config: {
		datosVariablesNuevos: true,
		camposDisparanValoresDefectoFijos: [
			'cdtipsit'
		],
		modulo: null,
		flujo: null,
		cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null,
		nmsuplem: null,
		nmsituac: null,
		cdbloque: null,
		procesandoValoresDefecto: false,
		datosVariablesNuevos: true,
		camposDisparanValoresDefectoVariables: [
			'cdunieco', 'cdramo', 'estado', 'nmpoliza', 'nmsituac', 'status', 'nmsuplem', 'cdtipsit'
		],
		modelFields: [],
		modelValidators: []
	},
	    
	// configuracio ext
	title: 'Situaciones de Riesgo',
	
	// para el scroll
	
	// contruccion usando metodos ext y parametros de entrada
	initComponent: function () {
		Ice.log('Ice.view.bloque.SituacionesRiesgo.initComponent');
		var me = this,
			paso = 'Construyendo bloque situaciones de riesgo';
		try {
			var comps = Ice.generaComponentes({
				pantalla: 'BLOQUE_LISTA_SITUACIONES',
				seccion: 'LISTA',
				modulo: me.modulo || '',
				estatus: (me.flujo && me.flujo.estatus) || '',
				cdramo: me.cdramo || '',
				cdtipsit: me.cdtipsit ||'',
				auxKey: me.auxkey || '',
				items: true,
				validators: true
			});
			Ice.log('Ice.view.bloque.SituacionesRiesgo.initComponent comps:', comps);
			
			var compsForm = Ice.generaComponentes({
				pantalla: 'BLOQUE_LISTA_SITUACIONES',
				seccion: 'FORMULARIO',
				modulo: me.modulo || '',
				estatus: (me.flujo && me.flujo.estatus) || '',
				cdramo: me.cdramo || '',
				cdtipsit: me.cdtipsit ||'',
				auxKey: me.auxkey || '',
				items: true,
				fields: true,
				validators: true
			});
							
			Ice.log('items',comps.BLOQUE_LISTA_SITUACIONES.LISTA.items);
			Ice.log('itemsForm ',compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO);
			
			// agregar binding a los componentes
			// for (var i = 0; i < compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.items.length; i++) {
			//     var item = compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.items[i];
			//     item.bind = '{datos.' + item.name + '}';
			// }
			
//	         // creando modelo para validaciones
			var modelName = Ext.id();
			Ice.log('compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.validators ',me.getModelValidators());
			Ext.apply(me, {
				items: [
					{
						xtype: 'bloquelistasituaciones',
						reference: 'grid',
						cdunieco: this.config.cdunieco,
						cdramo: this.config.cdramo,
						estado: this.config.estado,
						nmpoliza: this.config.nmpoliza,
						nmsuplem: this.config.nmsuplem,
						cdtipsit: this.config.cdtipsit,
						//maxHeigth: 250,
						buttons: [{
							text: 'Agregar',
							iconCls: 'x-fa fa-plus-circle',
							handler: function(){
								Ice.log('Agregar ',this);
								me.getController().onAgregarClic();
							}	                                    
						}],
						actionColumns: [
							{
								xtype:'actioncolumn',
								items: [{
									iconCls: 'x-fa fa-edit',
									tooltip: 'Editar',
									handler: function(grid, rowIndex, colIndex) {
										me.getController().onActualizar(grid, rowIndex, colIndex);
									}
								},{
									iconCls: 'x-fa fa-minus-circle',
									tooltip: 'Borrar',
									handler: function(grid, rowIndex, colIndex){
										me.getController().onBorrarClic(grid, rowIndex, colIndex);
									}
								}]
							}
						]
					},{
						xtype: 'formdoscolumnasice',
						reference: 'form',
						title: 'Editar Situación de Riesgo',
						items: comps.BLOQUE_LISTA_SITUACIONES.LISTA.items.concat(compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.items),
						modelo: modelName,
						// maxHeight: Ice.constantes.componente.contenedor.altura,
						// layout: 'responsivecolumn',
						hidden: true,
						buttons: [
							{
								xtype: 'button',
								reference: 'btnGuardar',
								text: 'Guardar',
								handler: 'onGuardarBloque'
							},{
								xtype: 'button',
								text: 'Cancelar',
								handler: 'onCancelar'
							}
						],
						modelFields: compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.fields,
						modelValidators: compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.validators,
						iceEvents: {
							changeValueProfile: {
								'b5b_otvalor01': {
									'01': 'b',
									'02': 'b',
									'03': 'b',
									'04': 'a'
								}
							},
							changeEvents: {
								'b5b_otvalor01': {
									'a': {
										visible: {
											'b5b_otvalor02': 0,
											'b5b_otvalor03': 1,
											'b5b_otvalor04': 0,
											'b5b_otvalor05': 0,
											'b5b_otvalor06': 0,
											'b5b_otvalor07': 0,
											'b5b_otvalor08': 0,
											'b5b_otvalor09': 0,
											'b5b_otvalor10': 0,
											'b5b_otvalor11': 0,
											'b5b_otvalor12': 0,
											'b5b_otvalor13': 0,
											'b5b_otvalor14': 0,
											'b5b_otvalor15': 0,
											'b5b_otvalor16': 0,
											'b5b_otvalor17': 1,
											'b5b_otvalor18': 0,
											'b5b_otvalor19': 0,
											'b5b_otvalor20': 0,
											'b5b_otvalor21': 0,
											'b5b_otvalor22': 1,
											'b5b_otvalor23': 1,
											'b5b_otvalor24': 1,
											'b5b_otvalor25': 1,
											'b5b_otvalor26': 1
										}
									},
									'b': {
										visible: {
											'b5b_otvalor02': 1,
											'b5b_otvalor03': 1,
											'b5b_otvalor04': 0,
											'b5b_otvalor05': 0,
											'b5b_otvalor06': 0,
											'b5b_otvalor07': 0,
											'b5b_otvalor08': 0,
											'b5b_otvalor09': 0,
											'b5b_otvalor10': 0,
											'b5b_otvalor11': 0,
											'b5b_otvalor12': 0,
											'b5b_otvalor13': 0,
											'b5b_otvalor14': 1,
											'b5b_otvalor15': 1,
											'b5b_otvalor16': 1,
											'b5b_otvalor17': 1,
											'b5b_otvalor18': 0,
											'b5b_otvalor19': 0,
											'b5b_otvalor20': 0,
											'b5b_otvalor21': 0,
											'b5b_otvalor22': 0,
											'b5b_otvalor23': 0,
											'b5b_otvalor24': 0,
											'b5b_otvalor25': 0,
											'b5b_otvalor26': 0
										}
									}
								}
							}
						}
					}
				]
			});
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}

		// construir componente
		me.callParent(arguments);
		
		// comportamiento
		// paso = '';
//	        try {
//	            me.getController().custom();
//	        } catch (e) {
//	            Ice.generaExcepcion(e, paso);
//	        }
	}
});
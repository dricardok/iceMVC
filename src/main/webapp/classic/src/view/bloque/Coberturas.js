/**
  * Created by DCACORDE on 5/22/2017.
  */
 Ext.define('Ice.view.bloque.Coberturas',
 				{
	 
 					extend : 'Ext.Panel',
 					xtype : 'bloquecoberturas',
 					controller : 'bloquecoberturas',
 					requires : [],
 					layout : "responsivecolumn",
 					// scrollable:true,
 					defaults : {
 						userCls : 'big-100 small-100'
 					},
 					// validacion de parametros de entrada
 					constructor : function(config) {
 						Ice
 								.log(
 										'Ice.view.bloque.Coberturas.constructor config:',
 										config);
 						var me = this, paso = 'Validando construcci\u00f3n de bloque de coberturas';
 						try {
 							if (!config) {
 								throw 'No hay datos para bloque coberturas';
 							}
// 							if (!config.failure || !config.success) {
// 								throw 'Falta funciones success y failure  para bloque de coberturas';
// 							}
 							if (!config.cdramo || !config.cdtipsit
 									|| !config.modulo) {
 								//throw 'Falta ramo y tipo de situaci\u00f3n para bloque de coberturas';
 							}
 							config.cdunieco = config.cdunieco || '';
 							config.cdramo = config.cdramo || '';
 							config.estado = config.estado || '';
 							config.nmpoliza = config.nmpoliza || '';
 							config.nmsuplem = config.nmsuplem || '';
 							config.flujo = config.flujo || {};
 						} catch (e) {
 							Ice.generaExcepcion(e, paso);
 						}
 						me.callParent(arguments);
 					},
 					// configuracion del componente (no EXT)
 					config : {
 						// datos para ubicar uso del componente
 						modulo : null,
 						flujo : null,
 						cdtipsit : null,

 						auxkey :null,
 						// llave de BD
 						cdunieco : null,
 						cdramo : null,
 						estado : null,
 						nmpoliza : null,
 						nmsuplem : null,
 						nmsituac : '',
 						cdgarant : '',
 						cdcapita : ''
 					},
 					// configuracio ext
 					title : 'Coberturas',
 					bodyPadding : '10px 0px 0px 10px',
 					buttons : [],
 					items : [
 					],
 					// contruccion usando metodos ext y parametros de entrada
 					initComponent : function() {
 						Ice
 								.log('Ice.view.bloque.ListaSituaciones.initComponent');
 						var me = this, paso = 'Construyendo bloque lista de situaciones';
 						try {
 							var comps = Ice.generaComponentes({
 								pantalla : 'COBERTURAS',
 								seccion : 'COBERTURAS',
 								modulo : me.modulo || '',
 								estatus : (me.flujo && me.flujo.estatus) || '',
 								cdramo : me.cdramo || '',
 								cdtipsit : me.cdtipsit || '',
 								auxKey : me.auxkey || '',
 								columns : true,
 								fields : true
 							});
 							Ice.log('Ice.view.bloque.Coberturas.initComponent comps:',comps);
 							
 							paso = " creando grid coberturas";
 							var store = {
 								fields : comps.COBERTURAS.COBERTURAS.fields,
 								proxy : {
 									type : 'ajax',
 									autoLoad : true,
 									url : Ice.url.bloque.coberturas.datosCoberturas,
 									reader : {
 										type : 'json',
 										rootProperty : 'list',
 										successProperty : 'success',
 										messageProperty : 'message'
 									}
 								}
 							};
 							Ext.apply(me,{
 											
 											items : [
 														{
 															xtype : 'bloquelistasituaciones',
 															cdtipsit : this.config.cdtipsit,
 															cdramo : this.config.cdramo,
 															cdunieco : me.cdunieco,
 								                            cdramo: me.cdramo,
 								                            estado: me.estado,
 								                            nmpoliza: me.nmpoliza,
 								                            nmsuplem: me.nmsuplem,
 															maxHeigth : '250px',
 															reference: 'grid',
 															// width : "100%",
 															actionColumns : [
 																{
	 																xtype : 'actioncolumn',
	 																items : [ 
		 																	{
			 																	iconCls : 'x-fa fa-edit',
			 																	tooltip : 'Editar',
			 																	handler : function(grid,rowIndex,colIndex) {
			 																		me.getController().mostrarCoberturas(grid,rowIndex,colIndex)
			 																	}
			 																} 
	 																	]
	 																}
 																]
 														},
 														{
 															xtype : 'gridpanel',
 															itemId : 'gridCoberturas',
 															hidden: true,
 															title : 'Coberturas',
 															// width : "700px",
 															tbar : [
	 																	{
	 																		xtype : 'tbfill'
	 																	},
	 																	{
	 																		xtype : 'button',
	 																		itemId : 'btnAgregar',
	 							 				                        	iconCls: 'x-fa fa-plus-circle',
	 																		text : 'Agregar',
	 																		handler : 'agregarCobertura'
	 																	} 
 																	],
 															columns : comps.COBERTURAS.COBERTURAS.columns.concat(
	 																	{
	 																		xtype : 'actioncolumn',
	 																		width : 50,
	 																		items : [
		 																				{
		 																					iconCls : 'x-fa fa-edit',
		 																					tooltip : 'Editar',
		 																					handler : 'editarCobertura'
		 																				},
		 																				{
		 																					iconCls : 'x-fa fa-remove',
		 																					tooltip : 'Borrar',
		 																					handler : 'borraCobertura',
		 																					isDisabled : 'coberturaObligatoria'
		 																				} 
	 																				]
	 																	}
	 																	),
 															bbar : Ext.create('Ext.PagingToolbar',{
						 																				store : store,
						 																				displayInfo : true,
						 																				emptyMsg : "",
						 																				displayMsg : 'Coberturas {0} - {1} of {2}',
						 																				inputItemWidth : 35
						 																			}),
 															store : store
 														},
 														{
 															xtype : 'form',
 															reference: 'form',
 															layout : {
 																type : 'column'
 															},
 															defaults : {
 															},
 															buttons : [ {
 																text : 'Guardar',
 																hidden: true,
 																itemId : "btnGuardarCobertura",
 																handler : 'guardarCobertura'
 															} ]
 														} ],
 												buttons : me.config.buttons
 											});
 						} catch (e) {
 							Ice.generaExcepcion(e, paso);
 						}
 						// construir componente
 						me.callParent(arguments);
 						// comportamiento
 						paso = '';
 						try {
 							me.getController().custom();
 						} catch (e) {
 							Ice.generaExcepcion(e, paso);
 						}
 					},
 					listeners : {
 						afterrender : 'cargarSituaciones'
 					},
 					windows:[
 						Ext.create('Ext.window.Window', {
 						    windowName:  'conflictos',
 							title: 'Conflictos',
 							closeAction:'method-hide',
 						    height: 550,
 						    width: 450,
 						    layout: 'fit',
 						    scrollable:true,
 						    items: [{ 
 						        xtype: 'grid',
 						        tipo:'grid',
 						        border: false,
 						        columns: [
 						            { text: 'Tipo', dataIndex: 'tipo'  },
 						            { text: 'Descripcion', dataIndex: 'otvalor',flex: 2 }
 						          //  { xtype: 'checkcolumn', text: 'Amparar', dataIndex: 'amparada'}
 						            ],          
 						            selModel: Ext.create('Ext.selection.CheckboxModel'),   
 						        store: {
 									fields: ['tipo',
 										'otvalor'],
 										data:[]
 					                }
 								}]
 						    })
 					]
 				});
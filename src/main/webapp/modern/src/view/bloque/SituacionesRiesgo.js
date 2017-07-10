/**
 * Created by DEORTIZT on 6/06/2017.
 */
Ext.define('Ice.view.bloque.SituacionesRiesgo', {
	    extend: 'Ext.Panel',
	    xtype: 'bloquesituacionesriesgo',	
	    controller: 'bloquesituacionesriesgo',
		    
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
	                
	                if (config.estado === 'w') {
	                    config.estado = 'W';
	                }
	               
		        } catch (e) {
		            Ice.generaExcepcion(e, paso);
		        }
		    Ice.log('Ice.view.bloque.SituacionesRiesgo.constructor antes de callParent');    
		    me.callParent(arguments);
		},

		// configuracion del componente (no EXT)
		config: {
	        modulo: null,
	        flujo: null,
	        cdtipsit: null,
	        
	        cdunieco: null, //1,
	        cdramo: null, //501,
	        estado: null, //'W',
	        nmpoliza: null, //17196,
	        nmsuplem: null, //0,
	        
	        nmsituac: null,
	        cdbloque: null,
	        auxKey: null,
	        
	        procesandoValoresDefecto: false,
	        datosVariablesNuevos: true,
	        camposDisparanValoresDefectoVariables: [
	            'cdunieco', 'cdramo', 'estado', 'nmpoliza', 'nmsituac', 'status', 'nmsuplem', 'cdtipsit', 'fefecsit'
	        ],
	        modelFields: [],
	        modelValidators: []
		},
		// configuracio ext
		title: 'Lista Situaciones',
		layout: 'vbox',
		scrollable: true,
		
	    // contruccion usando metodos ext y parametros de entrada
		initialize : function() {
	        Ice.log('Ice.view.bloque.SituacionesRiesgo.initalize');
	        var me = this,
	            paso = 'Construyendo bloque situaciones de riesgo';
	        try {
	            paso = "creando grid situaciones";
                var it={
                        xtype : 'bloquelistasituaciones',
                        reference: 'grid',
                        
                        cdunieco : me.getCdunieco(),
                        cdramo : me.getCdramo(),
                        estado: me.getEstado(),
                        nmpoliza: me.getNmpoliza(),
                        nmsuplem: me.getNmsuplem(),
                        
                        cdtipsit : me.getCdtipsit(),
                        modulo: me.getModulo(),
                        flujo: me.getFlujo(),
                        
                        height: 300,
                        scrollable: true,
                        actionColumns: [
                            {
                                xtype: 'button',
                                ui: 'action',
                                iconCls: 'x-fa fa-edit',
                                handler: function(grid, rowIndex, colIndex) {
                                    me.getController().onActualizar(grid, rowIndex, colIndex);
                                } 
                            } , {
                                xtype: 'button',
                                ui: 'action',
                                iconCls: 'x-fa fa-minus-circle',
                                handler: function(grid, rowIndex, colIndex){
                                    me.getController().onBorrarClic(grid, rowIndex, colIndex);
                                }
                            }
                            
                        ],
                        listeners:{
                        	cargarstore:function(store,datos){
                        		Ice.log('Agregar ',this);
                                me.getController().onAgregarClic();
                        	}
                        }
                };
               me.add({
                   xtype: 'toolbar',
                   docked: 'top',
                   items: [
                       {
                           text: 'Agregar',
                           iconCls: 'x-fa fa-plus-circle',
                           handler: function(){
                               Ice.log('Agregar ',this);
                               me.getController().onAgregarClic();
                           }                                       
                       }
                   ]
               }); 
               me.add(it);
               
               var compsForm = Ice.generaComponentes({
                   pantalla: 'BLOQUE_LISTA_SITUACIONES',
                   seccion: 'FORMULARIO',
                   modulo: me.getModulo() || '',
                   estatus: (me.getFlujo() && me.getFlujo().estatus) || '',
                   cdramo: me.cdramo || '',
                   cdtipsit: me.getCdtipsit() ||'',
                   auxKey: me.getAuxKey() || '',
                   items: true,
                   fields: true,
                   validatos: true
               });	                                
               Ice.log('itemsForm ',compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO);
               var comps = Ice.generaComponentes({
                   pantalla: 'BLOQUE_LISTA_SITUACIONES',
                   seccion: 'LISTA',
                   modulo: me.getModulo() || '',
                   estatus: (me.getFlujo() && me.getFlujo().estatus) || '',
                   cdramo: me.getCdramo() || '',
                   cdtipsit: me.getCdtipsit() ||'',
                   auxKey: me.getAuxKey() || '',
                   items: true,
                   validatos: true
               });
               Ice.log('Ice.view.bloque.SituacionesRiesgo.initComponent comps:', comps);
               
               var formItems = comps.BLOQUE_LISTA_SITUACIONES.LISTA.items.concat(compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.items);
               for (var i = 0; i < formItems.length; i++) {
                   formItems[i].style = 'margin: 0px 10px 10px 0px; float: left;';
                   formItems[i].userCls = 'big-50 small-100';
               }
               
               formItems.push({
                   xtype: 'toolbar',
                   docked: 'bottom',
                   items: [
                       {
                           xtype: 'button',
                           reference: 'btnGuardar',
                           text: 'Guardar',
                           handler: 'onGuardarBloque',
                           iconCls: 'x-fa fa-save'
                       },{
                           xtype: 'button',
                           text: 'Cancelar',
                           iconCls: 'x-fa fa-remove',
                           handler: 'onCancelar'
//                               function (me){
//                               var paso = '';
//                               try{
//                                   paso = 'Antes de ocultar formulario de situacion';
//                                   me.up('formpanel').hide();
//                               } catch (e){
//                                   Ice.generaExcepcion(e, paso);
//                               }
//                           }
                       }
                   ]
               });
               
               var itForm = {
                       xtype: 'formpanel',
                       reference: 'form',
                       title: 'Editar situacion de riesgo',
                       items: formItems,
                       layout: 'default',
                       modelFields: compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.fields,
                       modelValidators: compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.validators,
                       hidden: true,
                       bodyPadding: '10px 0px 0px 10px'
                       /*defaults: {
                           margin: '0px 10px 10px 0px',
                           cls: 'big-50 small-100'
                       }*/
                 };
                me.add(itForm);
	        } catch (e) {
	            Ice.generaExcepcion(e, paso);
	        }
	            
	            
	        // construir componente
	        me.callParent(arguments);
	    }		    	

});
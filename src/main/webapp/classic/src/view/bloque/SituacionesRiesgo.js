/**
 * Created by DEORTIZT on 5/22/2017.
 */
Ext.define('Ice.view.bloque.SituacionesRiesgo', {	
	    extend: 'Ext.panel.Panel',
	    xtype: 'bloquesituacionesriesgo',
	    
	    controller: 'bloquesituacionesriesgo',
	    viewModel: 'bloquesituacionesriesgo',
	    
	    requires: [
	        'Ext.ux.layout.ResponsiveColumn'
	    ],
	    
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
	        cdunieco: null, //1,
	        cdramo: null, //501,
	        estado: null, //'W',
	        nmpoliza: null, //17196,
	        nmsuplem: null, //0,
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
	    title: 'Situaciones de riesgo',
	    
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
                for (var i = 0; i < compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.items.length; i++) {
                    var item = compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.items[i];
                    item.bind = '{datos.' + item.name + '}';
                }
	            
//	         // creando modelo para validaciones
                var modelName = Ext.id();
//                Ext.define(modelName, {
//                    extend: 'Ext.data.Model',
//                    fields: compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.fields,
//                    validators: compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.validators
//                });
//	            
//	         // creando modelo para validaciones
//                var modelName = Ext.id();
//                Ext.define(modelName, {
//                    extend: 'Ext.data.Model',
//                    fields: compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.fields,
//                    validators: compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.validators
//                });
                me.setModelFields(compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.fields);
                me.setModelValidators(compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.validators);
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
	                        maxHeigth: '250',
	                        tbar: [
	                            {
	                                text: 'Agregar',
	                                iconCls: 'x-fa fa-plus-circle',
	                                handler: function(){
	                                    Ice.log('Agregar ',this);
	                                    me.getController().onAgregarClic();
	                                }	                                    
	                            }
	                        ],
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
	                        xtype: 'form',
	                        reference: 'form',
	                        title: 'Editar situacion de riesgo',
	                        items: comps.BLOQUE_LISTA_SITUACIONES.LISTA.items.concat(compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.items),
	                        modelo: modelName,
//	                        modelFields: compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.fields,
//                            modelValidators: compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.validators,
	                        layout: 'responsivecolumn',
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
	                                handler: function (me){
	                                    var paso = '';
	                                    try{
	                                        paso = 'Antes de ocultar formulario de situacion';
	                                        me.up('form').hide();
	                                    } catch (e){
	                                        Ice.generaExcepcion(e, paso);
	                                    }
	                                }
	                            }
	                        ],
	                        bodyPadding: '10px 0px 0px 10px',
	                        defaults: {
	                            margin: '0px 10px 10px 0px',
	                            cls: 'big-50 small-100'
	                        }
	                    },{
	                        xtype: 'form'
	                    }
	                ]
	            });
	        } catch (e) {
	            Ice.generaExcepcion(e, paso);
	        }
	        
	        
	        // construir componente
	        me.callParent(arguments);
	        
	        
	        // comportamiento
	        paso = '';
//	        try {
//	            me.getController().custom();
//	        } catch (e) {
//	            Ice.generaExcepcion(e, paso);
//	        }
	    }
	
});
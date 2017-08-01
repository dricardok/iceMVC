/**
 * Created by DEORTIZT on 6/06/2017.
 */
Ext.define('Ice.view.bloque.SituacionesRiesgo', {
    extend: 'Ice.view.componente.PanelPaddingIce',
    xtype: 'bloquesituacionesriesgo',
    controller: 'bloquesituacionesriesgo',

    // config ext
    title: 'Lista Situaciones',
    scrollable: true,
    
    // config no ext
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
        modelValidators: [],
        cdtipsitUnico: false
    },

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

            var compsForm = Ice.generaComponentes({
                pantalla: 'BLOQUE_LISTA_SITUACIONES',
                seccion: 'FORMULARIO',
                modulo: config.modulo || '',
                estatus: (config.flujo && config.flujo.estatus) || '',
                cdramo: config.cdramo || '',
                cdtipsit: config.cdtipsit ||'',
                auxKey: config.auxkey || '',
                items: true,
                fields: true,
                validators: true
            });	                                
            Ice.log('itemsForm ',compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO);
			
			var eventsForm = Ice.generaComponentes({
				pantalla: 'BLOQUE_LISTA_SITUACIONES',
				seccion: 'EVENTOS', 
				modulo: me.modulo || '',
				estatus: (me.flujo && me.flujo.estatus) || '',
				cdramo: me.cdramo || '',
				cdtipsit: me.cdtipsit ||'',
				auxKey: me.auxkey || '',
				eventos: true
			});

            var comps = Ice.generaComponentes({
                pantalla: 'BLOQUE_LISTA_SITUACIONES',
                seccion: 'LISTA',
                modulo: config.modulo || '',
                estatus: (config.flujo && config.flujo.estatus) || '',
                cdramo: config.cdramo || '',
                cdtipsit: config.cdtipsit ||'',
                auxKey: config.auxkey || '',
                items: true,
                validators: true
            });
            Ice.log('Ice.view.bloque.SituacionesRiesgo.initComponent comps:', comps);

            config.items = [
                {
                    xtype : 'bloquelistasituaciones',
                    reference: 'grid',
                    
                    cdunieco: config.cdunieco,
                    cdramo: config.cdramo,
                    estado: config.estado,
                    nmpoliza: config.nmpoliza,
                    nmsuplem: config.nmsuplem,
                    
                    cdtipsit: config.cdtipsit,
                    modulo: config.modulo,
                    flujo: config.flujo,
                    
                    // height: Ice.constantes.componente.contenedor.altura,
                    // scrollable: true,
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
                    buttons: [{
                        text: 'Agregar',
                        iconCls: 'x-fa fa-plus-circle',
                        handler: function(){
                            Ice.log('Agregar ',this);
                            me.getController().onAgregarClic();
                        }
                    }]
                }, {
                    xtype: 'formdoscolumnasice',
                    reference: 'form',
                    title: 'Editar situacion de riesgo',
                    items: comps.BLOQUE_LISTA_SITUACIONES.LISTA.items.concat(compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.items),
                    // height: Ice.constantes.componente.contenedor.altura,
                //    layout: 'default',
                    modelFields: compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.fields,
                    modelValidators: compsForm.BLOQUE_LISTA_SITUACIONES.FORMULARIO.validators,
                    hidden: true,
                //    bodyPadding: '10px 0px 0px 10px'
                    // defaults: {
                    //     margin: '0px 10px 10px 0px',
                    //     cls: 'big-50 small-100'
                    // },
                    buttons: [
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
                    ],
                    iceEvents: eventsForm.BLOQUE_LISTA_SITUACIONES.EVENTOS.eventos
                }
            ].concat(config.items || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.SituacionesRiesgo.constructor antes de callParent');
        me.callParent(arguments);
    }
    
    /*
    // contruccion usando metodos ext y parametros de entrada
    initialize : function() {
        Ice.log('Ice.view.bloque.SituacionesRiesgo.initalize');
        var me = this,
            paso = 'Construyendo bloque situaciones de riesgo';
        try {
            paso = "creando grid situaciones";
            var it = ;
            //    me.add({
            //        xtype: 'toolbar',
            //        docked: 'top',
            //        items: [
            //            {
            //                text: 'Agregar',
            //                iconCls: 'x-fa fa-plus-circle',
            //                handler: function(){
            //                    Ice.log('Agregar ',this);
            //                    me.getController().onAgregarClic();
            //                }                                       
            //            }
            //        ]
            //    }); 
            me.add(it);
            
            
               
            var formItems = ;
            //    for (var i = 0; i < formItems.length; i++) {
            //        formItems[i].style = 'margin: 0px 10px 10px 0px; float: left;';
            //        formItems[i].userCls = 'big-50 small-100';
            //    }
               
            //    formItems.push({
            //        xtype: 'toolbar',
            //        docked: 'bottom',
            //        items: [
            //            {
            //                xtype: 'button',
            //                reference: 'btnGuardar',
            //                text: 'Guardar',
            //                handler: 'onGuardarBloque',
            //                iconCls: 'x-fa fa-save'
            //            },{
            //                xtype: 'button',
            //                text: 'Cancelar',
            //                iconCls: 'x-fa fa-remove',
            //                handler: 'onCancelar'
//                               function (me){
//                               var paso = '';
//                               try{
//                                   paso = 'Antes de ocultar formulario de situacion';
//                                   me.up('formpanel').hide();
//                               } catch (e){
//                                   Ice.generaExcepcion(e, paso);
//                               }
//                           }
            //            }
            //        ]
            //    });
               
            var itForm = ;
            me.add(itForm);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        // construir componente
        me.callParent(arguments);
    }
    */
});
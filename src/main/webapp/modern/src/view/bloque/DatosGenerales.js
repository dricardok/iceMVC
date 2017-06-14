/**
 * Created by jtezva on 6/5/2017.
 */
Ext.define('Ice.view.bloque.DatosGenerales', {
    extend: 'Ext.form.Panel',
    xtype: 'bloquedatosgenerales',
    
    controller: 'bloquedatosgenerales',
    
    requires: [
        'Ext.Toolbar'
    ],
    
    
    // validacion de parametros de entrada
    constructor: function (config) {
        Ice.log('Ice.view.bloque.DatosGenerales.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de bloque de datos generales';
            try {
                if (!config || !config.cdramo || !config.cdtipsit || !config.modulo) {
                    throw 'Faltan par\u00e1metros para construir bloque de datos generales';
                }
                
                config.flujo = config.flujo || {};
            } catch (e) {
                Ice.generaExcepcion(e, paso);
            }
        me.callParent(arguments);
    },
    
    
    // configuracion del componente (no EXT)
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
        
        // variables para valores por defecto (fijos y variables)
        procesandoValoresDefecto: false,
        datosFijosNuevos: true,
        datosVariablesNuevos: true,
        camposDisparanValoresDefectoFijos: [
            'b1_cdunieco'
        ],
        camposDisparanValoresDefectoVariables: [
            'b1_cdunieco', 'b1_nmpoliza', 'b1_feefecto', 'b1_feproren'
        ],
        
        // otro
        swcolind: 'I',
        
        // para validar datos
        modelFields: [],
        modelValidators: []
    },
    
    
    // configuracion ext
    layout: 'default',
    
    scrollable: true,
    
    bodyPadding: '10px 0px 0px 10px',
    
    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            ui: 'header',
            items: [
                '->',
                {
                    iconCls: 'x-fa fa-eye',
                    itemId: 'botonMostrarOcultarTodo',
                    tooltip: 'Mostrar/ocultar',
                    handler: function (me) {
                        Ice.toggleOcultos(me.padre);
                    }
                }
            ]
        }, {
            xtype: 'toolbar',
            docked: 'bottom',
            ui: 'footer',
            items: [
                /*
                {
                    text: 'Limpiar',
                    iconCls: 'x-fa fa-refresh',
                    handler: 'onLimpiarClic'
                }, {
                    text: 'Cargar',
                    iconCls: 'x-fa fa-download',
                    handler: 'onCargarClic'
                },
                */
                {
                    text: 'Guardar',
                    iconCls: 'x-fa fa-save',
                    handler: 'onGuardarClic'
                }
            ]
        }
    ],

    
    // configuracion que usa datos de entrada
    initialize: function () {
        Ice.log('Ice.view.bloque.DatosGenerales.initialize [this, args]:', this, arguments);
        var me = this,
            paso = 'Construyendo bloque de datos generales';
        try {
            // generar componentes
            var comps = Ice.generaComponentes({
                pantalla: 'BLOQUE_DATOS_GENERALES',
                seccion: 'FORMULARIO',
                modulo: me.getModulo() || '',
                estatus: (me.getFlujo() && me.getFlujo().estatus) || '',
                cdramo: me.getCdramo() || '',
                cdtipsit: me.getCdtipsit() ||'',
                auxkey: me.getAuxkey() || '',
                
                items: true,
                fields: true,
                validators: true
            });
            
            if (Ext.manifest.toolkit !== 'classic') {
                for (var i = 0; i < comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items.length; i++) {
                    comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items[i].style = 'float: left; margin: 0px 10px 10px 0px;';
                    comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items[i].userCls = 'big-50 small-100';
                }
            }
            
            // agregar items, y agregar modelo para el modelValidation
            me.add(comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items);
            me.setModelFields(comps.BLOQUE_DATOS_GENERALES.FORMULARIO.fields);
            me.setModelValidators(comps.BLOQUE_DATOS_GENERALES.FORMULARIO.validators);
            
            
            var botonMostrarTodo = me.down('#botonMostrarOcultarTodo');
            if (botonMostrarTodo) {
                botonMostrarTodo.padre = me;
            }
            
            
            // construir componente
            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
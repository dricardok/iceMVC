/**
 * Created by jtezva on 5/22/2017.
 */
Ext.define('Ice.view.bloque.DatosGenerales', {
    extend: 'Ext.form.Panel',
    xtype: 'bloquedatosgenerales',
    
    controller: 'bloquedatosgenerales',
    //viewModel: 'bloquedatosgenerales',
    
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
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
    // para el responsive small-(%) big-(%)
    layout: 'responsivecolumn',
    
    //modelValidation: true,
    
    scrollable: true,
    
    bodyPadding: '0 0 0 80',
    defaults: {
        cls: 'big-50 small-100'
    },
    
    
    tbar: [
        '->',
        {
            iconCls: 'x-fa fa-eye',
            style: 'margin: 0 82px 0 0;',
            tooltip: 'Mostrar/ocultar',
            handler: function (me) {
                Ice.toggleOcultos(me.up('form'));
            }
        }
    ],
    
    buttons: [
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
            text: 'Guardar Datos Generales',
            iconCls: 'x-fa fa-save',
            handler: 'onGuardarClic'
        }
    ],
    
    // configuracion que usa datos de entrada
    initComponent: function () {
        Ice.log('Ice.view.bloque.DatosGenerales.initComponent [this, args]:', this, arguments);
        var me = this,
            paso = 'Construyendo bloque de datos generales';
        try {
            // generar componentes
            var comps = Ice.generaComponentes({
                pantalla: 'BLOQUE_DATOS_GENERALES',
                seccion: 'FORMULARIO',
                modulo: me.modulo || '',
                estatus: (me.flujo && me.flujo.estatus) || '',
                cdramo: me.cdramo || '',
                cdtipsit: me.cdtipsit ||'',
                auxkey: me.auxkey || '',
                
                items: true,
                fields: true,
                validators: true
            });
            
            
            // agregar binding a los componentes
            //for (var i = 0; i < comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items.length; i++) {
            //    var item = comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items[i];
            //    item.bind = '{datos.' + item.name + '}';
            //}
            //Ice.log('items con bind:', comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items);

            
            // creando modelo para validaciones
            //var modelName = Ext.id();
            //Ext.define(modelName, {
            //    extend: 'Ext.data.Model',
            //    fields: comps.BLOQUE_DATOS_GENERALES.FORMULARIO.fields,
            //    validators: comps.BLOQUE_DATOS_GENERALES.FORMULARIO.validators
            //});
            
            
            // agregar items, y agregar modelo para el modelValidation
            Ext.apply(me, {
                items: comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items,
                //modelo: modelName
                modelFields: comps.BLOQUE_DATOS_GENERALES.FORMULARIO.fields,
                modelValidators: comps.BLOQUE_DATOS_GENERALES.FORMULARIO.validators
            });
            
            
            // construir componente
            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
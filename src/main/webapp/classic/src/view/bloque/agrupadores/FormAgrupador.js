Ext.define('Ice.view.bloque.agrupadores.FormAgrupador', {
    extend: 'Ext.form.Panel',
    xtype: 'formagrupador',
    
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    
    controller: 'formagrupador',
    
    // configuracion ext
    
    title: 'Subagrupador',
    
    layout: 'responsivecolumn',
    bodyPadding: '20 0 0 80',
    defaults: {
        cls: 'big-50 small-100'
    },
    
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Agrupador',
            name: 'cdagrupa',
            reference: 'cdagrupa'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Agrupador'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Agrupador'
        }
    ],
    
    buttons: [
        {
            text: 'Guardar',
            iconCls: 'x-fa fa-save',
            handler: 'onGuardarClic'
        }, {
            text: 'Cancelar',
            iconCls: 'x-fa fa-remove',
            handler: 'onCancelarClic'
        }
    ],
    
    // configuracion no ext
    
    config: {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        cdagrupa: null,
        nmsuplem: null,
        status: null,
        nmsuplemEnd: null,
        
        modulo: null,
        flujo: null,
        auxkey: null
    },
    
    constructor: function (config) {
        Ice.log('formagrupador.constructor config:', config);
        var me = this,
            paso = 'Construyendo formulario de agrupador';
        try {
            config.cdunieco = 1;
            config.cdramo   = 501;
            config.estado   = 'W';
            config.nmpoliza = 17422;
            config.cdagrupa = 1.01;
            
            if (!config ||
                !config.cdunieco ||
                !config.cdramo ||
                !config.estado ||
                !config.nmpoliza ||
                !config.cdagrupa) {
                throw 'Faltan datos para construir formulario de agrupadores';
            }
            
            config.nmsuplem    = config.nmsuplem || 0;
            config.status      = config.status || 'V';
            config.nmsuplemEnd = config.nmsuplemEnd || 0;
            config.modulo      = config.modulo || 'COTIZACION';
            config.flujo       = config.flujo || {},
            config.auxkey      = config.auxkey || '';
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
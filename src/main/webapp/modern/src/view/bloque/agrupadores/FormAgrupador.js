Ext.define('Ice.view.bloque.agrupadores.FormAgrupador', {
    extend: 'Ext.form.Panel',
    xtype: 'formagrupador',
    
    requires: [
        'Ext.Toolbar'
    ],
    
    controller: 'formagrupador',
    
    // configuracion ext
    
    title: 'Subagrupador',
    layout: 'default',
    
    items: [
        {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [
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
        }, {
            xtype: 'textfield',
            label: 'Agrupador',
            name: 'cdagrupa',
            reference: 'cdagrupa',
            style: 'float: left; margin: 0px 20px 20px 0px;',
            userCls: 'big-50 small-100'
        }, {
            xtype: 'textfield',
            label: 'Agrupador',
            style: 'float: left; margin: 0px 20px 20px 0px;',
            userCls: 'big-50 small-100'
        }, {
            xtype: 'textfield',
            label: 'Agrupador',
            style: 'float: left; margin: 0px 20px 20px 0px;',
            userCls: 'big-50 small-100'
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
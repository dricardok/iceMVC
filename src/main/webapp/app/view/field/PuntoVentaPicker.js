Ext.define('Ice.view.field.PuntoVentaPicker', {
    extend: 'Ice.view.componente.ContainerIce',
    xtype: 'puntoventapicker',

    controller: 'puntoventapicker',

    // config ext
    platformConfig: {
        desktop: {
            modal: true,
            width: 800
        },
        '!desktop': {
            layout: 'fit'
        }
    },

    // config no ext
    config: {
        cdramo: null,
        cdtipsit: null,
        modulo: null,
        auxkey: null
    },

    constructor: function (config) {
        Ice.log('Ice.view.field.PuntoVentaPicker.constructor config:', config);
        var me = this,
            paso = 'Construyendo ventana de perfilamiento';
        try {
            if (!config) {
                throw 'No hay par\u00e1metros para construir ventana de perfilamiento';
            }
            if (!config.cdramo || !config.cdtipsit) {
                throw 'Falta ramo y tipo de situaci\u00f3n para ventana de perfilamiento';
            }

            config.modulo = config.modulo || 'COTIZACION';
            config.auxkey = config.auxkey || '';

            var camposPicker = [
                {
                    xtype: 'textfieldice',
                    label: config.label || 'Punto de venta',
                    labelAlign: config.labelAlign || 'top',
                    name: 'cdptovta',
                    reference: 'cdptovta',
                    readOnly: true
                },{
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    style:'margin-top: 29px !important;',
                    scope: me,
                    handler: function () {
                        this.getController().onBuscar();
                    }
                }
            ].concat(items || []);

            config.items = camposPicker;

        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
Ext.define('Ice.view.bloque.DatosIniciales', {
    extend: 'Ice.view.componente.PanelPaddingIce',
    xtype: 'datosiniciales',

    // config ext
    controller: 'datosiniciales',
    platformConfig: {
        '!desktop': {
            scrollable: true
        }
    },

    // config no ext
    config: {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,

        nmsuplem: null,
        status: null,

        modulo: null,
        cdtipsit: null,
        flujo: null,
        auxkey: null
    },

    // construccion
    constructor: function (config) {
        Ice.log('Ice.view.bloque.DatosIniciales.constructor config:', config);
        var me = this,
            paso = 'Construyendo bloque de datos iniciales';
        try {
            if (!config || !config.cdramo || !config.cdtipsit) {
                throw 'Faltan datos para construir bloque de datos iniciales';
            }

            config.estado = config.estado || 'W';
            config.nmsuplem = config.nmsuplem || 0;
            config.status = config.status || 'V';
            config.modulo = config.modulo || 'COTIZACION';
            config.flujo = config.flujo || {};
            config.auxkey = config.auxkey || '';

            config.items = [
                {
                    xtype: 'bloquedatosgenerales',
                    reference: 'formdatosgenerales',
                    
                    title: 'Datos de P\u00f3liza',
                    listeners: {
                        llaveGenerada: 'llaveGenerada'
                    }
                }, {
                    xtype: 'formauxiliar',
                    reference: 'formdatosauxiliares',

                    title: 'Datos Adicionales',

                    bloque: 'B1',
                    cdtipsit: '*'
                }
            ].concat(config.items || []);

            // datos comunes para los items
            for (var i = 0; i < config.items.length; i++) {
                config.items[i].cdunieco = config.cdunieco;
                config.items[i].cdramo   = config.cdramo;
                config.items[i].estado   = config.estado;
                config.items[i].nmpoliza = config.nmpoliza;

                config.items[i].nmsuplem = config.nmsuplem;
                config.items[i].status   = config.status;

                config.items[i].modulo   = config.modulo;
                config.items[i].cdtipsit = config.items[i].cdtipsit || config.cdtipsit;
                config.items[i].flujo    = config.flujo;
                config.items[i].auxkey   = config.auxkey;
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
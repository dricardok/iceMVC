Ext.define('Ice.view.cotizacion.VentanaPerfilamiento', {
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'ventanaperfilamiento',

    controller: 'ventanaperfilamiento',

    // config ext
    title: 'Selecci\u00f3n de perfil',
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
        Ice.log('Ice.view.cotizacion.VentanaPerfilamiento.constructor config:', config);
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

            var comps = Ice.generaComponentes({
				pantalla: 'VENTANA_PERFILAMIENTO',
				seccion: 'FORM',
				modulo: config.modulo,
				cdramo: config.cdramo,
				cdtipsit: config.cdtipsit,
				auxKey: config.auxkey,
                // items: true,
                fields: true,
                // validators: true
                columns: true
			});

            config.items = [{
                xtype: 'gridice',
                reference: 'grid',
                // items: comps.VENTANA_PERFILAMIENTO.FORM.items || [],
                // modelFields: comps.VENTANA_PERFILAMIENTO.FORM.fields || [],
                // modelValidators: comps.VENTANA_PERFILAMIENTO.FORM.validators || []
                columns: comps.VENTANA_PERFILAMIENTO.FORM.columns || [],
                store: {
                    autoLoad: true,
                    fields: comps.VENTANA_PERFILAMIENTO.FORM.fields || [],
                    proxy: {
                        type: 'ajax',
                        url: Ice.url.core.recuperacionSimple,
                        extraParams: {
                            'params.consulta': 'OBTENER_REGISTROS_PERFILAMIENTO',
                            'params.cdramo': config.cdramo
                        },
                        reader: {
                            type: 'json',
                            rootProperty: 'list'
                        }
                    },
                    listeners: {
                        load: function (store, records, success) {
                            if (success === true) {
                                if (records.length === 0) {
                                    Ext.defer(function () {
                                        me.cerrar();
                                        Ice.mensajeError('Usted no tiene perfil para cotizar este producto');
                                    }, 300);
                                } else if (records.length === 1) {
                                    Ext.defer(function () {
                                        me.getController().onItemclick(me, records[0]);
                                    }, 300)
                                }
                            }
                        }
                    }
                },
                listeners: {
                    itemclick: 'onItemclick'
                }
            }].concat(config.items || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
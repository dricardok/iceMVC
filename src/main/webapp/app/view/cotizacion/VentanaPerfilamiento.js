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
                items: true,
                fields: true,
                validators: true
			});

            config.items = [{
                xtype: 'formdoscolumnasice',
                reference: 'form',
                items: comps.VENTANA_PERFILAMIENTO.FORM.items || [],
                modelFields: comps.VENTANA_PERFILAMIENTO.FORM.fields || [],
                modelValidators: comps.VENTANA_PERFILAMIENTO.FORM.validators || []
            }].concat(config.items || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
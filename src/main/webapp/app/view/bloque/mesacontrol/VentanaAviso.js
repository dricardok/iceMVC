Ext.define('Ice.view.bloque.mesacontrol.VentanaAviso', {
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'ventanaaviso',
    
    title: 'Aviso',
    platformConfig: {
        desktop: {
            modal: true,
            width: 500,
            height: 250
        }
    },

    config: {
        flujo: null
    },

    constructor: function (config) {
        Ice.log('Ice.view.bloque.mesacontrol.VentanaAviso.constructor config:', config);
        var me = this,
            paso = 'Construyendo ventana de aviso';
        try {
            config.flujo = Ice.validarParamFlujo(config);
            Ice.validate(config.flujo.ntramite , 'Falta el tr\u00e1mite para la ventana de aviso',
                         config.flujo.aux      , 'Falta el auxiliar para la ventana de aviso');
            
            paso = 'Decodificando auxiliar de ventana de aviso';
            var json = Ext.JSON.decode(config.flujo.aux);

            Ice.validate(json.mensaje, 'Falta el mensaje en el auxiliar para la ventana de aviso')

            config.items = [
                {
                    xtype: 'container',
                    style: 'padding: 10px;',
                    html: json.mensaje
                }, {
                    xtype: 'botoneraflujo',
                    docked: 'bottom',
                    flujo: config.flujo,
                    botonCerrar: true
                }
            ];

            if (Ice.classic()) {
                config.items[0].height = 100;
            }

            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
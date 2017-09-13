Ext.define('Ice.view.bloque.mesacontrol.VentanaBotonesFlujo', {
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'ventanabotonesflujo',
    
    config: {
        padre: null,
        flujo: null
    },

    constructor: function (config) {
        Ice.log('Ice.view.bloque.mesacontrol.VentanaBotonesFlujo.constructor config:', config);
        var me = this,
            paso = 'Construyendo ventana de acciones';
        try {
            config.flujo = Ice.validarParamFlujo(config);
            if (!config.flujo.ntramite) {
                throw 'Falta el flujo para la ventana de acciones';
            }
            if (!config.padre) {
                throw 'Falta el padre para la ventana de acciones';
            }
            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    //@Override
    mostrar: function () {
        var me = this,
            paso = 'Construyendo bot\u00f3n de acciones';
        try {
            me.getPadre().add({
                xtype: 'button',
                text: '<span style="font-size: 0.5em; color:#FFF;">ACCIONES</span>',
                width: 65,
                height: 65,
                flujo: me.getFlujo(),
                iconAlign: 'top',
                cls:'color_mapsite',
                iconCls: 'x-fa fa-sitemap',
                style: 'position: absolute; left: 100%; margin-left: -105px; top: 100%; margin-top: -90px;' +
                    'border-radius:50%; background-color: #0033a0; color: #FFF!important; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);',
                handler: function (bot) {
                    var paso2 = 'Construyendo panel de acciones';
                    try {
                        var panel = Ext.create({
                            xtype: 'botoneraflujo',
                            flujo: bot.flujo,
                            botonCerrar: true,
                            botonCerrarHandler: function () {
                                Ice.pop();
                            }
                        });
                        Ice.push(panel);
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});
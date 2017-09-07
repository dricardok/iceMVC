Ext.define('Ice.view.bloque.mesacontrol.VentanaBotonesFlujo', {
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'ventanabotonesflujo',

    constructor: function (config) {
        Ice.log('Ice.view.bloque.mesacontrol.VentanaBotonesFlujo.constructor config', config);
        var me = this,
            paso = 'Construyendo ventana de acciones';
        try {
            config.flujo = Ice.validarParamFlujo(config);
            
            if (!config.flujo.ntramite) {
                throw 'No hay flujo para ventana de acciones';
            }

            config.items = [{
                xtype: 'botoneraflujo',
                flujo: config.flujo,
                padding: '0px'
            }];

            config.frame = false;
            config.header = false;
            config.border = false;
            config.draggable = false;
            config.closable = false;
            config.style = 'border: 0;';
            config.resizable = false;

            config.x = 250;
            config.y = -10;
            config.width = 600;
            config.height = 112;

            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
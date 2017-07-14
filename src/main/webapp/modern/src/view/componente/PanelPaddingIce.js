Ext.define('Ice.view.componente.PanelPaddingIce', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'panelpaddingice',
    
    // config ext
    bodyPadding: '20 0 0 20',

    constructor: function (config) {
        Ice.log('Ice.view.componente.PanelPaddingIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo panel';
        try {
            if ((config.items || []).length > 0) {
                Ice.agregarClases(config.items, 'shadow');
                Ice.agregarEstilo(config.items, 'margin: 0px 20px 20px 0px;');
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },

    add: function () {
        Ice.log('Ice.view.componente.PanelPaddingIce.add args', arguments);
        var me = this,
            paso = 'Agregando componentes al panel';
        try {
            if (arguments.length > 0) {
                Ice.agregarClases(arguments, 'shadow');
                Ice.agregarEstilo(arguments, 'margin: 0px 20px 20px 0px;');
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
Ext.define('Ice.view.componente.PanelIce', {
    extend: 'Ext.panel.Panel',
    xtype: 'panelice',
    
    // config ext
    layout: 'auto',
    referenceHolder: true, // para que se pueda hacer getReferences()

    constructor: function (config) {
        Ice.log('Ice.view.componente.PanelIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo panel';
        try {
            Ice.agregarClases(config, ['ice-container', 'ice-container-classic', 'ice-panel', 'ice-panel-classic']);
            
            if ((config.items || []).length > 0) {
                Ice.agregarClases(config.items, ['ice-panel-item', 'ice-panel-item-classic']);
            }

            Ice.convertirBotones(config.buttons);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },

    add: function () {
        Ice.log('Ice.view.componente.PanelIce.add args:', arguments);
        var me = this,
            paso = 'Agregando componentes al panel';
        try {
            if (arguments.length > 0) {
                Ice.agregarClases(arguments, ['ice-panel-item', 'ice-panel-item-classic']);
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
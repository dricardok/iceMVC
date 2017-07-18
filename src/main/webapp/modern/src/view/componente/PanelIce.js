Ext.define('Ice.view.componente.PanelIce', {
    extend: 'Ext.Panel',
    xtype: 'panelice',
    
    // config ext
    layout: 'vbox',
    referenceHolder: true, // para que se pueda hacer getReferences()

    // config no ext
    config: {
        buttons: []
    },

    constructor: function (config) {
        Ice.log('Ice.view.componente.PanelIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo panel';
        try {
            Ice.agregarClases(config, ['ice-container', 'ice-container-modern', 'ice-panel', 'ice-panel-modern']);
            
            if ((config.items || []).length > 0) {
                Ice.agregarClases(config.items, ['ice-panel-item', 'ice-panel-item-modern']);
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },

    initialize: function () {
        Ice.log('Ice.view.componente.PanelIce.initialize');
        var me = this,
            paso = 'Construyendo panel';
        try {
            me.callParent(arguments);

            // botones
            if ((me.getButtons() || []).length > 0) {
                me.add({
                    xtype: 'toolbar',
                    docked: 'bottom',
                    items: ['->'].concat(me.getButtons())
                });
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    add: function () {
        Ice.log('Ice.view.componente.PanelIce.add args:', arguments);
        var me = this,
            paso = 'Agregando componentes al panel';
        try {
            if (arguments.length > 0) {
                Ice.agregarClases(arguments, ['ice-panel-item', 'ice-panel-item-modern']);
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
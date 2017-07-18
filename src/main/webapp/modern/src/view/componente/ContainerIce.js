Ext.define('Ice.view.componente.ContainerIce', {
    extend: 'Ext.Container',
    xtype: 'containerice',

    requires: [
        'Ext.Toolbar'
    ],

    // config ext
    referenceHolder: true, // para que se pueda hacer getReferences()

    // config no ext
    config: {
        buttons: []
    },

    constructor: function (config) {
        Ice.log('Ice.view.componente.ContainerIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo contenedor';
        try {
            Ice.agregarClases(config, ['ice-container', 'ice-container-modern']);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },

    initialize: function () {
        Ice.log('Ice.view.componente.ContainerIce.initialize');
        var me = this,
            paso = 'Construyendo contenedor';
        try {
            me.callParent(arguments);

            // botones
            if ((me.getButtons() || []).length > 0) {
                me.add({
                    xtype: 'toolbar',
                    docked: 'bottom',
                    items: me.getButtons()
                });
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
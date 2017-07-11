Ext.define('Ice.view.componente.ContainerIce', {
    extend: 'Ext.Container',
    xtype: 'containerice',

    requires: [
        'Ext.Toolbar'
    ],

    constructor: function (config) {
        Ice.log('Ice.view.componente.ContainerIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo contenedor';
        try {
            if ((config.buttons || []).length > 0) {
                config.items = config.items || [];
                config.items.push({
                    xtype: 'toolbar',
                    docked: 'bottom',
                    items: config.buttons
                });
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
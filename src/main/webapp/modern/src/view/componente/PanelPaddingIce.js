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
            config.items = config.items || [];
            for (var i = 0; i < config.items.length; i++) {
                config.items[i].userCls = ['shadow'].concat(config.items[i].userCls || []);
                config.items[i].style = 'margin: 0px 20px 20px 0px; ' + (config.items[i].style || '');
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
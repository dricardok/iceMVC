Ext.define('Ice.view.componente.PanelIce', {
    extend: 'Ext.Panel',
    xtype: 'panelice',
    
    // config ext
    layout: 'vbox',
    userCls: ['ice-container', 'ice-container-modern', 'ice-panel', 'ice-panel-modern'],

    // config no ext
    config: {
        buttons: []
    },

    initialize: function () {
        Ice.log('Ice.view.componente.PanelIce.initialize');
        var me = this,
            paso = 'Construyendo panel';
        try {
            me.callParent(arguments);

            // userCls
            var items = me.getItems().items;
            for (var i = 0; i < items.length; i++) {
                var userCls = items[i].getUserCls();
                if (typeof userCls === 'string') {
                    userCls = [userCls];
                }
                userCls = (userCls || []).concat(['ice-panel-item', 'ice-panel-item-modern']);
                items[i].setUserCls(userCls);
            }

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
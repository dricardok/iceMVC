Ext.define('Ice.view.componente.TabPanelIce', {
    extend: 'Ext.tab.Panel',
    xtype: 'tabpanelice',

    requires: [
        'Ext.Toolbar'
    ],

    config: {
        buttons: []
    },

    initialize: function () {
        Ice.log('Ice.view.componente.TabPanelIce.initialize');
        var me = this,
            paso = 'Transformando eventos de panel tabulado';
        try {
            me.callParent(arguments);

            // convertir activeItemchange en tabchange
            me.on({
                activeItemchange: function (view, nuevo, anterior, opts) {
                    if (typeof anterior !== 'object') {
                        anterior = null;
                    }
                    me.fireEvent('tabchange', me, nuevo, anterior, opts);
                }
            });

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
    },

    // convertir setActiveItem en setActiveTab
    setActiveTab: function (item) {
        this.setActiveItem(item);
    }
});
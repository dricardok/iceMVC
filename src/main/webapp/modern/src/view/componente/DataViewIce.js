Ext.define('Ice.view.componente.DataViewIce', {
    extend: 'Ext.dataview.DataView',
    xtype: 'dataviewice',

    constructor: function (config) {
        Ice.log('Ice.view.componente.DataViewIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo dataview';
        try {
            if (config.tpl) {
                config.itemTpl = config.tpl;
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },

    initialize: function () {
        this.callParent();
        this.on({
            itemtap: function (view, index, target, record) {
                view.fireEvent('itemclick', view, record);
            }
        });
    }
});
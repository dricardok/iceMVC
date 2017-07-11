Ext.define('Ice.view.componente.FormDosColumnasIce', {
    extend: 'Ice.view.componente.FormIce',
    xtype: 'formdoscolumnasice',
	
    // config ext
    layout: 'default', // para usar responsivo
    bodyPadding: '20 0 0 20',

    constructor: function (config) {
        Ice.log('Ice.view.componente.FormDosColumnasIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo formulario';
        try {
            config.items = config.items || [];
            for (var i = 0; i < config.items.length; i++) {
                config.items[i].style = 'float: left; margin: 0px 20px 20px 0px; ' + (config.items[i].style || '');
                config.items[i].userCls = ['big-50', 'small-100', 'ice-form-item', 'ice-form-item-modern']
                    .concat(config.items[i].userCls || []);
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
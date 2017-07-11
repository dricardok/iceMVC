Ext.define('Ice.view.componente.GridIce', {
    extend: 'Ext.grid.Panel',
    xtype: 'gridice',
    
    constructor: function (config) {
		Ice.log('Ice.view.componente.GridIce.constructor config:', config);
    	var me = this,
		    paso = 'Construyendo grid';
		try {
			// se agregan los action columns al final
			config.columns = (config.columns || []).concat(config.actionColumns || []);

			// se suben los botones
			if ((config.buttons || []).length > 0) {
				config.tbar = ['->'].concat(config.tbar || []).concat(config.buttons);
			}
			config.buttons = null;
			delete config.buttons;
		} catch (e) {
			Ice.generaExcepcion(e,paso);
		}
		me.callParent(arguments);
    }
});
Ext.define('Ice.view.componente.FormIce', {
    extend: 'Ext.form.Panel',
    xtype: 'formice',
    constructor: function (config) {
        var me = this,
            paso = 'Construyendo formulario';
        try {
	    	config.items = config.items || [];
	    	config.buttons = config.buttons || [];
			if (config.buttons.length > 0) {
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
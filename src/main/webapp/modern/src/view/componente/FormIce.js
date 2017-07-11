Ext.define('Ice.view.componente.FormIce', {
    extend: 'Ext.form.Panel',
    xtype: 'formice', 
	
	// para la barra inferior de botones
	requires: [
        'Ext.Toolbar'
    ],
    
	// config ext
    scrollable: true,
	userCls: ['ice-form', 'ice-form-modern'],

	// config no ext
	config: {
        // para validar datos con un modelo
        modelFields: [],
        modelValidators: []
    },

    constructor: function (config) {
		Ice.log('Ice.view.componente.FormIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo formulario';
        try {
	    	config.items = config.items || [];

			config.items.push({
				xtype: 'toolbar',
				docked: 'top',
				items: [
					'->',
					{
						iconCls: 'x-fa fa-eye',
						itemId: 'botonMostrarOcultarTodo',
						tooltip: 'Mostrar/ocultar',
						padre: me,
						handler: function (me) {
							Ice.toggleOcultos(me.padre);
						}
					}
				].concat(config.tbar || [])
			});
			
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
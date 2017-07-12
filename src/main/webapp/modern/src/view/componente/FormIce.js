Ext.define('Ice.view.componente.FormIce', {
    extend: 'Ext.form.Panel',
    xtype: 'formice', 
	
	// para la barra inferior de botones
	requires: [
        'Ext.Toolbar'
    ],
    
	// config ext
	height: Ice.constantes.componente.form.altura.modern,
    scrollable: true,
	userCls: ['ice-container', 'ice-container-modern', 'ice-panel', 'ice-panel-modern', 'ice-form', 'ice-form-modern'],

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
            for (var i = 0; i < config.items.length; i++) {
                config.items[i].userCls = ['ice-form-item', 'ice-form-item-modern']
                    .concat(config.items[i].userCls || []);
            }
	    	config.items = [{
				xtype: 'toolbar',
				docked: 'top',
				items: [
					'->',
					{
						iconCls: 'x-fa fa-eye',
						itemId: 'botonMostrarOcultarTodo',
						tooltip: 'Mostrar/ocultar',
						padre: me,
						hidden:Ice.sesion.cdsisrol==Ice.constantes.roles.AGENTE,
						handler: function (me) {
							Ice.toggleOcultos(me.padre);
						}
					}
				].concat(config.tbar || [])
			}].concat(config.items);
			
			if ((config.buttons || []).length > 0) {
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
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
	referenceHolder: true, // para que se pueda hacer getReferences()

	// config no ext
	config: {
        // para validar datos con un modelo
        modelFields: [],
        modelValidators: [],
		buttons: []
    },

    constructor: function (config) {
		Ice.log('Ice.view.componente.FormIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo formulario';
        try {
			Ice.agregarClases(config, ['ice-container', 'ice-container-modern',
			    'ice-panel', 'ice-panel-modern', 'ice-form', 'ice-form-modern']);
			
			if ((config.items || []).length > 0) {
				Ice.agregarClases(config.items, ['ice-form-item', 'ice-form-item-modern']);
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
						hidden: Ice.sesion.cdsisrol == Ice.constantes.roles.AGENTE || config.sinToggle === true,
						handler: function (me) {
							Ice.toggleOcultos(me.padre);
						}
					}
				].concat(config.tbar || [])
			}].concat(config.items || []);

			// cuando solo tenemos las opciones tbar default y somos agente, mejor las quitamos
			if (config.items[0].items.length === 2 && (Ice.sesion.cdsisrol == Ice.constantes.roles.AGENTE
			    || config.sinToggle === true)) {
				config.items[0].hidden = true;
			}
    	} catch (e) {
    		Ice.generaExcepcion(e, paso);
    	}
    	me.callParent(arguments);
    },

	initialize: function () {
		Ice.log('Ice.view.componente.FormIce.initialize');
		var me = this,
		    paso = 'Construyendo formulario';
		try {
			me.callParent(arguments);

			// botones
            if ((me.getButtons() || []).length > 0) {
                me.add({
                    xtype: 'toolbar',
                    docked: 'bottom',
                    items: ['->'].concat(me.getButtons())
                });
            }
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	},

	add: function () {
		Ice.log('Ice.view.componente.FormIce.add args:', arguments);
		var me = this,
		    paso = 'Agregando componentes al formulario';
		try {
			if (arguments.length > 0) {
				Ice.agregarClases(arguments, ['ice-form-item', 'ice-form-item-modern']);
			}
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	}
});
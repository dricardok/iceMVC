Ext.define('Ice.view.componente.GridIce', {
    extend: 'Ext.grid.Grid',
    xtype: 'gridice',

	requires: [
		'Ext.Toolbar',
		'Ext.grid.cell.Widget'
	],

	// config ext
	height: Ice.constantes.componente.grid.altura.modern,
	scrollable: {
		x: true,
		y: true
	},

	// config no ext
	config: {
		buttons: []
	},
    
    constructor: function (config) {
		Ice.log('Ice.view.componente.GridIce.constructor config:', config);
    	var me = this,
    		paso = 'Construyendo grid';
    	try {
			Ice.agregarClases(config, ['ice-container', 'ice-container-modern',
			    'ice-panel', 'ice-panel-modern', 'ice-grid', 'ice-grid-modern']);

			// se dividen y agregan los actionColumns
			if ((config.actionColumns || []).length > 0) {
				var cols = [];
				for (var i = 0; i < config.actionColumns.length; i++) {
					var colItems = config.actionColumns[i];
					if (colItems.items && typeof colItems.items.length === 'number') {
						colItems = colItems.items;
					} else {
						colItems = [colItems];
					}
					for (var j = 0; j < colItems.length; j++) {
						var col = colItems[j];
						col.xtype = 'button';
						col.ui = 'action';
						col.width = null;
						delete col.width;

						var colHidden =  col.hidden === true ? true:false;
						col.hidden = false;
						delete col.hidden;
						
						cols.push({
							colType: col.colType || '',
							hidden: colHidden,
							width: 60,
							cell: {
								xtype: 'widgetcell',
								widget: col
							}
						});
					}
				}
				config.columns = (cols || []).concat(config.columns);
			}
    	} catch (e) {
    		Ice.generaExcepcion(e,paso);
    	}
    	me.callParent(arguments);
    },

	initialize: function () {
		Ice.log('Ice.view.componente.GridIce.initialize');
		var me = this,
		    paso = 'Transformando comportamiento de grid';
		try {
			////// antes de callParent //////


			////// antes de callParent //////
			me.callParent(arguments);
			////// despues de callParent //////

			// botones
			Ice.convertirBotones(me.getButtons());
            if ((me.getButtons() || []).length > 0) {
                me.add({
                    xtype: 'toolbar',
                    docked: 'bottom',
                    padding: 0,
                    items: ['->'].concat(me.getButtons())
                });
				me.setHeight(Ice.constantes.componente.grid.altura.modern + 65); // se aumenta por la barra
            }

			// el evento itemtap dispara itemclick para normalizarlo con classic
			me.on({
				itemtap: function (me, index, target, record) {
					me.fireEvent('itemclick', me, record);
				}
			});

			////// despues de callParent //////
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	}
});
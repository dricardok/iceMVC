Ext.define('Ice.view.componente.GridIce', {
    extend: 'Ext.grid.Grid',
    xtype: 'gridice',

	requires: [
		'Ext.Toolbar',
		'Ext.grid.cell.Widget'
	],

	// config ice
	height: Ice.constantes.componente.grid.altura.modern,
	scrollable: {
		x: true,
		y: true
	},
	userCls: ['ice-container', 'ice-container-modern', 'ice-panel', 'ice-panel-modern', 'ice-grid', 'ice-grid-modern'],
    
    constructor: function (config) {
		Ice.log('Ice.view.componente.GridIce.constructor config:', config);
    	var me = this,
    		paso = 'Construyendo grid';
    	try {
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
						cols.push({
							width: 60,
							cell: {
								xtype: 'widgetcell',
								widget: col
							}
						});
					}
				}
				config.columns = (config.columns || []).concat(cols);
			}

			// botones
			if ((config.buttons || []).length > 0) {
				config.items = config.items || [];
				config.items.push({
					xtype: 'toolbar',
					docked: 'top',
					items: ['->'].concat(config.buttons)
				});
			}
    	} catch (e) {
    		Ice.generaExcepcion(e,paso);
    	}
    	me.callParent(arguments);
    }
});
Ext.define('Ice.view.componente.GridIce', {
    extend: 'Ext.grid.Panel',
    xtype: 'gridice',

	// config ext
	maxHeight: Ice.constantes.componente.grid.altura.classic,
	scrollable: true,
	cls: ['ice-container', 'ice-container-classic', 'ice-panel', 'ice-panel-classic', 'ice-grid', 'ice-grid-classic'],
    
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
						col.xtype = 'actioncolumn';
						col.width = 30;
						cols.push(col);
					}
				}
				config.columns = (config.columns || []).concat(cols);
			}

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
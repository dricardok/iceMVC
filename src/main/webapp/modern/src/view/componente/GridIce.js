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
			// se agregan los action column
			if ((config.actionColumns || []).length > 0) {
				var widgetColumns = [];
				config.actionColumns.forEach(function (actionColumn) {
					widgetColumns.push({
			            width: '60',
			            ignoreExport: true,
			            cell: {
			                xtype: 'widgetcell',
			                widget: actionColumn
			            }
			        });
				});
				config.columns = (config.columns || []).concat(widgetColumns);
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
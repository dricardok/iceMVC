Ext.define('Ice.view.bloque.mesacontrol.GridMesaControl', {
	extend: 'Ice.view.componente.GridIce',
	xtype: 'gridmesacontrol',
	
	controller: 'gridmesacontrol',
	
	title: 'Tramites',
	height: 300,
	
	config: {
		cdunieco: null,
		cdramo: null,
		cdsubram: null,
		estado: null,
		nmpoliza: null,
		cdagente: null,
		ntramite: null,
		
		itemsPerPage: null,
		actionColumns: []
	},
	
	constructor: function (config) {
		Ice.log('Ice.view.bloque.mesacontrol.GridMesaControl.constructor config:', config);
		
		var me= this,
			paso = 'Construyendo grid mesa control';
		try {
			var comps = Ice.generaComponentes({
				pantalla: 'MESA_CONTROL',
				seccion: 'GRID',
				fields: true,
				columns: true
			});
			
			var store = Ext.create('Ext.data.Store', {
				id: 'mesacontrolstore',
				autoLoad: false,
                fields: comps.MESA_CONTROL.GRID.fields || [],
                pageSize: config.itemsPerPage,
                proxy: {
                	type: 'ajax',
                	url: Ice.url.bloque.mesacontrol.obtenerTramites,
                	reader: {
                		type: 'json',
                		rootProperty: 'list',
                		totalProperty: 'totalCount'
                	}
                }
			});
			
			
			store.load({
                params: {
                    'params.ntramite': config.ntramite,
                    start: 0,
                    limit: config.itemsPerPage
                }
            });
			
			
			config.columns = (comps.MESA_CONTROL.GRID.columns || []).concat(config.columns || []);
			config.store = store;
			config.bbar = {
                    xtype: 'pagingtoolbar',
                    displayInfo: true
            };
			config.rowNumbers = {
                    text: 'Index'
            };
			
		} catch(e) {
			Ice.generaExcepcion(e, paso);
		}
		
		me.callParent(arguments); 
	},
	
	
	listeners: {
		itemClick: 'onItemClic'
	},
});
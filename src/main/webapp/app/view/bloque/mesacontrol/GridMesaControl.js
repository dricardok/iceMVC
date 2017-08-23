Ext.define('Ice.view.bloque.mesacontrol.GridMesaControl', {
	extend: 'Ice.view.componente.GridIce',
	xtype: 'gridmesacontrol',
	
	controller: 'gridmesacontrol',
	
	title: 'Tramites',
	height: 500,
	
	config: {
		cdunieco : null,
		cdramo: null,
		estado: null,
		nmpoliza: null,
		cdagente: null,
		ntramite: null,
		estatus: null,
		fstatusi: null,
		fstatusf: null,
		nombre: null,
		nmsolici: null,
		
		itemsPerPage: null
	},
	
	constructor: function (config) {
		Ice.log('Ice.view.bloque.mesacontrol.GridMesaControl.constructor config:', config);
		
		var me= this,
			view = me.up(),
			paso = 'Construyendo grid mesa control';
		
			Ice.log('Formulario de mesa de control', view);
		
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
                	},
                	extraParams: {
                    	'params.cdunieco':config.cdunieco,
    					'params.cdramo':config.ramo,
    					'params.estado':config.estado,
    					'params.nmpoliza':config.nmpoliza,
    					'params.cdagente':config.cdagente,
    					'params.ntramite':config.ntramite,
    					'params.estatus':config.estatus,
    					'params.fstatusi':config.fstatusi,
    					'params.fstatusf':config.fstatusf,
    					'params.nombre':config.nombre,
    					'params.nmsolici':config.nmsolici
                    }
                }
			});
			
			
			store.load({
                params: {
                	'params.cdunieco':config.cdunieco,
					'params.cdramo':config.ramo,
					'params.estado':config.estado,
					'params.nmpoliza':config.nmpoliza,
					'params.cdagente':config.cdagente,
					'params.ntramite':config.ntramite,
					'params.estatus':config.estatus,
					'params.fstatusi':config.fstatusi,
					'params.fstatusf':config.fstatusf,
					'params.nombre':config.nombre,
					'params.nmsolici':config.nmsolici,
					start: 0,
                    limit: config.itemsPerPage
                }
            });
			
			
			config.columns = (comps.MESA_CONTROL.GRID.columns || []).concat(config.columns || []);
			config.store = store;
			config.bbar = {
                    xtype: 'pagingtoolbar',
                    store: store,
                    displayInfo: true
            };
			
			
			config.rowNumbers = {
                    text: 'Index'
            };
			
			config.buttons = [
				{
					text: 'Nuevo tramite',
					iconCls: 'x-fa fa-plus',
					handler: 'onNuevoTramiteClic'
				}
			].concat(config.buttons || []);
			
		} catch(e) {
			Ice.generaExcepcion(e, paso);
		}
		
		me.callParent(arguments); 
	},
	
	
	listeners: {
		itemClick: 'onItemClic'
	},
});
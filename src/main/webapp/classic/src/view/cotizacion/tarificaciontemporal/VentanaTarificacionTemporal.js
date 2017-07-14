Ext.define('Ice.view.cotizacion.tarificaciontemporal.VentanaTarificacionTemporal', {
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'ventanatarifastemporales',
    
    requires: [
    	'Ext.toolbar.Toolbar'
    ],
    
    modal: true,
    title: 'Tarifa',
    closeAction: 'destroy',
    layout: 'fit',
    
    config: {
    	cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null,
		nmsuplem: null,
		cdtipsit: null,
		nmsituac: null,
    	cdperpag: null
    },
    
    constructor: function (config) {
    	Ice.log('Ext.view.cotizacion.tarficaciontemporal.VentanaTarificacionTemporal config:', config);
    	var me = this,
    		paso = 'Construyendo ventana de tarifa temporal';
    	try {
    		if(!config || !config.cdunieco || !config.cdramo || !config.estado || !config.nmpoliza || !config.cdperpag ) {
    			throw 'Faltan par\u00e1metros para construir ventana de tarifa';
    		}
    		
    		// dimensiones
            config.height = config.height || Ext.getBody().getHeight() - 100;
            config.width = config.width || Ext.getBody().getWidth() - 100;
            
            // bbar
            config.botones = config.botones || [];
            if (config.botones.length > 0) {
            	config.bbar = config.botones;
            }
            
            // grid
            config.items = config.items || [];
            config.items.push({
            	xtype: 'grid',
            	columns: [
            		{
            			text: 'Cobertura',
            			dataIndex: 'dsgarant',
            			minWidth: 300,
                        flex: 2
            		}, {
            			text: 'Concepto',
            			dataIndex: 'dscontar',
            			minWidth: 300,
                        flex: 2
            		}, {
            			text: 'Prima',
            			dataIndex: 'total',
            			minWidth: 150,
            			renderer: Ext.util.Format.usMoney,
            			summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            return Ext.String.format('Total: {0}', Ext.util.Format.usMoney(value));
                        }
            		}
            	],
            	features: [{
                    ftype: 'summary'
                }],
                store: {
                    autoLoad: true,
                    fields: [
                        'estado', 
                        { name: 'subsecuentes', type: 'float' },
                        { name: 'total', type: 'float' },
                        'cdramo',
                        'nmpoliza',
                        'cdtipcon',
                        'cdunieco',
                        'cdperpag',
                        { name: 'primer_recibo', type: 'float' },
                        'dsgarant',
                        'dscontar'
                    ],
                    proxy: {
                        type: 'ajax',
                        url: Ice.url.emision.obtenerTarifaPlan,
                        extraParams: {
                            'params.cdunieco': config.cdunieco,
                            'params.cdramo': config.cdramo,
                            'params.estado': config.estado,
                            'params.nmpoliza': config.nmpoliza,
                            'params.cdperpag': config.cdperpag
                        },
                        reader: {
                            type: 'json',
                            rootProperty: 'list'
                        }
                    }
                }
            });
    		
    	} catch (e) {
    		Ice.generaExcepcion(e, paso);
    	}
    	
    	me.callParent(arguments);
    },
    
    
    mostrar: function () {
        this.show();
    },
    
    cerrar: function () {
        this.destroy();
    }
    
});
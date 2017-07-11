Ext.define('Ice.view.cotizacion.tarificaciontemporal.VentanaTarificacionTemporal', {
	extend: 'Ice.view.componente.Ventana',
	xtype: 'ventanatarifastemporales',
	
	requires: [
		'Ext.Toolbar'
	],
	
	title: 'Tarifa',
    layout: 'fit',
    
    config: {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        cdperpag: null
    },
    
    constructor: function(config) {
    	Ice.log('Ext.view.cotizacion.tarficaciontemporal.VentanaTarificacionTemporal config:', config);
    
    	var me = this,
    		paso = 'Construyendo ventana de tarifa temporal';    	
    	try {
    		if(!config || !config.cdunieco || !config.cdramo || !config.estado || !config.nmpoliza || !config.cdperpag ) {
    			throw 'Faltan par\u00e1metros para construir ventana de tarifa';
    		}
    		
    		// bbar
            config.botones = config.botones || [];
            if (config.botones.length > 0) {
                config.items = config.items || [];
                config.items.push({
                    xtype: 'toolbar',
                    docked: 'bottom',
                    items: config.botones
                });
            }
    		
          //grid
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
                        flex: 1,
                        renderer: Ext.util.Format.usMoney,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            return Ext.String.format('Total: {0}', Ext.util.Format.usMoney(value));
                        }
                    }
                ],
                plugins: [{
                    type: 'summaryrow'
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
                        { name: 'primer_recibo', type: 'float' }
                    ],
                    proxy: {
                        type: 'ajax',
                        url: Ice.url.emision.obtenerPlanDetalle,
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
    		
    	}catch(e){
    		Ice.generaExcepcion(e, paso);
    	}
    	me.callParent(arguments);
    },
    
    mostrar: function () {
        Ice.query('#mainView').getReferences().mainCard.push(this);
    },
    
    
    cerrar: function () {
        Ice.query('#mainView').getReferences().mainCard.pop();
    }    
});
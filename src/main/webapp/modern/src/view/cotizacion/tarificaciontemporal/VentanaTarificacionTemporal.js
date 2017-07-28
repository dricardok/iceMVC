Ext.define('Ice.view.cotizacion.tarificaciontemporal.VentanaTarificacionTemporal', {
	extend: 'Ice.view.componente.VentanaIce',
	xtype: 'ventanatarifastemporales',

    // config ext
	title: 'Tarifa',
    layout: 'fit',
    
    // config no ext
    config: {
    	cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null,
		nmsuplem: null,
		cdtipsit: null,
		nmsituac: null,
    	cdperpag: null,

        // perfilamiento
        cdptovta: null,
        cdgrupo: null,
        cdsubgpo: null,
        cdperfil: null
    },
    
    constructor: function (config) {
    	Ice.log('Ext.view.cotizacion.tarficaciontemporal.VentanaTarificacionTemporal config:', config);
    	var me = this,
    		paso = 'Construyendo ventana de tarifa temporal';    	
    	try {
    		if (!config || !config.cdunieco || !config.cdramo || !config.estado || !config.nmpoliza || !config.cdperpag ) {
    			throw 'Faltan par\u00e1metros para construir ventana de tarifa';
    		}

            config.items = [{
                xtype: 'gridice',
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
                        { name: 'primer_recibo', type: 'float' },
                        'dsgarant',
                        'dscontar'
                    ],
                    proxy: {
                        type: 'ajax',
                        timeout: 1000*60*5,
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
            }].concat(config.items || []);
    	} catch (e) {
    		Ice.generaExcepcion(e, paso);
    	}
    	me.callParent(arguments);
    }
});
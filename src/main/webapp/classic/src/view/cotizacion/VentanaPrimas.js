Ext.define('Ice.view.cotizacion.VentanaPrimas', {
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'ventanaprimas',
    
    // config ext
    modal: true,
    title: 'Tarifa',
    layout: 'fit',
    
    // config no ext
    config: {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null
    },
    
    constructor: function (config) {
        Ice.log('Ext.view.cotizacion.VentanaPrimas.constructor config:', config);
        var me = this,
            paso = 'Construyendo ventana de tarifa';
        try {
            if (!config || !config.cdunieco || !config.cdramo || !config.estado || !config.nmpoliza) {
                throw 'Faltan par\u00e1metros para construir ventana de tarifa';
            }
            
            // dimensiones
            config.height = config.height || Ext.getBody().getHeight() - 100;
            config.width = config.width || Ext.getBody().getWidth() - 100;
            
            //grid
            config.items = config.items || [];
            config.items.push({
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
                        'dsgarant', 'dscontar'
                    ],
                    proxy: {
                        type: 'ajax',
                        timeout: 1000*60*5,
                        url: Ice.url.emision.obtenerTarifa,
                        extraParams: {
                            'params.cdunieco': config.cdunieco,
                            'params.cdramo': config.cdramo,
                            'params.estado': config.estado,
                            'params.nmpoliza': config.nmpoliza
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
    }
});
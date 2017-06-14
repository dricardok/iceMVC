Ext.define('Ice.view.cotizacion.VentanaPrimas', {
    extend: 'Ice.view.componente.Ventana',
    xtype: 'ventanaprimas',
    
    requires: [
        'Ext.Toolbar'
    ],
    
    // controller: '',
    // viewModel: '',
    
    
    title: 'Tarifa',
    layout: 'fit',
    
    
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
                        dataIndex: 'nmimport',
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
                        'cdgarant', 'nmsituac', 'dscontar', 
                        { name: 'nmimport', type: 'float'},
                        'dsgarant', 'cdcontar'
                    ],
                    proxy: {
                        type: 'ajax',
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
    },
    
    
    mostrar: function () {
        Ice.query('#mainView').getReferences().mainCard.push(this);
    },
    
    
    cerrar: function () {
        Ice.query('#mainView').getReferences().mainCard.pop();
    }
});
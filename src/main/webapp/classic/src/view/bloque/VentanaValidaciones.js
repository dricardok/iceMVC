/**
 * Created by jtezva on 5/31/2017.
 */
Ext.define('Ice.view.bloque.VentanaValidaciones', {
    extend: 'Ice.view.componente.Ventana',
    xtype: 'ventanavalidaciones',
    
    constructor: function (config) {
        if (!config || !config.lista) {
            throw 'Falta lista de validaciones';
        }
        this.callParent(arguments);
    },
    
    title: 'Validaciones',
    layout: 'fit',
    
    config: {
        lista: []
    },
    
    initComponent: function () {
        var me = this,
            paso = 'Construyendo ventana de validaciones';
        try {
            Ext.apply(me, {
                items: [{
                    xtype: 'grid',
                    columns: [
                        {
                            text: 'Tipo',
                            width: 70,
                            dataIndex: 'tipo'
                        }, {
                            text: 'Mensaje',
                            flex: 1,
                            dataIndex: 'otvalor'
                        }
                    ],
                    store: {
                        fields: [ 'tipo', 'otvalor' ],
                        data: me.lista
                    },
                    width: 500,
                    height: 200,
                    scrollable: true
                }]
            });
            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    
    mostrar: function() {
        this.show();
    }
});
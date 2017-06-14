Ext.define('Ice.view.bloque.VentanaValidaciones', {
    extend: 'Ice.view.componente.Ventana',
    xtype: 'ventanavalidaciones',
    
    requires: [
        'Ext.Toolbar'
    ],
    
    constructor: function (config) {
        Ice.log('Ice.view.bloque.VentanaValidaciones.constructor config:', config);
        var me = this,
            paso = 'Construyendo validaciones';
        try {
            config.items = [
                {
                    xtype: 'grid',
                    title: 'Validaciones',
                    
                    
                    userCls: 'big-100 small-100',
                    
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
                        data: config.lista
                    },
                    scrollable: true,
                    
                    items: [{
                        xtype: 'toolbar',
                        docked: 'bottom',
                        items: [{
                            text: 'Aceptar',
                            iconCls: 'x-fa fa-check',
                            handler: function () {
                                Ice.query('#mainView').getReferences().mainCard.pop();
                            }
                        }]
                    }]
                }
            ];
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },
    
    layout: 'fit'
});
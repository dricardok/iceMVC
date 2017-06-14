Ext.define('Ice.view.mesacontrol.MesaControl', {
    extend: 'Ext.container.Container',
    xtype: 'mesacontrol',
    
    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'Ext.form.Panel',
        'Ext.form.field.*',
        'Ext.grid.Panel'
    ],
    
    
    // validacion y modificacion de parametros (config)
    constructor: function (config) {
        Ice.log('Ice.view.mesacontrol.MesaControl.constructor config:', config);
        this.callParent(arguments);
    },
    
    
    // configuracion que no usa parametros
    layout: 'responsivecolumn',
    
    defaultFocus: 'form',
    
    items: [
        {
            xtype: 'form',
            title: 'Filtro',
            userCls: 'big-100 shadow',
            
            collapsible: true,
            titleCollapse: true,
            
            defaultFocus: 'numberfield:not([value]):focusable:not([disabled])',
            
            layout: 'responsivecolumn',
            defaults: {
                labelWidth: 90,
                labelAlign: 'top',
                labelSeparator: '',
                submitEmptyText: false,
                anchor: '100%',
                userCls: 'big-50 small-100'
            },
            items: [
                {
                    xtype: 'numberfield',
                    //emptyText: 'Oficina'
                    fieldLabel: 'Oficina'
                }, {
                    xtype: 'numberfield',
                    //emptyText: 'Ramo'
                    fieldLabel: 'Ramo'
                }, {
                    xtype: 'numberfield',
                    //emptyText: 'Cotizaci\u00f3n'
                    fieldLabel: 'Cotizaci\u00f3n'
                }, {
                    xtype: 'numberfield',
                    //emptyText: 'P\u00f3liza'
                    fieldLabel: 'P\u00f3liza'
                }, {
                    xtype: 'numberfield',
                    //emptyText: 'Tr\u00e1mite'
                    fieldLabel: 'P\u00f3liza'
                }, {
                    xtype: 'textfield',
                    //emptyText: 'Estatus'
                    fieldLabel: 'P\u00f3liza'
                }
            ],
            buttons: [
                {
                    text: 'Buscar',
                    iconCls: 'x-fa fa-search',
                    cls:'btn_clr_sm'
                }
            ]
        }, {
            xtype: 'grid',
            title: 'Tr\u00e1mites',
            userCls: 'big-100 shadow',
            
            minHeight: 200,
            
            columns: [
                {
                    text: 'Tr\u00e1mite',
                    flex: 1,
                    dataIndex: 'ntramite'
                }, {
                    text: 'Oficina',
                    flex: 1,
                    dataIndex: 'cdunieco'
                }, {
                    text: 'Ramo',
                    flex: 1,
                    dataIndex: 'cdramo'
                }, {
                    text: 'Cotizaci\u00f3n',
                    flex: 1,
                    dataIndex: 'nmsolici'
                }, {
                    text: 'P\u00f3liza',
                    flex: 1,
                    dataIndex: 'nmpoliza'
                }, {
                    text: 'Estatus',
                    flex: 1,
                    dataIndex: 'estatus'
                }
            ],
            
            store: {
                fields: [
                    {
                        type: 'int',
                        name: 'ntramite'
                    }, {
                        type: 'int',
                        name: 'cdunieco'
                    }, {
                        type: 'int',
                        name: 'cdramo'
                    }, {
                        type: 'int',
                        name: 'nmsolici'
                    }, {
                        type: 'int',
                        name: 'nmpoliza'
                    }, 'estatus'
                ],
                data: [
                    {
                        ntramite: 30045,
                        cdunieco: 1,
                        cdramo: 430,
                        nmsolici: 3834,
                        nmpoliza: 0,
                        estatus: 'Nuevo'
                    }, {
                        ntramite: 30046,
                        cdunieco: 1,
                        cdramo: 430,
                        nmsolici: 3835,
                        nmpoliza: 0,
                        estatus: 'Nuevo'
                    }, {
                        ntramite: 30067,
                        cdunieco: 1,
                        cdramo: 420,
                        nmsolici: 3834,
                        nmpoliza: 0,
                        estatus: 'Pendiente'
                    }
                ]
            }
        }
    ],
    
    
    // propiedades no ext (se generan getters y setters)
    config: {},
    
    
    // configuracion que usa parametros (config ya se encuentra copiada en this)
    initComponent: function () {
        Ice.log('Ice.view.mesacontrol.MesaControl.initComponent');
        var me = this,
            paso = 'Construyendo componente de mesa de control';
        try {
            var secciones = Ice.generaComponentes();
        } catch(e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});

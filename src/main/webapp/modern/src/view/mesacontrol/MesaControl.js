Ext.define('Ice.view.mesacontrol.MesaControl', {
    extend: 'Ext.Container',
    xtype: 'mesacontrol',
    
    requires: [
        'Ext.form.Panel',
        'Ext.field.*'
    ],
    
    
    // validacion y modificacion de parametros (config)
    constructor: function (config) {
        Ice.log('Ice.view.mesacontrol.MesaControl.constructor config:', config);
        this.callParent(arguments);
    },
    
    
    // configuracion que no usa parametros
    cls: 'dashboard',
    
    scrollable: true,
    
    items: [
        {
            xtype: 'formpanel',
            title: 'Sin responsive',
            
            userCls: 'big-100 small-100 dashboard-item shadow',
            
            items: [
                {
                    xtype: 'textfield',
                    label: 'campo 1'
                }, {
                    xtype: 'textfield',
                    label: 'campo 2'
                }, {
                    xtype: 'textfield',
                    label: 'campo 3'
                }
            ]
        }, {
            xtype: 'formpanel',
            title: 'Responsive ext',
            
            userCls: 'big-100 small-100 dashboard-item shadow',
            
            layout: 'default',
            
            items: [
                {
                    xtype: 'textfield',
                    label: 'campo 1',
                    userCls: 'big-50 small-100 dashboard-item'
                }, {
                    xtype: 'textfield',
                    label: 'campo 2',
                    userCls: 'big-50 small-100 dashboard-item'
                }, {
                    xtype: 'textfield',
                    label: 'campo 3',
                    userCls: 'big-50 small-100 dashboard-item'
                }
            ]
        }, {
            xtype: 'formpanel',
            title: 'Responsive custom',
            
            userCls: 'big-100 small-100 dashboard-item shadow',
            
            layout: 'default',
            
            items: [
                {
                    xtype: 'textfield',
                    label: 'campo 1',
                    style: 'float: left; margin: 0px 10px 10px 0px;',
                    userCls: 'big-50 small-100'
                }, {
                    xtype: 'textfield',
                    label: 'campo 2',
                    style: 'float: left; margin: 0px 10px 10px 0px;',
                    userCls: 'big-50 small-100'
                }, {
                    xtype: 'textfield',
                    label: 'campo 3',
                    style: 'float: left; margin: 0px 10px 10px 0px;',
                    userCls: 'big-50 small-100'
                }
            ]
        }
    ],
    
    
    // propiedades no ext (se generan getters y setters)
    config: {
        cdramo: null,
        cdtipsit: null
    },
    
    
    // configuracion que usa parametros (config ya se encuentra copiada en this)
    initialize: function () {
        Ice.log('Ice.view.mesacontrol.MesaControl.initialize');
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

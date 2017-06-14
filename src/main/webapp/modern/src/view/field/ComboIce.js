/**
 * Created by jtezva on 5/10/2017.
 */
Ext.define('Ice.view.field.ComboIce', {
    extend: 'Ext.field.Select',
    xtype: 'comboice',
    
    valueField: 'key',
    displayField: 'value',
    
    autoSelect: false,
    
    
    config: {
        padres: []
    },
    
    
    initialize: function () {
        var me = this,
            configIce = me.config, // config recibia de TCONFSCR
            paso = 'Instanciando select modern';
            
        try {
            var store = {
                autoLoad: true,
                fields: ['key', 'value', 'aux', 'aux2', 'aux3', 'aux4', 'aux5'],
                proxy: {
                    type: 'ajax',
                    url: Ice.url.core.obtenerCatalogo,
                    reader: {
                        type: 'json',
                        rootProperty: 'list'
                    },
                    extraParams: {
                        catalogo: configIce.catalogo || ''
                    }
                }
            };
            
            
            // extraParams
            if (configIce.param1) {
                store.proxy.extraParams[configIce.param1] = configIce.value1 || '';
            }
            if (configIce.param2) {
                store.proxy.extraParams[configIce.param2] = configIce.value2 || '';
            }
            if (configIce.param3) {
                store.proxy.extraParams[configIce.param3] = configIce.value3 || '';
            }
            if (configIce.param4) {
                store.proxy.extraParams[configIce.param4] = configIce.value4 || '';
            }
            if (configIce.param5) {
                store.proxy.extraParams[configIce.param5] = configIce.value5 || '';
            }
            
            
            me.setStore(store);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        
        
        me.callParent(arguments);
        
        
        if (me.getPadres().length > 0) {
            me.heredar = function () {
                var padresValues = {
                    idPadre: null,
                    idPadre2: null,
                    idPadre3: null,
                    idPadre4: null,
                    idPadre5: null
                };
                for (var i = 0; i < me.getPadres().length; i++) {
                    var padreName = me.getPadres()[i],
                        padreComp = me.getParent().down('[name=' + padreName +']');
                    if (padreComp) {
                        padresValues['idPadre' + (i === 0
                            ? ''
                            : (i + 1)
                            )] = padreComp.getValue();
                    }
                }
                Ice.log('padresValues:', padresValues);
                me.getStore().reload({
                    params: Ice.convertirAParams(padresValues)
                });
            };
            
            for (var i = 0; i < me.getPadres().length; i++) {
                var padreName = me.getPadres()[i];
                var padreComp = me.getParent().down('[name=' + padreName +']');
                if (padreComp) {
                    if (padreComp.xtype === 'comboice') {
                        padreComp.on({
                            change: function () {
                                me.heredar();
                            }
                        });
                    } else {
                        padreComp.on({
                            blur: function () {
                                me.heredar();
                            }
                        });
                    }
                }
            }
        }
    }
});
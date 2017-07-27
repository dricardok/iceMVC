/**
 * Created by jtezva on 5/10/2017.
 */
Ext.define('Ice.view.field.ComboIce', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'comboice',
    
    labelAlign: 'top',
    msgTarget: 'under',
    
    valueField: 'key',
    displayField: 'value',
    
    typeAhead: true,
    anyMatch: true,
    matchFieldWidth: false,
    listConfig: {
        maxHeight: 150,
        minWidth: 120
    },
    
    
    config: {
        padres: []
    },
    
    
    initComponent: function () {
        var me = this,
            configIce = me.config, // la configuracion recibida de TCONFSCR
            configTra = {};        // la transformacion en atributos ext (ejemplo: label se pasa a fieldLabel en toolkit classic)
        
        
        // label -> fieldLabel
        if (configIce.label) {
            configTra.fieldLabel = configIce.label;
        }
        
        
        // queryMode
        if (configIce.queryParam) {
            configTra.queryMode = 'remote';
        } else {
            configTra.queryMode = 'local';
        }
        
        
        // store
        configTra.store = configIce.store || {
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
            configTra.store.proxy.extraParams[configIce.param1] = configIce.value1 || '';
        }
        if (configIce.param2) {
            configTra.store.proxy.extraParams[configIce.param2] = configIce.value2 || '';
        }
        if (configIce.param3) {
            configTra.store.proxy.extraParams[configIce.param3] = configIce.value3 || '';
        }
        if (configIce.param4) {
            configTra.store.proxy.extraParams[configIce.param4] = configIce.value4 || '';
        }
        if (configIce.param5) {
            configTra.store.proxy.extraParams[configIce.param5] = configIce.value5 || '';
        }
        
        
        Ext.apply(me, configTra);
        this.callParent(arguments);
        
        me.on({
            blur: function (me) {
                Ice.eventManager.change(me, me.getValue());
            }
        });
        
        if (me.getPadres().length > 0 && me.up('form')) {
            
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
                        padreComp = me.up('form').down('[reference=' + padreName + ']');
                    if (padreComp) {
                        padresValues['idPadre' + (i === 0
                            ? ''
                            : (i + 1)
                            )] = padreComp.getSubmitValue();
                    }
                }
                Ice.log('padresValues:', padresValues);
                
                // con esta linea evitamos multiples reload al store, se cancela la anterior si esta activa
                // TODO: que pasa si el store tenia un listener en load y damos abort
                me.getStore().getProxy().abort();
                
                me.getStore().reload({
                    params: Ice.convertirAParams(padresValues)
                });
            };
            
            for (var i = 0; i < me.getPadres().length; i++) {
                var padreName = me.getPadres()[i],
                    padreComp = Ice.query('[reference=' + padreName + ']'); // TODO no debe ser global, debe ir sobre form, pero da error
                Ice.log('padreComp:', padreComp);
                if (padreComp) {
                    if (typeof padreComp.length === 'number') {
                        padreComp = padreComp[padreComp.length - 1];
                    }
                    if (padreComp) {
                        padreComp.on({
                            blur: function () {
                                me.heredar();
                            }
                        });
                    }
                }
            }
        }
    },
    
    validator: function (val) {
        var valid = 'Favor de seleccionar una opci\u00f3n';
        if (val) {
            var me = this;
            if (me.findRecordByValue(val) || me.findRecordByDisplay(val) || (me.oculto === 'S' && me.isHidden())) {
                valid = true;
            }
        } else {
            valid = true;
        }
        return valid;
    }
});
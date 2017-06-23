Ext.define('Ice.view.bloque.agrupadores.PanelSituacionesAgrupador', {
    extend: 'Ext.panel.Panel',
    xtype: 'panelsituacionesagrupador',
    
    controller: 'panelsituacionesagrupador',
    
    // propiedades ext
    //title: 'Situaciones',
    
    // propiedades no ext
    config: {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        
        nmsuplem: null,
        status: null,
        
        modulo: null,
        flujo: null,
        cdtipsit: null,
        auxkey: null
    },
    
    cargarCombo: function () {
        this.getController().cargarCombo();
    },
    
    guardar: function () {
        this.fireEvent('guardar', this);
    },
    
    constructor: function (config) {
        Ice.log('panelsituacionesagrupador.constructor config:', config);
        var me = this,
            paso = 'Construyendo panel de situaciones - agrupador';
        try {
        
            config.cdunieco = 1;
            config.cdramo   = 501;
            config.estado   = 'W';
            config.nmpoliza = 17422;
            config.cdtipsit = 51;
        
            if (!config ||
                !config.cdunieco ||
                !config.cdramo ||
                !config.estado ||
                !config.nmpoliza) {
                throw 'Faltan datos para el panel de situaciones - agrupador';
            }
            
            config.nmsuplem = config.nmsuplem || 0;
            config.status = config.status || 'V';
            config.modulo = config.modulo || 'COTIZACION';
            config.flujo = config.flujo || {};
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },
    
    initComponent: function () {
        Ice.log('panelsituacionesagrupador.initComponent');
        var me = this,
            paso = 'Inicializando panel de situaciones - agrupador';
        try {
            Ext.apply(me, {
                items: [
                    {
                        xtype: 'bloquelistasituaciones',
                        reference: 'gridsituacionesagrupador',
                        minHeight: 200,
                        maxHeight: 400,
                        style: 'border: 1px solid red;',
                        actionColumns: [
                            {
                                text: 'Agrupador',
                                dataIndex: 'cdagrupa',
                                width: 100
                            }
                        ],
                        listeners: {
                            itemclick: 'onItemClic'
                        },
                        
                        cdunieco: me.getCdunieco(),
                        cdramo: me.getCdramo(),
                        estado: me.getEstado(),
                        nmpoliza: me.getNmpoliza(),
                        nmsuplem: me.getNmsuplem(),
                        status: me.getStatus(),
                        modulo: me.getModulo(),
                        flujo: me.getFlujo(),
                        auxkey: me.getAuxkey(),
                        cdtipsit: me.getCdtipsit()
                    }, {
                        xtype: 'form',
                        layout: 'hbox',
                        padding: '10 0 0 10',
                        style: 'border: 1px solid red;',
                        defaults: {
                            margin: '0 10 10 0',
                        },
                        items: [
                            {
                                xtype: 'comboice',
                                reference: 'comboagrupador',
                                fieldLabel: 'Agrupador',
                                name: 'cdagrupa',
                                disabled: true,
                                allowBlank: false,
                                labelAlign: 'left',
                                
                                catalogo: 'AGRUPADORES_POLIZA',
                                param1: 'params.cdunieco',
                                value1: me.getCdunieco(),
                                param2: 'params.cdramo',
                                value2: me.getCdramo(),
                                param3: 'params.estado',
                                value3: me.getEstado(),
                                param4: 'params.nmpoliza',
                                value4: me.getNmpoliza()
                            }, {
                                xtype: 'button',
                                reference: 'botonguardar',
                                text: 'Guardar',
                                iconCls: 'x-fa fa-save',
                                disabled: true,
                                handler: 'onGuardarClic'
                            }
                        ]
                    }
                ]
            });
            
            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
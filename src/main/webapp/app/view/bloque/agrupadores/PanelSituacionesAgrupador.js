Ext.define('Ice.view.bloque.agrupadores.PanelSituacionesAgrupador', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'panelsituacionesagrupador',
    
    controller: 'panelsituacionesagrupador',
    
    // config ext
    
    // config no ext
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

            config.items = [
                {
                    xtype: 'bloquelistasituaciones',
                    reference: 'gridsituacionesagrupador',
                    title: 'Situaciones',
                    columns: [
                        {
                            text: 'Agrupador',
                            dataIndex: 'cdagrupa',
                            width: 100
                        }
                    ],
                    listeners: {
                        itemclick: 'onItemClic'
                    },
                    
                    cdunieco: config.cdunieco,
                    cdramo: config.cdramo,
                    estado: config.estado,
                    nmpoliza: config.nmpoliza,
                    nmsuplem: config.nmsuplem,
                    status: config.status,
                    modulo: config.modulo,
                    flujo: config.flujo,
                    auxkey: config.auxkey,
                    cdtipsit: config.cdtipsit
                }, {
                    xtype: 'formice',
                    referenceHolder: false,
                    layout: 'hbox',
                    platformConfig: {
                        desktop: {
                            scrollable: false
                        },
                        '!desktop': {
                            height: 120,
                            scrollable: true
                        }
                    },

                    items: [
                        {
                            xtype: 'comboice',
                            reference: 'comboagrupador',
                            label: 'Agrupador',
                            name: 'cdagrupa',
                            disabled: true,
                            allowBlank: false,
                            labelAlign: 'left',
                            style: 'margin: 10px;',
                            
                            catalogo: 'AGRUPADORES_POLIZA',
                            param1: 'params.cdunieco',
                            value1: config.cdunieco,
                            param2: 'params.cdramo',
                            value2: config.cdramo,
                            param3: 'params.estado',
                            value3: config.estado,
                            param4: 'params.nmpoliza',
                            value4: config.nmpoliza
                        }, {
                            xtype: 'button',
                            reference: 'botonguardar',
                            text: 'Guardar',
                            iconCls: 'x-fa fa-save',
                            disabled: true,
                            style: 'margin: 10px;',
                            handler: 'onGuardarClic'
                        }
                    ]
                }
            ].concat(config.items || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
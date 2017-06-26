Ext.define('Ice.view.bloque.agrupadores.PanelSituacionesAgrupador', {
    extend: 'Ext.Panel',
    xtype: 'panelsituacionesagrupador',
    
    controller: 'panelsituacionesagrupador',
    
    // propiedades ext
    title: 'Situaciones',
    layout: 'vbox',
    scrollable: true,
    
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
            
            config.items = [
                {
                    xtype: 'bloquelistasituaciones',
                    reference: 'gridsituacionesagrupador',
                    height: 300,
                    style: 'border: 1px solid red;',
                    columns: [
                        {
                            text: 'Agrupador',
                            dataIndex: 'cdagrupa',
                            width: 110
                        }
                    ],
                    listeners: {
                        itemtap: 'onItemTap'
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
                    xtype: 'formpanel',
                    layout: 'hbox',
                    padding: '10 0 0 10',
                    items: [
                        {
                            xtype: 'comboice',
                            reference: 'comboagrupador',
                            label: 'Agrupador',
                            name: 'cdagrupa',
                            disabled: true,
                            allowBlank: false,
                            labelAlign: 'left',
                            margin: '0 10 10 0',
                            
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
                            handler: 'onGuardarClic',
                            margin: '0 10 10 0',
                        }
                    ]
                }
            ];
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
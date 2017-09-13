Ext.define('Ice.view.bloque.clausulas.PanelClausulas', {
    extend: 'Ice.view.componente.PanelPaddingIce',
    xtype: 'panelclausulas',

    controller: 'panelclausulas',

    platformConfig: {
        '!desktop': {
            scrollable: true
        }
    },

    config: {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsuplem: null,
        cdtipsit: null,

        flujo: null
    },

    constructor: function (config) {
        Ice.log('Ice.view.bloque.clausulas.PanelClausulas.constructor config:', config);
        var me = this,
            paso = 'Construyendo panel de cl\u00e1usulas';
        try {
            if (!config.cdunieco || !config.cdramo || !config.estado || !config.nmpoliza || Ext.isEmpty(config.nmsuplem)) {
                throw 'Faltan datos para panel de cl\u00e1usulas';
            }
            config.items = [
                {
                    xtype: 'bloquelistasituaciones',
                    reference: 'listaincisos',
                    cdunieco: config.cdunieco,
                    cdramo: config.cdramo,
                    estado: config.estado,
                    nmpoliza: config.nmpoliza,
                    nmsuplem: config.nmsuplem,
                    cdtipsit: config.cdtipsit,
                    situacionCero: true
                }, {
                    xtype: 'tabpanelice',
                    items: [
                        {
                            xtype: 'gridice',
                            reference: 'gridclausulasgenerales',
                            title: 'Cl\u00e1usulas generales',
                            buttons: [{
                                text: 'Agregar',
                                iconCls: 'x-fa fa-plus'
                            }],
                            columns: []
                        }, {
                            xtype: 'gridice',
                            reference: 'gridclausulasespeciales',
                            title: 'Cl\u00e1usulas especiales',
                            buttons: [{
                                text: 'Agregar',
                                iconCls: 'x-fa fa-plus'
                            }],
                            columns: []
                        }
                    ]
                }, {
                    xtype: 'formunacolumnaice',
                    reference: 'formclausulageneral',
                    title: 'Cl\u00e1usula general',
                    items: []
                }, {
                    xtype: 'formunacolumnaice',
                    reference: 'formclausulaespecial',
                    title: 'Cl\u00e1usula especial',
                    items: []
                }
            ];
            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
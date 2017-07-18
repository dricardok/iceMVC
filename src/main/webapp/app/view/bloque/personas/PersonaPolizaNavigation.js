Ext.define('Ice.view.bloque.personas.PersonaPolizaNavigation',{
    extend: 'Ice.view.componente.PanelPaddingIce',
    xtype: 'personapolizanavigation',
    
    controller: 'personapolizanavigation',

    // config ext
    title: 'Personas p\u00f3liza',
    platformConfig: {
        '!desktop': {
            scrollable: true
        }
    },

    // config no ext
    config: {
        cdunieco: null, //1,
        cdramo: null, //501,
        estado: null, //'W',
        nmpoliza: null, //17196,
        nmsuplem: null, //0,

        modulo: null,
        flujo: null,
        nmsituac: null,
        cdtipsit: null,
        auxkey: null,

        cdbloque: null
    },

    constructor: function (config) {
        Ice.log('Ice.view.bloque.personas.PersonaPolizaNavigation.constructor config:', config);
        var me = this,
            paso = 'Construyendo bloque de personas';
        try {
            if (!config) {
                throw 'No hay datos para bloque de personas';
            }
            
            if (!config.cdunieco || !config.cdramo || !config.cdtipsit || !config.estado || !config.nmpoliza
                || Ext.isEmpty(config.nmsuplem)) {
                throw 'Faltan datos para construir bloque de personas';
            }
            
            config.modulo = config.modulo || 'EMISION';
            config.flujo = config.flujo || {};
            config.auxkey = config.auxkey || '';
            
            config.items = [
                {
                    xtype: 'bloquelistasituaciones',
                    itemId: 'gridSituaciones',
                    reference: 'gridSituaciones',

                    cdunieco: config.cdunieco,
                    cdramo: config.cdramo,
                    estado: config.estado,
                    nmpoliza: config.nmpoliza,
                    nmsuplem: config.nmsuplem,
                    cdtipsit: config.cdtipsit,

                    modulo: config.modulo,
                    flujo: config.flujo,

                    situacionCero: true,

                    actionColumns: [{
                        xtype: 'actioncolumn',
                        items: [
                            {
                                tooltip: 'Editar',
                                iconCls: 'x-fa fa-edit',
                                handler: function (grid, rowIndex, colIndex) {
                                    me.getController().onActualizar(grid, rowIndex, colIndex);
                                }
                            }
                        ]
                    }]
                }, {
                    xtype: 'listapersonas',
                    itemId: 'gridPersonas',
                    reference: 'gridPersonas',
                    title: 'Personas por situaci\u00f3n',

                    cdunieco: config.cdunieco,
                    cdramo: config.cdramo,
                    estado: config.estado,
                    nmpoliza: config.nmpoliza,
                    nmsuplem: config.nmsuplem,
                    cdtipsit: config.cdtipsit,

                    hidden: true,
                    actionColumns: [{
                        xtype:'actioncolumn',
                        items: [
                            {
                                tooltip: 'Editar',
                                iconCls: 'x-fa fa-edit',
                                handler: function (grid, rowIndex, colIndex) {
                                    me.getController().onActualizarPersona(grid, rowIndex, colIndex);
                                }
                            }, {
                                tooltip: 'Borrar',
                                iconCls: 'x-fa fa-minus-circle',
                                handler: function (grid, rowIndex, colIndex){
                                    me.getController().onBorrarPersona(grid, rowIndex, colIndex);
                                }
                            }
                        ]
                    }],
                    buttons: [{
                        text: 'Agregar',
                        iconCls: 'x-fa fa-plus-circle',
                        handler: function (btn) {
                            btn.up('personapolizanavigation').getController().agregarPersona();
                        }
                    }]
                }
            ].concat(config.items || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
Ext.define('Ice.view.bloque.personas.PersonaPolizaNavigation',{
    extend: 'Ext.Panel',
    xtype: 'personapolizanavigation',
    
    controller: 'personapolizanavigation',
    title: 'Personas poliza',
    scrollable: true,
    //layout: 'vbox',
 // validacion de parametros de entrada
    constructor: function (config) {
        Ice.log('Ice.view.bloque.personas.ListaPersonas.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de lista de personas';
            try {
                if (!config) {
                    throw 'No hay datos para lista de personas';
                }
                
                if (!config.cdramo || !config.cdtipsit) {
                    throw 'Falta ramo y tipo de situaci\u00f3n para lista de personas';
                }
                
                if (!config.cdunieco || !config.estado || !config.nmpoliza || Ext.isEmpty(config.nmsuplem)) {
                    throw 'Falta llave de p\u00f3liza';
                }
                
                if (config.estado == 'w'){
                    config.estado === 'W';
                }

                config.modulo = config.modulo || 'COTIZACION';
                
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
                        situacionCero: true,
                        actionColumns: [
                            {
                                xtype: 'button',
                                ui: 'action',
                                iconCls: 'x-fa fa-edit',
                                handler: function(grid, rowIndex, colIndex) {
                                    me.getController().onActualizar(grid, rowIndex, colIndex);
                                }
                            }
                        ]
                    },{
                        xtype: 'listapersonas',
                        itemId: 'gridPersonas',
                        reference: 'gridPersonas',
                        title: 'Personas por situacion',
                        cdunieco: config.cdunieco,
                        cdramo: config.cdramo,
                        estado: config.estado,
                        nmpoliza: config.nmpoliza,
                        nmsuplem: config.nmsuplem,
                        cdtipsit: config.cdtipsit,
                        hidden: true,
                        actionColumns: [
                            {
                                type: 'button',
                                ui: 'action',
                                iconCls: 'x-fa fa-edit',
                                handler: function(grid, rowIndex, colIndex) {
                                    me.getController().onActualizarPersona(grid, rowIndex, colIndex);
                                }
                            },{
                                type: 'button',
                                ui: 'action',
                                iconCls: 'x-fa fa-minus-circle',
                                handler: function(grid, rowIndex, colIndex){
                                    me.getController().onBorrarPersona(grid, rowIndex, colIndex);
                                }
                            }
                        ]
                    }
                ];
                
                config.tbar = [
                    {
                        id: 'move-prev',
                        text: 'Back',
                        handler: function(btn) {
                            me.getController().navigate(btn.up("panel"), "prev");
                        },
                        disabled: true
                    },'->',{
                        id: 'move-next',
                        text: 'Next',
                        handler: function(btn) {
                            me.getController().navigate(btn.up("panel"), "next");
                        }
                    }
                ];
                
            } catch (e) {
                Ice.generaExcepcion(e, paso);
            }
        me.callParent(arguments);
    },
    
    // configuracion del componente (no EXT)
    config: {
        modulo: null,
        flujo: null,
        cdunieco: null, //1,
        cdramo: null, //501,
        estado: null, //'W',
        nmpoliza: null, //17196,
        nmsuplem: null, //0,
        nmsituac: null,
        cdbloque: null,
        cdtipsit: null
    }
});
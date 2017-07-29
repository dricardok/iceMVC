Ext.define('Ice.view.bloque.coaseguro.VentanaExclusionesCoaseguro', {
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'ventanaexclusionescoaseguro',

    controller: 'ventanaexclusionescoaseguro',
    title: 'Exclusiones de coaseguro cedido parcial',
    platformConfig: {
        desktop: {
            scrollable: false,
            width: 650,
            height: 400
        },
        '!desktop': {
            scrollable: true
        }
    },

        // config no ext
    config: {
        // uso o funcionamiento
        modulo: null,
        flujo: null,
        cdtipsit: null,
        auxkey: null,
    
        // llave
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsuplem: null,
        status: null,

        // coaseguro
        cargacompleta: 'N'
    },

    constructor: function(config){
        Ice.log('Ice.view.bloques.coaseguro.VentanaExclusionesCoaseguro.constructor config', config);
        var me = this,
            paso = 'Construyendo pantalla de coaseguro';
        try{            
            if(!config.cdunieco || !config.estado || !config.estado || !config.nmpoliza){
                throw 'Falta llave de poliza';
            }

            config.modulo = config.modulo || 'COTIZACION';
            config.flujo = config.flujo || {};
            
            config.estado = config.estado.toUpperCase();

            config.items = [
                {
                    xtype: 'gridexclusionsituacionescoaseguro',
                    reference: 'gridSituaciones',
                    cdunieco: config.cdunieco,
                    cdramo: config.cdramo,
                    estado: config.estado,
                    nmpoliza: config.nmpoliza,
                    nmsuplem: config.nmsuplem,
                    selector: 'true',
                    actionColumns: [
                        {
                            xtype: 'actioncolumn',
                            items: [
                                {
                                    iconCls: 'x-fa fa-edit',
                                    tooltip: 'Editar',
                                    handler: function(grid, rowIndex, colIndex){
                                        me.getController().onMostrarCoberturas(grid, rowIndex, colIndex);
                                    }
                                }
                            ]
                        }
                    ]
                },{
                    xtype: 'gridexclusioncoberturascoaseguro',
                    reference: 'gridCoberturas',
                    hidden: true,
                    cdunieco: config.cdunieco,
                    cdramo: config.cdramo,
                    estado: config.estado,
                    nmpoliza: config.nmpoliza,
                    nmsuplem: config.nmsuplem,
                    selector: 'true'
                }
            ];
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
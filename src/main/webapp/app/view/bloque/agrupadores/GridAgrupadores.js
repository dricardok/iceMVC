Ext.define('Ice.view.bloque.agrupadores.GridAgrupadores', {
    extend: 'Ice.view.componente.GridIce',
    xtype: 'gridagrupadores',
    
    controller: 'gridagrupadores',
    
    // config ext
    
    // config no ext
    config: {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsuplem: null,
        status: null,
        nmsuplemEnd: null,
        
        modulo: null,
        flujo: null,
        auxkey: null
    },
    
    constructor: function (config) {
        Ice.log('Ice.view.bloque.agrupadores.GridAgrupadores.constructor config:', config);
        var me = this,
            paso = 'Construyendo grid de agrupadores';
        try {
            if (!config
                || !config.cdunieco
                || !config.cdramo
                || !config.estado
                || !config.nmpoliza) {
                throw 'Faltan datos para construir grid de agrupadores';
            }
            
            config.nmsuplem    = config.nmsuplem || 0;
            config.status      = config.status || 'V';
            config.nmsuplemEnd = config.nmsuplemEnd || 0;
            config.modulo      = config.modulo || 'EMISION';
            config.flujo       = config.flujo || {};
            config.auxkey      = config.auxkey || '';
            
            var comps = Ice.generaComponentes({
                pantalla: 'GRID_AGRUPADORES',
                seccion: 'GRID',
                modulo: config.modulo,
                estatus: config.flujo.estatus || '',
                cdramo: config.cdramo,
                cdtipsit: config.cdtipsit ||'',
                auxkey: config.auxkey || '',
                
                fields: true,
                columns: true
            });
            
            config.columns = (comps.GRID_AGRUPADORES.GRID.columns || []).concat(config.columns || []);
            config.store = {
                autoLoad: true,
                fields: comps.GRID_AGRUPADORES.GRID.fields || [],
                proxy: {
                    type: 'ajax',
                    url: Ice.url.bloque.agrupadores.obtenerAgrupadoresVista,
                    extraParams: Ice.convertirAParams({
                        cdunieco: config.cdunieco,
                        cdramo: config.cdramo,
                        estado: config.estado,
                        nmpoliza: config.nmpoliza,
                        nmsuplem: config.nmsuplem
                    }),
                    reader: {
                        type: 'json',
                        rootProperty: 'list'
                    }
                }
            };

            config.buttons = [
                {
                    text: 'Agregar Agrupador',
                    iconCls: 'x-fa fa-plus',
                    handler: 'onAgregarAgrupadorClic'
                }, {
                    text: 'Agregar Subagrupador',
                    iconCls: 'x-fa fa-plus',
                    handler: 'onAgregarSubagrupadorClic',
                    hidden: true,
                    reference: 'agregarbutton'
                }, {
                    text: 'Editar Subagrupador',
                    iconCls: 'x-fa fa-pencil',
                    handler: 'onEditarClic',
                    hidden: true,
                    reference: 'editarbutton'
                }, {
                    text: 'Borrar Subagrupador',
                    iconCls: 'x-fa fa-minus',
                    handler: 'onEliminarClic',
                    hidden: true,
                    reference: 'eliminarbutton'
                }
            ].concat(config.buttons || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },

    // para classic
    initComponent: function () {
        Ice.log('Ice.view.bloque.agrupadores.GridAgrupadores.initComponent');
        var me = this,
            paso = 'Configurando comportamiento de grid de agrupadores';
        try {
            ////// antes de callParent //////

            ////// antes de callParent //////
            me.callParent(arguments);
            ////// despues de callParent //////
            me.on({
                itemclick: me.getController().onItemClic
            });
            ////// despues de callParent //////
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    // para modern
    initialize: function () {
        Ice.log('Ice.view.bloque.agrupadores.GridAgrupadores.initialize');
        var me = this,
            paso = 'Configurando comportamiento de grid de agrupadores';
        try {
            ////// antes de callParent //////

            ////// antes de callParent //////
            me.callParent(arguments);
            ////// despues de callParent //////
            me.on({
                itemclick: me.getController().onItemClic
            });
            ////// despues de callParent //////
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
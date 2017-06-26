Ext.define('Ice.view.bloque.agrupadores.GridAgrupadores', {
    extend: 'Ext.grid.Panel',
    xtype: 'gridagrupadores',
    
    requires: [],
    
    controller: 'gridagrupadores',
    
    // configuracion ext
    minHeight: 150,
    maxHeight: 400,
    
    tbar: [
        {
            text: 'Agregar agrupador',
            handler: 'onAgregarAgrupadorClic'
        }, {
            text: 'Agregar subagrupador',
            handler: 'onAgregarSubagrupadorClic',
            disabled: true,
            reference: 'agregarbutton'
        }, {
            text: 'Editar subagrupador',
            handler: 'onEditarClic',
            disabled: true,
            reference: 'editarbutton'
        }, {
            text: 'Eliminar subagrupador',
            handler: 'onEliminarClic',
            disabled: true,
            reference: 'eliminarbutton'
        }
    ],
    
    listeners: {
        itemclick: 'onItemClic'
    },
    
    // configuracion no ext
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
            /*config.cdunieco = 1;
            config.cdramo   = 501;
            config.estado   = 'W';
            config.nmpoliza = 17422;*/
            
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
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
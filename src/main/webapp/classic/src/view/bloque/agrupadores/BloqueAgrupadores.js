Ext.define('Ice.view.bloque.agrupadores.BloqueAgrupadores', {
    extend: 'Ext.panel.Panel',
    xtype: 'bloqueagrupadores',
    
    requires: [],
    
    controller: 'bloqueagrupadores',
    
    // configuracion ext
    title: 'Agrupadores',
    //layout: 'vbox',
    
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
        Ice.log('bloqueagrupadores.constructor config:', config);
        var me = this,
            paso = 'Construyendo bloque de agrupadores';
        try {
            /*config.cdunieco = 1;
            config.cdramo   = 501;
            config.estado   = 'W';
            config.nmpoliza = 17422;
            config.cdtipsit = 51;*/
            
            if (!config
                || !config.cdunieco
                || !config.cdramo
                || !config.estado
                || !config.nmpoliza) {
                throw 'Faltan datos para construir bloque de agrupadores';
            }
            
            config.nmsuplem    = config.nmsuplem || 0;
            config.status      = config.status || 'V';
            config.nmsuplemEnd = config.nmsuplemEnd || 0;
            config.modulo      = config.modulo || 'EMISION';
            config.flujo       = config.flujo || {};
            config.auxkey      = config.auxkey || '';
            
            config.items = [
                {
                    xtype: 'panelsituacionesagrupador',
                    reference: 'panelsituacionesagrupador',
                    
                    cdunieco: config.cdunieco,
                    cdramo: config.cdramo,
                    estado: config.estado,
                    nmpoliza: config.nmpoliza,
                    nmsuplem: config.nmsuplem,
                    status: config.status,
                    nmsuplemEnd: config.nmsuplemEnd,
                    
                    cdtipsit: config.cdtipsit,
                    
                    modulo: config.modulo,
                    flujo: config.flujo,
                    auxkey: config.auxkey
                }, {
                    xtype: 'gridagrupadores',
                    cdunieco: config.cdunieco,
                    cdramo: config.cdramo,
                    estado: config.estado,
                    nmpoliza: config.nmpoliza,
                    nmsuplem: config.nmsuplem,
                    status: config.status,
                    nmsuplemEnd: config.nmsuplemEnd,
                    
                    cdtipsit: config.cdtipsit,
                    
                    modulo: config.modulo,
                    flujo: config.flujo,
                    auxkey: config.auxkey,
                    listeners: {
                        agrupadorModificado: 'onAgrupadorModificado'
                    }
                }
            ];
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
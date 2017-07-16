Ext.define('Ice.view.cotizacion.Emision', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'emision',

    controller: 'emision',
    
    // config ext
    layout: 'fit',
    header: false,
    items: [{
        xtype: 'tabpanelice',
        reference: 'tabpanel',
        listeners: {
            tabchange: 'onTabchangeEvent'
        }
    }],
    buttons: [
        {
            text: 'Cargar',
            reference: 'cargarbutton',
            iconCls: 'x-fa fa-cloud-download',
            handler: 'onCargarClic'
        }, {
            text: 'Anterior',
            reference: 'anteriorbutton',
            iconCls: 'x-fa fa-backward',
            handler: 'onAnteriorclic'
        }, {
            text: 'Emitir',
            reference: 'cotizarbutton',
            iconCls: 'x-fa fa-key',
            handler: 'onCotizarClic'
        }, {
            text: 'Siguiente',
            reference: 'siguientebutton',
            iconCls: 'x-fa fa-forward',
            handler: 'onSiguienteClic'
        }
    ],
    
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
        
        // etapas
        nuevaCotizacion: true,
        
        // contenidos
        bloques: [],
        bloqueActual: -1,
        
        // comportamiento
        guardadoAutomaticoSuspendido: false
    },

    constructor: function (config) {
        Ice.log('Ice.view.cotizacion.Emision.constructor config:', config);
        var me = this,
            paso = 'Validando componente de cotizaci\u00f3n';
        try {
            if (!config || !config.cdunieco || !config.cdramo || !config.estado || !config.nmpoliza || !config.cdtipsit) {
                throw 'Faltan datos para construir pantalla de emisi\u00f3n';
            }
            
            config.nmsuplem    = config.nmsuplem || 0;
            config.status      = config.status || 'V';
            config.modulo      = config.modulo || 'EMISION';
            config.flujo       = config.flujo || {};
            config.auxkey      = config.auxkey || '';
            
            if (config.estado === 'w') {
                config.estado = 'W';
            }

            var bloques = Ice.generaComponentes({
                pantalla: 'EMISION',
                seccion: 'BLOQUES',
                modulo: config.modulo || '',
                estatus: (config.flujo && config.flujo.estatus) || '',
                cdramo: config.cdramo || '',
                cdtipsit: config.cdtipsit ||'',
                auxkey: config.auxkey || '',
                
                items: true
            });
            
            config.bloques = bloques.EMISION.BLOQUES.items;
            config.bloques = [{
                label: 'mis agentes',
                name: 'bloqueagentes'
            }];
            if ((config.bloques || []).length === 0) {
                throw 'No hay bloques configurados';
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
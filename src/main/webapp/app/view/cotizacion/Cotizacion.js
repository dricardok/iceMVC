Ext.define('Ice.view.cotizacion.Cotizacion', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'cotizacion',
    
    controller: 'cotizacion',

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
            text: 'Cotizar',
            reference: 'cotizarbutton',
            iconCls: 'x-fa fa-dollar',
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
        Ice.log('Ice.view.cotizacion.Cotizacion.constructor config:', config);
        var me = this,
            paso = 'Construyendo pantalla de cotizaci\u00f3n';
        try {
            if (!config.cdramo || !config.cdtipsit) {
                throw 'Falta cdramo o cdtipsit para componente de cotizaci\u00f3n';
            }
            
            config.modulo = config.modulo || 'COTIZACION';
            config.flujo = config.flujo || {};
            
            if (config.estado === 'w') {
                config.estado = 'W';
            }
            
            // parche para prueba de carga
            // config.cdunieco = 1;
            // config.estado = 'W';
            // config.nmpoliza = 17196;
            // config.nmsuplem = 0;

            var bloques = Ice.generaComponentes({
                pantalla: 'COTIZACION',
                seccion: 'BLOQUES',
                modulo: config.modulo || '',
                estatus: (config.flujo && config.flujo.estatus) || '',
                cdramo: config.cdramo || '',
                cdtipsit: config.cdtipsit ||'',
                auxkey: config.auxkey || '',
                
                items: true
            });
            
            config.bloques = bloques.COTIZACION.BLOQUES.items;
            config.bloques = [
                {
                    name: 'datosiniciales',
                    label: 'Datos generales'
                }, {
                    name: 'bloquesituacionesriesgo',
                    label: 'Riesgo'
                }, {
                    name: 'bloquecoberturas',
                    label: 'Coberturas'
                }
            ];
            if ((config.bloques || []).length === 0) {
                throw 'No hay bloques configurados';
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
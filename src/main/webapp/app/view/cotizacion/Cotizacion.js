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
            text: 'Anterior',
            reference: 'anteriorbutton',
            iconCls: 'x-fa fa-backward',
            ui:'gray',
            style:'margin-right: 9px;',
            handler: 'onAnteriorclic'
        },
        // {
        //     text: 'Cargar',
        //     reference: 'cargarbutton',
        //     iconCls: 'x-fa fa-cloud-download',
        //     handler: 'onCargarClic'
        // },
        {
            text: 'Cotizar',
            reference: 'cotizarbutton',
            iconCls: 'x-fa fa-dollar',
            handler: 'onCotizarClic'
        }, {
            text: 'Siguiente',
            reference: 'siguientebutton',
            iconCls: 'x-fa fa-forward',
            style:'margin-right: 42px;',
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
        guardadoAutomaticoSuspendido: false,

        // perfilamiento
        cdptovta: null,
        cdgrupo: null,
        cdsubgpo: null,
        cdperfil: null
    },
    
    constructor: function (config) {
        Ice.log('Ice.view.cotizacion.Cotizacion.constructor config:', config);
        var me = this,
            paso = 'Construyendo pantalla de cotizaci\u00f3n';
        try {
            config.flujo = Ice.validarParamFlujo(config);

            if (config.flujo.ntramite) {
                config.cdramo = config.flujo.cdramo;
                config.cdtipsit = {
                    '501': '51'
                }[config.cdramo];
            }
            Ice.log('Ice.view.cotizacion.Cotizacion.constructor config despues de flujo:', config);

            if (!config.cdramo || !config.cdtipsit) {
                throw 'Falta cdramo o cdtipsit para componente de cotizaci\u00f3n';
            }
            
            config.modulo = config.modulo || 'COTIZACION';
            if (config.nuevaCotizacion === false
                || config.nuevaCotizacion === 'false'
                || config.nueva === false
                || config.nueva === 'false') {
                config.nuevaCotizacion = false;
            } else {
                config.nuevaCotizacion = true;
            }
            
            if (config.estado === 'w') {
                config.estado = 'W';
            }

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
            if ((config.bloques || []).length === 0) {
                throw 'No hay bloques configurados';
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
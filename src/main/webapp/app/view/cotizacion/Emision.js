Ext.define('Ice.view.cotizacion.Emision', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'emision',

    controller: 'emision',
    
    // config ext
    layout: 'fit',
    header: false,
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
    items: [{
        xtype: 'tabpanelice',
        reference: 'tabpanel',
        listeners: {
            tabchange: 'onTabchangeEvent'
        }
    }],
    buttons: [
    	
        // {
        //     text: 'Cargar',
        //     reference: 'cargarbutton',
        //     iconCls: 'x-fa fa-cloud-download',
        //     handler: 'onCargarClic'
        // },
        {
            text: 'Anterior',
            reference: 'anteriorbutton',
            iconCls: 'x-fa fa-backward',
            ui:'gray',
            handler: 'onAnteriorclic'
        }, {
            text: 'Emitir',
            reference: 'cotizarbutton',
            iconCls: 'x-fa fa-key',
            handler: 'onCotizarClic'
        },{
            text: 'Siguiente',
            style:'margin-right: 45px;',
            reference: 'siguientebutton',
            iconCls: 'x-fa fa-forward',
            handler: 'onSiguienteClic'
        },{
            text: 'Documentos',
            reference: 'documentos',
            hidden: Ext.manifest.toolkit === 'classic' ? true:false,
            iconCls: 'x-fa fa-files-o',
            handler: 'abrirVentanaDocs'
        }
    ],

    constructor: function (config) {
        Ice.log('Ice.view.cotizacion.Emision.constructor config:', config);
        var me = this,
            paso = 'Validando componente de cotizaci\u00f3n';
        try {
            config.flujo = Ice.validarParamFlujo(config);

            // cuando viene por flujo
            if (config.flujo.ntramite) {
                config.cdunieco = config.flujo.cdunieco;
                config.cdramo   = config.flujo.cdramo;
                config.estado   = config.flujo.estado;
                config.nmpoliza = config.flujo.nmpoliza;
                config.nmsuplem = config.flujo.nmsuplem;
                config.cdtipsit = {
                    '501': '51',
                    '301': '31'
                }[config.cdramo];
            }

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
            if ((config.bloques || []).length === 0) {
                throw 'No hay bloques configurados';
            }
            
            me.callParent(arguments);

            if (config.flujo.ntramite) {
                Ext.create({
                    xtype: 'ventanabotonesflujo',
                    flujo: config.flujo,
                    padre: me
                }).mostrar();
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
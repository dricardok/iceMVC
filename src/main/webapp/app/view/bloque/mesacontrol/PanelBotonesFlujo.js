Ext.define('Ice.view.bloque.mesacontrol.PanelBotonesFlujo', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'botoneraflujo',

    // config ext
    scrollable: true,
    layout: 'hbox',
    platformConfig: {
        desktop: {
            maxHeight: 110,
            bodyPadding: '0 0 0 10',
            defaults: {
                margin: '0 10 10 0'
            }
        },
        tablet: {
            height: 100
        },
        phone: {
            height: 100
        }
    },
    
    // config no ext
    config: {
        flujo: null
    },

    constructor: function (config) {
        Ice.log('Ice.view.bloque.mesacontrol.FormBotonesFlujo.constructor config:', config);
        var me = this,
            paso = 'Construyendo botones de proceso';
        try {
            config.flujo = Ice.validarParamFlujo(config);

            Ice.log('Ice.view.bloque.mesacontrol.FormBotonesFlujo.constructor config.flujo:', config.flujo);

            config.sinToggle = true; // para que no muestre ojo
            config.title = 'Acciones del tr\u00e1mite ' + Ice.nvl(config.flujo.ntramite);

            me.callParent(arguments);
            if (!config.flujo.cdtipflu || !config.flujo.cdflujomc || !config.flujo.tipoent || !config.flujo.claveent) {
                return;
            }
            Ice.cargarAccionesEntidad(config.flujo.cdtipflu, config.flujo.cdflujomc, config.flujo.tipoent, config.flujo.claveent,
                config.flujo.webid, function (lista) {
                for (var i = 0; i < lista.length; i++) {
                    var boton = me.add({
                        xtype: 'buttonice',
                        text: lista[i].DSACCION,
                        icon: Ice.ruta.iconos + lista[i].CDICONO + '.png',
                        handler: Ice.botonEntidadClic,
                        flujo: {
                            ntramite  : config.flujo.ntramite,
                            status    : config.flujo.status,
                            cdtipflu  : config.flujo.cdtipflu,
                            cdflujomc : config.flujo.cdflujomc,
                            webid     : lista[i].IDDESTIN,
                            tipoent   : lista[i].TIPODEST,
                            claveent  : lista[i].CLAVEDEST,
                            cdunieco  : config.flujo.cdunieco,
                            cdramo    : config.flujo.cdramo,
                            estado    : config.flujo.estado,
                            nmpoliza  : config.flujo.nmpoliza,
                            nmsituac  : config.flujo.nmsituac,
                            nmsuplem  : config.flujo.nmsuplem,
                            aux       : lista[i].AUX
                        }
                    });
                }
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
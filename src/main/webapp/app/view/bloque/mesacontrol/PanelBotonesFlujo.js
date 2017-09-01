Ext.define('Ice.view.bloque.mesacontrol.PanelBotonesFlujo', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'botoneraflujo',
    style: 'padding:20px 0px 0px 20px;',

    // config ext
    scrollable: true,
    layout: 'hbox',
    platformConfig: {
        desktop: {
            height: 120,
            bodyPadding: '0px 0px 0px 10px',
            defaults: {
                margin: '10 10 10 0px'
            }
        },
        tablet: {
            height: 110
        },
        phone: {
            height: 110
        }
    },
    
    // config no ext
    config: {
        flujo: null,
        botonCerrar: false
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
                if (config.botonCerrar === true && Ice.modern()) {
                    me.add({
                        xtype: 'buttonice',
                        text: 'Cerrar',
                        ui:'gray',
                        icon: Ice.ruta.iconos + 'cancel.png',
                        handler: function (me) {
                            try {
                                me.up('ventanaice').cerrar();
                            } catch (e) {
                                Ice.logWarn('No se puede cerrar ventanaice desde botoneraflujo', e);
                            }
                        }
                    });
                }
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
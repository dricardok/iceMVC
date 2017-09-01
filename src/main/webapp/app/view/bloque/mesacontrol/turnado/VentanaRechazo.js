/**
 * Created by DEORTIZT on 18/08/2017.
 */
Ext.define('Ice.view.bloque.mesacontrol.turnado.VentanaRechazo', {   
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'ventanarechazo',    
    controller: 'ventanarechazo',

    // config ext
    title: 'Turnado',
    layout: 'fit',
    scrollable: true,
    style: 'padding: 30px 0px 0px 0px;',
    platformConfig: {
        desktop: {
            width: Ice.constantes.componente.ventana.width,
            maxHeight: 600,
            modal: true
        },
    },

    // config no ext
    config: {
        flujo: null
    },
    
    // validacion de parametros de entrada
    constructor: function (config) {
        Ice.log('Ice.view.bloque.mesacontrol.turnado.VentanaRechazo.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de ventana de rechazo';
        try {
            if (!config) {
                throw 'No hay datos para ventana de rechazo';
            }

            config.flujo = Ice.validarParamFlujo(config);
            
            if (!config.flujo.ntramite) {
                throw 'Falta numero de tramite para ventana de rechazo';
            }

            var comps = Ice.generaComponentes({
                pantalla: 'TRAMITE',
                seccion: 'RECHAZO',
                columns: true,
                items: true,
                fields: true,
                validators: true
            });

            var cdrazrecha = Ice.query('[name=cdrazrecha]',comps.TRAMITE.RECHAZO.items);
            cdrazrecha['param1'] = 'params.ntramite';
            cdrazrecha['value1'] = config.flujo.ntramite;
            Ice.log('componentes ',cdrazrecha);

            config.items = [
                {
                    xtype: 'formunacolumnaice',
                    reference: 'form',
                    sinToggle: true,
                    items: comps.TRAMITE.RECHAZO.items,
                    modelFields: comps.TRAMITE.RECHAZO.fields,
                    modelValidators: comps.TRAMITE.RECHAZO.validators,
                    iceEvents: comps.TRAMITE.RECHAZO.eventos,
                    buttons: [
                        {
                            text: 'Rechazar',
                            iconCls: 'x-fa fa-times',
                            style:'margin-right:40px;',
                            handler: 'onTurnar'
                        }, {
                            text: 'Cerrar',
                            iconCls: 'x-fa fa-close',
                            ui:'gray',
                            hidden: Ice.classic(),
                            handler: function (me) {
                                me.up('ventanaice').cerrar();
                            }
                        }
                    ]
                }
            ];
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },

    initComponent: function () {
        var me = this,
            paso = 'Configurando campos de agente';
        try {
            me.callParent();
            if (Ice.sesion.cdsisrol === 'AGENTE') {
                me.down('[name=swagente]').setValue('S');
                me.down('[name=swagente]').hide();
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    initialize: function () {
        var me = this,
            paso = 'Configurando campos de agente';
        try {
            me.callParent();
            if (Ice.sesion.cdsisrol === 'AGENTE') {
                me.down('[name=swagente]').check();
                me.down('[name=swagente]').hide();
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
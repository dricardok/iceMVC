/**
 * Created by DEORTIZT on 16/08/2017.
 */
Ext.define('Ice.view.bloque.mesacontrol.turnado.VentanaTurnado', {   
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'ventanaturnado',    
    controller: 'ventanaturnado',

    // config ext
    title: 'Turnado',
    layout: 'fit',
    platformConfig: {
        desktop: {
            scrollable: false,
            width: Ice.constantes.componente.ventana.width,
            modal: true
        },
        '!desktop': {
            scrollable: true
        }
    },

    // config no ext
    config: {
        ntramite: null,
        status: null,
        cdrazrecha: null,
        cdusuariDes: null,
        cdsisrolDes: null,
        flujo: null
    },
    
    // validacion de parametros de entrada
    constructor: function (config) {
        Ice.log('Ice.view.bloque.mesacontrol.turnado.VentanaTurnado.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de ventana de turnado';
        try {
            if (!config) {
                throw 'No hay datos para ventana de turnado';
            }

            config.flujo = Ice.validarParamFlujo(config);
            
            if (!config.flujo.ntramite) {
                throw 'Falta numero de tr\u00e1mite para ventana de turnado';
            }
            if (!config.flujo.aux) {
                throw 'Falta par\u00e1metro estatus para ventana de turnado';
            }
            
            // config.status = config.status.toUpperCase();

            var comps = Ice.generaComponentes({
                pantalla: 'TRAMITE',
                seccion: 'TURNADO',
                columns: true,
                items: true,
                fields: true,
                validators: true
            });

            config.items = [
                {
                    xtype: 'formunacolumnaice',
                    reference: 'form',
                    sinToggle: true,
                    items: comps.TRAMITE.TURNADO.items,
                    modelFields: comps.TRAMITE.TURNADO.fields,
                    modelValidators: comps.TRAMITE.TURNADO.validators,
                    iceEvents: comps.TRAMITE.TURNADO.eventos,
                    buttons: [
                        {
                            text: 'Turnar',
                            iconCls: 'x-fa fa-user-plus',
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

            config.items[0].items[0].anchor = '90%';
            config.items[0].items[0].height = 200;
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
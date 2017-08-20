/**
 * Created by DEORTIZT on 18/08/2017.
 */
Ext.define('Ice.view.bloque.mesacontrol.turnado.VentanaRechazo', {   
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'ventanarechazo',    
    controller: 'ventanarechazo',

    // config ext
    title: 'Turnado',
    layout: 'fit',
    bodyPadding: '20 0 0 20',
    platformConfig: {
        desktop: {
            scrollable: false,
            width: 650,
            height: 400,
            collapsible: true,
            titleCollapse: true
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
        cdsisrolDes: null
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
            
            if (!config.ntramite) {
                throw 'Falta numero de tramite para ventana de rechazo';
            }
            
            config.status = config.status.toUpperCase();

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
            cdrazrecha['value1'] = config.ntramite;
            Ice.log('componentes ',cdrazrecha);

            config.items = [
                {
                    xtype: 'formice',
                    reference: 'form',
                    items: comps.TRAMITE.RECHAZO.items,
                    modelFields: comps.TRAMITE.RECHAZO.fields,
                    modelValidators: comps.TRAMITE.RECHAZO.validators,
                    iceEvents: comps.TRAMITE.RECHAZO.eventos,
                    buttons: [
                        {
                            text: 'Rechazar',
                            handler: 'onTurnar'
                        }
                    ]
                }
            ];
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
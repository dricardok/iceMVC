/**
 * Created by DEORTIZT on 16/08/2017.
 */
Ext.define('Ice.view.bloque.mesacontrol.turnado.VentanaTurnado', {   
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'ventanaturnado',    
    controller: 'ventanaturnado',

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
        Ice.log('Ice.view.bloque.mesacontrol.turnado.VentanaTurnado.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de ventana de turnado';
        try {
            if (!config) {
                throw 'No hay datos para ventana de turnado';
            }
            
            if (!config.ntramite) {
                throw 'Falta numero de tramite para ventana de turnado';
            }
            
            config.status = config.status.toUpperCase();

            var comps = Ice.generaComponentes({
                pantalla: 'TURNADO',
                seccion: 'COMENTARIOS',
                columns: true,
                items: true,
                fields: true,
                validators: true
            });

            config.items = [
                {
                    xtype: 'formice',
                    reference: 'form',
                    items: comps.TURNADO.COMENTARIOS.items,
                    modelFields: comps.TURNADO.COMENTARIOS.fields,
                    modelValidators: comps.TURNADO.COMENTARIOS.validators,
                    iceEvents: comps.TURNADO.COMENTARIOS.eventos,
                    buttons: [
                        {
                            text: 'Turnar',
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
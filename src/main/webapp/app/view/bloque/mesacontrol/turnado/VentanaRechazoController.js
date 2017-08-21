/**
 * Created by DEORTIZT on 16/08/2017.
 */
Ext.define('Ice.view.bloque.mesacontrol.turnado.VentanaRechazoController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.ventanarechazo',
    
    // init: function () {
    //     Ice.log('Ice.view.bloque.mesacontrol.turnado.VentanaRechazoController.init');
    //     var me = this,
    //         paso = 'Iniciando controlador de ventana de rechazo';
    //     try {
    //         // TODO: recuperar correo de agente
    //     } catch (e) {
    //         Ice.generaExcepcion(e, paso);
    //     }
    // },
    
    custom: function(){
        Ice.log('Ice.view.bloque.mesacontrol.turnado.VentanaRechazoController custom');
    },
    
    onTurnar: function(){
        this.rechazar();
    },
    
    rechazar: function(){
        Ice.log('Ice.view.bloque.mesacontrol.turnado.rechazar custom');
        var paso = 'Rechazando tramite',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            var values = refs.form.getValues();
            Ice.log('values de form ',values);
            if (Ext.isEmpty(values.cdrazrecha)) {
                throw 'Por favor seleccione el motivo de rechazo';
            }
            Ice.request({
                mascara: 'Rechazando tr\u00e1mite',
                url: Ice.url.bloque.mesacontrol.turnar,
                params: {
                    'params.ntramite'   : view.getFlujo().ntramite,
                    'params.status'     : '4',
                    'params.comments'   : values.commentsint,
                    'params.cdrazrecha' : values.cdrazrecha,
                    'params.swagente'   : values.swagente,
                    'params.correos'    :
                        (
                            values.correos
                                ? values.correos + (values.correoscc ? ';' : '')
                                : ''
                        ) + values.correoscc || ''
                },
                success: function (json) {
                    var paso2 = 'Obteniendo resultado de tramite';
                    try {
                        view.cerrar();
                        Ice.mensajeCorrecto({
                            titulo: 'Tramite rechazado',
                            mensaje: json.message,
                            callback: function(){
                                Ice.index();
                            }
                        });
                    } catch (e) {
                        Ice.generaExcepcion(e, paso2);
                    }
                }
            });
        } catch(e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});
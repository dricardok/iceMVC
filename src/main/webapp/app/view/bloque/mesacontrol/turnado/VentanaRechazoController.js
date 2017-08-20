/**
 * Created by DEORTIZT on 16/08/2017.
 */
Ext.define('Ice.view.bloque.mesacontrol.turnado.VentanaRechazoController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.ventanarechazo',
    
    custom: function(){
        Ice.log('Ice.view.bloque.mesacontrol.turnado.VentanaRechazoController custom');
    },
    
    onTurnar: function(){
        this.turnar();
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
            /*Ice.request({
                mascara: 'Turnando tramite',
                url: Ice.url.bloque.mesacontrol.turnar,
                params: {
                    'params.ntramite' : view.getNtramite(),
                    'params.status': view.getStatus(),
                    'params.comments': values.comments,
                    'params.cdrazrecha': view.getCdrazrecha(),
                    'params.cdusuariDes': view.getCdusuariDes(),
                    'params.cdsisrolDes': view.getCdsisrolDes(),
                    'params.swagente': values.swagente
                },
                success: function (json) {
                    var paso2 = 'Obteniendo resultado de tramite';
                    try {
                        Ice.mensajeCorrecto({
                            titulo: 'Tramite turnado con exito',
                            mensaje: json.message,
                            callback: function(){
                                Ice.index();
                            }
                        });
                    } catch (e) {
                        Ice.generaExcepcion(e, paso2);
                    }
                }
            });*/
        } catch(e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
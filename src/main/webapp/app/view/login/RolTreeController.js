/**
 * Created by jtezva on 5/15/2017.
 */
Ext.define('Ice.view.login.RolTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.roltree',
    
    onSelect: function (me, record) {
        Ice.log('Ice.view.login.RolTreeController.onSelect record:', record);
        var paso = 'Seleccionando rol';
        try {
            Ice.request({
                mascara: paso,
                url: Ice.url.core.seleccionaRol,
                params: {
                    'params.cdsisrol': record.get('cdsisrol')
                },
                success: function (action) {
                    var paso2 = 'Redireccionando...';
                    try {
                        Ice.query('#mainView').getController().redirectTo('roltree.action', true);
                    } catch(e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});
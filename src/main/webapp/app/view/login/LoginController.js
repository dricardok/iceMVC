/**
 * Created by jtezva on 5/15/2017.
 */
Ext.define('Ice.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    
    onSpecialkeyPress: function (field, e) {
        Ice.log('Ice.view.login.LoginController.onSpecialkeyPress args:', arguments);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Procesando key press';
        try {
            if (e.getKey() == e.ENTER && refs && refs.loginbutton && !refs.loginbutton.isDisabled()) {
                me.login();
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onAceptarClic: function () {
        Ice.log('Ice.view.login.LoginController.onAceptarClic');
        this.login();
    },
    
    login: function () {
        Ice.log('Ice.view.login.LoginController.login');
        var me = this,
            paso;
        try {
            paso = 'Validando datos';
            var refs = me.getReferences(),
                form = refs.form,
                values = form.getValues();
            Ice.request({
                mascara: 'Iniciando sesi\u00f3n',
                url: Ice.url.core.login,
                params: {
                    'params.user': values.cdusuari || '',
                    'params.password': values.password || ''
                },
                success: function (action) {
                    var paso2 = 'Redireccionando...';
                    try {
                        Ice.query('#mainView').getController().redirectTo('login.action', true);
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});
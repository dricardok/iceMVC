/**
 * Created by jtezva on 5/15/2017.
 */
Ext.define('Ice.view.login.LoginViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.login',
    
    links: {
        login: {
            reference: 'Ice.view.login.LoginModel',
            create: true
        }
    },
    
    formulas: {
        datosCompletos: function (get) {
            return Boolean(get('login.cdusuari') && get('login.password'));
        }
    }
});
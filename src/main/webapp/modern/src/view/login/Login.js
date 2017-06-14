/**
 * 
 */
Ext.define('Ice.view.login.Login', {
    extend: 'Ext.Container',
    xtype: 'login',
    
    requires: [
        'Ext.form.Panel'
    ],
    
    // validacion y modificacion de parametros
    constructor: function (config) {
        Ice.log('Ice.view.login.Login.constructor config:', config);
        this.callParent(arguments);
    },
    
    // configuracion que no usa parametros
    controller: 'login',
    
    viewModel: 'login',
    
    items: [
        {
            xtype: 'formpanel',
            reference: 'form',
            items: [
                {
                    xtype: 'textfieldice',
                    label: 'Usuario',
                    labelAlign: 'placeholder',
                    name: 'cdusuari',
                    bind: '{login.cdusuari}'
                }, {
                    xtype: 'textfieldice',
                    label: 'Contrase\u00f1a',
                    labelAlign: 'placeholder',
                    inputType: 'password',
                    name: 'password',
                    bind: '{login.password}'
                }, {
                    xtype: 'toolbar',
                    docked: 'bottom',
                    items: [{
                        text: 'Aceptar',
                        iconCls: 'x-fa fa-key',
                        handler: 'onAceptarClic',
                        bind: {
                            hidden: '{!datosCompletos}'
                        }
                    }]
                }
            ]
        }
    ],
    
    // propiedades no ext (se generan getters y setters)
    config: {},
    
    // configuracion que usa parametros (config ya se encuentra copiada en this)
    initialize: function () {
        Ice.log('Ice.view.login.Login.initialize');
        var me = this,
            paso = 'Construyendo pantalla de login';
        try {
            var secciones = Ice.generaComponentes({
                pantalla: 'LOGIN',
                seccion: 'LOGIN'
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent();
    }
});
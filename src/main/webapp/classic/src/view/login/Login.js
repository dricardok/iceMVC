/**
 * 
 */
Ext.define('Ice.view.login.Login', {
    extend: 'Ext.container.Container',
    xtype: 'login',
    
    requires: [
        'Ext.form.Panel',
        'Ext.button.Button'
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
            xtype: 'form',
            reference: 'form',
            bodyPadding: '10px 0px 0px 10px',
            defaults: {
                style: 'margin: 0px 10px 10px 0px;'
            },
            items: [
                {
                    xtype: 'textfieldice',
                    label: 'Usuario',
                    name: 'cdusuari',
                    bind: '{login.cdusuari}',
                    listeners: {
                        specialkey: 'onSpecialkeyPress'
                    }
                }, {
                    xtype: 'textfieldice',
                    label: 'Contrase\u00f1a',
                    inputType: 'password',
                    name: 'password',
                    bind: '{login.password}',
                    listeners: {
                        specialkey: 'onSpecialkeyPress'
                    }
                }
            ],
            buttons: [
                {
                    text: 'Aceptar',
                    reference: 'loginbutton',
                    iconCls: 'x-fa fa-key',
                    handler: 'onAceptarClic',
                    bind: {
                        disabled: '{!datosCompletos}'
                    }
                }
            ]
        }
    ],
    
    // propiedades no ext (se generan getters y setters)
    config: {},
    
    // configuracion que usa parametros (config ya se encuentra copiada en this)
    initComponent: function () {
        Ice.log('Ice.view.login.Login.initComponent');
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
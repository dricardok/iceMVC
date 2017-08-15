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
            bodyPadding: '0 0',
            bodyStyle: 'background: transparent;',
            style: 'min-height:100%; background: url(resources/images/bg_sura_login_small.jpg); background-repeat: no-repeat; background-size: cover;background-position: 20% 0%; !important;',
            cls:'bg_login padding_login',
            items: [
            	{
                    xtype: 'component',
                    reference: 'suraLogo',
                    cls: '',
                    style:'text-align:right;background-color:#0033a0',
                    html: '<div style="padding:20px; float:left;"><img src="resources/images/logo_sura_bco.png"></div>',
                    align:'stretch'
                },
            	
                {
                    xtype: 'textfieldice',
                    label: 'Usuario',
                    labelAlign: 'placeholder',
                    name: 'cdusuari',
                    style:'padding: 0px 20px 0px 20px;',
                    bind: '{login.cdusuari}'
                }, {
                    xtype: 'textfieldice',
                    label: 'Contrase\u00f1a',
                    labelAlign: 'placeholder',
                    inputType: 'password',
                    style:'padding: 0px 20px 0px 20px;',
                    name: 'password',
                    bind: '{login.password}'
                },
                {
                	xtype: 'component',
                	style:'padding: 8px 20px 0px 20px;text-decoration:underline;',
                	html: '<a href="https://www.segurossura.com.mx/Utilidades/templates/unlock.html?"  class="linksura" style="font-size:12px !important;color:#707372 !important; line-height:30px !important;">¿Olvid&oacute; su Contrase&ntilde;a?</a>'
                },
                {
                    xtype: 'toolbar',
                    docked: 'bottom',
                                       
                    items: [{
                        text: 'Ir',                        
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
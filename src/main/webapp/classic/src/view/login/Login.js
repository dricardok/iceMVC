/**
 * 
 */
Ext.define('Ice.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',
    ui: 'ice-window',
    frame: true,
    
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
    style: 'min-height: 100%;padding: 9% 0 0 0; background: url(resources/images/bg_sura_login_small.jpg); background-repeat: no-repeat; background-size: cover;background-position: 0% 0%; !important;',
    bodyStyle: 'background: transparent;',
    maximized: true,
    modal: true,
    closable: false,
    ui:'ice-window',
    title: 'Iniciar Sesión',
    titleAlign: 'center',
    
    
    
    items: [
        {
            xtype: 'form',
            reference: 'form',
            bodyPadding: '0 0',
            width: 415,
            
            cls: '',
            style: 'float:left; left:50%; margin-left: -225px;',
            defaults: {
                style: 'margin: 10px 30px 10px 30px;'
            },
            layout: {
            	type: 'vbox',
            	align:'stretch'
            	
            },
            items: [
            	
            
            	{
                    xtype: 'component',
                    reference: 'suraLogo',
                    cls: 'sura-logo_bco ',
                    style:'text-align:left; padding: 15px 20px 0px 0px !important; background-color:#0033a0',
                    html: '<div class="main-logo log-left"><img src="resources/images/logo_sura_bco.png"></div>',
                    align:'stretch'
                },                 
            
          
                /*
                {
                    iconCls:'x-fa fa-user',
                    ui: 'header',
                    id:'user',
                    style:'padding: 20px, 20px;', 
                    cls: ''
                    
                },*/
                
                
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
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    style: 'padding: 20px 30px !important;', 
                    items: [
                        {
                            xtype: 'checkboxfield',
                            //flex : 1,
                            cls: 'form-panel-font-color rememberMeCheckbox',
                            height: 30,
                            //bind: '{persist}',
                            style: 'font-size; 11px !important; margin-right: 80px;',
                            boxLabel: 'Guardar Contraseña'
                        }, {
                            xtype: 'component',
                            width: 150,
                            //style: 'border: 1px solid red;',
                            html: '<a href="#passwordreset" onclick="return false;" class="linksura" style="font-size:12px !important;color:#707372 !important; line-height:30px !important;">¿Olvid&oacute; su Contrase&ntilde;a?</a>'
                        }
                    ]
                }       
                 
                
                
            ],
            
            buttons: [
                {
                    text: 'Ir',
                    reference: 'loginbutton',
                    iconCls: '',
                    style: 'margin-right:30px !important;',
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
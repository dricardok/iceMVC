Ext.define('Ice.view.cotizacion.AccesoCotizacionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.accesocotizacion',

    onItemClic: function (view, record) {
        Ice.log('Ice.view.cotizacion.AccesoCotizacionController record:', record);
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            dataview = refs.dataview,
            paso = 'Creando ventana de selecci\u00f3n de acceso';
        try {
            var ventana = Ext.create('Ice.view.componente.VentanaIce', {
                title: record.get('dstipsit'),
                
                platformConfig: {
                    desktop: {
                        modal: true,
                        width: 300,
                        style		:	{
                        	margin	:	'0 auto !important',
                        	padding	:	'20px'
                        },
                        items: [
                        	{
                        		xtype		:	'panelice',
                        		title		:	{
                        			text:"Nueva Cotización",
                        			style:'border:0px;font-size:16px;',
                        		},
                                buttonAlign	:	'center',
                                titleAlign	:	'center',
                        		buttons		:	[{
                                    xtype: 'button',
                                    text: 'Ir',
                                    iconCls: 'x-fa fa-plus',
                                    handler: me.onNuevaClic,
                                    width  : '200px'
                                    
                                }]
                        	},
                        	{
                        		
                        		xtype		:	'panelice',
                            	title		:	 {
                        			text:"Recuperar Cotización",
                        			style:'border:0px;font-size:16px;',
                        		},
                            	layout: {
                        	        type: 'vbox',
                        	        align: 'center',
                        	        pack: 'center'
                        	    },
                        		titleAlign	:	'center',
                        		items: [
                                    {
                                        xtype: 'comboice',
                                        label: 'Oficina',
                                        name: 'cdunieco',
                                        catalogo: 'SUCURSALES'
                                    }, {
                                        xtype: 'numberfieldice',
                                        label: 'Cotizaci\u00f3n',
                                        name: 'nmpoliza'
                                    }
                                ]
                        	}
                        	],
                        	buttons: [
                                {
                                    text: 'Recuperar',
                                    iconCls: 'x-fa fa-pencil',
                                    handler: me.onCargarClic
                                }, {
                                    text: 'Cancelar',
                                    ui:'gray',
                                    iconCls: 'x-fa fa-close',
                                    handler: function (btn) {
                                        btn.up('ventanaice').cerrar();
                                    }
                                }
                            ]
                    },
                    '!desktop': {
                        scrollable: true,
                        layout: 'fit',
                        items: [
                        	
                        	{
                        		
                        		xtype		:	'panelpaddingice',
                        		
                        		titleAlign	:	'center',
                        		items: [
                                    {
                                        xtype: 'comboice',
                                        label: 'Oficina',
                                        name: 'cdunieco',
                                        catalogo: 'SUCURSALES'
                                    }, {
                                        xtype: 'numberfieldice',
                                        label: 'Cotizaci\u00f3n',
                                        name: 'nmpoliza'
                                    }
                                ]
                        	}
                        	],
                        	buttons: [
                        		{
                                    xtype: 'button',
                                    text: 'Nueva',
                                    iconCls: 'x-fa fa-plus',
                                    handler: me.onNuevaClic,
                                    width  : '200px'
                                    
                                },
                                {
                                    text: 'Recuperar',
                                    iconCls: 'x-fa fa-pencil',
                                    handler: me.onCargarClic
                                }, {
                                    text: 'Cancelar',
                                    ui:'gray',
                                    iconCls: 'x-fa fa-close',
                                    handler: function (btn) {
                                        btn.up('ventanaice').cerrar();
                                    }
                                }
                            ]
                    }
                },
                
            	buttonAlign	:	'center'
            	
            });
            if(Ice.sesion.cdsisrol == Ice.constantes.roles.AGENTE){
            	Ice.request({
            		url:Ice.url.emision.validaCedulaAgente,
            		params :{
            				'params.cdusuari':Ice.sesion.cdusuari,
            				'params.cdramo':record.get('cdramo'),
            				'params.cdproceso': view.getCdproceso()
            					
            			},
                	success:function(){
                		var paso='Verificando agente';
                		try{
                			ventana.mostrar();
                            ventana.record = record;
                		}catch(e){
                			Ice.manejaExcepcion(e,paso);
                		}
                	}
                });
            }else{
            	ventana.mostrar();
                ventana.record = record;
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    onNuevaClic: function (btn) {
        Ice.log('Ice.view.cotizacion.AccesoCotizacionController.onNuevaClic btn:', btn);
        var me = this,
            paso = 'Dirigiendo a cotizaci\u00f3n';
        try {
            var record = btn.up('ventanaice').record,
                cdramo = record.get('cdramo'),
                cdtipsit = record.get('cdtipsit');
            btn.up('ventanaice').cerrar();
            if (Ice.sesion.cdsisrol === Ice.constantes.roles.AGENTE) {
                var venPer = Ext.create('Ice.view.cotizacion.VentanaPerfilamiento', {
                    cdramo: cdramo,
                    cdtipsit: cdtipsit,
                    listeners: {
                        seleccionarPerfil: function (view, cdptovta, cdgrupo, cdsubgpo, cdperfil, cdunieco) {
                            Ice.log('Ice.view.cotizacion.AccesoCotizacionController args:', arguments);
                            venPer.cerrar();
                            Ice.redirect('cotizacion.action?' +
                                'cdramo='   + cdramo          + '&' +
                                'cdtipsit=' + cdtipsit        + '&' +
                                'cdptovta=' + cdptovta + '&' +
                                'cdgrupo='  + cdgrupo  + '&' +
                                'cdsubgpo=' + cdsubgpo + '&' +
                                'cdperfil=' + cdperfil + '&' +
                                'cdunieco=' + cdunieco + '&' +
                                'nueva=true'
                            );
                        }
                    },
                    buttons: [
                        // ya no se usan porque se convierte en grid
                        // {
                        //     text: 'Aceptar',
                        //     iconCls: 'x-fa fa-check',
                        //     handler: function () {
                        //         var paso2 = 'Accediendo al cotizador';
                        //         try {
                        //             venPer.getController().validar();
                        //             var values = venPer.getController().getValues();
                        //             venPer.cerrar();
                        //             Ice.redirect('cotizacion.action?' +
                        //                 'cdramo='   + cdramo          + '&' +
                        //                 'cdtipsit=' + cdtipsit        + '&' +
                        //                 'cdptovta=' + values.cdptovta + '&' +
                        //                 'cdgrupo='  + values.cdgrupo  + '&' +
                        //                 'cdsubgpo=' + values.cdsubgpo + '&' +
                        //                 'cdperfil=' + values.cdperfil + '&' +
                        //                 'cdunieco=' + values.cdunieco + '&' +
                        //                 'nueva=true'
                        //             );
                        //         } catch (e) {
                        //             Ice.manejaExcepcion(e, paso2);
                        //         }
                        //     }
                        // },
                        {
                            text: 'Cancelar',
                            ui:'gray',
                            iconCls: 'x-fa fa-close',
                            handler: function () {
                                venPer.cerrar();
                            }
                        }
                    ]
                }).mostrar();
            } else {
                Ice.redirect('cotizacion.action?' +
                    'cdramo='   + cdramo + '&' +
                    'cdtipsit=' + cdtipsit);
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    onCargarClic: function (btn) {
        Ice.log('Ice.view.cotizacion.AccesoCotizacionController.onCargarClic btn:', btn);
        var paso = 'Recuperando cotizaci\u00f3n';
        try {
            var ventana = btn.up('ventanaice');
            if (!ventana.down('[name=cdunieco]').getValue() || !ventana.down('[name=nmpoliza]').getValue()) {
                throw 'Favor de introducir sucursal y cotizaci\u00f3n';
            }
            var record = ventana.record,
                cdramo = record.get('cdramo'),
                cdtipsit = record.get('cdtipsit'),
                cdunieco = ventana.down('[name=cdunieco]').getValue(),
                nmpoliza = ventana.down('[name=nmpoliza]').getValue();
            Ice.request({
                mascara: 'Validando cotizaci\u00f3n',
                url: Ice.url.emision.validarCargaCotizacion,
                params: Ice.convertirAParams({
                    cdunieco: cdunieco,
                    cdramo: cdramo,
                    nmpoliza: nmpoliza
                }),
                success: function (action) {
                    var paso2 = 'Procesando cotizaci\u00f3n';
                    try {
                        if (action.params.swexiste !== 'S') {
                            throw 'La cotizaci\u00f3n no existe';
                        }
                        var url;
                        if (action.params.swconfir === 'S') {
                            url = 'emision.action?';
                        } else {
                            url = 'cotizacion.action?';
                        }
                        paso2 = 'Recuperando perfilamiento';
                        Ice.request({
                            mascara: paso2,
                            url: Ice.url.emision.obtenerPerfilamientoPoliza,
                            params: Ice.convertirAParams({
                                cdunieco: cdunieco,
                                cdramo: cdramo,
                                estado: 'W',
                                nmpoliza: nmpoliza,
                                nmsuplem: '0'
                            }),
                            success: function (action2) {
                                var paso3 = 'Redireccionando a pantalla de cotizaci\u00f3n/emisi\u00f3n';
                                try {
                                    ventana.cerrar();
                                    Ice.query('#mainView').getController().redirectTo(url +
                                        'cdunieco=' + cdunieco + '&' +
                                        'cdramo='   + cdramo   + '&' +
                                        'estado='   + 'W'      + '&' +
                                        'nmpoliza=' + nmpoliza + '&' +
                                        'cdtipsit=' + cdtipsit + '&' +
                                        'nmsuplem=' + 0        + '&' +
                                        'cdptovta=' + action2.params.cdptovta + '&' +
                                        'cdgrupo='  + action2.params.cdgrupo  + '&' +
                                        'cdsubgpo=' + action2.params.cdsubgpo + '&' +
                                        'cdperfil=' + action2.params.cdperfil + '&' +
                                        'nueva=false'
                                    );
                                } catch (e) {
                                    Ice.manejaExcepcion(e, paso3);
                                }
                            }
                        });
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
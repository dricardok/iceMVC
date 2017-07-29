/**
 * Created by jtezva on 26/06/2017.
 */
Ext.define('Ice.view.cotizacion.EmisionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.emision',
    
    init: function (view) {
        Ice.log('Ice.view.cotizacion.EmisionController');
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de emisi\u00f3n';
        try {
            me.callParent(arguments);
            
            Ext.defer(function () {
                var paso2;
                try {
                	/*
                    if(Ext.manifest.toolkit === 'classic'){
                        me.abrirVentanaDocs();
                    }*/
                    if (view.getCdunieco() && view.getCdramo() && view.getEstado() && view.getNmpoliza()
                        && !Ext.isEmpty(view.getNmsuplem())) {
                        me.cargar();
                    } else {
                        me.irBloqueSiguiente();
                    }
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 600);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    
    /**
     *
     */
    irBloqueSiguiente: function () {
        Ice.log('Ice.view.cotizacion.EmisionController.irBloqueSiguiente');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Mostrando siguiente bloque';
        try {
            var index = view.getBloqueActual() + 1,
                bloque = view.getBloques()[index],
                tabpanel = view.getReferences().tabpanel,
                bloqueExistente = refs && refs['ref' + index];
            
            if (!bloque) {
                throw 'No existe el bloque';
            }

            var agregarYEnfocarBloque = function (cargar) {
                var paso2 = 'Construyendo siguiente bloque';
                try {
                    if (!bloqueExistente) { // no existe, se crea
                        bloqueExistente = Ext.create({
                            xtype: bloque.name,
                            title: bloque.label,
                            reference: 'ref' + index,
                            indice: index,
                            
                            //scrollable: true,
                            //height: view.getHeight() - (Ice.constantes.toolbarHeight[Ext.manifest.toolkit] * 2), // se restan las barras
                            
                            cdunieco: view.getCdunieco(),
                            cdramo: view.getCdramo(),
                            estado: view.getEstado(),
                            nmpoliza: view.getNmpoliza(),
                            
                            nmsuplem: view.getNmsuplem(),
                            status: view.getStatus(),
                            
                            modulo: view.getModulo(),
                            flujo: view.getFlujo(),
                            cdtipsit: view.getCdtipsit()
                        });
                        
                        tabpanel.add(bloqueExistente);
                    }
                    
                    view.setGuardadoAutomaticoSuspendido(true); // para que no valide el guardado
                    tabpanel.setActiveTab(bloqueExistente);
                    view.setGuardadoAutomaticoSuspendido(false);

                    if (cargar === true) {
                        // ('cargar posterior a irBloqueSiguiente');
                        bloqueExistente.getController().cargar();
                    }
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            };

            if (index > 0) { // si es el segundo bloque (1) o mayor, guardar primero
                var bloqueActual = refs['ref' + (index - 1)];
                bloqueActual.getController().guardar({
                    success: function () {
                        agregarYEnfocarBloque(true);
                    }
                });
            } else {
                agregarYEnfocarBloque();
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    /**
     *
     */
    irBloqueAnterior: function () {
        Ice.log('Ice.view.cotizacion.EmisionController.irBloqueAnterior');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Mostrando bloque anterior';
        try {
            var index = view.getBloqueActual() - 1,
                bloque = view.getBloques()[index],
                tabpanel = view.getReferences().tabpanel,
                bloqueExistente = refs && refs['ref' + index],
                bloqueActual = refs['ref' + view.getBloqueActual()];
            
            if (!bloque || !bloqueExistente) {
                throw 'No existe el bloque';
            }

            bloqueActual.getController().guardar({
                success: function () {
                    view.setGuardadoAutomaticoSuspendido(true); // para que no valide el guardado
                    tabpanel.setActiveTab(bloqueExistente);
                    view.setGuardadoAutomaticoSuspendido(false);
                    // ('cargar posterior a irBloqueAnterior');
                    bloqueExistente.getController().cargar();
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    onTabchangeEvent: function (tabpanel, newCard, oldCard) {
        Ice.log('Ice.view.cotizacion.EmisionController.onTabchangeEvent args:', arguments);
        var me = this,
            view = me.getView(),
            refs = view.getReferences() || {},
            paso = 'Actualizando indice';
        try {
            if (Ext.isEmpty(newCard.indice)) {
                throw 'No se puede actualizar el indice';
            }
            view.setBloqueActual(newCard.indice);
            
            paso = 'Actualizando botones';
            if (refs.anteriorbutton) {
                refs.anteriorbutton[view.getBloqueActual() > 0
                    ? 'show'
                    : 'hide']();
            }
            // if (refs.cotizarbutton) {
            //     refs.cotizarbutton[refs['ref' + (view.getBloques().length - 1)]
            //         ? 'show'
            //         : 'hide']();
            // }
            if (refs.siguientebutton) {
                refs.siguientebutton[view.getBloqueActual() < view.getBloques().length - 1
                    ? 'show'
                    : 'hide']();
            }
          
            if (view.getGuardadoAutomaticoSuspendido() !== true && oldCard) {
                paso = 'Guardando datos';
                var callbackSuccess = function () {
                    var pasoCargar = 'Cargando bloque';
                    try {
                        // ('cargar nuevo card posterior a salvar anterior card');
                        newCard.getController().cargar();

                        // convertir bloque de agrupadores para agente
                        try {
                            newCard.getReferences().gridagrupadores.getController().onVistaAgente();
                        } catch (e) {
                            Ice.logWarn('warning al invocar onVistaAgente en gridagrupadores', e);
                        }
                    } catch (e){
                        Ice.manejaExcepcion(e, pasoCargar);
                    }
                };
                
                var callbackFailure = function () {
                    var paso2 = 'Regresando a paso anterior';
                    try {
                        Ext.defer(function () {
                            view.setGuardadoAutomaticoSuspendido(true);
                            tabpanel.setActiveTab(oldCard);
                            view.setGuardadoAutomaticoSuspendido(false);
                        }, 600); // se da un tiempo de espera para que el tab de modern haga la animacion del original antes del regreso
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                };
                
                oldCard.getController().guardar({
                    success: callbackSuccess,
                    failure: callbackFailure
                });
            } else {
                // convertir bloque de agrupadores para agente
                try {
                    newCard.getReferences().gridagrupadores.getController().onVistaAgente();
                } catch (e) {
                    Ice.logWarn('warning al invocar onVistaAgente en gridagrupadores', e);
                }
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    cargar: function () {
        Ice.log('Ice.view.cotizacion.EmisionController cargar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Cargando cotizaci\u00f3n';
        try {
            if (!view.getCdunieco() || !view.getCdramo() || !view.getEstado() || !view.getNmpoliza() || Ext.isEmpty(view.getNmpoliza())) {
                throw 'Faltan datos para cargar cotizaci\u00f3n';
            }
            
            var comps = [];
            
            for (var i = 0; i < view.getBloques().length; i++) {
                var bloque = view.getBloques()[i];
                
                comps.push(Ext.create({
                    xtype: bloque.name,
                    title: bloque.label,
                    reference: 'ref' + i,
                    indice: i,
                    
                    cdunieco: view.getCdunieco(),
                    cdramo: view.getCdramo(),
                    estado: view.getEstado(),
                    nmpoliza: view.getNmpoliza(),
                    nmsuplem: view.getNmsuplem(),
                    
                    modulo: view.getModulo(),
                    flujo: view.getFlujo(),
                    cdtipsit: view.getCdtipsit()
                }));
            }
            
            refs.tabpanel.add(comps);

            view.setGuardadoAutomaticoSuspendido(true);
            refs.tabpanel.setActiveTab(comps[0]);
            view.setGuardadoAutomaticoSuspendido(false);

            // ('cargar despues de setActiveTab (0)');
            comps[0].getController().cargar();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    onAnteriorclic: function () {
        this.irBloqueAnterior();
    },
    
    
    onSiguienteClic: function () {
        this.irBloqueSiguiente();
    },
    
    
    onCargarClic: function () {
        Ice.log('Ice.view.cotizacion.EmisionController.onCargarClic');
        var me = this,
            view = me.getView(),
            paso = 'Cargando cotizaci\u00f3n';
        try {
            var funcion = function (buttonId, value) {
                if (buttonId === 'ok' && value) {
                    Ice.query('#mainView').getController().redirectTo(
                        'cotizacion.action?cdramo='+view.getCdramo()+'&cdtipsit='+view.getCdtipsit()+'&cdunieco=1&estado=W&nmsuplem=0&nmpoliza=' + value,
                        true);
                }
            };
            if (Ext.manifest.toolkit === 'classic') {
                Ext.MessageBox.prompt('Cargar cotizaci\u00f3n', 'Introduzca el n\u00famero de cotizaci\u00f3n', funcion);
            } else {
                Ext.Msg.prompt('Cargar cotizaci\u00f3n', 'Introduzca el n\u00famero de cotizaci\u00f3n', funcion, this);
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    onCotizarClic: function () {
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Guardando datos';
        try {
        	paso = 'Ejecutando validaciones de integridad...';
			Ice.request({
				url: Ice.url.bloque.ejecutarValidacion,
				params: {
					'params.cdunieco': view.getCdunieco(),
	    			'params.cdramo'  : view.getCdramo(),
	    			'params.estado'  : view.getEstado(),
	    			'params.nmpoliza': view.getNmpoliza(),
	    			'params.nmsituac': 0,
					'params.nmsuplem': view.getNmsuplem(),
					 bloques: ["B0"]
				},
				success : function(json) {
					Ice.log('success...', json);
					Ice.log(json);
					var paso3 = 'Evaluando validaciones';
					try {
    					var list = json.list || [];
    					if (list.length > 0) {
    						
    						var hayErroresValidacion = false;
							list.forEach(function (it) {
								if ((it.tipo + '').toLowerCase() == 'error') {
									hayErroresValidacion = true;
								}
							});
    						
							Ext.create('Ice.view.bloque.VentanaValidaciones', {
								lista: list,
				                buttons: [
				                    {
				                    	hidden: hayErroresValidacion,
				                        text: 'Continuar',
				                        iconCls: 'x-fa fa-forward',
				                        handler: function (bot) {
				                        	bot.up('ventanavalidaciones').cerrar();
				                        	me.tarificar();
				                        }
				                    }
				                ]
							}).mostrar();
							
							if(hayErroresValidacion) {
								throw "Favor de revisar los errores de validaci\u00F3n";
							}
    					} else {
    						me.tarificar();
    					}
			        } catch (e) {
			            Ice.manejaExcepcion(e, paso3);
			        }
				}
			});
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    tarificar: function () {
        var me = this,
        view = me.getView(),
        refs = view.getReferences(),
        paso = 'Tarificando';
        Ice.log(paso);
        try {
            var callbackSuccess = function() {
                var paso2 = 'Tarificando';
                try {
                    Ice.request({
                        mascara: paso2,
                        url: Ice.url.emision.tarificar,
                        params: {
                            'params.cdunieco': view.getCdunieco(),
                            'params.cdramo': view.getCdramo(),
                            'params.estado': view.getEstado(),
                            'params.nmpoliza': view.getNmpoliza(),
                            'params.nmsuplem': view.getNmsuplem(),
                            'params.nmsituac': '0'
                        },
                        success: function (action) {
                            var paso3 = 'Mostrando tarifa';
                            try {
                                me.mostrarPrimas();
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso3);
                            }
                        }
                    });
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            };
            
            refs.tabpanel.getActiveTab().getController().guardar({
                success: callbackSuccess
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    mostrarPrimas: function () {
        Ice.log('Ice.view.cotizacion.EmisionController.mostrarPrimas');
        var me = this,
            paso = 'Recuperando tarifa';
        try {
//            return;
            var view = me.getView();
            
            Ext.create({
                xtype: 'ventanaprimas',
                
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                
                buttons: [
                    {
                        text: 'Confirmar Emisión',
                        iconCls: 'x-fa fa-key',
                        handler: function (bot) {
                            bot.up('ventanaprimas').cerrar();
                            
                            // me.emitir();
                            
                            me.validaTipoPago();
                        }
                    }, {
                        text: 'Modificar',
                        iconCls: 'x-fa fa-pencil',
                        handler: function (bot) {
                            bot.up('ventanaprimas').cerrar();
                        }
                    }
                ]
            }).mostrar();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
        
    emitir: function () {
        Ice.log('controller.emision emitir');
        var me = this,
            view = me.getView(),
            paso = 'Confirmando p\u00f3liza';
        
        var emisonResult;
        
        try {
            Ice.request({
                mascara: paso,
                timeout: 1000*60*5,
                url: Ice.url.emision.emitir,
                params: Ice.convertirAParams({
                    cdunieco: view.getCdunieco(),
                    cdramo: view.getCdramo(),
                    estado: view.getEstado(),
                    nmpoliza: view.getNmpoliza()
                }),
                success: function (action) {
                	
                	emisonResult = action.params;
                	
                	var p, error;
                	
                	if (Ice.classic()) {
                	
                		 p = Ext.create('Ext.ProgressBar', {					                		   
                			 width: '100%',
                			 style: 'margin-top: 10px'
                		 });
                		 
                	} else {
                		
                		 p = Ext.create({
                			 xtype: 'panelice',
                			 width: '100%',
                			 style: 'margin-top: 10px',
                			 html:  'Generando documentos...',
                			 
                			 wait: function(params){
                				 
                			 }            		
                		
                		 });					                		
                	}
                	
                	var error = Ext.create({
               		 	xtype: 'panelice',
               		 	hidden: true,
               		 	width: '100%',
               		 	style: 'margin-top: 10px',
               		 	html:  '<p> Error al generar documentos, consulte a soporte tecnico </p>'
                	});
                	
                    var ventana = Ext.create('Ice.view.componente.VentanaIce', {
                        platformConfig: {
                            desktop: {
                                width: 400
                            }
                        },
                        reference: 'ventanaavisoemision',
                        modal: true,
                        closable: false,
                        title: 'Aviso',
                        //html: '<div style="padding:10px;">Se emiti&oacute; la p&oacute;liza ' + action.params.nmpoliza + '</div>',
                        items: [
                        	{
                        		xtype: 'panelice',
                        		style: 'padding: 10px;',
                        		items: [
                        			{	
                        				xtype: 'panelice',
                        				html: 'Se emiti&oacute; la p&oacute;liza ' + action.params.nmpoliza + ''
                        			},
                        			error,
		                        	p					                        			
                        		]					                        		
                        	}
                        ],
                        buttons: [
                            {
                                text: 'Ver documentos',
                                reference: 'btndocumentosemision',
                                disabled: true,
                                iconCls: 'x-fa fa-files-o',
                                handler: function(boton){
                                    
                                	
                                	me.abrirVentanaDocumentos(action.params);
                                	
                                	/*
                                	var ventanaDocs = Ext.create('Ice.view.bloque.documentos.VentanaDocumentos',{
                                        cdunieco: view.getCdunieco(),
                                        cdramo: view.getCdramo(),
                                        estado: 'M',
                                        nmpoliza: action.params.nmpoliza
                                    });
                                    
                                	ventanaDocs.mostrar();
                                    
                                    if (Ice.classic()) {
                                        Ext.defer(function () {
                                            ventanaDocs.setCollapsed(true);
                                            ventanaDocs.showAt(Ext.getBody().getWidth() - (650 + 40), 40);
                                        }, 600);
                                    }
                                    me.disabled();
                                    */
                                },
                            }, {
                            	text: 'Generar documentos',
                            	reference: 'btngenerardocumentos',
                            	disabled: true,
                            	hidden: true,
                            	iconCls: 'x-fa fa-files-o',
                            	handler: function () {
                            		
                            		me.generarDocumentos(ventana, p, action.params);
                            		
                            	}
                            }, {
                                text: 'Inicio',
                                iconCls: 'x-fa fa-home',
                                handler: function(boton) {
                                    //me.up('ventanaice').cerrar();
                                    Ice.index();
                                    Ice.cerrarVentanas();
                                } 
                            }
                        ]
                    });
                    ventana.mostrar();                    
                    p.wait({text: 'Generando documentos...'});
                    me.generarDocumentos(ventana, p, emisonResult, error)
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    validaTipoPago: function (params) {
    	Ice.log('Ice.view.cotizacion.EmisionController.validaTipoPago');
    	var me = this,
    		view = me.getView(),
    		paso = 'Validando forma de pago';
    	
    	try{
    		var reqParams = Ice.convertirAParams({
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                nmsuplem: view.getNmsuplem()
            });
    		
    		Ice.request({
    			mascara: paso,
    			timeout: 1000*60*5,
    			url: Ice.url.emision.obtieneTvalopol,
    			params: reqParams,
    			failure: (params && params.failure) || null,
    			success: function (action) {
    				var paso2 = 'Revisando forma de pago';
    				try{    					
    					if (action.params && action.params.otvalor03) {
    						
    						if(action.params.otvalor03 != 'N'){
    							
    							me.emitir();
    						}
    						else if(Ice.constantes.roles.AGENTE==Ice.sesion.cdsisrol) {
    							
    							me.mostrarVentanaPago();
    						}
    					}
    				}catch(e) {
    					 Ice.manejaExcepcion(e, paso2);
    				}    				
    			}
    		});
    		
    	}catch(e){
    		Ice.manejaExcepcion(e, paso);
    	}
    },
	
    mostrarVentanaPago: function () {
    	Ice.log('Ice.view.cotizacion.EmisionController.mostraVentanaPago');
    	var me = this,
		view = me.getView(),
		paso = 'Validando forma de pago';
    	try {
    		Ext.create('Ice.view.cotizacion.VentanaPagoTarjeta', {
    			cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                nmsuplem: view.getNmsuplem(),
                
                buttons: [
                    {
                        text: 'Pagar',
                        iconCls: 'x-fa fa-dollar',
                        handler: function (boton) {
                        	var ventana = boton.up('ventanapagotarjeta');
                        	
                        	me.pagar(ventana);
                        }
                    }, {
                        text: 'Modificar',
                        iconCls: 'x-fa fa-pencil',
                        handler: function (boton) {
                            boton.up('ventanapagotarjeta').cerrar();
                        }
                    }
                ]
    		}).mostrar();
    	}catch(e) {
    		Ice.manejaExcepcion(e, paso);
    	}
    }, 
    
    pagar: function (ventana) {
    	Ice.log('Ice.');
    	var me = this,
    		view = ventana,
    		form = ventana.down('form'),
		//ref  = me.getRefItems('formpagotarjeta'),
    	paso = "Realizando Pago";
    	    	
    	try {
    		combobanco = Ice.query('[name=cdbanco]', form);			
			
			//Ice.validarFormulario(view);					
			
			Ice.request({
	            mascara: paso,
	            timeout: 1000*60*5,
	            url: Ice.url.emision.realizarPago,
	            params: Ice.convertirAParams({
	                cdunieco: view.getCdunieco(),
	                cdramo: view.getCdramo(),
	                estado: view.getEstado(),
	                nmpoliza: view.getNmpoliza(),
	                nmsuplem: view.getNmsuplem(),
	                cdbanco: form.getValues().cdbanco,
	                dsbanco: combobanco.getRawValue(),
	                nmtarjeta: form.getValues().nmtarjeta,
	                codseg: form.getValues().codseg,
	                fevencm: form.getValues().fevencm,
	                fevenca: form.getValues().fevenca,
	                nombre: form.getValues().nombre,
	                email: form.getValues().email	                
	            }),
	            success: function (action) {	            	
	            	
	            	ventana.cerrar();
	            	// Ice.mensajeCorrecto('Pago autorizado ');
	            	
	                me.emitir();
	                
	            },
	            failure: function (action) {
	            	
	            	ventana.cerrar();
	            	Ice.mensajeCorrecto('Transaccion rechazada' + action.params.message);
	            }
	        });			
			
		} catch(e) {
			Ice.manejaExcepcion(e, paso);
		}
    },
    
    abrirVentanaDocs: function(){
        Ice.log('controller.emision emitir');
        var me = this,
            view = me.getView(),
            paso = 'Confirmando p\u00f3liza';
        try {
            var ventana = Ext.create('Ice.view.bloque.documentos.VentanaDocumentos',{
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                nmsuplem: view.getNmsuplem()
            });
            ventana.mostrar();
            if (Ice.classic()) {
                Ext.defer(function () {
                    ventana.setCollapsed(true);
                    ventana.showAt(Ext.getBody().getWidth() - (650 + 40), 40);
                }, 600);
            }
        } catch (e){
            Ice.manejaExcepcion(e);
        }
    },

    abrirVentanaDocumentos: function (params) {
		Ice.log('Ice.view.cotizacion.EmisionController.generarDocumentos');
		var me = this,
			view = this.getView(),
			paso = 'abrir ventana documentos de tarificacion';        
        try {
        	
        	var ventanaDocs = Ext.create('Ice.view.bloque.documentos.VentanaDocumentos', {
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: 'M',
                nmpoliza: params.nmpoliza
            });
        	ventanaDocs.mostrar();
            
            /*
            if (Ice.classic()) {
                Ext.defer(function () {
                    ventana.setCollapsed(true);
                    ventana.showAt(Ext.getBody().getWidth() - (650 + 40), 40);
                }, 600);
            }
            */
        } catch( e ) {
        	Ice.manejaExcepcion(e, paso);
        }
	},
	
	generarDocumentos: function (ventana, pbar, params, error) {
		Ice.log('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporalController.generarDocumentos');
		var me = this,
			view = this.getView(),
			paso = 'Generar documentos';
		
		try {
			
			//alert("");
			pbar.show();
			
			var reqParams = Ice.convertirAParams({
				cdunieco: view.getCdunieco(),
				cdramo: view.getCdramo(),
				estado: 'M',
				nmpoliza: params.nmpoliza,
				iscotizacion: true
			});
			
			Ice.request({
				url: Ice.url.emision.generarDocumentos,
				timeout: 1000*60*5,
				background: true,
				params: reqParams,
				failure: function () {
					
					pbar.hide();
					error.show();
					Ice.query('button', ventana)[0].disabled();
					//Ice.query('button', ventana)[1].show();
					
					
				},
				success: function (action) {
					
					pbar.hide();
					error.setHtml('<p>Documentos generados</p>');
					error.show();
					//Ice.query('button', ventana)[1].hide();
					Ice.query('button', ventana)[0].enable();
					
				}
			});
			
			
		}catch(e){
			Ice.manejaExcepcion(e, paso);
		}
	}
});
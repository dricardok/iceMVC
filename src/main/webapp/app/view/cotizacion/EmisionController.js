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
                    me.puedeEmitir();
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
                    	me.puedeEmitir();
                        agregarYEnfocarBloque(true);
                    }
                });
            } else {
                agregarYEnfocarBloque();
            }
            try{
            	bloqueExistente.getReferences().gridagrupadores.getStore().load();
            }catch(e){
            	Ice.logWarn('warning al invocar load grid agrupadores en gridagrupadores', e);
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
                	me.puedeEmitir();
                    view.setGuardadoAutomaticoSuspendido(true); // para que no valide el guardado
                    tabpanel.setActiveTab(bloqueExistente);
                    view.setGuardadoAutomaticoSuspendido(false);
                    // ('cargar posterior a irBloqueAnterior');
                    bloqueExistente.getController().cargar();
                }
            });
            try{
            	bloqueExistente.getReferences().gridagrupadores.getStore().load();
            }catch(e){
            	Ice.logWarn('warning al invocar load grid agrupadores en gridagrupadores', e);
            }
            
            
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
                            me.puedeEmitir();
                        } catch (e) {
                            Ice.logWarn('warning al invocar onVistaAgente en gridagrupadores', e);
                        }
                        try{
                        	newCard.getReferences().gridagrupadores.getStore().load();
                        }catch(e){
                        	Ice.logWarn('warning al invocar load grid agrupadores en gridagrupadores', e);
                        }
                        me.puedeEmitir();
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
                    me.puedeEmitir();
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
			me.revisarCoaseguro();
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
                            Ice.ejecutarValidacionesEventoPantalla (view.getCdunieco(), 
             					   view.getCdramo(),
             					   view.getEstado(),
             					   view.getNmpoliza(), 
             					   view.getNmsuplem(), 
             					   'EMISION', 'ANTES_EMITIR', 
             					   view.getFlujo(), 
             					   function(){
                            			me.validaTipoPago();
                  				   }
                     	);
                            
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
        
    emitir: function (list, params) {
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
                    nmpoliza: view.getNmpoliza(),
                    ntramite: view.getFlujo().ntramite,
                    
                    email: params && params.email ? params.email : null,
         	        nmtarjeta: params && params.nmtarjeta ? params.nmtarjeta : null,
         	        orderId: list && list.orderId ? list.orderId : null,
         	        authCode: list && list.authCode ? list.authCode : null,
         	        nmcotizacion: params && params.nmpoliza ? params.nmpoliza : null
                }),
                success: function (action) {
                	var p, error, paso2 = 'Mostrando resultado de emisi\u00f3n';
                	try {
                        emisonResult = action.params;
                        
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
                                },
                                // 2017/09/04 - jtezva - se comenta porque no se usa:
                                // {
                                //     text: 'Generar documentos',
                                //     reference: 'btngenerardocumentos',
                                //     disabled: true,
                                //     hidden: true,
                                //     iconCls: 'x-fa fa-files-o',
                                //     handler: function () {
                                //         me.generarDocumentos(ventana, p, action.params);
                                //     }
                                // }, 
                                {
                                    text: 'Inicio',
                                    iconCls: 'x-fa fa-home',
                                    reference: 'botonIrInicio',
                                    disabled: true,
                                    handler: function(boton) {
                                        //me.up('ventanaice').cerrar();
                                        Ice.index();
                                        Ice.cerrarVentanas();
                                    } 
                                }
                            ]
                        });
                        
                        Ice.ejecutarValidacionesEventoPantalla (
                        	/*
                        	view.getCdunieco(), 
                            view.getCdramo(),
                            view.getEstado(),
                            view.getNmpoliza(), 
                            view.getNmsuplem(),
                            */
                        	emisonResult.cdunieco,
                        	emisonResult.cdramo,
                        	emisonResult.estado,
                        	emisonResult.nmpoliza,
                        	emisonResult.nmsuplem,
                            'EMISION', 'DESPUES_EMITIR', 
                            view.getFlujo(), 
                            function(){
                                    
                                    ventana.mostrar();                    
                                    p.wait({text: 'Generando documentos...'});
                                    me.generarDocumentos(ventana, p, emisonResult, error)
                            }
                        );
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
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
    		//form = ventana.down('form'),
    		form = ventana.getReferences().formpagotarjeta,
			//ref  = me.getRefItems('formpagotarjeta'),
	    	paso = "Realizando Pago";
    	    	
    	try {
    		combobanco = form.getReferences().cdbanco;			
			
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
	            	
	                me.emitir(action.list[0], action.params);
	                
	            },
	            failure: function (action) {
	            	
	            	ventana.cerrar();
	            	Ice.mensajeError('Transaccion rechazada: ' + action.message);
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
			pbar.show();
			
			var reqParams = Ice.convertirAParams({
				cdunieco: view.getCdunieco(),
				cdramo: view.getCdramo(),
				estado: 'M',
				nmpoliza: params.nmpoliza,
				iscotizacion: 'false',
				cdtipsup: '90',
				ntramite: view.getFlujo().ntramite
			});
			Ice.request({
				url: Ice.url.emision.generarDocumentos,
				timeout: 1000*60*5,
				background: true,
				params: reqParams,
				failure: function () {
					try {
						pbar.hide();
						error.show();
						Ice.query('button', ventana)[0].disabled();
						//Ice.query('button', ventana)[1].show();
					} catch (e) {
						Ice.logWarn('warning al querer actualizar estatus de barra de generacion de docs', e);
					}
				},
				success: function (action) {
					Ice.log(action);
					try {
						Ice.log("reqParams ", reqParams);
                        Ice.ejecutarValidacionesEventoPantalla (
                        	/*	
                            view.getCdunieco(), 
                            view.getCdramo(),
                            view.getEstado(),
                            view.getNmpoliza(), 
                            view.getNmsuplem(),
                            */
                        	params.cdunieco,
                        	params.cdramo,
                        	params.estado,
                        	params.nmpoliza,
                        	params.nmsuplem,
                            'EMISION', 'DESPUES_DOCS_EMISION', 
                            view.getFlujo(), 
                            function () {
                                var paso3 = 'Recuperando usuario impresi\u00f3n';
                                try {
                                    var paramsDespachadorImpreso = Ice.flujoToParams(view.getFlujo(), {
                                        'params.cdvalidafk': 'DESPACHADOR',
                                        'params.jsvalida': 'DESPACHADOR'
                                    });
                                    paramsDespachadorImpreso['flujo.aux'] = '34';
                                    Ice.request({
                                        url: Ice.url.bloque.mesacontrol.ejecutarValidacion,
                                        mascara: paso3,
                                        params: paramsDespachadorImpreso,
                                        success: function (action2) {
                                            // action.params.salida
                                            var paso4 = 'Turnando a impresi\u00f3n';
                                            try {
                                                if (!action2.params || Ext.isEmpty(action2.params.salida) ||
                                                    action2.params.salida.indexOf('*') === -1) {
                                                    throw 'No se pudo recuperar el usuario para impresi\u00f3n';
                                                }
                                                var turnarParams = Ice.flujoToParams(view.getFlujo());
                                                turnarParams['flujo.aux'] = action2.params.salida.substring(1);
                                                Ice.request({
                                                    url: Ice.url.bloque.mesacontrol.turnar,
                                                    mascara: paso4,
                                                    params: turnarParams,
                                                    success: function (action3) {
                                                        var paso5 = 'Mostrando resultado de documentos';
                                                        try {
                                                            pbar.hide();
                                                            error.setHtml('<p>Documentos generados</p>');
                                                            error.show();
                                                            //Ice.query('button', ventana)[1].hide();
                                                            Ice.query('button', ventana)[0].enable(); // boton de Ver documentos
                                                            Ice.query('button', ventana)[1].enable(); // boton de Inicio

                                                            Ice.confirm('Marcar impresi\u00f3n',
                                                                '\u00bfDesea marcar el tr\u00e1mite como impreso\u003f',
                                                                function () {
                                                                    var paso6 = 'Marcando impresi\u00f3n';
                                                                    try {
                                                                        var turnarParams2 = Ice.flujoToParams(view.getFlujo());
                                                                        turnarParams2['flujo.aux'] = '3';
                                                                        Ice.request({
                                                                            url: Ice.url.bloque.mesacontrol.turnar,
                                                                            mascara: paso6,
                                                                            params: turnarParams2,
                                                                            success: function () {
                                                                                Ice.mensajeCorrecto('Tr\u00e1mite finalizado con \u00e9xito');
                                                                            }
                                                                        });
                                                                    } catch (e) {
                                                                        Ice.manejaExcepcion(e, paso6);
                                                                    }
                                                                });
                                                        } catch (e) {
                                                            Ice.manejaExcepcion(e, paso5);
                                                        }
                                                    }
                                                });
                                            } catch (e) {
                                                Ice.manejaExcepcion(e, paso4);
                                            }
                                        }
                                    });
                                } catch (e) {
                                    Ice.manejaExcepcion(e, paso3);
                                }
                            }
                        );
					} catch (e) {
						Ice.logWarn('warning al querer actualizar estatus de barra de generacion de docs', e);
					}					
				}
			});
			
			
		}catch(e){
			Ice.manejaExcepcion(e, paso);
		}
    },
    
    revisarCoaseguro: function(){
        var paso = 'Revisando coaseguro',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        Ice.request({
            mascara: paso,
            url: Ice.url.bloque.datosGenerales.obtenerCoaseguroPoliza,
            params: {
                'params.cdunieco': view.getCdunieco(),
                'params.cdramo': view.getCdramo(),
                'params.estado': view.getEstado(),
                'params.nmpoliza': view.getNmpoliza(),
                'params.nmsuplem': view.getNmsuplem()
            },
            success: function (action) {
                var paso2 = 'Obteniendo coaseguro';
                try {
                    if(action.params.cdtipcoa == 'P'){
                        var pantallaExclusionesCoaseguro = Ext.create('Ice.view.bloque.coaseguro.VentanaExclusionesCoaseguro',{
                            modal: true,
                            cdunieco: view.getCdunieco(),
                            cdramo: view.getCdramo(),
                            estado: view.getEstado(),
                            nmpoliza: view.getNmpoliza(),
                            nmsuplem: view.getNmsuplem(),
                            buttons: [
                                {
                                    text: 'Aceptar',
                                    iconCls: 'x-fa fa-save',
                                    handler: function(){
                                        pantallaExclusionesCoaseguro.cerrar();
                                        me.cotizar();
                                    }
                                }
                            ]
                        });
                        pantallaExclusionesCoaseguro.mostrar();
                    } else {
                        me.cotizar();
                    }
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }
        });
    },

    cotizar: function(){
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
    
    puedeEmitir : function(){
    	var me = this,
        view = me.getView(),
        refs = view.getReferences(),
        paso = 'Preguntando si puede emitir';
    	try{
    		var data = {
    				'params.cdunieco': view.getCdunieco(),
        			'params.cdramo': view.getCdramo(),
        			'params.estado': view.getEstado()?view.getEstado().toUpperCase():view.getEstado(),
        			'params.nmpoliza': view.getNmpoliza(),
        			'params.nmsuplem': view.getNmsuplem()
    		};
    		Ice.request({
        		url		:	Ice.url.emision.puedeEmitir,
        		params	:	data,
        		success	:	function(data){
        			var paso = 'Respuesta de puede emitir.';
        			try{
        				var puedeEmitir = data.emitir === 'S';
        				refs.cotizarbutton.setHidden(!puedeEmitir);
        				var list = data.list || [];
						if (list.length != 0) {
							Ext.create('Ice.view.bloque.VentanaValidaciones', {
								lista: list
							}).mostrar();
						
						}
        			}catch(e){
        				Ice.manejaExcepcion(e,paso);
        			}
        		}
        		
        	});
    	}catch(e){
    		Ice.manejaExcepcion(e,paso)
    	}
    	
    }
});
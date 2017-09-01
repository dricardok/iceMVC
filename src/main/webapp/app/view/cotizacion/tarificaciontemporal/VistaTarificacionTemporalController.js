Ext.define('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporalController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.tarificaciontemporal',
	
	onItemClic: function (node, rec, item, index, e) {
		Ice.log('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporalController.onItemClic args:', arguments);
		var me = this,
			view = this.getView(),
			paso = 'Recuperando tarifa temporal';
		try {
			Ext.create({
				xtype: 'ventanatarifastemporales',
				
				cdunieco: view.getCdunieco(),
				cdramo: view.getCdramo(),
				estado: view.getEstado(),
				nmpoliza: view.getNmpoliza(),
				cdperpag: rec.get('cdperpag'),
				cdtipsit: view.getCdtipsit(),

				// perfilamiento
                cdptovta: view.getCdptovta(),
                cdgrupo: view.getCdgrupo(),
                cdsubgpo: view.getCdsubgpo(),
                cdperfil: view.getCdperfil(),
				
				buttons: [
					{
						text: 'Confirmar forma de pago',
	                    iconCls: 'x-fa fa-key',
						handler: function (boton) {
							var paso = 'Tarificando el plan seleccionado'; 							
							//me.up('ventanatarifastemporales').cerrar();
							try {
								// Tarifincando cotizacion con el plan seleccionado y redirecconando a emitir
								Ice.request({
					                mascara: paso,
									timeout: 1000*60*5,
					                url: Ice.url.emision.tarificarPlan, 
					                params: Ice.convertirAParams({
										cdunieco: view.getCdunieco(),
										cdramo: view.getCdramo(),
										estado: view.getEstado(),
										nmpoliza: view.getNmpoliza(),
										nmsuplem: view.getNmsuplem(),					                     
										cdtipsit: view.getCdtipsit(),					                        
										cdperpag: rec.get('cdperpag'),
										ntramite: view.getFlujo().ntramite || ''
									}),
					                success: function (action) {
										
										if (action.flujo && action.flujo.ntramite) {
											view.setFlujo(action.flujo);
											view.fireEvent('tramiteGenerado', view, action.flujo);
										}
										
					                	boton.up('ventanatarifastemporales').cerrar();
					                	
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
					                			 style: 'margin-top: 30px',
					                			 html:  'Generando documentos...',
					                			 
					                			 wait: function(params) {
					                				 
					                				
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
					                        reference: 'ventanadocumentoscotizacion',
					                        modal: true,
					                        closable: false,
					                        title: 'Aviso',
					                        //html: '<div style="padding:10px;">Se cotiz&oacute; la p&oacute;liza ' + action.params.nmpoliza + '<div id="msgdocume"><p><p>Generando documentos...</p></div></div>',
					                        items: [
					                        	{
					                        		xtype: 'panelice',
					                        		style: 'padding: 10px;',
					                        		items: [
					                        			{	
					                        				xtype: 'panelice',
					                        				html: 'Se cotiz&oacute; la p&oacute;liza ' + action.params.nmpoliza + ''
					                        			},
					                        			error,
							                        	p					                        			
					                        		]					                        		
					                        	}
					                        ],
					                        buttons: [
					                            {
					                                text: 'Ver documentos',
					                                reference: 'btndocumentoscotizacion',
					                                disabled: true,
					                                iconCls: 'x-fa fa-files-o',
					                                handler: function (boton) {					                                	
					                                	
					                                    me.abrirVentanaDocumentos();					                                    	
					                                    
					                                }, 
					                            }, {
					                            	text: 'Generar documentos',
					                            	reference: 'btngenerardocumentos',
					                            	disabled: true,
					                            	hidden: true,
					                            	iconCls: 'x-fa fa-files-o',
					                            	handler: function () {
					                            		
					                            		me.generarDocumentos(ventana);
					                            		
					                            	}
					                            }, {
					                                text: 'Continuar emisi&oacute;n',
					                                iconCls: 'x-fa fa-key',
					                                handler: function (boton) {
					                                    /*
					                                	me.up('ventanaice').cerrar();
					                                    */   
														Ice.ejecutarValidacionesEventoPantalla (view.getCdunieco(), 
														    view.getCdramo(),
															view.getEstado(),
															view.getNmpoliza(), 
															view.getNmsuplem(), 
															'COTIZACION', 'ANTES_PROCEDER_EMISION', 
															view.getFlujo(), 
															function(){
																var paso;
																try {
																	paso = 'Recuperando referencia';
																	Ice.request({
																		url: Ice.url.bloque.mesacontrol.ejecutarValidacionPorReferencia,
																		params: {
																			'params.ntramite': view.getFlujo().ntramite,
																			'params.referencia': 'DESDE_COTI_AGENTE'
																		},
																		success: function (action) {
																			var paso2 = 'Recuperando acci\u00f3n de referencia';
																			try {
																				if (!action.list || action.list.length === 0) {
																					throw 'No hay referencia';
																				}
																				if (action.list.length > 1) {
																					throw 'Referencia duplicada';
																				}
																				var ref = action.list[0];
																				Ice.cargarAccionesEntidad(ref.cdtipflu, ref.cdflujomc, 'V', ref.cdvalida, ref.webid, function (lista) {
																					if (lista.length === 0) {
																						throw 'No hay acci\u00f3n para la referencia';
																					} else if (lista.length > 1) {
																						throw 'Acci\u00f3n para la referencia duplicada';
																					}

																					Ice.query('#mainView').getController().redirectTo('emision.action?' +
																						'flujo.cdtipflu='  + view.getFlujo().cdtipflu  + '&' +
																						'flujo.cdflujomc=' + view.getFlujo().cdflujomc + '&' +
																						'flujo.tipoent='   + lista[0].TIPODEST         + '&' +
																						'flujo.claveent='  + lista[0].CLAVEDEST        + '&' +
																						'flujo.webid='     + lista[0].WEBIDDEST        + '&' +
																						'flujo.ntramite='  + view.getFlujo().ntramite  + '&' +
																						'flujo.status='    + view.getFlujo().status    + '&' +
																						'flujo.aux='       + Ice.nvl(lista[0].AUX)     + '&' +
																						'flujo.cdunieco='  + view.getFlujo().cdunieco  + '&' +
																						'flujo.cdramo='    + view.getFlujo().cdramo    + '&' +
																						'flujo.estado='    + view.getFlujo().estado    + '&' +
																						'flujo.nmpoliza='  + view.getFlujo().nmpoliza  + '&' +
																						'flujo.nmsituac='  + view.getFlujo().nmsituac  + '&' +
																						'flujo.nmsuplem='  + view.getFlujo().nmsuplem  + '&' +
																						'cdtipsit=' + view.getCdtipsit() + '&' +
																						// perfilamiento
																						'cdptovta=' + view.getCdptovta() + '&' +
																						'cdgrupo='  + view.getCdgrupo()  + '&' +
																						'cdsubgpo=' + view.getCdsubgpo() + '&' +
                                                                                        'cdperfil=' + view.getCdperfil(), true);
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
															}
														);
					                                }
					                            }
					                        ]
					                    });
					                    ventana.mostrar();					                    
					                    p.wait({text: 'Generando documentos...'});
					                    me.generarDocumentos(ventana, p, error);
					                    
					                    
					                }
					            });
							} catch (e) {
								Ice.manejaExcepcion(e, paso);
							}
						}
					}, {
						text: 'Cerrar',
						iconCls: 'x-fa fa-close',
						ui:'gray',
						handler: function (boton) {
							boton.up('ventanatarifastemporales').cerrar();
						}
					}
				]
			}).mostrar();	
		} catch(e) {
			Ice.manejaExcepcion(e, paso);
		}
	},
	
	
	abrirVentanaDocumentos: function () {
		Ice.log('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporalController.generarDocumentos');
		var me = this,
			view = this.getView(),
			paso = 'abrir ventana documentos de tarificacion';        
        try {
        	
            var ventana = Ext.create('Ice.view.bloque.documentos.VentanaDocumentos', {
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                nmsuplem: view.getNmsuplem()
            });
            ventana.mostrar();
            
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
	
	generarDocumentos: function (ventana, pbar, error) {
		Ice.log('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporalController.generarDocumentos');
		var me = this,
			view = this.getView(),
			paso = 'Generar documentos';
		
		try {
			
			pbar.show();
			
			var reqParams = Ice.convertirAParams({
				cdunieco: view.getCdunieco(),
				cdramo: view.getCdramo(),
				estado: view.getEstado(),
				nmpoliza: view.getNmpoliza(),
				iscotizacion: false
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
					}catch(e){
						Ice.logWarn('warning al querer actualizar estatus de barra de generacion de docs', e);
					}
					
				},
				success: function (action) {
					Ice.log(action);
					try {
						pbar.hide();					
						error.setHtml('<p>Documentos generados</p>');
						error.show();
						//Ice.query('button', ventana)[1].hide();
						Ice.query('button', ventana)[0].enable();
					}catch(e){
						Ice.logWarn('warning al querer actualizar estatus de barra de generacion de docs', e);
					}
					
				}
			});
			
			
			
		}catch(e){
			Ice.manejaExcepcion(e, paso);
		}
	}
});
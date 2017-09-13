/**
 * Created by DCACORDE on 5/23/2017.
 */
Ext.define('Ice.view.bloque.CoberturasController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.bloquecoberturas',

	agregarCobertura: function (me) {
		var paso = "Generando ventana para añadir cobertura";
		try {
			var me = this,
			    view = me.getView(),
				gridCoberturas = view.down("[xtype=gridpanel]");
			Ice.log("gridCoberturas:", gridCoberturas);

			paso = "Consultando datos";
			var comps = Ice.generaComponentes({
	            pantalla: 'COBERTURAS',
	            seccion: 'COBERTURAS_AGREGABLES',
	            modulo: view.getModulo() || '',
	            estatus: (view.getFlujo() && view.getFlujo().estatus) || '',
	            cdramo: view.getCdramo() || '',
	            cdtipsit: view.getCdtipsit() ||'',
	            auxKey: view.auxkey || '',	                
	            columns: true,
	            fields:true
	        });
	        Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);
	        
			paso = 'recuperando datos de situación';
				var gridCoberturas = view.down('#gridCoberturas'),
				    record = gridCoberturas.getStore().getAt(0);
            	//Ice.log("store- :",store)
			var win = Ext.create('Ice.view.componente.VentanaIce', {
			    title: 'Seleccionar coberturas',
				platformConfig: {
					desktop: {
						modal: true,
						width: 600,
						height: 400
					}
				},
			    layout: 'fit',
			    scrollable: true,
			    items: [{ 
					xtype: 'gridice',
			        border: false,
			        itemId: "gridAgrega",
			        columns: [
			            { text: 'Clave', dataIndex: 'cdgarant'  },
			            { text: 'Cobertura', dataIndex: 'dsgarant',flex: 2 }
			          //  { xtype: 'checkcolumn', text: 'Amparar', dataIndex: 'amparada'}
			            ],
					selModel: Ext.create('Ext.selection.CheckboxModel'),
			        store: {
						fields: ['opcional', 'cdgarant', 'dsgarant', 'deducible', 'cdcapita',
						    'suma_asegurada', 'amparada'],
						proxy:{
		                    type: 'ajax',
		                    autoLoad: true,
		                    extraParams: {
            	    			'params.pv_cdunieco_i': view.getCdunieco(),
            	    			'params.pv_cdramo_i': view.getCdramo(),
            	    			'params.pv_estado_i': view.getEstado(),
            	    			'params.pv_nmpoliza_i': view.getNmpoliza(),
            	    			'params.pv_nmsuplem_i': view.getNmsuplem(),
            	    			'params.pv_nmsituac_i': view.getNmsituac(),
            	    			'params.pv_cdtipsit_i': view.getCdtipsit()
							},
							url: Ice.url.bloque.coberturas.datosCoberturas,
		                    reader: {
		                        type: 'json',
		                        rootProperty: 'list',
		                        successProperty: 'success',
		                        messageProperty: 'message'
		                    }
		                },
		                listeners: {
		                	load: function (st) {
								var remover = -1;
								while ((remover = st.find('amparada','S')) != -1) {
									st.removeAt(remover);
		            			}

								st.data.items.forEach(function (it, idx) {
									Ice.log("-->", it);
		                			it.data.amparada = false;
		                		});
		                	}
		                }
					}
			    }],
			    buttons:[{
			    	// xtype: 'button',
			    	text: 'Agregar',
			    	iconCls: 'x-fa fa-plus-circle',
			    	handler: function (me) {
						var list = [];
			    		me.up("window").down("#gridAgrega").getSelectionModel().getSelection().forEach(
							function(it, idx) {
								Ice.log("Data: ",it.data);
								var obj = {
									cdgarant: it.data.cdgarant,
	    							cdcapita: it.data.cdcapita
	    							// suma_asegurada: e.data.suma_asegurada,
	    							// amparada: e.data.amparada?"S":"N"
	    						}
								Ice.log("p-", obj);
								list.push(obj);

								// gridCoberturas.store.add(obj);
								// Ice.log("Data: ",it.store.getData());
								// it.store.data.items.forEach(function (e, i) {
								// 	Ice.log("item..:",e);
								// 	if (e.data.amparada) {
								// 	}
								// });
							}
						);
						
						Ice.request({
							url: Ice.url.bloque.coberturas.agregarCobertura,
							jsonData: {
								list: list,
								params: {
									cdunieco: view.getCdunieco(),
									cdramo : view.getCdramo(),
									estado : view.getEstado(),
									nmpoliza : view.getNmpoliza(),
									nmsituac : view.getNmsituac(),
									nmsuplem : view.getNmsuplem(),
									cdtipsit : view.getCdtipsit()
								}
							},
							success: function() {
								var paso = "";
								try {
									paso = "Cargando coberturas";
									gridCoberturas.store.load();
									me.up("window").close();
									Ice.mensajeCorrecto({
										titulo: 'Correcto',
										mensaje: "Datos guardados correctamente"
									});
								} catch (e) {
									Ice.generaExcepcion(e, paso);
								}
							}
						});
			    	}
			    }]
			}).show();
			
			win.down("grid").getStore().load();
			//Ext.ComponentQuery.query("#gridAgrega")[0].store.find('amparada','N');
		} catch(e) {
			Ice.generaExcepcion(e, paso);
		}
	},
	
	coberturaObligatoria: function(v, ri, ci, it, record) {
		var paso = "Valida deshabilitando cobertura";
		try {
			if (record.get('swobliga') !== 'N') {
				return true;
			}
			return false;
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		return false;
	},
	
	borraCobertura: function (grid, rowIndex, colIndex) {
		var paso = 'Borrando cobertura';
		try {
			var record = grid.store.getAt(rowIndex);
			Ext.MessageBox.confirm("Borrar Cobertura", "\u00bfEst\u00e1s seguro de borrar la cobertura?", function(opc) {
				if (opc === 'yes') {
					
					if(record.get('swobliga')==='S'){
						throw 'Esta cobertura no se puede borrar.'
					}
					Ice.request({
						url: Ice.url.bloque.coberturas.borrarCobertura,
						params: {
							'params.cdunieco': record.get('cdunieco'),
							'params.cdramo': record.get('cdramo'),
							'params.estado': record.get('estado'),
							'params.nmpoliza': record.get('nmpoliza'),
							'params.nmsituac': record.get('nmsituac'),
							'params.nmsuplem': record.get('nmsuplem'),
							'params.cdgarant': record.get('cdgarant'),
							'params.cdcapita': record.get('cdcapita'),
							'params.fevencim': record.get('fevencim'),
							'params.accion': 'D'
						},
						mascara: "Borrando Cobertura...",
						success: function () {
							Ice.mensajeCorrecto({
								titulo: "Correcto",
								mensaje: "Cobertura borrada"
							});
							grid.getStore().load();
						}
					});
				}
			});
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	},

	editarCobertura: function(grid, rowIndex, colIndex) {
		var me = this,
		    view = me.getView(),
			refs = view.getReferences(),
			form = refs.form,
			paso = "Evento selecciona cobertura";
		try {
			view.down("#btnGuardarCobertura").setHidden(false);
			form.removeAll();
			var record = grid.getStore().getAt(rowIndex);
      		paso = "estableciendo cdgarant";
      		view.setCdgarant(record.get('cdgarant'));
      		view.setCdcapita(record.get('cdcapita'));

     		// view.cdgarant=record.get('cdgarant')
     		// view.cdcapita=record.get('cdcapita')
     		
     		// view.config.cdgarant=record.get('cdgarant')
     		// view.config.cdcapita=record.get('cdcapita')
			
			Ice.log("record:", record);	
			
			var comps = Ice.generaComponentes({
				pantalla: 'TATRIGAR',
				seccion: 'TATRIGAR',
				modulo: view.getModulo() || '',
				estatus: (view.getFlujo() && view.getFlujo().estatus) || '',
				cdramo: view.getCdramo() || '',
				cdtipsit: view.getCdtipsit() ||'',
				auxKey: view.getAuxkey() || '',
				cdgarant:record.get('cdgarant') || '',
				items: true,
				fields: true,
				validators: true
			});

			Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);
			var mpolicap = Ice.generaComponentes({
				pantalla: 'BLOQUE_COBERTURAS',
                seccion: 'MPOLICAP',
                modulo: view.getModulo() || '',
                estatus: (view.getFlujo() && view.getFlujo().estatus) || '',
                cdramo: view.getCdramo() || '',
                cdtipsit: view.getCdtipsit() ||'',
                auxKey: view.getAuxkey() || '',
                items: true,
                fields: true,
                validators: true
			});
			var firstItem = null;
            mpolicap.BLOQUE_COBERTURAS.MPOLICAP.items.forEach(function (it, idx) {
				it.tabla = "MPOLICAP";
				if(idx==0)
					firstItem = it.name;
            });

			form.setTitle("Cobertura: " + record.get('cdgarant') + " - "
			    + record.get('dsgarant') + " Póliza: " + view.getCdunieco() + " - "
				+ view.getCdramo() + " - " + view.getEstado() + " - "
				+ view.getNmpoliza());
            form.removeAll();
            
            form.add(mpolicap.BLOQUE_COBERTURAS.MPOLICAP.items);
            form.add(comps.TATRIGAR.TATRIGAR.items);
            Ice.log("Tatrigar items: ",comps.TATRIGAR.TATRIGAR.items);
            form.modelValidators = Ice.utils.mergeObjects(comps.TATRIGAR.TATRIGAR.validators,
			    mpolicap.BLOQUE_COBERTURAS.MPOLICAP.validators);
            form.modelFields = mpolicap.BLOQUE_COBERTURAS.MPOLICAP.fields.concat(comps.TATRIGAR.TATRIGAR.fields);
            
            
            
            
            this.cargarValores(form);
           

			form.show();
			Ext.ComponentQuery.query("[name="+firstItem+"]",form).forEach(function(it){
            	if(it.focus){
            		it.focus();
            		Ice.log("Focus it:",firstItem);
            	}
	        });
			
			Ice.log("modelValidators--->", form.modelValidators);
		} catch (e) {
			Ice.manejaExcepcion(e, paso);
    	}
    },

	cargarValores: function (form) {
		//me.coberturasItems={}
    	var me = this,
		    view = me.getView();
    	Ice.log("->" , view);
    	Ice.request({
    		url: Ice.url.bloque.coberturas.obtieneTvalogar,
    		params: {
    			'params.cdunieco': view.getCdunieco(),
    			'params.cdramo': view.getCdramo(),
    			'params.estado': view.getEstado()?view.getEstado().toUpperCase():view.getEstado(),
    			'params.nmpoliza': view.getNmpoliza(),
    			'params.nmsuplem': view.getNmsuplem(),
    			'params.nmsituac': view.getNmsituac(),
    			'params.cdgarant': view.getCdgarant(),
    			'params.cdcapita': view.getCdcapita()
    		},
			success: function (json) {
				var paso = 'Recuperando Capital';
				try {
					Ice.request({
						url: Ice.url.bloque.coberturas.obtieneMpolicap,
						params: {
							'params.cdunieco': view.getCdunieco(),
    		    			'params.cdramo': view.getCdramo(),
    		    			'params.estado': view.getEstado()?view.getEstado().toUpperCase():view.getEstado(),
    		    			'params.nmpoliza': view.getNmpoliza(),
    		    			'params.nmsuplem': view.getNmsuplem(),
    		    			'params.nmsituac': view.getNmsituac(),
    		    			'params.cdgarant': view.getCdgarant(),
    		    			'params.cdcapita': view.getCdcapita()
						},
    					success: function (response) {
							var paso2 = "Llenando campos";
    						try {
    							var valores = json.list ? json.list[0] || {} : {},
    							    mcap = response.list ? response.list[0] || {} : {};
								Ice.log("mcap",mcap);
								form.items.items.forEach(function (it, idx) {
									
    					    		if (it.setValue) {
										var name = it.name || it.referenceKey;
	    					    		it.setValue(valores[name]);
	    					    		it.valorOriginal = it.getValue();
    					    		}
    					    		Ice.log("item:", it);
    					    	});
    					    	//suma asegurada
    					    	var sa = form.items.items.find(function (e) {
    					    		return e.name == 'ptcapita' || e.referenceKey == 'ptcapita';
    					    	});
    					    	Ice.log("->", sa);
    							Ice.log("->", mcap);
    							var n = sa.name || sa.referenceKey;
    					    	sa.setValue(mcap[n]);
    					    	sa.valorOriginal = sa.getValue();
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
	},
    
	/* SOBRECARGADO!
    guardarCobertura: function (me) {
    	var paso = "";
    	try {
	    	var view = this.getView();
	    	var form = me.up('form');
	    	var elementos = [];
	    	form.items.items.forEach(function (it, idx) {
	    		elementos.push({
					valor: it.getValue(),
	    			valorOriginal: it.valorOriginal,
	    			name: it.name,
	    			tabla: it.tabla
	    		})
	    	});
	    	Ice.request({
	    		url: Ice.url.bloque.coberturas.guardarCoberturas,
	    		jsonData: {
	    			list: elementos,
	    			params: {
	    				cdunieco: view.getCdunieco(),
		    			cdramo: view.getCdramo(),
		    			estado: view.getEstado(),
		    			nmpoliza: view.getNmpoliza(),
		    			nmsuplem: view.getNmsuplem(),
		    			nmsituac: view.getNmsituac(),
		    			cdgarant: view.getCdgarant(),
		    			cdcapita: view.getCdcapita()
	    			}
	    		},
	    		success: function (json) {
					var paso = "";
					try {
						var list = json.list || [];
						if (list.length != 0) {
							Ice.log("--", list);
		    				var win = view.windows.find(function (w) {
								return w.windowName == 'conflictos';
		    				});
		    				Ice.log("-Window->", win);
		    				win.down('[tipo=grid]').store.removeAll();
		    				win.down('[tipo=grid]').store.add(list);
		    				win.show();
		    			} else {
							Ice.mensajeCorrecto({
								titulo: 'Correcto',
			    				mensaje: "Datos guardados correctamente"
			    			});
		    			}
						view.down("#gridCoberturas").store.load();
	    			} catch (e) {
						Ice.generaExcepcion(e,paso);
	    			}
	    		}
	    	});
    	} catch (e) {
    		Ice.generaExcepcion(e,paso)
    	}
    },
	*/

    cargarSituaciones: function (me) {
		var paso = "Cargando situaciones";
    	try {
	    	var me = this,
	            view = me.getView();
			if (view.getCdunieco() && view.getCdramo() && view.getEstado() && view.getNmpoliza() &&
			    view.getCdtipsit() && view.getModulo() && !Ext.isEmpty(view.getNmsuplem())) {
				view.down("[xtype=bloquelistasituaciones]").store.load();
			}
    	} catch (e) {
    		Ice.generaExcepcion(e, paso);
    	}
	},
	
	guardar: function (params) {
		var paso = 'Validando coberturas';
		try {
			
			var view = this.getView(),
		    form = view.down('[reference=form]'),
			elementos = [];
			Ice.log("form",form);
			
			
			
			if(Ext.ComponentQuery.query('[xtype=numberfieldice][getValue]',form).length>0){
				params = params?params:{};
				params.callback=function(){
					var gridCoberturas = Ext.ComponentQuery.query("#gridCoberturas",view)[0];
					Ice.log("Store: ",gridCoberturas.getStore());
					gridCoberturas.getStore().each(function(rec){
						Ice.log("falta suma asegurada gc",rec);
						if(Number(rec.get("ptcapita"))===0){
							throw 'Falta Suma Asegurada';
						}
					});
				}
				this.guardarCoberturas(params);
				
				return;
			}
			
			
			
			Ice.request({
				url: Ice.url.bloque.ejecutarValidacion,
				params: {
					'params.cdunieco': view.getCdunieco(),
	    			'params.cdramo': view.getCdramo(),
	    			'params.estado': view.getEstado(),
	    			'params.nmpoliza': view.getNmpoliza(),
	    			'params.nmsituac': 0,
					'params.nmsuplem': view.getNmsuplem(),
					 bloques: ["B18","B19","B19B"]
				},
				success:function(json){
					Ice.log("json: ",json);
					var paso2 = 'Evaluando validaciones';
					try {
    					var list = json.list || [];
    					
    					var gridCoberturas = Ext.ComponentQuery.query("#gridCoberturas",view)[0];
    					Ice.log("Store: ",gridCoberturas.getStore());
    					gridCoberturas.getStore().each(function(rec){
    						Ice.log("falta suma asegurada g2",rec);
    						if(Number(rec.get("ptcapita"))===0){
    							throw 'Falta Suma Asegurada';
    						}
    					});
    					
    					if (list.length>0) {
							Ext.create('Ice.view.bloque.VentanaValidaciones', {
								lista: list
							}).mostrar();

							list.forEach(function (it) {
								if((it.tipo+'').toLowerCase()=='error') {
									throw "Favor de revisar las validaciones";
								}
							});
    					}

						if (params && params.success) {
							paso2 = 'Ejecutando proceso posterior a coberturas';
    						params.success();
					    }
				    } catch (e) {
				        Ice.manejaExcepcion(e, paso2);
						if (params && params.failure) {
							var paso4 = 'Ejecutando failure posterior a coberturas';
							try {
								params.failure();
							} catch (e) {
								Ice.manejaExcepcion(e, paso4);
							}
						}
				    }
				},
				failure: (params && params.failure) || null
			});
		} catch (e) {
			Ice.manejaExcepcion(e, paso);
			if (params && params.failure) {
				var paso3 = 'Ejecutando failure posterior a coberturas';
				try {
					params.failure();
				} catch (e) {
					Ice.manejaExcepcion(e, paso3);
				}
			}
		}
	},

	editarCoberturaMovil: function (grid, idx, tar, sel) {
		Ice.log('editarCoberturaMovil sel:', sel);
		var paso = "Mostrando formulario de cobertura";
		try {
			var view = this.getView();
			view.down("#btnGuardarCobertura").setHidden(false);
			var me = grid.up("bloquecoberturas");
			// var sel =Ext.ComponentQuery.query("#gridCoberturas")[0].getSelection();
 			view.setCdgarant(sel.get("cdgarant"));
 			view.setCdcapita(sel.get("cdcapita"));
 			var form = me.down('[reference=form]');
      		form.removeAll();
			var comps = Ice.generaComponentes({
				pantalla: 'TATRIGAR',
				seccion: 'TATRIGAR',
				modulo: view.getModulo() || '',
				estatus: (view.getFlujo() && view.getFlujo().estatus) || '',
				cdramo: view.getCdramo() || '',
				cdtipsit: view.getCdtipsit() ||'',
				auxKey: view.getAuxkey() || '',
				cdgarant: view.getCdgarant() || '',
				items: true,
				fields: true,
				validators: true
			});
    		 
            Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);
            var mpolicap=Ice.generaComponentes({
                pantalla: 'BLOQUE_COBERTURAS',
                seccion: 'MPOLICAP',
                modulo: view.getModulo() || '',
                estatus: (view.getFlujo() && view.getFlujo().estatus) || '',
                cdramo: view.getCdramo() || '',
                cdtipsit: view.getCdtipsit() ||'',
                auxKey: view.getAuxkey() || '',
                items: true,
                fields: true,
                validators: true
            });
            var firstItem = null;
            mpolicap.BLOQUE_COBERTURAS.MPOLICAP.items.forEach(function (it, idx) {
            	it.tabla = "MPOLICAP";
            	if(idx==0)
					firstItem = it.name;
            })
            
            form.modelValidators = Ice.utils.mergeObjects(comps.TATRIGAR.TATRIGAR.validators,
			    mpolicap.BLOQUE_COBERTURAS.MPOLICAP.validators);
            form.modelFields = mpolicap.BLOQUE_COBERTURAS.MPOLICAP.fields.concat(comps.TATRIGAR.TATRIGAR.fields);
         
			form.add(mpolicap.BLOQUE_COBERTURAS.MPOLICAP.items);
            form.add(comps.TATRIGAR.TATRIGAR.items);

			grid.down('#botonBorrar')[sel.get('opcional') === 'N' ? 'hide' : 'show']();

			form.show();
            this.cargarValores(form);
            Ext.ComponentQuery.query("[name="+firstItem+"]",form).forEach(function(it){
            	if(it.focus){
            		it.focus();
            		Ice.log("Focus it:",firstItem);
            	}
	        });
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	},

	borraCoberturaMovil: function (btn) {
		var paso = "Borrando cobertura";
		try {
				var record = btn.up("bloquecoberturas").down("#gridCoberturas").getSelection(),
			    grid = btn.up("bloquecoberturas").down("#gridCoberturas");
				if(record.get('swobliga')==='S'){
					throw 'Esta cobertura no se puede borrar.'
				}
				Ice.request({
					url: Ice.url.bloque.coberturas.borrarCobertura,
					params: {
						'params.cdunieco': record.get('cdunieco'),
						'params.cdramo': record.get('cdramo'),
						'params.estado': record.get('estado'),
						'params.nmpoliza': record.get('nmpoliza'),
						'params.nmsituac': record.get('nmsituac'),
						'params.nmsuplem': record.get('nmsuplem'),
						'params.cdgarant': record.get('cdgarant'),
						'params.cdcapita': record.get('cdcapita'),
						'params.fevencim': record.get('fevencim'),
						'params.accion': 'D'
					},
					mascara:"Borrando Cobertura...",
					success: function() {
						Ice.mensajeCorrecto({
							titulo: "Correcto",
							mensaje: "Cobertura borrada"
						});
						grid.getStore().load();
						grid.down('#botonBorrar').hide();
					}
				});
				// 		}
				// 	}
				// );
		} catch (e) {
			Ice.manejaExcepcion(e, paso);
		}
	},

	agregarCoberturaMovil: function (btn) {
		var paso = "Agregando coberturas";
		try {
			var me = this,
			    view = me.getView(),
				list = [],
				gridCoberturas = view.down("#gridCoberturas"),
				agre = view.down("#panela");
			agre.getStore().each(function (it) {
				Ice.log("Data: ", it.data);
				if (it.get("amparada") === true) {
					var obj = {
						cdgarant: it.get("cdgarant"),
						cdcapita: it.get("cdcapita")
					};
					Ice.log("p-", obj);
					list.push(obj);
				}
			});
			Ice.request({
 	    		url: Ice.url.bloque.coberturas.agregarCobertura,
 	    		jsonData: {
 	    			list: list,
 	    			params: {
					    cdunieco: view.getCdunieco(),
		    			cdramo: view.getCdramo(),
		    			estado: view.getEstado(),
		    			nmpoliza: view.getNmpoliza(),
		    			nmsuplem: view.getNmsuplem(),
		    			nmsituac: view.getNmsituac(),
		    			cdtipsit : view.getCdtipsit()
 	    			}
 	    		},
 	    		success: function () {
 	    			var paso = "";
 	    			try {
 	    				paso = "cargando coberturas";
    	    			gridCoberturas.getStore().load();
						gridCoberturas.down('#botonBorrar').hide();
						agre.getStore().extraParams= {
						    cdunieco: view.getCdunieco(),
			    			cdramo: view.getCdramo(),
			    			estado: view.getEstado()?view.getEstado().toUpperCase():view.getEstado(),
			    			nmpoliza: view.getNmpoliza(),
			    			nmsuplem: view.getNmsuplem(),
			    			nmsituac: view.getNmsituac(),
			    			cdtipsit : view.getCdtipsit()
	 	    			}
    	    			agre.getStore().load();
    	    			Ice.mensajeCorrecto({
							titulo: 'Correcto',
    	    				mensaje: "Datos guardados correctamente"
    	    			});
						me.cerrarAgregar(btn);
 	    			} catch (e) {
 	    				Ice.generaExcepcion(e, paso);
 	    			}
 	    		}
 	    	});
		} catch (e) {
			Ice.generaExcepcion(e,paso);
		}
	},
	
	cerrarAgregar: function (btn) {
		var paso = "Cerrando ventana de coberturas";
		try {
			var me = this,
			    view = me.getView();
			// view.getItems().items.forEach(function (it) {
			// 	it.setHidden(false);
			// });
			view.down("#panela").setHidden(true);
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	},

	guardarCoberturas: function (params) {
		var paso = "Agregando coberturas";
		try {
			var view = this.getView(),
			    form = view.down('[reference=form]'),
				elementos = [];
				Ice.log("form",form);
			if(form.down('[getValue]')){
				Ice.validarFormulario(form);
			}
	    	
	    	form.items.items.forEach(function (it, idx) {
	    		if(it.getValue){
		    		elementos.push({
		    			valor: it.getValue(),
		    			valorOriginal: it.valorOriginal,
		    			name: it.getName(),
		    			tabla: it.tabla
		    		})
	    		}
	    	});
	    	Ice.request({
	    		url: Ice.url.bloque.coberturas.guardarCoberturas,
	    		jsonData: {
	    			list: elementos,
	    			params: {
	    				cdunieco: view.getCdunieco(),
		    			cdramo: view.getCdramo(),
		    			estado: view.getEstado()?view.getEstado().toUpperCase():view.getEstado(),
		    			nmpoliza: view.getNmpoliza(),
		    			nmsuplem: view.getNmsuplem(),
		    			nmsituac: view.getNmsituac(),
		    			cdgarant: view.getCdgarant(),
		    			cdcapita: view.getCdcapita()
	    			}
	    		},
	    		success:function(json){
					Ice.log("json: ",json);
					var paso2 = 'Evaluando validaciones';
					try {
    					var list = json.list || [];
    					try{
		    				form.items.items.forEach(function (it, idx) {
		    		    		if(it.getValue){
		    		    			it.valorOriginal=it.getValue();
		    			    		
		    		    		}
		    		    	});
		    			}catch(e){
		    				Ice.logWarn("Error recargando valores.");
		    			}
    					if (list.length>0) {
							Ext.create('Ice.view.bloque.VentanaValidaciones', {
								lista: list
							}).mostrar();

							list.forEach(function (it) {
								if((it.tipo+'').toLowerCase()=='error') {
									form.hide();
					    			view.down("#gridCoberturas").getStore().load();
									throw "Favor de revisar las validaciones";
								}
							});
    					}else {
		    				Ice.mensajeCorrecto({
			    				titulo: 'Correcto',
			    				mensaje: "Datos guardados correctamente"
			    			});
		    			}
						form.hide();
		    			view.down("#gridCoberturas").getStore().load(function(){
		    				var paso = 'Verificando suma asegurada';
		    				try{
		    					if(params && params.callback){
		    						params.callback();
		    					}
		    					if (params && params.success) {
									paso2 = 'Ejecutando proceso posterior a coberturas';
		    						params.success();
							    }
		    				}catch(e){
		    					Ice.manejaExcepcion(e,paso);
		    				}
		    				
		    			});
		    			
						
				    } catch (e) {
				        Ice.manejaExcepcion(e, paso2);
						if (params && params.failure) {
							var paso4 = 'Ejecutando failure posterior a coberturas';
							try {
								params.failure();
							} catch (e) {
								Ice.manejaExcepcion(e, paso4);
							}
						}
				    }
				},
				failure: (params && params.failure) || null
	    	});
		} catch (e) {
			Ice.manejaExcepcion(e, paso);
			if (params && params.failure) {
				var paso3 = 'Ejecutando failure posterior a coberturas';
				try {
					params.failure();
				} catch (e) {
					Ice.manejaExcepcion(e, paso3);
				}
			}
		}
	},
	
	guardarCoberturaMovil: function (me) {
		var paso = "Agregando cobertura";
		try {
			var view = this.getView(),
			    form = me.up('formpanel'),
				paso = 'Validando campos';
			this.validarCampos(form);
			paso = 'Enviando datos';
			Ice.log(":::::::", view, me, form);
			var elementos = [];
			form.items.items.forEach(function (it, idx) {
				if (it.referenceKey) {
					elementos.push({
						valor: it.getValue(),
						valorOriginal: it.valorOriginal,
						name: it.referenceKey,
						tabla: it.tabla
					})
				}
			});
			Ice.request({
				url: Ice.url.bloque.coberturas.guardarCoberturas,
				jsonData: {
					list: elementos,
					params: {
						cdunieco: view.getCdunieco(),
						cdramo: view.getCdramo(),
						estado: view.getEstado(),
						nmpoliza: view.getNmpoliza(),
						nmsuplem: view.getNmsuplem(),
						nmsituac: view.getNmsituac(),
						cdgarant: view.getCdgarant(),
						cdcapita: view.getCdcapita()
					}
				},
				success: function (json) {
					var paso2 = "Revisando validaciones de coberturas";
					try {
						var list = json.list || [];
						if (list.length != 0) {
							Ext.create('Ice.view.bloque.VentanaValidaciones', {
								lista: list
							}).mostrar();
							list.forEach(function (it ){
								if ((it.tipo + '').toLowerCase() == 'error') {
									throw "Favor de revisar las validaciones";
								}
							});
						} else {
							Ice.mensajeCorrecto({
								titulo: 'Correcto',
								mensaje: "Datos guardados correctamente"
							});
						}
						form.hide();
						view.down("#gridCoberturas").getStore().load();
						view.down("#gridCoberturas").down('#botonBorrar').hide();
					} catch (e) {
						Ice.generaExcepcion(e, paso2);
					}
				}
			});
		} catch (e) {
			Ice.manejaExcepcion(e,paso)
		}
	},

	mostrarCoberturas: function (grid, rowIndex, colIndex) {
		var paso = 'Mostrando coberturas';
		try {
			var view = this.getView(),
			    me = grid.up('bloquecoberturas'),
				paso = 'limpiando grids';
			
			Ice.log("mmm..", me);
			var gridCoberturas = view.down('#gridCoberturas');
			Ice.log("mmm..", gridCoberturas);
			// global=gridCoberturas;
			gridCoberturas.getStore().removeAll();
			gridCoberturas.setHidden(false);
			
			me.down('[reference=form]').removeAll();

			paso = 'consultando coberturas';
			var record = grid.getStore().getAt(rowIndex);
			
			paso = "Evento selecciona cobertura ";
			gridCoberturas.getStore().proxy.extraParams = {
				'params.pv_cdunieco_i': view.getCdunieco(),
				'params.pv_cdramo_i': view.getCdramo(),
				'params.pv_estado_i': view.getEstado()?view.getEstado().toUpperCase():view.getEstado(),
				'params.pv_nmpoliza_i': view.getNmpoliza(),
				'params.pv_nmsuplem_i': view.getNmsuplem(),
				'params.pv_nmsituac_i': record.get('nmsituac'),
				'params.pv_cdtipsit_i': view.getCdtipsit()
			};
			gridCoberturas.setTitle("Coberturas de la situación: " + record.get('nmsituac')
			    + " Póliza: " + view.getCdunieco() + " - " + view.getCdramo() + " - " + view.getEstado()
				+ " - "	+ view.getNmpoliza());
			
			paso = "estableciendo nmsituac";
			me.config.nmsituac = record.get('nmsituac');
			me.setNmsituac(record.get('nmsituac'));
			
			view.setNmsituac(record.get('nmsituac'));
			gridCoberturas.getStore().load();
			gridCoberturas.getStore().filter('amparada','S');
			view.setNmsituac(record.get('nmsituac'));
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	},

	onItemTabSituaciones: function (grid, idx, target, record) {
		var paso = 'Cargando coberturas de situaci\u00f3n';
		try {
			var me = grid.up("bloquecoberturas");
			me.down("[reference=form]").removeAll();
			me.setNmsituac(record.get("nmsituac"));
			// me.down("bloquelistasituaciones").getStore().on({
			// 	load: function (store) {
			// 		var paso = 'cargando coberturas';
			// 		try {
			// 			if (store.count() > 0) {
			// 				Ice.log("deshabilitando");
			// 				Ice.query("[xtype=button]", me.down("#gridCoberturas")).forEach(function (it) {
			// 					it.setDisabled(false);
			// 				});
			// 			} else {
			// 				Ice.log("habilitando");
			// 				Ice.query("[xtype=button]", me.down("#gridCoberturas")).forEach(function (it) {
			// 					it.setDisabled(true);
			// 				});
			// 			}
			// 		} catch (e) {
			// 			Ice.manejaExcepcion(e, paso);
			// 		}
			// 	}
			// });
			me.down("#gridCoberturas").getStore().proxy.extraParams['params.pv_nmsituac_i'] = me.getNmsituac();
			me.down("#gridCoberturas").getStore().load();
			me.down("#gridCoberturas").getStore().filter('amparada', 'S');
			me.down("#gridCoberturas").down('#botonBorrar').hide();
			Ice.log(me.config.nmsituac);
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	},

	mostrarPanelCoberturas: function (btn) {
		var paso = 'Mostrando panel de coberturas';
		try {
			var view = this.getView();
			// btn.up("[xtype=bloquecoberturas]").getItems().items.forEach(function (it) {
			// 	it.setHidden(true);
			// });
			view.down("#panela").getStore().load({
				params:{
				    'params.pv_cdunieco_i': view.getCdunieco(),
	    			'params.pv_cdramo_i': view.getCdramo(),
	    			'params.pv_estado_i': view.getEstado()?view.getEstado().toUpperCase():view.getEstado(),
	    			'params.pv_nmpoliza_i': view.getNmpoliza(),
	    			'params.pv_nmsuplem_i': view.getNmsuplem(),
	    			'params.pv_nmsituac_i': view.getNmsituac(),
	    			'params.pv_cdtipsit_i' : view.getCdtipsit()
	    			}
			});
			view.down("#panela").setHidden(false);
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	},
	
	validarCampos: function (form) {
		var paso = 'Validando campos';
		try {
			if (!form.modelValidators || !form.modelFields) {
				throw 'No se puede validar el formulario' + form.getTitle();
			}

			paso = 'Construyendo modelo de validaci\u00f3n';
			var validators = {},
			    refs = form.getReferences(),
				ref = null,
				view = this.getView();
			Ice.log("-]", form);
			form.items.items.filter(function (it) {
				return it.isHidden() !== true && typeof it.getName === 'function'
				    && form.modelValidators[it.getName()];
			}).forEach(function (it) {
				validators[it.getName()] = form.modelValidators[it.getName()];
			});
			
			Ice.log("refs, validators", refs, validators);
			
			var modelName = Ext.id();
			var modelo = Ext.define(modelName, {
				extend: 'Ext.data.Model',
				fields: form.modelFields,
				validators: validators
			});
			
			Ice.log( "Modelo", modelo);
			
			paso = 'Validando datos';
			errores = Ext.create(modelName, form.getValues()).getValidation().getData();
			Ice.log("Errores", errores);
			var sinErrores = true,
			    erroresString = '';
			Ext.suspendLayouts();
			for (var name in errores) {
				if (errores[name] !== true) {
					sinErrores = false;
					var ref = view.down('[name=' + name + ']');
					if (Ext.manifest.toolkit === 'classic') {
						ref.setActiveError(errores[name]);
					} else {
						erroresString = erroresString + ref.getLabel() + ': ' + errores[name] + '<br/>';
					}
				}
			}
			Ext.resumeLayouts();
			if (sinErrores !== true) {
				if (Ext.manifest.toolkit === 'classic') {
					throw 'Favor de revisar los datos';
				} else {
					throw erroresString;
				}
			}
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	},

	obtenerErrores: function () {},
	
	cargar: function () {
		Ice.log('Ice.view.bloque.CoberturasController.cargarValoresDefectoVariables');
		var me = this,
		    view = me.getView(),
			refs = view.getReferences(),
			paso = 'Cargando bloque de coberturas';
		try {
			refs.grid.getController().cargar();
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	}
});
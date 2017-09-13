Ext.define('Ice.view.bloque.AgentesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloqueagentes',

	cargar: function () {
		Ice.log('Ice.view.bloque.AgentesController.cargar');
		var me = this,
		    view = me.getView(),
			refs = me.getReferences(),
			paso = 'Cargando bloque de agentes';
		try {
			Ice.request({
            	mascara: 'Cargando agentes',
            	url: Ice.url.bloque.agentes.cargar,
            	params: {
            		'params.cdunieco' : view.getCdunieco(),
            		'params.cdramo'   : view.getCdramo(),
            		'params.estado'   : view.getEstado(),
            		'params.nmpoliza' : view.getNmpoliza(),
            		'params.nmsuplem' : view.getNmsuplem()
            	},
            	success: function (action) {
					var paso2 = 'Asignando valores de p\u00f3liza ';
					try {
						Ice.cargarFormulario(refs.datpoliza, action.params);
					} catch (e) {
						Ice.manejaExcepcion(e, paso2);
					}
				}
            });
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	},
    
    onAgregarClic: function () {
        this.agregarAgente();
    },
    
    agregarAgente: function () {
        Ice.log('Ice.view.bloque.AgentesController.agregarAgente');
        var me = this,          
        	view = me.getView(),
        	refs = view.getReferences(),
			refsPol = refs.datpoliza.getReferences(),
			refsAge = refs.agregaragente.getReferences(),
        	paso = 'Agregando agente';
        try {
			var codagente = refsAge.cdagente.getValue();
        	if (!codagente) {
        		throw 'Falta indicar el c\u00f3digo de agente';
        	}
        	if (!refsAge['porredau_'].getValue()) {
        		throw 'Falta indicar el porcentaje de participacion';
        	}
        	if (!refsAge.cdtipoag.getValue()) {
        		throw 'Falta indicar el tipo de agente';
        	}
        	
     		var agentes = [];
     		refs.gridagentes.getStore().each(function (it) {
			    agentes.push({
					cdagente: it.get("cdagente")
				});
			});
     		 
     		agentes.forEach(function (it) {
			    if (codagente === it.cdagente) {
					throw 'El agente ya se encuentra incluido';
				}
			});
     		
    		Ice.log(view);
    		
			Ice.request({
            	mascara: 'Validando agente',
            	url: Ice.url.bloque.agentes.validarAgente,
            	params: {
            		'params.cdramo'    : view.getCdramo(),
            		'params.cdproceso' : 'E',
            		'params.cdagente'  : codagente
            	},
            	success: function(action) {
            		
					if (action.params['valido'] === 'N') {
						throw 'C\u00E9dula Vencida, favor actualizar su informaci\u00F3n';
					}/* else {
						
						Ice.request({
			            	mascara: 'Validando cuadro de comisi\u00F3n de agente',
			            	url: Ice.url.bloque.agentes.validarCuadroAgente,
			            	params: {
			            		'params.cdunieco': view.getCdunieco(),
			            		'params.cdramo'  : view.getCdramo(),
			            		'params.estado'  : view.getEstado(),
			            		'params.nmpoliza': view.getNmpoliza(),
			            		'params.nmsuplem': view.getNmsuplem(),
			            		'params.cdagente': codagente
			            	},
			            	success: function(action) {
								if (action.params['valido'] === 'N') {
									throw 'El agente debe tener el mismo cuadro de comision que el agente principal';
								}
			            	}
			            });
						
					}*/
					
					
            	}
            });
     		
     		var datos = {}
        	var form = refs.agregaragente;
        	Ice.query('[getName]', form).forEach(function (it) {
				if (it.getName().indexOf("_") != -1) {
					if (Ext.manifest.toolkit !== 'classic') {
						it.setName(it.getName().split("_")[0].trim());
					} else {
						it.name = it.getName().split("_")[0].trim();
		        	}
	        	}
				datos[it.getName()] = it.getValue();
        	});

			refs.gridagentes.getStore().add(datos);
        	view.getAgentesAgregados().push(datos);
        	view.down('[reference=agregaragente]').reset();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
		Ice.log('Ice.view.bloque.AgentesController.agregar ok');
	},
    
    onGuardarClic: function () {
        this.guardar();
    },
    
    guardar: function (params) {
        Ice.log('Ice.view.bloque.AgentesController.guardarAgentes params:', params);
        var me = this,          
        	view = me.getView(),
        	refs = view.getReferences(),
        	paso = 'Guardando agentes';
		try {
        	me.validacion();

			var agentes = [],
        		store = refs.gridagentes.getStore(),
        		data = store.getData(),
        		items = data.items,
				refsPol = refs.datpoliza.getReferences();
			
			for (var i = 0; i < items.length; i++) {
				var tipoag = items[i].data.cdtipoag;
				Ice.log("tipoag:", tipoag);
				if (tipoag && tipoag.indexOf("-") != -1) {
					items[i].data.cdtipoag = tipoag.split("-")[0].trim();
				}
				agentes.push(items[i].data);
        	}

			Ice.request({
                mascara: paso,
                url: Ice.url.bloque.agentes.guardar,
                jsonData: {
                	params: {
                		cdunieco: view.getCdunieco(),
                		cdramo: view.getCdramo(),
                		estado: view.getEstado(),
                		nmpoliza: view.getNmpoliza(),
                		nmsuplem: view.getNmsuplem(),
                		nmcuadro: refsPol.nmcuadro.getValue(),
                		porredau: refsPol.porredau.getValue()
                	},
                    agentes: agentes
                },
                success: function (action) {
					var paso2 = 'Revisando validaciones';
					try {
						if ((action.list || []).length > 0) {
                            Ext.create('Ice.view.bloque.VentanaValidaciones', {
                                lista: action.list
                            }).mostrar();
                            
                            var error = false;
                            for (var i = 0; i < action.list.length; i++) {
                                if (action.list[i].tipo.toLowerCase() === 'error') {
                                    error = true; // para que no avance si hay validaciones tipo "error"
                                    break;
                                }
                            }
                            if (error === true) {
                                throw 'Favor de revisar las validaciones';
                            }
                        }
						// Ice.mensajeCorrecto('Datos guardados');
						refs.gridagentes.getStore().reload();

						if (params && params.success) {
							paso2 = 'Ejecutando proceso posterior a agentes';
							params.success();
						}
					} catch (e) {
						Ice.manejaExcepcion(e, paso2);
						if (params && params.failure) {
							var paso4 = 'Ejecutando failure posterior a agentes';
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
				var paso3 = 'Ejecutando failure posterior a agentes';
				try {
					params.failure();
				} catch (e) {
					Ice.manejaExcepcion(e, paso3);
				}
			}
        }
		Ice.log('Ice.view.bloque.AgentesController.guardar ok');
    },
	
	onBuscarClic: function () {
		Ice.log('Ice.view.bloque.AgentesController.onBuscarClic');
    	var me = this,
		    view = me.getView(),
			refs = view.getReferences(),
			paso = 'Mostrando ventana de selecci\u00f3n de agente';
    	try {
			Ext.create("Ice.view.bloque.agentes.BuscarAgenteWindow", {
				listeners: {
					elegiragente: function (bus, record) {
						Ice.log('elegiragente record:', record);
						refs.agregaragente.getReferences().cdagente.setValue(record.get("cdagente"));
	    			}
	    		}
	    	}).mostrar();
    	} catch (e) {
    		Ice.manejaExcepcion(e, paso);
    	}
    },
    
    /*buscarAgentes: function () {
        Ice.log('Ice.view.bloque.AgentesController.buscar');
        var me = this,          
    		view = me.getView(),
    		refs = view.getReferences(),
    		paso = 'Antes de buscar agente';
        
        var agente = [{"cdagente":"000001","dsnombre":"hola"},{"cdagente":"000001","dsnombre":"hola"}];
        
        try {
        	
        
	        Ice.request({
	        	mascara: 'Buscando agentes',
	        	url: Ice.url.bloque.agentes.buscar,
	        	params: {
	        		'params.cdagente'	:		refs['agente'].getValue()        		
	        	},
	        	success: function(action) {
	        		
	        		for (var att in action.list) {
	        			refs['agente'] = agente;
	        			//alert(att);
	                    if (refs[att] && !refs[att].getValue()) {
	                        refs[att].setValue(action.params[att]);
	                    }
	                }            		
	        		
	        	},
	        	failure: function() {           		
	        	}
	        });
	        
        }catch(e) {
        	Ice.manejaExcepcion(e, paso);
        }
    },*/
    
    editarPorcentaje: function(grid, rowIndex, colIndex) {
		Ice.log('Ice.view.bloque.AgentesController.editarPorcentaje args:', arguments);
		var me = this,
		    view = me.getView(),
			refs = view.getReferences(),
			paso = 'Editar porcentaje',
			record;
		try {
			if (Ext.manifest.toolkit === 'classic') {
				record = grid.getStore().getAt(rowIndex);
			} else {
				record = grid.getParent().getRecord();
			}
			Ice.log("record",record);

			Ext.create("Ice.view.componente.VentanaIce", {
				rec: record,
				title: 'Editar porcentaje',
				layout:	"fit",
				modal: true,
				items: [{
					xtype: 'numberfieldice',
					label: 'Porcentaje',
					style: 'margin: 20px;',
					minValue: 0
				}],
				buttons: [
					{
						text: 'Guardar',
						iconCls: 'x-fa fa-save',
						handler: function (btn) {
							var record = btn.up('[xtype=ventanaice]').rec;
							Ice.log("record",record);
							record.set("porredau", btn.up('[xtype=ventanaice]').down('numberfieldice').getValue());
							btn.up('[xtype=ventanaice]').cerrar();
						}
					}, {
						text: 'Cancelar',
						iconCls: 'x-fa fa-close',
						ui:'gray',
						handler: function (btn) {
							btn.up('[xtype=ventanaice]').cerrar();
						}
					}
				]
			}).mostrar();
		} catch (e) {
			Ice.manejaExcepcion(e, paso);
		}
	},

	eliminar: function (grid, rowIndex, colIndex) {
		Ice.log('Ice.view.bloque.AgentesController.eliminar args:', arguments);
		var me = this,
		    view = me.getView(),
			refs = view.getReferences(),
			paso = 'Eliminar agente',
			record;
    	try {
    		
			if (Ext.manifest.toolkit === 'classic') {
				record = grid.getStore().getAt(rowIndex);
			} else {
				record = grid.getParent().getRecord();
			}
			if(Number(record.get('cdtipoag')) == 1 ){
	          	  throw 'No se puede borrar al agente principal';
	            }
			refs.gridagentes.getStore().remove(record);
    	} catch (e) {
			Ice.manejaExcepcion(e, paso);
		}
    },
    
    validacion: function () {
		Ice.log('Ice.view.bloque.AgentesController.validacion');
    	var me = this,
		    view = me.getView(),
			refs = view.getReferences(),
			refsPol = refs.datpoliza.getReferences(),
			paso = 'Validando datos';
     	try {
			var sesion = Number(refsPol.porredau.getValue()),
			    agentes = [];
			refs.gridagentes.getStore().each(function (it) {
     			agentes.push({
     				porredau: Number(it.get("porredau"))
     			});
     		});
     		 
     		var tot = sesion;
     		agentes.forEach(function (it) {
				tot = tot + it.porredau;
     		});
     		
     		if (tot !== 100) {
     			throw 'La suma de sesi\u00f3n de comisi\u00f3n y porcentaje de participaci\u00f3n de agentes es diferente de 100';
     		}
     	} catch (e) {
			Ice.generaExcepcion(e,paso);
     	}
    }
});
Ext.define('Ice.view.bloque.personas.PersonaController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.persona',
    
    custom:function(){
    	try{
    		
    	}catch(e){
    		Ice.log(e,paso);
    	}
    	
    },
    
    guardarPersona:function(accion){
    	var paso="",
    		me=this,
    		view=me.getView();
    	try{
    		var form=view.down("form"),
    			tvaloper={},
    			mpersona={};
    		me.validarCampos(form);
    		Ice.query('[getName]',form).forEach(function(it){
    			if((""+it.getName()).indexOf("otvalor")!=-1){
    				tvaloper[it.getName()]=it.getValue();
    			}else{
    				mpersona[it.getName()]=it.getValue();
    			}
    		});
    		Ice.log("Datos de persona a enviar: ",mpersona,tvaloper);
    		accion=accion?accion:null;
    		Ice.request({
    			url:Ice.url.bloque.personas.guardarPersona,
    			jsonData:{
    				tvaloper:tvaloper,
    				mpersona:mpersona,
    				accion:accion,
    				params:{
    					cdperson:view.getCdperson()
    					}
    			},
    			success:function(json){
    				
    				Ice.mensaje("Se guardo correctamente");
    			}
    			
    		});
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    },
    
    validarCampos:function(form){
    	
    	var paso='';
    	try{
    		if(!form.modelValidators || !form.modelFields){
    			throw 'No se puede validar el formulario'+form.getTitle();
    		}
    		
    		paso = 'Construyendo modelo de validaci\u00f3n';
    		
    		var validators={};
    		var refs=form.getReferences();
    		var ref=null;
    		var view=this.getView();
    		Ice.log("-]",form);
    		Ice.query('[getName]',form).filter(function(it){
    			return it.isHidden()!==true && typeof it.getName =='function' && form.modelValidators[it.getName()] ;
    		})
    		.forEach(function(it){
    			validators[it.getName()] = form.modelValidators[it.getName()];
    		});
    		
    		Ice.log("refs , validators",refs, validators)
    		
    		var modelName = Ext.id();
            var  modelo = Ext.define(modelName, {
                extend: 'Ext.data.Model',
                fields: form.modelFields,
                validators: validators
            });
            
           Ice.log( "Modelo",modelo)
            
            paso = 'Validando datos';
            errores = Ext.create(modelName, form.getValues()).getValidation().getData();
            Ice.log("Errores",errores)
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
    		
    	}catch(e){
    		Ice.generaExcepcion(e,paso);
    	}
    },
    
    llenarCampos:function(root,url,params){
    	paso=""
    	try{
    		Ice.request({
    			url:url,
    			params:params,
    			success:function(json){
    				var paso="";
    				try{
	    				var datos=json.params || {};
	    				Ext.ComponentQuery.query('[getName]',root)
	    				.forEach(function(it){
	    					it.setValue(datos[it.getName()]);
	    				});
    				}catch(e){
    					Ice.generaExcepcion(e,paso)
    				}
    			}
    		})
    	}catch(e){
    		Ice.generaExcepcion(e,paso);
    	}
    },
    
    agregarDomicilio		:	function(accion){
    	var paso="",
    		me=this,
    		view=me.getView();
    	try{
    		
    		var comps = Ice.generaComponentes({
                pantalla: 'AGREGAR_PERSONAS',
                seccion: 'MDOMICIL',
                items: true,
                fields: true,
                validators: true
            });
    		
//    		var forms=[
//    			{
//    				xtype			: 'combo',
//    				displayField 	: 'cdcodpos',
//    			    valueField 		: 'cdcodpos',
//    			    queryMode 		: 'remote',
//    			    queryParam		: 'params.cdpost',
//    			    typeAhead 		: true,
//    			    label			:	"CP",
//    			    store			: 	{
//						fields:['cdmunici','cdcodpos','dscodpos'],
//						autoLoad	:	true,
//						proxy		:	{
//							type 		: 'ajax',
//							url 		: 'registroPersona/obtieneCdpost.action',
//							
//							reader 		: {
//								type : 'json',
//								rootProperty : 'list',
//								successProperty : 'success',
//								messageProperty : 'message'
//							}
//						}
//					}
//    			}
//    		]
    		comps.AGREGAR_PERSONAS.MDOMICIL.items.forEach(function(it){
    			
    			var b=it.name=="cdpostal" ||
    				it.name=="cdpais" ||
    				it.name=="otpoblac" ||
    				it.name=="cdprovin";
    			
    			if(b){
    				it.cmpBuscar=true;
    				
    			}
    		});
    		Ice.log("##",comps.AGREGAR_PERSONAS.MDOMICIL.items);
    		
    		
    		
    		var win=Ext.create('Ice.view.componente.Ventana', {
    			title		:	'Añadir Domicilio',
    			itemId		:	'addDom',
 			    height		:	"80%",
 			    width		:	"70%",
 			    layout		:	'fit',
 			    accion		:	accion,
 			    listeners	:{
 			    	beforerender:function(win){
 			    		var paso='';
 			    		try{
 			    			
 			    			var comps = Ice.generaComponentes({
 			                   pantalla: 'AGREGAR_PERSONAS',
 			                   seccion: 'BUSCARCDPOS',
 			                   items: true
 			               });
 			    			
 			    			win.crearVentanaCP=function(w){
 			    				
 			    				w.ventanaCP=Ext.create('Ice.view.componente.Ventana',{
 			    					title		:	'Buscar CP',
 			    					height		:	"80%",
 			    					scrollable	: 	true,
 			    	 			    width		:	"70%",
 			    					items		:	[
 			    						{
 			    							xtype		:	'formulario',
 			    							scrollable	:	true,
 			    							items		:	comps.AGREGAR_PERSONAS.BUSCARCDPOS.items,
 			    							buttons		:	[
 			    	 		 			    	{
 			    	 						    	xtype	: 'button',
 			    	 						    	text	: 'Buscar',
 			    	 						    	handler : function(btn){
 			    	 						    		var ventana=btn.up("[xtype=ventana]");
 			    	 						    		me.buscarDomicilio(ventana.down("[xtype=formulario]"),ventana.down("[xtype=gridice]"));
// 			    	 						    		view.down('[xtype=domicilios]').getStore().load();
 			    	 						    		
 			    	 						    	}
 			    	 		 			    	},
 			    	 		 			    	{
 			    	 						    	xtype	: 'button',
 			    	 						    	text	: 'Cancelar',
 			    	 						    	handler : function(btn){
 			    	 						    		btn.up('[xtype=ventana]').cerrar();
 			    	 						    	}
 			    	 		 			    	}
 			    	 		 			    ]
 			    						},
 			    						{
 			    							xtype		:	'gridice',
 			    							title		:	"Resultados",
 			    							botones		:	{
 			    								xtype		:	'button',
 			    								text		:	'Elegir',
 			    								handler		:	function(btn){
 			    									var paso='';
 			    									try{
 			    										var grid=btn.up("[xtype=gridice]");
 			    										var record=grid.getSelection()[0];
 			    										Ice.log("record: ",record);
 			    										var form=Ice.query("#addDom > [xtype=formulario]");
 			    										Ice.log("form ", form);
 			    										Ext.ComponentQuery.query("[getName][cmpBuscar]",form)
 			    										.forEach(function(it){
 			    											Ice.log(it.getName(),"it",it);
 			    											it.setValue(record.get(it.getName()));
 			    										});
 			    										
 			    									}catch(e){
 			    										Ice.manejaExcepcion(e,paso);
 			    									}
 			    								}
 			    							},
 			    							columns		:	[
 			    								{
 			    									text		:	'CP',
 			    									dataIndex	:	'cdcodpos'
 			    								},
 			    								{
 			    									text		:	'Provincia',
 			    									dataIndex	:	'dsprovin'
 			    								},
 			    								{
 			    									text		:	'Ciudad',
 			    									dataIndex	:	'dsciudad'
 			    								},
 			    								{
 			    									text		:	'Municipio',
 			    									dataIndex	:	'dsmunici'
 			    								}
 			    							],
 			    							store		:	{
 			    								
 			    								fields	:["cdpostal",'otpoblac',"cdpais","descripl",'cdmunici','cdcodpos','cdprovin','dscodpos','dsprovin','dsciudad','cdciudad','dsmunici','tipoiva'],
 			    								proxy	:{
 			    									type 		:	'ajax',
 			    									url			:	Ice.url.bloque.personas.buscaCP,
 			    									reader 		: {
 			    										type 			: 'json',
 			    										rootProperty 	: 'list',
 			    										successProperty : 'success',
 			    										messageProperty : 'message'
 			    									}
 			    								}
 			    							}
 			    						}
 			    					]
 			    						
 			    			});
 			    			};
 			    			
 			    			win.crearVentanaCP(win);
 			    			
 			    		}catch(e){
 			    			Ice.manejaExcepcion(e,paso);
 			    		}
 			    	},
						
					afterrender:function(w){
					
						var paso='';
						try{
							Ext.ComponentQuery
							.query("[cmpBuscar]").forEach(function(it){
								
								Ice.log("Selecciono");
								
								it.on({
									focus:function(){
										Ice.log("Evento");
										w.crearVentanaCP(w);
	 						    		w.ventanaCP.mostrar();
									}
								})
							});
						}catch(e){
							Ice.manejaExcepcion(e,paso);
						}
					}
							
 			    },
 			    items		:	[
 			    	{
 			    		xtype		:	'formulario',
 			    		scrollable	:	true,
 			    		layaout		:	'column',
 			    		margin: '0px 10px 10px 0px',
 			    		defaults:{
 			    	    	margin: '0px 10px 10px 0px'
 			    	    },
 			    		itemId		:	'frmDomicilio',
 			    		items		:	comps.AGREGAR_PERSONAS.MDOMICIL.items,
 			    		modelValidators:comps.AGREGAR_PERSONAS.MDOMICIL.validators,
	        			modelFields:	comps.AGREGAR_PERSONAS.MDOMICIL.fields,	
 			    		buttons		:	[
 		 			    	{
 						    	xtype	: 'button',
 						    	text	: 'Guardar',
 						    	handler : function(btn){
 						    		;
 						    		me.guardar(btn.up('#addDom').accion);
 						    		view.down('[xtype=domicilios]').getStore().load();
 						    		
 						    	}
 		 			    	},
 		 			    	{
 						    	xtype	: 'button',
 						    	text	: 'Cancelar',
 						    	handler : function(btn){
 						    		btn.up('[xtype=ventana]').crearVentanaCP(btn.up('[xtype=ventana]'));
 						    		btn.up('[xtype=ventana]').ventanaCP.mostrar();
 						    		//btn.up('#addDom').cerrar();
 						    	}
 		 			    	}
 		 			    ],
 		 			    beforerender:function(){
 		 			    	if(accion){
// 		 			    		me.llenarCampos(this,'url',{
// 		 			    			cdperson:accion.cdperson,
// 		 			    			nmorddom:accion.nmorddom
// 		 			    		});
 		 			    	}
 		 			    }
 			    	}
 			    ]
 			    
    		})
    		.mostrar();
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    },
    
    editarDomicilio: function(grid,rowIndex,colIndex){
    	var paso='',
    		me=this,
    		view = me.getView();
    	
    	try{
    		Ice.log(grid,rowIndex,colIndex);
    		
    		
    		
    		if(Ext.manifest.toolkit === 'classic'){
    			var record=grid.getStore().getAt(rowIndex);            
            } else {
                var cell = grid.getParent(),
                    record = cell.getRecord(),
                    data = record.getData();
            }
    		
    		
    		
    		this.agregarDomicilio({accion:'U',
    							 cdperson:record.get("cdperson"),
    							 nmorddom:record.get("nmorddom")});
    		
    		view.down('[xtype=domicilios]').getStore().load();
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    },
    
  
    
    borrarDomicilio : function(grid,rowIndex,colIndex){
    	var paso='',
		me=this,
		view = me.getView();
	
	try{
		Ice.log(grid,rowIndex,colIndex);
		
		
		
		if(Ext.manifest.toolkit === 'classic'){
			var record=grid.getStore().getAt(rowIndex);            
        } else {
            var cell = grid.getParent(),
                record = cell.getRecord(),
                data = record.getData();
        }
		
		
		
		this.guardar({accion:'D',
							 cdperson:record.get("cdperson"),
							 nmorddom:record.get("nmorddom")});
		
		view.down('[xtype=domicilios]').getStore().load();
	}catch(e){
		Ice.manejaExcepcion(e,paso);
	}
    },
    
    
    
    guardar:function(accion){
    	var paso="",
		me=this,
		view=me.getView();
		try{
			var datos={};
			var form=Ice.query("#frmDomicilio")
			if(!(accion && accion.accion=='D')) me.validarCampos(form);
			Ext.ComponentQuery.query('[getName]',form).forEach(function(it){
				datos[it.getName()]=it.getValue();
			});
			
			Ice.request({
    			url:Ice.url.bloque.personas.movimientoDomicilio,
    			jsonData:{
    				params:datos,
    				accion: (accion && accion.accion)?accion.accion:'I'
    			},
    			success:function(json){
    				Ext.ComponentQuery.query('#addDom').forEach(function(it){
    					it.cerrar();
    				});
    				Ice.mensaje("Se guardo correctamente");
    				
    			}
    			
    		});
		}catch(e){
			Ice.manejaExcepcion(e,paso);
		}
    },
    
 validarCampos:function(form){
    	
    	var paso='';
    	try{
    		if(!form.modelValidators || !form.modelFields){
    			throw 'No se puede validar el formulario'+form.getTitle();
    		}
    		
    		paso = 'Construyendo modelo de validaci\u00f3n';
    		
    		var validators={};
    		var refs=form.getReferences();
    		var ref=null;
    		var view=this.getView();
    		Ice.log("-]",form);
    		Ice.query('[getName]',form).filter(function(it){
    			return it.isHidden()!==true && typeof it.getName =='function' && form.modelValidators[it.getName()] ;
    		})
    		.forEach(function(it){
    			validators[it.getName()] = form.modelValidators[it.getName()];
    		});
    		
    		Ice.log("refs , validators",refs, validators)
    		
    		var modelName = Ext.id();
            var  modelo = Ext.define(modelName, {
                extend: 'Ext.data.Model',
                fields: form.modelFields,
                validators: validators
            });
            
           Ice.log( "Modelo",modelo)
            
            paso = 'Validando datos';
            errores = Ext.create(modelName, form.getValues()).getValidation().getData();
            Ice.log("Errores",errores)
            var sinErrores = true,
            erroresString = '';
    	    Ext.suspendLayouts();
    	    for (var name in errores) {
    	        if (errores[name] !== true) {
    	            sinErrores = false;
    	            var ref = form.down('[name=' + name + ']');
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
    		
    	}catch(e){
    		Ice.generaExcepcion(e,paso);
    	}
    },
    
    buscarDomicilio:function(form,grid){
    	paso="";
    	try{
    		var datos={};
    		Ext.ComponentQuery.query("[getName]",form)
    		.forEach(function(it){
    			datos["params."+it.getName()]=it.getValue();
    		});

    		Ice.log("datos: ",datos);
    		grid.getStore().proxy.extraParams=datos;
    		grid.getStore().load();
    		
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    }
    
    


});
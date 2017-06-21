Ext.define('Ice.view.bloque.personas.domicilios.AgregarDomicilioWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agregardomiciliowindow',
    
    custom	:	function(){
    	var me=this,paso="",view =me.getView();
    	try{
    
    	if(view.getAccion()=='U'){
    	
	    	params={
	    			'params.cdperson'	:	view.getCdperson(),
	    			'params.nmorddom'		:	view.getNmorddom()
	    		};
	    	var form=view.down('[xtype=formulario]');
	    	
	    	me.llenarCampos(form,Ice.url.bloque.personas.obtenerDomicilio,params,function(){
	    		form.down("[getName][name=cdcoloni]").heredar();
	    	});
    	}
	    	
    	}catch(e){
    		//Ice.manejaExcepcion(e,paso);
    	}
    },
    
    guardarDomicilio : function(btn){
		var paso="",
			me=this,
			view=me.getView();
		try{
			var datos={};
			datos.cdperson=view.getCdperson();
			var form=view.down("[xtype=formulario]");
			me.validarCampos(form);
			Ext.ComponentQuery.query('[getName]',form).forEach(function(it){
				
				if(it.getValue() && it.getValue().toString().indexOf("-")!=-1){
					it.setValue((it.getValue().split('-')[0]+"").trim());
				}
				datos[it.getName()]=it.getValue();
				
			});
			
			Ice.request({
    			url:Ice.url.bloque.personas.movimientoDomicilio,
    			jsonData:{
    				params:datos,
    				accion: view.getAccion()
    			},
    			success:function(json){
    				Ext.ComponentQuery.query('#addDom').forEach(function(it){
    					it.cerrar();
    				});
    				Ice.mensaje("Se guardo correctamente");
    				view.fireEvent("guardarDomicilio",view);
    				view.cerrar();
    				
    			}
    			
    		});
			
		}catch(e){
			Ice.manejaExcepcion(e,paso);
		}
		
	},
	
	cancelar : function(){
		var paso="",
		me=this,
		view=me.getView();
		try{
			view.cerrar()
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
    
    onFocusCP : function(){
    	var paso="",
    		me=this,
    		view=me.getView();
    	try{
    		Ice.log("Evento");
    		
    		if(!me.buscarcp){
    			me.buscarcp=Ext.create("Ice.view.bloque.personas.domicilios.BuscarCPWindow",{
    				
    				closeAction:'method-hide',
    				listeners:{
    					elegir:function(me,record,grid){
    						Ice.log("record: ",record);
    						var form=view.down('[xtype=formulario]');
    						Ice.log("form ", form);
    						Ext.ComponentQuery.query("[getName][cmpBuscar]",form)
    						.forEach(function(it){
    							Ice.log(it.getName(),"it",it);
    							it.setValue(record.get(it.getName()));
    							switch(it.getName()){
    								case "cdpais":
    									it.setValue(record.get(it.getName())+"-"+record.get("descripl"));
    									break;
    								case 'cdprovin':
    									it.setValue(record.get(it.getName())+"-"+record.get("dsprovin"));
    									break;
    							}
    							
    						});
    						Ext.ComponentQuery
								.query("[getName]",view).forEach(function(it){
									if(it.heredar) {it.heredar();}
								});
    					}
    				}
    			});
    		}
			
    		me.buscarcp.mostrar();
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
					
				
    },
    
    llenarCampos:function(root,url,params,call){
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
	    				
	    				if(call){
	    					
	    					call();
	    				}
    				}catch(e){
    					Ice.generaExcepcion(e,paso)
    				}
    			}
    		})
    	}catch(e){
    		Ice.generaExcepcion(e,paso);
    	}
    }
    
    
});
Ext.define('Ice.view.bloque.personas.domicilios.FormularioDomicilioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formulariodomicilio',
    cpactivo:	false,
    custom	:	function(){
    	var me=this,paso="",view =me.getView();
    	try{
			/*if(view.getAccion() == 'U'){
				params = {
					'params.cdperson'	:	view.getCdperson(),
					'params.nmorddom'		:	view.getNmorddom()
				};
				var form = view.down('[reference=formulario]');
				me.llenarCampos(form,Ice.url.bloque.personas.obtenerDomicilio,params,function(){
					form.down("[getName][name=cdcoloni]").heredar();
				});
			}*/
    	} catch(e) {
    		Ice.manejaExcepcion(e,paso);
    	}
    },
    
    guardarDomicilio : function(btn){
		var paso = "",
			me = this,
			view = me.getView();
		try{
			var datos = {};
			datos.cdperson = view.getCdperson();
			var form = view.down("[reference=formulario]");
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
    			}
    		});
			
		} catch(e) {
			Ice.manejaExcepcion(e,paso);
		}
	},
	
	cancelar : function(){
		var paso="",
		me=this,
		view=me.getView();
		try{
			Ice.pop();
		} catch(e) {
			Ice.manejaExcepcion(e,paso);
		}
	},
	
	validarCampos:function(form){
    	var paso='';
    	try{
    		if(!form.getModelValidators() || !form.getModelFields()){
    			throw 'No se puede validar el formulario '+form.getTitle();
    		}
    		
    		paso = 'Construyendo modelo de validaci\u00f3n';
    		
    		var validators={};
    		var refs=form.getReferences();
    		var ref=null;
    		var view=this.getView();
    		Ice.log("-]",form);
    		Ice.query('[getName]',form).filter(function(it){
    			return it.isHidden()!==true && typeof it.getName =='function' && form.getModelValidators()[it.getName()] ;
    		})
    		.forEach(function(it){
    			validators[it.getName()] = form.getModelValidators()[it.getName()];
    		});
    		
    		Ice.log("refs , validators",refs, validators)
    		
    		var modelName = Ext.id();
            var  modelo = Ext.define(modelName, {
                extend: 'Ext.data.Model',
                fields: form.getModelFields(),
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
    		if(!me.cpactivo){
    			me.cpactivo=true;
				me.buscarcp=Ext.create("Ice.view.bloque.personas.domicilios.BuscarCPWindow",{
					//closeAction:'method-hide',
					listeners: {
						close: function(){
							me.cpactivo=false;
						},
						elegir: function(me,record,grid){
							Ice.log("record: ",record);
							var form=view.down('[xtype=formulario]');
							Ice.log("form ", form);
							Ext.ComponentQuery.query("[getName][cmpBuscar]",form)
							.forEach(function(it){
								Ice.log(it.getName(),"it",it);
								it.setValue(record.get(it.getName()));
								Ice.log("it val new",it,record.get(it.getName()));
								switch(it.getName()){
									case "cdpais":
										it.setValue(record.get(it.getName())+"-"+record.get("descripl"));
										break;
									case 'cdprovin':
										it.setValue(record.get(it.getName())+"-"+record.get("dsprovin"));
										break;
								}
							});
							Ext.ComponentQuery.query("[getName]",view).forEach(function(it){
								if(it.heredar) {it.heredar();}
							});
	//    						if(Ice.classic())
	//    						   view.maximize();
						}
					}
				});
    		}
//    		if(Ice.classic())
//			     view.minimize();
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
	    					if(it.getStore){
	    						it.getStore().load(function(){
	    							it.setValue(datos[it.getName()]);
	    						});
	    					}else{
	    						it.setValue(datos[it.getName()]);
	    					}
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
	},
	
	onGetValues: function(){
		return this.getValues();
	},

	getValues: function(){
		var paso = 'Obteniendo valores de formulario de domicilio',
			me = this,
			view = me.getView(),
			refs = view.getReferences(),
			values = {};
		try{
			Ice.log('getValues view',refs);
			var c = 0;
			for(var obj in refs){
				var value = refs[obj].getValue();
				Ice.log('value',value);
				if(value && value.split("-") != -1){
					values[obj] = value.split("-")[0];
				} else {
					values[obj] = value;
				}
			}
		} catch(e) {
			Ice.manejaExcepcion(e, paso);
		}
		return values;
	}
});
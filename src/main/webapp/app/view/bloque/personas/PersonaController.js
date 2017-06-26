Ext.define('Ice.view.bloque.personas.PersonaController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.persona',
    
    custom:function(){
    	var me=this,paso="",view =me.getView();
    	try{
    		
    		if(view.getCdperson()){
	    		params={
	    			'params.cdperson'	:	view.getCdperson(),
	    			'params.cdrol'		:	view.getCdrol(),
	    			'params.cdramo'		:	view.getCdramo()
	    		};
	    		me.llenarCampos(view.down('#frmPersona'),Ice.url.bloque.personas.obtenerPersona,params);
    		}
    		
    	}catch(e){
    		Ice.log(e,paso);
    	}
    	
    },
    
    guardarPersona:function(call){
    	var paso="",
    		me=this,
    		view=me.getView();
    	try{
    		var form=view.down("[xtype=formulario]"),
    			tvaloper={},
    			mpersona={};
    		me.validarCampos(form);
    		Ice.query('[getName]',form).forEach(function(it){
    			
    			var valor=it.getValue();
    			if(it.getName()!="fenacimi" && typeof valor =="string" && (""+valor).indexOf("-")!=-1){
    				valor=(valor.split("-")[0]+"").trim();
    			}
    			if((""+it.getName()).indexOf("otvalor")!=-1){
    				tvaloper[it.getName()]=valor;
    			}else{
    				mpersona[it.getName()]=valor;
    			}
    			
    		});
    		Ice.log("Datos de persona a enviar: ",mpersona,tvaloper);
    		accion=view.getAccion();
//    		view.fireEvent("personaGuardada", view, json.params.cdperson);
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
    				
    				view.setCdperson(json.params.cdperson);
    				view.setAccion("U");
    				view.fireEvent("guardarpersona",view,json.params.cdperson);
    				if(call && typeof call =='function'){
    					call();
    				}
    				Ice.mensaje("Se guardo correctamente");
    				view.fireEvent("personaGuardada", view, json.params.cdperson);
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
    
    agregarDomicilio	:	function(){
    	var paso="",
		me=this,
		view=me.getView();
		try{
			
			if(view.getAccion()==='I'){
				Ext.Msg.confirm("Agregar Domicilio","Se guardarán los datos de la persona \u00bfDesea continuar?",function(opc){
	      		  if(opc==='yes'){
	      			me.guardarPersona(function(cdperson){
	      				Ext.create("Ice.view.bloque.personas.domicilios.AgregarDomicilioWindow",{
		    	    		listeners:{
		    	    			guardarDomicilio:function(){
		    	    				view.down('[xtype=domicilios]').getStore().proxy.extraParams['params.cdperson']=view.getCdperson();
		    	    				view.down('[xtype=domicilios]').getStore().load();
		    	    			}
		    	    		},
		    	    		cdperson:view.getCdperson()
		    	    	}).mostrar(); 
	      			});
	      			
	      		  }
	      		});
			}else{
				Ext.create("Ice.view.bloque.personas.domicilios.AgregarDomicilioWindow",{
		    		listeners:{
		    			guardarDomicilio:function(){
		    				view.down('[xtype=domicilios]').getStore().proxy.extraParams['params.cdperson']=view.getCdperson();
		    				view.down('[xtype=domicilios]').getStore().load();
		    			}
		    		},
    	    		cdperson:view.getCdperson()
		    	}).mostrar();
			}
	    	
		}catch(e){
    		Ice.generaExcepcion(e,paso);
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
    		
    		Ice.log("record",record,record.get("cdperson"),record.get("nmorddom"));
    		Ext.create("Ice.view.bloque.personas.domicilios.AgregarDomicilioWindow",{
    			
    			cdperson:record.get("cdperson"),
				nmorddom:record.get("nmorddom"),
	    		listeners:{
	    			guardarDomicilio:function(){
	    				view.down('[xtype=domicilios]').getStore().load();
	    			}
	    		}
	    	}).mostrar();
    		
    		
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
			datos=Object.assign({},accion);
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
    }
    
    
    
    
    
    


});
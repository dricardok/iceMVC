Ext.define('Ice.view.bloque.personas.DomiciliosGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.domicilios',
    
    custom: function () {
        Ice.log('Ice.view.bloque.CoberturasController.custom');
        var me = this,
        view = me.getView(),
        paso = 'Configurando comportamiento de bloque lista de situaciones';
        try {        	
        	
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
//    agregarDomicilio		:	function(accion){
//    	var paso="",
//    		me=this,
//    		view=me.getView();
//    	try{
//    		
//    		var comps = Ice.generaComponentes({
//                pantalla: 'AGREGAR_PERSONAS',
//                seccion: 'MDOMICIL',
//                items: true,
//                fields: true,
//                validators: true
//            });
//    		
//    		Ext.create('Ice.view.componente.Ventana', {
//    			title		:	'Añadir Domicilio',
// 			    height		:	550,
// 			    width		:	450,
// 			    layout		:	'fit',
// 			    
// 			    items		:	[
// 			    	{
// 			    		xtype		:	'formulario',
// 			    		scrollable	:	true,
// 			    		layaout		:	'column',
// 			    		itemId		:	'frmDomicilio',
// 			    		items		:	comps.AGREGAR_PERSONAS.MDOMICIL.items,
// 			    		modelValidators:comps.AGREGAR_PERSONAS.MDOMICIL.validators,
//	        			modelFields:	comps.AGREGAR_PERSONAS.MDOMICIL.fields,	
// 			    		buttons		:	[
// 		 			    	{
// 						    	xtype	: 'button',
// 						    	text	: 'Guardar',
// 						    	handler : function(btn){
// 						    		me.guardar(accion);
// 						    		view.getStore().load();
// 						    	}
// 		 			    	}
// 		 			    ],
// 		 			    beforerender:function(){
// 		 			    	if(accion){
// 		 			    		me.llenarCampos(this,'url',{
// 		 			    			cdperson:accion.cdperson,
// 		 			    			nmorddom:accion.nmorddom
// 		 			    		});
// 		 			    	}
// 		 			    }
// 			    	}
// 			    ]
// 			    
//    		})
//    		.mostrar();
//    	}catch(e){
//    		Ice.manejaExcepcion(e,paso);
//    	}
//    },
//    
//    editarDomicilio: function(grid,rowIndex,colIndex){
//    	
//    	try{
//    		var record=grid.getAt(rowIndex);
//    		this.agregarDomicilio({accion:'U',
//    							 cdperson:record.get("cdperson"),
//    							 nmorddom:record.get("cdperson")});
//    		grid.getStore().load();
//    	}catch(e){
//    		Ice.manejaExcepcion(e,paso);
//    	}
//    },
//    
//  
//    
//    borrarDomicilio : function(){
//    	
//    },
//    
//    
//    
//    guardar:function(){
//    	var paso="",
//		me=this,
//		view=me.getView();
//		try{
//			var datos={};
//			var form=Ice.query("#frmDomicilio")
//			me.validarCampos(form);
//			Ice.query('[getName]',form).forEach(function(it){
//				datos[it.getName()]=it.getValue();
//			});
//			
//			Ice.request({
//    			url:Ice.url.bloque.personas.guardarDomicilio,
//    			jsonData:{
//    				params:datos,
//    				accion:accion.accion?accion.accion:'I'
//    			},
//    			success:function(json){
//    				
//    				Ice.mensaje("Se guardo correctamente");
//    			}
//    			
//    		});
//		}catch(e){
//			Ice.manejaExcepcion(e,paso);
//		}
//    },
//    
// validarCampos:function(form){
//    	
//    	var paso='';
//    	try{
//    		if(!form.modelValidators || !form.modelFields){
//    			throw 'No se puede validar el formulario'+form.getTitle();
//    		}
//    		
//    		paso = 'Construyendo modelo de validaci\u00f3n';
//    		
//    		var validators={};
//    		var refs=form.getReferences();
//    		var ref=null;
//    		var view=this.getView();
//    		Ice.log("-]",form);
//    		Ice.query('[getName]',form).filter(function(it){
//    			return it.isHidden()!==true && typeof it.getName =='function' && form.modelValidators[it.getName()] ;
//    		})
//    		.forEach(function(it){
//    			validators[it.getName()] = form.modelValidators[it.getName()];
//    		});
//    		
//    		Ice.log("refs , validators",refs, validators)
//    		
//    		var modelName = Ext.id();
//            var  modelo = Ext.define(modelName, {
//                extend: 'Ext.data.Model',
//                fields: form.modelFields,
//                validators: validators
//            });
//            
//           Ice.log( "Modelo",modelo)
//            
//            paso = 'Validando datos';
//            errores = Ext.create(modelName, form.getValues()).getValidation().getData();
//            Ice.log("Errores",errores)
//            var sinErrores = true,
//            erroresString = '';
//    	    Ext.suspendLayouts();
//    	    for (var name in errores) {
//    	        if (errores[name] !== true) {
//    	            sinErrores = false;
//    	            var ref = form.down('[name=' + name + ']');
//    	            if (Ext.manifest.toolkit === 'classic') {
//    	                ref.setActiveError(errores[name]);
//    	            } else {
//    	                erroresString = erroresString + ref.getLabel() + ': ' + errores[name] + '<br/>';
//    	            }
//    	        }
//    	    }
//    	    Ext.resumeLayouts();
//    	    
//    	    if (sinErrores !== true) {
//    	        if (Ext.manifest.toolkit === 'classic') {
//    	            throw 'Favor de revisar los datos';
//    	        } else {
//    	            throw erroresString;
//    	        }
//    	    }
//    		
//    	}catch(e){
//    		Ice.generaExcepcion(e,paso);
//    	}
//    },
//    
//    llenarCampos:function(root,url,params){
//    	paso=""
//    	try{
//    		Ice.request({
//    			url:url,
//    			params:params,
//    			success:function(json){
//    				var paso="";
//    				try{
//	    				var datos=json.params || {};
//	    				Ext.ComponentQuery.query('[getName]',root)
//	    				.forEach(function(it){
//	    					it.setValue(datos[it.getName()]);
//	    				});
//    				}catch(e){
//    					Ice.generaExcepcion(e,paso)
//    				}
//    			}
//    		})
//    	}catch(e){
//    		Ice.generaExcepcion(e,paso);
//    	}
//    }
//    
});
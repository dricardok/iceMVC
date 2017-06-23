Ext.define('Ice.view.bloque.AgentesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloqueagentes',
    
    
    constructor: function (config) {
        Ice.log('Ice.view.bloque.AgentesController.constructor config:', config);
        this.callParent(arguments);
    },
    
    init: function (view) {
        Ice.log('Ice.view.bloque.AgentesController.init view:', view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de bloque agentes';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el viewmodel antes de invocar custom
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de bloque agentes';
                    me.custom();                    
                } catch (e) {
                	//alert(e);
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 200);
        } catch (e) {
        	//alert(e);
            Ice.generaExcepcion(e, paso);
        }
    },
    
    custom: function () {
        Ice.log('Ice.view.bloque.AgentesController.custom');
        var me = this,
            view = me.getView(),
            paso = 'Configurando comportamiento bloque de agentes';
        Ice.log('view: ',view);
            
        try {
        	
            var refs = view.getReferences() || {};
            Ice.log('Ice.view.bloque.AgentesController refs:', refs);
                        
            Ice.request({
            	mascara: 'Cargando valores iniciales',
            	url: Ice.url.bloque.agentes.cargar,
            	params: {
            		'params.cdunieco'	:		view.getCdunieco(),
            		'params.cdramo'		:		view.getCdramo(),
            		'params.estado'		:		view.getEstado().toUpperCase(),
            		'params.nmpoliza'	:		view.getNmpoliza(),
            		'params.nmsuplem'	:		view.getNmsuplem()
            	},
            	success: function(action) {
            		
            		for (var att in action.params) {
                        if (refs[att] && !refs[att].getValue()) {
                            refs[att].setValue(action.params[att]);
                        }
                    }            		
            		
            	},
            	failure: function() {           		
            	}
            });
            
        } catch (e) {
        	alert(e);
            Ice.generaExcepcion(e, paso);
        }
    },
    
    onAgregarClic: function () {
        this.agregarAgente();
    },
    
    agregarAgente: function () {
        Ice.log('Ice.view.bloque.AgentesController.agregar');
        var me = this,          
        	view = me.getView(),
        	refs = view.getReferences(),
        	paso = 'Antes de agregar agente';
        
        try {
        	var datos={}
        	var form=view.down("#agregaragente");
        	Ice.query('[getName]',form).forEach(function(it){
        		if(it.getName().indexOf("_")!=-1){
        			it.setName(it.getName().split("_")[0].trim())
        		}
        		datos[it.getName()]=it.getValue();
        	});
        	
        	view.down("[xtype=gridice]").getStore().add(datos);
        	view.getAgentesAgregados().push(datos);
            
        }catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
        
        Ice.log('Ice.view.bloque.AgentesController.agregar ok');
    },
    
    onGuardarClic: function () {
        this.guardarAgentes();
    },
    
    guardarAgentes: function () {
        Ice.log('Ice.view.bloque.AgentesController.guardar');
        var me = this,          
        	view = me.getView(),
        	refs = view.getReferences(),
        	paso = 'Antes de guardar agente';
        
        try {
        	
        	paso = 'Guardando datos de agentes';
        	
        	this.validacion();
        	
        	var agentes = [],
        		store = view.down('[xtype=gridice]').getStore(),
        		data = store.getData(),
        		items = data.items;
        	
        	for(var i=0; i<items.length; i++){
        		
        		var tipoag=items[i].data.cdtipoag;
        		Ice.log("tipoag:",tipoag)
        		if(tipoag  && tipoag.indexOf("-")!=-1){
        			items[i].data.cdtipoag=tipoag.split("-")[0].trim()
        		}
        		agentes.push(items[i].data);
        	}
        	
        	Ice.request({
                mascara: paso,
                url: Ice.url.bloque.agentes.guardar,
                jsonData: {
                	params: {
                		'cdunieco'	:		view.getCdunieco(),
                		'cdramo'	:		view.getCdramo(),
                		'estado'	:		view.getEstado().toUpperCase(),
                		'nmpoliza'	:		view.getNmpoliza(),
                		'nmsuplem'	:		view.getNmsuplem(),
                		'nmcuadro'	:		refs['nmcuadro'].getValue(),
                		'porredau'	:		refs['porredau'].getValue()
                	},
                    agentes: agentes
                },
                success: function (action) {
                    /*var paso2 = 'Seteando valores por defecto';
                    try {
                        if (action.validaciones && action.validaciones.length > 0) {
                            Ext.create('Ice.view.bloque.VentanaValidaciones', {
                                lista: action.validaciones
                            }).mostrar();
                            
                            var error = false;
                            for (var i = 0; i < action.validaciones.length; i++) {
                                if (action.validaciones[i].tipo.toLowerCase() === 'error') {
                                    //error = true; para que no avance si hay validaciones tipo "error"
                                    break;
                                }
                            }
                            if (error === true) {
                                throw 'Favor de revisar las validaciones';
                            }
                        
                        }
                        if(action.success){
                            Ice.mensajeCorrecto('Datos guardados');
                            refs.grid.getStore().reload();
                            Ice.log('proceso exitoso');
                        }
                        
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                        Ice.resumeEvents(view);
                    }*/
                },
                failure: function () {
                    //view.procesandoValoresDefecto = false;
                }
            });
        	
            
            
        }catch (e) {
        	Ice.manejaExcepcion(e, paso);
        }
        
        Ice.log('Ice.view.bloque.AgentesController.guardar ok');
    },
    
    
    onBuscarClic: function () {
       // this.buscarAgentes();
    	var me = this,          
		view = me.getView(),
		refs = view.getReferences(),
		paso = 'Antes de buscar agente';
    	try{
    		
	    	Ext.create("Ice.view.bloque.agentes.BuscarAgenteWindow",{
	    		listeners:{
	    			elegiragente	:	function(bus,record){
	    				
	    				var agente=view.down("[getName][name=cdagente]");
	    				Ice.log(view,"-------><",agente,record);
	    				agente.setValue(record.get("cdagente"));
	    			}
	    		}
	    	}).mostrar();
    	}catch(e){
    		Ice.manejaExcepcion(e, paso);
    	}
    },
    
    buscarAgentes: function () {
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
	                    /*if (refs[att] && !refs[att].getValue()) {
	                        refs[att].setValue(action.params[att]);
	                    }*/
	                }            		
	        		
	        	},
	        	failure: function() {           		
	        	}
	        });
	        
        }catch(e) {
        	Ice.manejaExcepcion(e, paso);
        }
    },
    
    editarPorcentaje	:	function(grid,rowIndex,colIndex){
    	 var me = this,          
 		view = me.getView(),
 		refs = view.getReferences(),
 		paso = 'Editar porcentaje';
    	 
    	 try{
    		 if(Ext.manifest.toolkit === 'classic'){
     			var record=grid.getStore().getAt(rowIndex);            
             } else {
                 var cell = grid.getParent(),
                     record = cell.getRecord(),
                     data = record.getData();
             }
    		 Ice.log("record",record);
    		 
    		 Ext.create("Ice.view.componente.VentanaPanel",{
    			 
    			 rec	:	record,
    			 title	:	"Editar porcentaje",
    			 layout	:	"fit",
    			 bodyPadding: '25px 20px 20px 20px',
    			 items	:	[
    				 {
    					 xtype	:	"formulario",
    					 items	:[
    						 {
    							 xtype	:	'numberfieldice',
    							 label	:	'Porcentaje'
    						 }
    					 ],
    					 buttons	:	[
    						 {
 						    	xtype	: 'button',
 						    	text	: 'Guardar',
 						    	handler : function(btn){
 						    		
 						    		var record=btn.up('[xtype=ventanapanel]').rec;
 						    		Ice.log("record",record);
 						    		record.set("porredau",btn.up('[xtype=ventanapanel]').down('numberfieldice').getValue());
 						    		btn.up('[xtype=ventanapanel]').cerrar();
 						    	}
 		 			    	},
 		 			    	{
 						    	xtype	: 'button',
 						    	text	: 'Cancelar',
 						    	handler : function(btn){
 						    		btn.up('[xtype=ventanapanel]').cerrar();
 						    	}
 		 			    	}
    					 ]
    				 }
    			 ]
    		 }).mostrar();
    	 }catch(e){
    		 Ice.manejaExcepcion(e, paso);
    	 }
    	 
    },
    eliminar : function(grid,rowIndex,colIndex){
    	
    var me   = this,          
  		view = me.getView(),
  		refs = view.getReferences(),
  		paso = 'Editar porcentaje';
    	try{
    		if(Ext.manifest.toolkit === 'classic'){
     			var record=grid.getStore().getAt(rowIndex);            
             } else {
                 var cell = grid.getParent(),
                     record = cell.getRecord(),
                     data = record.getData();
             }
    		var g=grid.up('[xtype=gridice]');
    		
    		var i=g.getStore().indexOf(record);
    		g.getStore().removeAt(i);
    		 Ice.log("record",record);
    		 
    		 
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    },
    
    validacion:function(){
    	 var me   = this,          
   		view = me.getView(),
   		refs = view.getReferences(),
   		paso = 'valida porcentaje';
     	try{
     		
     		 var sesion=Number(view.down("#datpoliza").down("[getName][name=porredau]").getValue());
     		var agentes=[]
     		 view.down("[xtype=gridice]").getStore().each(function(it){
     			 agentes.push({
     				porredau: Number(it.get("porredau"))
     			 })
     		 });
     		 
     		 var tot=sesion;
     		 agentes.forEach(function(it){
     			 tot+=it.porredau;
     		 });
     		 if(tot!=100){
     			 paso='El porcentaje es más de 100.'
     			 throw 'El porcentaje es diferente de 100%';
     		 }
     		 
     		 
     	}catch(e){
     		Ice.generaExcepcion(e,paso);
     	}
    }
        
});
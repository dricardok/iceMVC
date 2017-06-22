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
            		'params.cdunieco'	:		view.cdunieco,
            		'params.cdramo'		:		view.cdramo,
            		'params.estado'		:		view.estado,
            		'params.nmpoliza'	:		view.nmpoliza,
            		'params.nmsuplem'	:		view.nmsuplem
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
        	
        	var agentes = [],
        		store = view.down('grid').getStore(),
        		data = store.getData(),
        		items = data.items;
        	
        	for(var i=0; i<items.length; i++){
        		agentes.push(items[i].data);
        	}
        	
        	Ice.request({
                mascara: paso,
                url: Ice.url.bloque.agentes.guardar,
                jsonData: {
                	params: {
                		'cdunieco'	:		view.cdunieco,
                		'cdramo'	:		view.cdramo,
                		'estado'	:		view.estado,
                		'nmpoliza'	:		view.nmpoliza,
                		'nmsuplem'	:		view.nmsuplem,
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
        this.buscarAgentes();
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
    }
        
});
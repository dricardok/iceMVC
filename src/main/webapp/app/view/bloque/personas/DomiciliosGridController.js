Ext.define('Ice.view.bloque.personas.DomiciliosGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.domicilios',
    
    agregarDomicilio		:	function(){
    	var paso="";
    	try{
    		
    		var comps = Ice.generaComponentes({
                pantalla: 'AGREGAR_PERSONAS',
                seccion: 'DOMICILIO_ITEMS',
                url: 'jsonLocal/obtieleDomicilioIt.json',
                items: true,
                fields: true,
                validators: true
            });
    		
    		Ext.create('Ice.view.componente.Ventana', {
    			title		:	'Añadir Domicilio',
 			    height		:	550,
 			    width		:	450,
 			    layout		:	'fit',
 			    scrollable	:	true,
 			    items		:	[
 			    	{
 			    		xtype		:	'formulario',
 			    		items		:	comps.AGREGAR_PERSONAS.DOMICILIO_ITEMS.items,
 			    		buttons		:	[
 		 			    	{
 						    	xtype	: 'button',
 						    	text	: 'Guardar',
 						    	handler : function(me){}
 		 			    	}
 		 			    ]
 			    	}
 			    ]
 			    
    		})
    		.mostrar();
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    },
    
    editarDomicilio: function(){
    	
    	try{
    		this.agregarDomicilio();
    		
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    },
    
  
    
    borrarDomicilio : function(){
    	
    }
});
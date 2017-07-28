Ext.define('Ice.view.bloque.personas.domicilios.BuscarCPWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.buscarcpwindow',
    
    onElegir	: function(){
    	var paso="",
    		me=this,
    		view=me.getView();
    	try{
    		var grid=view.down("[xtype=gridice]");
    		var sel=grid.getSelection();
    		var record=null;
    		if(Ext.isArray(sel)){
    			record=sel[0];
    		}else{
    			record=sel;
    		}
    		
    		if(!record){
    			throw 'No se seleccionó ningun elemento';
    		}
			
    		Ice.log("record cp",record);
			
    		view.fireEvent('elegir',view,record,grid);
    		 if (Ext.manifest.toolkit === 'classic') {
    			 view.hide();
    		 }else{
    			 view.cerrar();
    		 }
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    },
    
    onBuscar	:  function(){
    	var paso="",
		me=this,
		view=me.getView();
		try{
			me.buscarDomicilio(view.down('[xtype=formulario]'),
								view.down('[xtype=gridice]'));
			
			
		}catch(e){
			Ice.manejaExcepcion(e,paso);
		}
	},
    	
    onCancelar	:  function(){
    	var paso="",
		me=this,
		view=me.getView();
		try{
    		view.cerrar();
		}catch(e){
			Ice.manejaExcepcion(e,paso);
		}
	},
	buscarDomicilio:function(form,grid){
    	paso="";
    	try{
    		var datos={};
    		Ext.ComponentQuery.query("[getName][getValue]",form)
    		.forEach(function(it){
    			Ice.log("-->",it.getValue(),typeof it.getValue())
    			if(it.getValue() && String(it.getValue()).indexOf("-")!=-1 && it.getValue().split){
    				it.setValue(it.getValue().split("-")[0].trim());
    			}
    			datos["params."+it.getName()]=it.getValue();
    		});

    		Ice.log("datos: ",datos);
    		grid.getStore().proxy.extraParams=datos;
    		grid.getStore().load();
    		
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    },
	    
});
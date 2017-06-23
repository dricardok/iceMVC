Ext.define('Ice.view.bloque.agentes.BuscarAgenteWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.buscaragentewindow',
    
    custom	:	function(){
    	var me=this,paso="",view =me.getView();
    	try{
    
    	
    	
	    	
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    },
    
    onBuscar   :   function(){
    	var me=this,paso="",view =me.getView();
    	try{
    		var cdagente=view.down("[xtype=textfieldice]").getValue();
    		var grid=view.down('[xtype=gridice]');
    		grid.getStore().proxy.extraParams["params.cdagente"]=cdagente;
    		grid.getStore().load();
    	
    	
	    	
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    },
    
    onElegir	:	function(){
    	var me=this,paso="",view =me.getView();
    	try{
    		
    		var grid=view.down("[xtype=gridice]");
    		var sel=grid.getSelection();
    		var record=null;
    		if(Ext.isArray(sel)){
    			record=sel[0];
    		}else{
    			record=sel;
    		}
			
    		Ice.log("record agente",record);
    		view.fireEvent("elegiragente",view,record);
    		view.setCdagente(record.get("cdagente"));
    		view.cerrar();
    	
    	
	    	
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    }
    
    
 });
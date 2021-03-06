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
    		
    		var cdgrupo = null;
    		var cdptovta = null;
    		try {
        		var cdgrupo = Ice.query('bloquedatosgenerales').getCdgrupo();
        		var cdptovta = Ice.query('bloquedatosgenerales').getCdptovta();
        	} catch(e) {
        		Ice.logError('No existe cdgrupo ni cdptovta', e);
        	}
        	Ice.log('cdgrupo::', cdgrupo);
        	Ice.log('cdptovta::', cdptovta);
        	
			if (!cdagente) {
				throw 'Favor de introducir un c\u00f3digo de agente';
			}
    		var grid=view.down('[xtype=gridice]');
    		grid.getStore().proxy.extraParams["params.cdagente"] = cdagente;
    		grid.getStore().proxy.extraParams["params.cdgrupo"]  = cdgrupo;
    		grid.getStore().proxy.extraParams["params.cdptovta"] = cdptovta;
			
			var mask = Ice.mask('Buscando agentes');
			grid.getStore().on({
				load: {
					fn: function () {
						mask.close();
					},
					single: true
				}
			});
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

			if (!record) {
				throw 'Favor de seleccionar un agente';
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
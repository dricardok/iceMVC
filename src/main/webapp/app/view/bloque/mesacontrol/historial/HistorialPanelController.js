Ext.define('Ice.view.bloque.mesacontrol.historial.HistorialPanelController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.historialpanel',
    
    onRendererToolTip:function(tooltip,record,ctx){
    	var paso="Render tooltip chart";
    	try{
    		
    		tooltip.removeAll();
    		tooltip.add(
                    {
                        xtype: 'displayfieldice',
                        label: 'Fecha',
                        value: Ext.Date.format(new Date(record.get('fecha')), 'd/m/Y H:i')
                    });
    		tooltip.add(
    				{
                        xtype: 'displayfieldice',
                        label: 'Usuario',
                        value: record.get('dsusuari')
                    });
            tooltip.add({
                        xtype: 'displayfieldice',
                        label: 'Rol',
                        name: record.get('dssisrol')
                    });
            tooltip.add({
                        xtype: 'displayfieldice',
                        label: 'Comentarios',
                        value: record.get('comments')
                    });
                
    		
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    },
    
    modificarDetalle : function(grid,rowIndex,colIndex){
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
			var s=Ext.create("Ice.view.bloque.documentos.historial.HistorialAgregarDetalleWindow",{
				record:record,
				listeners:{
					guardardetalle:function(a,b){
						var paso='Evento guardando detalles'
						try{
							var refs = view.getReferences();
							refs.gridEventos.getStore().load();
						}catch(e){
							Ice.manejaExcepcion(e,paso);
						}
					}
				}
			}).mostrar();
			
			Ice.log("ddddd",s)
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    }
});
    
Ext.define("Ice.view.bloque.documentos.historial.HistorialAgregarDetalleWindowController",{
	extend: 'Ext.app.ViewController',
    alias: 'controller.historialagregardetallewindow',
	
    agregarDetalle:function(){
    	var paso='Guardando nuevo detalle',
    		me=this,
    		view=me.getView();
    	try{
    		var refs = view.getReferences();
    		var anteriores = refs.comentarios.getValue();
    		var nuevo = refs.ncommentario.getValue();
    		
    		nuevo = anteriores + "\n\n----- " + view.getRecord().get('dsusuari') + ' - ' + view.getRecord().get('dssisrol')
    				+ ' (' + Ext.Date.format(new Date(),'d/m/y H:i') + ') -----\n' + nuevo;
    		Ice.log("record",view.getRecord().getData());
    		var datos = view.getRecord().getData();
    		datos['comments'] = nuevo;
    		datos['fecha'] = Ext.Date.format(new Date(datos['fecha']),'d/m/Y H:i');
    		for( var i in datos){
    			datos['params.'+i]=datos[i];
    		}
    		datos['params.accion']='U';
    		Ice.log("datos",datos);
    		
    		Ice.request({
    			url		:	Ice.url.bloque.mesacontrol.historial.movimientoThmesacontrol,
    			params	:	datos,
    			success	:	function(data){
    				try{
    					Ice.mensaje("Correcto","Se Guardo Correctamente el detalle.");
    					view.fireEvent('guardardetalle',view,datos);
    					Ice.query('[reference=gridEventos][getStore]').getStore().load();
    					Ice.log("view",view);
    				}catch(e){
    					Ice.manejaExcepcion(e,paso);
    				}
    			}
    		});
    		view.cerrar();
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    }
});
	
	
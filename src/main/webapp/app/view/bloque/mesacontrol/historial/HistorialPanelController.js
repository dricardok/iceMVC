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
                        value: record.get('fecha')
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
    }
});
    
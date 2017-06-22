Ext.define('Ice.view.componente.GridIce', {
    extend: 'Ext.grid.Grid',
    xtype: 'gridice',
    config		:	{
    	buttons		:	[]	
    },
    
    constructor:function(config){
    	
    	var me=this,
    		paso='';
    		
    	try{
    		config.items   = config.items || [];
    		config.buttons = config.buttons || [];
			Ice.log("buttons",config.buttons);
			if (config.buttons.length > 0) {
			    config.items.push({
		            xtype : 'toolbar',
		            docked: 'bottom',
		            items: config.buttons
		        });
			}
			
			config.actionColumns = config.actionColumns || [];						
			if (config.actionColumns.length > 0) {
				var c = [];
				config.actionColumns.forEach(function(it){
					c.push({
			            width: '60',
			            ignoreExport: true,
			            cell: {
			                xtype: 'widgetcell',
			                widget: it
			            }
			        });
				});
				config.columns = config.columns.concat(c);
				Ice.log("##d",config.columns);
			}
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    	me.callParent(arguments);
    }
    
});
Ext.define('Ice.view.componente.GridIce', {
    extend		: 'Ext.grid.Panel',
    xtype		: 'gridice',
    config		:	{
    	botones		:	[],
    	actionColumns :	[]
		
    },
    
    constructor:function(config){
    	var paso="",
		me=this;
		try{
			
			config.columns = config.columns || [];	
			config.actionColumns = config.actionColumns || [];
			config.columns=config.columns.concat(config.actionColumns);
			 
		}catch(e){
			Ice.generaExcepcion(e,paso);
		}
		me.callParent(arguments);
    },
    
    initComponent: function () {
    	
    	var paso="",
    		me=this;
    	try{
    		
    		Ext.apply(me, {
       		 
				tbar		:	me.getBotones()
            });
    		 
    	}catch(e){
    		Ice.generaExcepcion(e,paso);
    	}
    	
    	me.callParent(arguments);
    }
    
    
    
});
Ext.define('Ice.view.componente.GridIce', {
    extend		: 'Ext.grid.Panel',
    xtype		: 'gridice',
    config		:	{
    	botones		:	[]
		
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
    },
    
    
    
});
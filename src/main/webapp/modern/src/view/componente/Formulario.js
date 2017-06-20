Ext.define('Ice.view.componente.Formulario', {
    extend: 'Ext.form.Panel',
    xtype: 'formulario',
    constructor	:	function(config){
    	 var me=this;
    	try{
	    	config.items = config.items || [];
	    	config.buttons = config.buttons || [];
			
			if (config.buttons.length > 0) {
			    config.items.push({
		            xtype : 'toolbar',
		            docked: 'bottom',
		            items: config.buttons
		        });
			}
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    	me.callParent(arguments);
    }
    
    
});
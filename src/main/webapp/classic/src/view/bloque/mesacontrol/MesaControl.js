Ext.define('Ice.view.bloque.mesacontrol.MesaControl', {
    extend: 'Ext.panel.Panel',
    xtype: 'bloquemesacontrol',

    controller: 'bloquemesacontrol',
    
    title: 'Mesa de Control de Fujo',
    
    // configuracion no ext
    config: {
    	cdunieco: null,
    	cdramo: null,
    	estado: null,
    	nmpoliza: null,
    	cdagente: null,
    	ntramite: null,
    	estatus: null,
    	fecstatui: null,
    	fecstatuf: null,
    	nombre: null,
    	nmsolici: null,
    	
    	modulo: null,
        flujo: null,
        auxkey: null
    },
    
    constructor: function (config) {
    	Ice.log('Ice.view.bloque.mesacontrol.MesaControl config', config);
    	var me = this,
    		paso = 'Construyendo el bloque de Mesa de control';
    	try{
    		config.ntramite = 1;
    		
    		config.items = [
    			{
    				xtype: 'formmesacontrol',
    				reference: 'formmesacontrol'
    			}, {
    				xtype: 'gridmesacontrol',
    				reference: 'gridmesacontrol',
    				
    				ntramite: config.ntramite
    			}
    		];
    		
    	}catch (e) {
    		Ice.generaExcepcion(e, paso); 
    	}
    	me.callParent(arguments);
    }
});
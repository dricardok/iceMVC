Ext.define('Ice.view.mesacontrol.MesaControl', {
    extend: 'Ice.view.componente.PanelPaddingIce',
    xtype: 'mesacontrol',
    title: 'Mesa de control',
    
    platformConfig: {
        '!desktop': {
            
        	scrollable: true
        	
        }
    },
    
    requires: [
    	'Ice.view.bloque.mesacontrol.FormMesaControl'
    ],
    
    controller: 'mesacontrol',  
    
    items: [
    	{
    		xtype: 'formmesacontrol',
    		reference: 'formmesacontrol'
    	}, {
    		xtype: 'gridmesacontrol',
    		reference: 'gridmesacontrol',
    		itemsPerPage: 50,
    		estatus: -1
    	}
    ]
    
    /*
    constructor: function(config) {
    	Ice.log('Ice.view.mesacontrol.MesaControl.constructor config:', config);
        this.callParent(arguments);
        //Ice.generaComponentes();
        Ice.query('#mainView').getController().redirectTo('accesocotizacion.action');
        return;
    }*/
});

Ext.define('Ice.view.mesacontrol.MesaControl', {
    extend: 'Ice.view.componente.PanelPaddingIce',
    xtype: 'mesacontrol',
    title: {
		text:"Mesa de Control",
		style:'margin:0px 47px 16px 36px;',
	},
    
    platformConfig: {
        '!desktop': {
        	scrollable: true
        }
    },
    
    controller: 'mesacontrol',
    
    constructor: function(config) {
        Ice.log('Ice.view.mesacontrol.MesaControl.constructor config:', config);
    	var me = this,
            paso = 'Construyendo mesa de control';
    	
    	//me.callParent(arguments);
//        return Ice.query('#mainView').getController().redirectTo('accesocotizacion.action'); // para que no entre a mesa
        
        try {
            Ice.generaComponentes(); // para que valide sesion

            config.items = [
                {
                    xtype: 'formmesacontrol',
                    reference: 'formmesacontrol'
                }, {
                	style:'margin:0px 47px 0px 0px;',
                    xtype: 'gridmesacontrol',
                    reference: 'gridmesacontrol',
                    itemsPerPage: 50,
                    estatus: -1
                }
            ].concat(config.items || []);

            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});

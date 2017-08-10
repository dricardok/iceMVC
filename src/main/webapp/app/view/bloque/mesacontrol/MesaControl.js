Ext.define('Ice.view.mesacontrol.MesaControl', {
    extend: 'Ice.view.componente.ContainerIce',
    xtype: 'mesacontrol',
    title: 'Mesa de control',
    
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
    		itemsPerPage: 50
    	}
    ]
});

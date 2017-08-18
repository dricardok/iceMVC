Ext.define('Ice.view.mesacontrol.MesaControl', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'mesacontrol',
    title: 'Mesa de control',
    
    //scrollable: true,
    
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
});

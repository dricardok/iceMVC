Ext.define('Ice.view.bloque.mesacontrol.VentanaMesaControl', {
	extend: 'Ice.view.componente.VentanaIce',
	xtype: 'ventanamesacontrol',
	
	title: 'Acciones',
	width: 800,
	height: 400,
	
	resizable: false,
	
	config: {
		cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null		
	}

	
});
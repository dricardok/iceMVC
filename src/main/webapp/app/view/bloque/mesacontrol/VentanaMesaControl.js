Ext.define('Ice.view.bloque.mesacontrol.VentanaMesaControl', {
	extend: 'Ice.view.componente.VentanaIce',
	xtype: 'ventanamesacontrol',
	
	title: 'Acciones',
	
	platformConfig: {
		desktop : {
			modal: true,
			width: Ice.constantes.componente.ventana.width
		},
		'!desktop': {
			scrollable: true
		},
	},
	
	config: {
		cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null		
	}

	
});
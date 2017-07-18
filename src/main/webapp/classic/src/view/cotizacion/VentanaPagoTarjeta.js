Ext.define('Ice.view.cotizacion.VentanaPagoTarjeta', {
	extend: 'Ice.view.componente.VentanaIce',
	xtype: 'ventanadatostarjeta',
	
	modal: true,
	title: 'Datos Tarjeta',
	layout: 'fit',
	height: 400,
	resizable: false,
	
	config: {
		cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null,
		nmsuplem: null,
	},
	
	constructor: function (config) {
		Ice.log('Ext.view.cotizacion.VentanaPagoTarjeta.constructor config:', config);
		var me = this,
			paso = 'Construyendo ventana pago con tarjeta';
		try {
			/*
			if (!config || !config.cdunieco || !config.cdramo || !config.estado || !config.nmpoliza) {
                throw 'Faltan par\u00e1metros para construir ventana de pago con tarjeta';
            }*/
			
			// dimensiones
            //config.height = config.height || Ext.getBody().getHeight() - 100;
            //config.width = config.width || Ext.getBody().getWidth() - 100;
            
            var comps = Ice.generaComponentes({
            	pantalla: 'PAGO_TARJETA',
            	seccion: 'FORMULARIO',
            	modulo: me.modulo || '',
            	items: true            	
            });
            
            Ext.apply(me, {
            	items: {
            		xtype: 'form',
            		reference: 'formpagotarjeta',
            		layout: 'anchor',
            		widht: '100%',
            		height: 150,
                    bodyPadding: '10px 0px 0px 10px',
                    defaults: {                    	
                    	labelAlign: 'left',
                	    labelWidth: 100,
                        margin: '0px 10px 10px 0px'	
                        
                    },
            		items: comps.PAGO_TARJETA.FORMULARIO.items
            	}
            });
            
		}catch(e) {
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	}
	
});
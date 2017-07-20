Ext.define('Ice.view.cotizacion.VentanaPagoTarjeta', {
	extend: 'Ice.view.componente.VentanaIce',
	xtype: 'ventanapagotarjeta',
	
	//controller: 'pagotarjeta',
	//controller: 'emision',
	
	modal: true,
	title: 'Pago con tarjeta',
	layout: 'fit',
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
            	items: true,
            	fields: true,
                validators: true
            });
            
            Ice.log('Componentes ', comps);
            
            config.items = [{
            		xtype: 'formice',
            		reference: 'formpagotarjeta',
            		widht: '100%',
            		height: '100%',
                    bodyPadding: '10px 0px 0px 10px',
                    defaults: {                    	
                    	labelAlign: 'left',
                	    labelWidth: 100,
                        margin: '0px 10px 10px 0px'	
                        
                    },
            		items: comps.PAGO_TARJETA.FORMULARIO.items.concat([
            			{
            				xtype: 'textfieldice',
            				name: 'nmtarjeta',
            				label: 'Numero de tarjeta',
            				maskRe: /[\d\-]/,
            				allowBlank: false,
            				allowDecimals: false,
            	            allowNegative: false,
            	            maxLength: 16
            				
            			}, {
            				xtype: 'textfieldice',
            				name: 'codseg',
            				label: 'Codigo seguridad',
            				maskRe: /[\d\-]/,
            				allowBlank: false,
            				allowDecimals: false,
            	            allowNegative: false,
            	            maxLength: 3
            			}, {
            				xtype: 'comboice',
            				name: 'fevenca',
            				label: 'Año vencimiento',
            				store: {
            					fields: ['key', 'value'],
            					data: [
            					{"key":"17", "value":"2017"},
            					{"key":"18", "value":"2018"},
            					{"key":"19", "value":"2019"},
            					{"key":"20", "value":"2020"},
            					{"key":"21", "value":"2021"},
            					{"key":"22", "value":"2022"},
            					{"key":"23", "value":"2023"},
            					{"key":"24", "value":"2024"},
            					{"key":"25", "value":"2025"},
            					{"key":"26", "value":"2026"},
            					{"key":"27", "value":"2027"},
            					{"key":"28", "value":"2028"},
            					{"key":"29", "value":"2029"},
            					{"key":"30", "value":"2030"}
            					]
            				},
            				queryMode: 'local',
            				displayField: 'value',
            				valueField: 'key',
            				
            			}, {
            				xtype: 'comboice',
            				name: 'fevencm',
            				label: 'Mes vencimiento',
            				store: {
            					fields: ['key', 'value'],
            					data: [
            					{"key":"01", "value":"Enero"},
            					{"key":"02", "value":"Febrero"},
            					{"key":"03", "value":"Marzo"},
            					{"key":"04", "value":"Abril"},
            					{"key":"05", "value":"Mayo"},
            					{"key":"06", "value":"Junio"},
            					{"key":"07", "value":"Julio"},
            					{"key":"08", "value":"Agosto"},
            					{"key":"09", "value":"Septiembre"},
            					{"key":"10", "value":"Octubre"},
            					{"key":"11", "value":"Noviembre"},
            					{"key":"12", "value":"Diciembre"}
            					]
            				},
            				queryMode: 'local',
            				displayField: 'value',
            				valueField: 'key',            				
            			}, {
            				xtype: 'textfieldice',
            				name: 'nombre',
            				label: 'Nombre',
            				allowBlank: false
            			}, {
            				xtype: 'textfieldice',
            				name: 'email',
            				label: 'Correo electronico',
            				vtype: 'email',
            				allowBlank: false
            			}]),
            		modelValidators:comps.PAGO_TARJETA.FORMULARIO.validators,
        			modelFields	:	comps.PAGO_TARJETA.FORMULARIO.fields
            	}
            ].concat(config.items || []);
            
		}catch(e) {
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	}	
});
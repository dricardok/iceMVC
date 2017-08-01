Ext.define('Ice.view.cotizacion.VentanaPagoTarjeta', {
	extend: 'Ice.view.componente.VentanaIce',
	xtype: 'ventanapagotarjeta',
	
	//controller: 'pagotarjeta',
	//controller: 'emision',
	
	modal: true,
	title: 'Pago con tarjeta',
	platformConfig: {
        desktop: {
            modal: true,
            width: 800
        },
        '!desktop': {
            layout: 'fit'
        }
    },
	//layout: 'fit',
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
            
            Ext.apply(me, {
            	items: {
            		xtype: 'formdoscolumnasice',
            		reference: 'formpagotarjeta',
            		//layout: 'anchor',
            		//width: 400,
            		//height: '100%',
                    //bodyPadding: '10px 0px 0px 10px',                    
                    defaults: {                    	
                    	labelAlign: 'top',
                	    //labelWidth: 100,
                        //margin: '0px 10px 10px 0px'	
                        //anchor: '100%'
                    },
                    
            		items: comps.PAGO_TARJETA.FORMULARIO.items.concat([
            			{
            				xtype: 'textfield',
            				name: 'nmtarjeta',
            				fieldLabel: 'Numero de tarjeta',
            				maskRe: /[\d\-]/,
            				allowBlank: false,
            				allowDecimals: false,
            	            allowNegative: false,
            	            maxLength: 16
            				
            			}, {
            				xtype: 'textfield',
            				name: 'codseg',
            				fieldLabel: 'Codigo seguridad',
            				maskRe: /[\d\-]/,
            				allowBlank: false,
            				allowDecimals: false,
            	            allowNegative: false,
            	            maxLength: 3
            			}, {
            				xtype: 'combobox',
            				name: 'fevenca',
            				fieldLabel: 'Año vencimiento',
            				store: {
            					fields: ['id', 'name'],
            					data: [
            					{"id":"17", "name":"2017"},
            					{"id":"18", "name":"2018"},
            					{"id":"19", "name":"2019"},
            					{"id":"20", "name":"2020"},
            					{"id":"21", "name":"2021"},
            					{"id":"22", "name":"2022"},
            					{"id":"23", "name":"2023"},
            					{"id":"24", "name":"2024"},
            					{"id":"25", "name":"2025"},
            					{"id":"26", "name":"2026"},
            					{"id":"27", "name":"2027"},
            					{"id":"28", "name":"2028"},
            					{"id":"29", "name":"2029"},
            					{"id":"30", "name":"2030"}
            					]
            				},
            				queryMode: 'local',
            				displayField: 'name',
            				valueField: 'id',
            				
            			}, {
            				xtype: 'combobox',
            				name: 'fevencm',
            				fieldLabel: 'Mes vencimiento',
            				store: {
            					fields: ['id', 'name'],
            					data: [
            					{"id":"01", "name":"Enero"},
            					{"id":"02", "name":"Febrero"},
            					{"id":"03", "name":"Marzo"},
            					{"id":"04", "name":"Abril"},
            					{"id":"05", "name":"Mayo"},
            					{"id":"06", "name":"Junio"},
            					{"id":"07", "name":"Julio"},
            					{"id":"08", "name":"Agosto"},
            					{"id":"09", "name":"Septiembre"},
            					{"id":"10", "name":"Octubre"},
            					{"id":"11", "name":"Noviembre"},
            					{"id":"12", "name":"Diciembre"}
            					]
            				},
            				queryMode: 'local',
            				displayField: 'name',
            				valueField: 'id',            				
            			}, {
            				xtype: 'textfield',
            				name: 'nombre',
            				fieldLabel: 'Nombre',
            				allowBlank: false
            			}, {
            				xtype: 'textfield',
            				name: 'email',
            				fieldLabel: 'Correo electronico',
            				vtype: 'email',
            				allowBlank: false
            			}]),
            		modelValidators:comps.PAGO_TARJETA.FORMULARIO.validators,
        			modelFields	:	comps.PAGO_TARJETA.FORMULARIO.fields
            	}
            });
            
		}catch(e) {
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	}	
});